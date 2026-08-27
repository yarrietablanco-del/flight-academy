import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const editoriallyReady = new Set(['validated', 'published']);
export const flattenLessons = (curriculum) => curriculum.levels.flatMap((level) => level.modules.flatMap((module) => module.lessons));
export function selectNextLesson(curriculum, attempted = new Set()) {
  const lessons = flattenLessons(curriculum);
  return lessons.filter((lesson) => lesson.status === 'planned' && !attempted.has(lesson.id))
    .filter((lesson) => lesson.prerequisites.every((id) => editoriallyReady.has(lessons.find((item) => item.id === id)?.status)))
    .sort((a, b) => a.order - b.order)[0];
}
function parseArguments(argv) {
  const count = Number(argv[0] ?? 1); const timeoutFlag = argv.indexOf('--timeout-minutes');
  const timeoutMinutes = timeoutFlag < 0 ? 20 : Number(argv[timeoutFlag + 1]);
  if (!Number.isInteger(count) || count < 1) throw new Error('Uso: npm run author:batch -- <cantidad positiva> [--timeout-minutes <minutos positivos>]');
  if (!Number.isFinite(timeoutMinutes) || timeoutMinutes <= 0) throw new Error('--timeout-minutes debe ser un número positivo.');
  return { count, timeoutMs: timeoutMinutes * 60_000, timeoutMinutes };
}
function restorePlanned(root, lessonId, readCurriculum, writeCurriculum) {
  const curriculum = readCurriculum(root); const lesson = flattenLessons(curriculum).find((item) => item.id === lessonId);
  if (lesson && !editoriallyReady.has(lesson.status)) { lesson.status = 'planned'; writeCurriculum(root, curriculum); }
}
// On Windows taskkill starts at precisely the author-next PID created below. /T
// can therefore only end that process and its descendants, including its Codex child.
function terminateProcessTree(child, platform, spawnProcess) {
  if (!child.pid) return;
  if (platform === 'win32') { const killer = spawnProcess('taskkill.exe', ['/pid', String(child.pid), '/T', '/F'], { windowsHide: true, stdio: 'ignore' }); killer.on('error', () => {}); return; }
  child.kill('SIGTERM');
}
export function runChildWithTimeout({ command, args, options, timeoutMs, platform = process.platform, spawnProcess = spawn }) {
  return new Promise((resolve) => {
    const child = spawnProcess(command, args, options); let stderr = ''; let timedOut = false;
    child.stderr?.on('data', (chunk) => { stderr += chunk.toString(); process.stderr.write(chunk); });
    const timer = setTimeout(() => { timedOut = true; terminateProcessTree(child, platform, spawnProcess); }, timeoutMs);
    child.on('error', (error) => { clearTimeout(timer); resolve({ code: null, stderr, error, timedOut }); });
    child.on('close', (code) => { clearTimeout(timer); resolve({ code, stderr, timedOut }); });
  });
}
export async function runBatch({
  root = process.cwd(), count, timeoutMs, timeoutMinutes = timeoutMs / 60_000,
  readCurriculum = (directory) => JSON.parse(readFileSync(join(directory, 'curriculum', 'curriculum.json'), 'utf8')),
  writeCurriculum = (directory, curriculum) => writeFileSync(join(directory, 'curriculum', 'curriculum.json'), `${JSON.stringify(curriculum, null, 2)}\n`),
  runChild = runChildWithTimeout, log = console.log, errorLog = console.error,
} = {}) {
  const summary = { requested: count, completed: [], validated: [], failed: [], timeout: [], pending: [] }; const attempted = new Set();
  log(`[authoring] ruta de proyecto: ${root}`); log(`[authoring] lote solicitado: ${count}; timeout por lección: ${timeoutMinutes} min`);
  while (attempted.size < count) {
    const next = selectNextLesson(readCurriculum(root), attempted); if (!next) break;
    const position = attempted.size + 1; attempted.add(next.id); const prefix = `[${position}/${count}]`;
    log(`${prefix} Generando ${next.id}`); log(`${prefix} Codex iniciado`);
    const result = await runChild({ command: process.execPath, args: ['authoring/author-next.mjs', '--lesson', next.id], options: { cwd: root, env: { ...process.env, AUTHOR_BATCH_PROGRESS: prefix }, stdio: ['ignore', 'inherit', 'pipe'] }, timeoutMs });
    if (result.timedOut) { restorePlanned(root, next.id, readCurriculum, writeCurriculum); summary.timeout.push(next.id); log(`${prefix} TIMEOUT después de ${timeoutMinutes} min`); log('Continuando...'); continue; }
    const current = flattenLessons(readCurriculum(root)).find((lesson) => lesson.id === next.id);
    if (result.code !== 0 || result.error || current?.status !== 'validated') {
      restorePlanned(root, next.id, readCurriculum, writeCurriculum); summary.failed.push(next.id);
      errorLog(`${prefix} ERROR ${next.id}: exit code ${result.code ?? 'sin código'}${result.stderr ? `; stderr: ${result.stderr.trim()}` : ''}${result.error ? `; ${result.error.message}` : ''}`); log('Continuando...'); continue;
    }
    summary.completed.push(next.id); summary.validated.push(next.id); log(`${prefix} OK`);
  }
  summary.pending = flattenLessons(readCurriculum(root)).filter((lesson) => lesson.status === 'planned').map((lesson) => lesson.id);
  log(`Solicitadas: ${summary.requested}`); log(`Completadas: ${summary.completed.length}`); log(`Validadas: ${summary.validated.length}`); log(`Fallidas: ${summary.failed.length}`); log(`Timeout: ${summary.timeout.length}`);
  for (const key of ['validated', 'failed', 'timeout', 'pending']) log(`${key}:\n${JSON.stringify(summary[key])}`);
  return summary;
}
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) { const options = parseArguments(process.argv.slice(2)); await runBatch(options); }
