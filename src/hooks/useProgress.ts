import { useEffect, useState } from 'react'
import type { LessonStatus } from '../types/course'
import { supabase } from '../lib/supabase'

// El recorrido se reorganizó para enseñar desde cero; no reutilizamos el orden
// anterior, que podía desbloquear una lección avanzada antes de sus bases.
const STORAGE_KEY = 'flight-academy-progress-v2'
const FEEDBACK_KEY = 'flight-academy-lesson-feedback-v1'
const FEEDBACK_RESOLVED_KEY = 'flight-academy-lesson-feedback-resolved-v1'
const CURRICULUM_VERSION = '3'
type SyncedStatuses = Record<string, LessonStatus | string | Record<string, string> | Record<string, boolean>>
const initialStatuses = (ids: string[]): Record<string, LessonStatus> => Object.fromEntries(ids.map((id) => [id, 'available']))
const statusRank: Record<LessonStatus, number> = { locked: 0, available: 1, 'in-progress': 2, completed: 3 }
const unlockNextLesson = (ids: string[], statuses: Record<string, LessonStatus>) => {
  const next = { ...statuses }
  for (let index = 1; index < ids.length; index += 1) {
    if (next[ids[index - 1]] === 'completed' && next[ids[index]] === 'locked') next[ids[index]] = 'available'
  }
  return next
}

const mergeStatuses = (ids: string[], local: Record<string, LessonStatus>, cloud?: SyncedStatuses) => {
  // La secuencia anterior no es compatible con el nuevo currículo. Al primer
  // inicio de sesión tras esta actualización se ignora ese progreso y se
  // escribe un estado nuevo, marcado con la versión 2, en la nube.
  const compatibleCloud = cloud?.__curriculumVersion === CURRICULUM_VERSION ? cloud : undefined
  return unlockNextLesson(ids, Object.fromEntries(ids.map((id) => {
  const localStatus = local[id] ?? initialStatuses(ids)[id]
  const cloudStatus = compatibleCloud?.[id] as LessonStatus | undefined
  return [id, cloudStatus && statusRank[cloudStatus] > statusRank[localStatus] ? cloudStatus : localStatus]
})) as Record<string, LessonStatus>)
}

export function useProgress(ids: string[]) {
  const [statuses, setStatuses] = useState<Record<string, LessonStatus>>(() => { try { const stored = localStorage.getItem(STORAGE_KEY); const parsed = stored ? JSON.parse(stored) as Record<string, LessonStatus> : {}; return Object.fromEntries(ids.map((id) => [id, parsed[id] === 'completed' || parsed[id] === 'in-progress' ? parsed[id] : 'available'])) as Record<string, LessonStatus> } catch { return initialStatuses(ids) } })
  const [feedback, setFeedback] = useState<Record<string, string>>(() => { try { const stored = localStorage.getItem(FEEDBACK_KEY); return stored ? JSON.parse(stored) as Record<string, string> : {} } catch { return {} } })
  const [feedbackResolved, setFeedbackResolved] = useState<Record<string, boolean>>(() => { try { const stored = localStorage.getItem(FEEDBACK_RESOLVED_KEY); return stored ? JSON.parse(stored) as Record<string, boolean> : {} } catch { return {} } })
  const [email, setEmail] = useState<string | null>(null)
  const [syncReady, setSyncReady] = useState(false)
  const [syncMessage, setSyncMessage] = useState(supabase ? 'Sincronización lista para iniciar sesión.' : 'Falta configurar Supabase.')

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(statuses)) }, [statuses])
  useEffect(() => { localStorage.setItem(FEEDBACK_KEY, JSON.stringify(feedback)) }, [feedback])
  useEffect(() => { localStorage.setItem(FEEDBACK_RESOLVED_KEY, JSON.stringify(feedbackResolved)) }, [feedbackResolved])

  useEffect(() => {
    if (!supabase) return
    const client = supabase
    let active = true
    const load = async () => {
      const { data: { session } } = await client.auth.getSession()
      if (!active) return
      setEmail(session?.user.email ?? null)
      if (!session) { setSyncReady(false); return }
      const { data, error } = await client.from('user_progress').select('statuses').eq('user_id', session.user.id).maybeSingle()
      if (!active) return
      if (error) { setSyncMessage('No pudimos leer el progreso en la nube.'); return }
      const cloud = data?.statuses as SyncedStatuses | undefined
      const merged = mergeStatuses(ids, statuses, cloud)
      setStatuses(merged)
      const cloudFeedback = cloud?.__curriculumVersion === CURRICULUM_VERSION ? cloud.__lessonFeedback : undefined
      if (cloudFeedback && typeof cloudFeedback === 'object' && !Array.isArray(cloudFeedback)) {
        setFeedback((current) => ({ ...current, ...cloudFeedback as Record<string, string> }))
      }
      const cloudResolved = cloud?.__curriculumVersion === CURRICULUM_VERSION ? cloud.__lessonFeedbackResolved : undefined
      if (cloudResolved && typeof cloudResolved === 'object' && !Array.isArray(cloudResolved)) {
        setFeedbackResolved((current) => ({ ...current, ...cloudResolved as Record<string, boolean> }))
      }
      setSyncReady(true)
      setSyncMessage('Progreso sincronizado.')
    }
    void load()
    const { data: { subscription } } = client.auth.onAuthStateChange((_event, session) => { setEmail(session?.user.email ?? null); setSyncReady(false); if (session) void load() })
    return () => { active = false; subscription.unsubscribe() }
  // La sesión se carga una vez al iniciar; ids no cambia durante la vida de la app.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!supabase || !email || !syncReady) return
    const client = supabase
    const save = async () => {
      const { data: { user } } = await client.auth.getUser()
      if (!user) return
      const syncedStatuses: SyncedStatuses = { ...statuses, __curriculumVersion: CURRICULUM_VERSION, __lessonFeedback: feedback, __lessonFeedbackResolved: feedbackResolved }
      const { error } = await client.from('user_progress').upsert({ user_id: user.id, statuses: syncedStatuses, updated_at: new Date().toISOString() })
      if (error) setSyncMessage('El progreso quedó guardado localmente; reintentaremos sincronizarlo.')
    }
    void save()
  }, [email, statuses, feedback, feedbackResolved, syncReady])

  const startLesson = (id: string) => setStatuses((current) => current[id] === 'available' ? { ...current, [id]: 'in-progress' } : current)
  const completeLesson = (id: string) => setStatuses((current) => { const next = { ...current, [id]: 'completed' as LessonStatus }; const index = ids.indexOf(id); if (index !== -1 && ids[index + 1] && next[ids[index + 1]] === 'locked') next[ids[index + 1]] = 'available'; return next })
  const resetProgress = () => { if (window.confirm('¿Quieres reiniciar todo tu progreso local y sincronizado?')) setStatuses(initialStatuses(ids)) }
  const exportProgress = () => {
    const backup = JSON.stringify({ version: 2, exportedAt: new Date().toISOString(), statuses, feedback, feedbackResolved }, null, 2)
    const url = URL.createObjectURL(new Blob([backup], { type: 'application/json' }))
    const link = document.createElement('a')
    link.href = url
    link.download = `flight-academy-progreso-${new Date().toISOString().slice(0, 10)}.json`
    link.click()
    URL.revokeObjectURL(url)
  }
  const importProgress = async (file: File) => {
    try {
      const parsed = JSON.parse(await file.text()) as { statuses?: Record<string, LessonStatus>; feedback?: Record<string, string>; feedbackResolved?: Record<string, boolean> }
      if (!parsed.statuses || typeof parsed.statuses !== 'object') throw new Error('invalid')
      const valid: LessonStatus[] = ['locked', 'available', 'in-progress', 'completed']
      const fallback = initialStatuses(ids)
      setStatuses(Object.fromEntries(ids.map((id) => { const candidate = parsed.statuses?.[id]; return [id, candidate && valid.includes(candidate) ? candidate : fallback[id]] })) as Record<string, LessonStatus>)
      if (parsed.feedback && typeof parsed.feedback === 'object') setFeedback(Object.fromEntries(Object.entries(parsed.feedback).filter(([, value]) => typeof value === 'string')))
      if (parsed.feedbackResolved && typeof parsed.feedbackResolved === 'object') setFeedbackResolved(Object.fromEntries(Object.entries(parsed.feedbackResolved).filter(([, value]) => typeof value === 'boolean')))
      return true
    } catch { return false }
  }
  const signUp = async (accountEmail: string, password: string) => {
    if (!supabase) return 'Falta configurar Supabase.'
    const { data, error } = await supabase.auth.signUp({ email: accountEmail, password })
    if (error) return error.message
    if (!data.session) return 'Revisa tu correo y confirma la cuenta para iniciar sesión.'
    return 'Cuenta creada y progreso sincronizado.'
  }
  const signIn = async (accountEmail: string, password: string) => {
    if (!supabase) return 'Falta configurar Supabase.'
    const { error } = await supabase.auth.signInWithPassword({ email: accountEmail, password })
    return error ? error.message : 'Sesión iniciada. Sincronizando progreso…'
  }
  const signOut = async () => { if (supabase) await supabase.auth.signOut(); setSyncMessage('Sesión cerrada. El progreso sigue guardado en este dispositivo.') }
  const completedCount = Object.values(statuses).filter((status) => status === 'completed').length
  const saveFeedback = (id: string, value: string) => setFeedback((current) => ({ ...current, [id]: value }))
  const toggleFeedbackResolved = (id: string) => setFeedbackResolved((current) => ({ ...current, [id]: !current[id] }))
  return { statuses, startLesson, completeLesson, resetProgress, exportProgress, importProgress, feedback, saveFeedback, feedbackResolved, toggleFeedbackResolved, completedCount, progress: Math.round((completedCount / ids.length) * 100), sync: { email, message: syncMessage, signUp, signIn, signOut } }
}
