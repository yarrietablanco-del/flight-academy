import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { validateOperationalCompetency } from './operational-competency.mjs';

const root = process.cwd();
const curriculum = JSON.parse(readFileSync(join(root, 'curriculum', 'curriculum.json'), 'utf8'));
const curriculumLessons = curriculum.levels.flatMap((level) =>
  (level.modules ?? []).flatMap((module) =>
    (module.lessons ?? []).map((lesson) => ({ ...lesson, level: level.level, module: module.module }))
  )
);
const curriculumById = new Map(curriculumLessons.map((lesson) => [lesson.id, lesson]));
const lessonDir = join(root, 'content', 'lessons');
const lessonFiles = readdirSync(lessonDir).filter((name) => name.endsWith('.json')).sort();
const readAsset = (asset) => readFileSync(join(root, asset), 'utf8');

const blockers = [];
const warnings = [];
const passes = [];
const validFidelity = new Set(['real', 'recreated-faithful']);
const absenceReason = /pendient|no existe|no se suministr|sin una referencia|sin referencia|no hay (?:una )?(?:captura|referencia|asset)|falta (?:una )?(?:captura|referencia|asset)|no se confirm|a[uú]n no.*verific|todav[ií]a no.*verific/i;
const placeholderText = /referencia pendiente|queda explícitamente pendiente|pendiente hasta contar|no existe una captura verificable|no se suministró una referencia fiel|sin una referencia real o recreada fiel/i;

if (curriculumLessons.length !== 33) blockers.push(`CURRICULUM: se esperaban 33 lecciones y hay ${curriculumLessons.length}.`);
const planned = curriculumLessons.filter((lesson) => lesson.status === 'planned');
if (planned.length) blockers.push(`CURRICULUM: quedan planned: ${planned.map((lesson) => lesson.id).join(', ')}`);
if (lessonFiles.length !== 33) blockers.push(`CONTENT: se esperaban 33 documentos y hay ${lessonFiles.length}.`);

for (const entry of curriculumLessons) {
  const path = join(lessonDir, `${entry.id}.json`);
  if (!existsSync(path)) {
    blockers.push(`${entry.id}: falta el documento de la lección.`);
    continue;
  }

  const lesson = JSON.parse(readFileSync(path, 'utf8'));
  const localBlockers = [];
  const localWarnings = [];

  for (const error of validateOperationalCompetency(lesson, { readAsset })) localBlockers.push(`1.1: ${error}`);

  if (!Array.isArray(lesson.steps) || lesson.steps.length < 2) localBlockers.push('contenido: menos de 2 pasos didácticos.');
  if (!lesson.practice?.task || !lesson.practice?.successSignal) localBlockers.push('práctica: falta task o successSignal.');
  if (!Array.isArray(lesson.completionCriteria) || lesson.completionCriteria.length === 0) localBlockers.push('cierre: falta completionCriteria.');
  if (!Array.isArray(lesson.checklist) || lesson.checklist.length === 0) localBlockers.push('cierre: falta checklist.');

  const transfer = lesson.operationalCompetency?.transferExercise;
  if (entry.level >= 4 && !transfer) localBlockers.push('nivel avanzado: falta transferExercise.');

  const validRefs = [];
  for (const step of lesson.steps ?? []) {
    const visuals = [step.visual, ...(step.referenceVisuals ?? [])].filter(Boolean);
    for (const visual of visuals) {
      if (visual.visualCategory === 'reference' && visual.asset && validFidelity.has(visual.fidelity)) validRefs.push(visual);
      if (visual.requiresReference === true && (!visual.asset || visual.visualCategory !== 'reference' || !validFidelity.has(visual.fidelity))) {
        localBlockers.push(`paso ${step.number}: requiresReference=true pero no hay asset reference real/recreated-faithful.`);
      }
    }

    for (const coverage of step.requiredVisualCoverage ?? []) {
      if (coverage.status === 'required') {
        const hasMatching = visuals.some((visual) =>
          visual.visualCategory === 'reference' &&
          visual.asset &&
          validFidelity.has(visual.fidelity) &&
          Array.isArray(visual.coverage) &&
          visual.coverage.includes(coverage.type)
        );
        if (!hasMatching) localBlockers.push(`paso ${step.number}: cobertura ${coverage.type} requerida sin referencia fiel correspondiente en el mismo paso.`);
      }
      if (coverage.status === 'notRequired' && absenceReason.test(coverage.reason ?? '')) {
        localBlockers.push(`paso ${step.number}: notRequired justificado por ausencia de referencia (${coverage.type}): ${coverage.reason}`);
      }
    }
  }

  if (entry.level >= 4 && validRefs.length === 0) localBlockers.push('nivel avanzado: no existe ninguna referencia real/recreated-faithful con asset.');

  const targets = lesson.operationalCompetency?.futureLearningTargets ?? [];
  for (const target of targets) {
    const targetEntry = curriculumById.get(target);
    if (!targetEntry) {
      localBlockers.push(`futureLearningTarget inexistente: ${target}`);
      continue;
    }
    if (!['validated', 'published'].includes(targetEntry.status)) localBlockers.push(`futureLearningTarget no cerrado: ${target} (${targetEntry.status}).`);
    if (targetEntry.order <= entry.order) localWarnings.push(`futureLearningTarget ${target} no está después de la lección actual.`);
  }

  const serialized = JSON.stringify(lesson);
  if (placeholderText.test(serialized)) localBlockers.push('texto de referencia pendiente/no disponible todavía presente en la lección.');
  if (/\bTODO\b|TBD|PLACEHOLDER/i.test(serialized)) localBlockers.push('marcador TODO/TBD/PLACEHOLDER presente.');

  if (localBlockers.length) blockers.push(...localBlockers.map((error) => `${entry.id}: ${error}`));
  else passes.push(entry.id);
  warnings.push(...localWarnings.map((warning) => `${entry.id}: ${warning}`));
}

console.log(`AUDIT 33 — PASS ${passes.length}/33`);
console.log(`PASS: ${passes.join(', ')}`);
if (warnings.length) console.log(`WARNINGS (${warnings.length}):\n- ${warnings.join('\n- ')}`);
if (blockers.length) {
  console.error(`BLOCKERS (${blockers.length}):\n- ${blockers.join('\n- ')}`);
  process.exit(1);
}
console.log('AUDIT 33 OK: 33/33 sin blockers estructurales/operacionales detectables por la auditoría final.');
