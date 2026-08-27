import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { validateOperationalCompetency } from './operational-competency.mjs';

const reference = { visualCategory: 'reference', fidelity: 'real', asset: 'public/reference.png' };
const operational = { metadata: { title: 'Carta de aproximación' }, steps: [{ visual: reference, requiredVisualCoverage: [{ status: 'required' }] }], operationalCompetency: { competencyObjective: 'Dada una carta, identifica una restricción y decide qué verificar en MSFS.', competencyEvidence: ['Identifica la restricción y explica su decisión.'], transferExercise: { scenario: 'Se muestra una carta distinta para otra pista.', task: 'Identifica la restricción equivalente sin copiar el ejemplo.', expectedCompetency: 'Interpreta la zona relevante de una carta nueva.', successCriteria: 'Explica la decisión y verifica el resultado en MSFS.' }, futureLearningTargets: ['ils-rnav'] } };
assert.deepEqual(validateOperationalCompetency(operational), []);
assert.ok(validateOperationalCompetency({ ...operational, operationalCompetency: { ...operational.operationalCompetency, competencyEvidence: [] } }).some((error) => error.includes('competencyEvidence')));
assert.ok(validateOperationalCompetency({ ...operational, operationalCompetency: { ...operational.operationalCompetency, transferExercise: undefined } }).some((error) => error.includes('transferExercise')));
assert.ok(validateOperationalCompetency({ ...operational, steps: [{ visual: { visualCategory: 'conceptual' }, requiredVisualCoverage: [{ status: 'notRequired', reason: 'No hay carta disponible.' }] }] }).some((error) => error.includes('referenceVisual')));
assert.ok(validateOperationalCompetency({ ...operational, steps: [{ visual: reference, requiredVisualCoverage: [{ status: 'notRequired', reason: 'No hay interfaz disponible.' }] }] }).some((error) => error.includes('notRequired')));
assert.ok(validateOperationalCompetency({ ...operational, operationalCompetency: { ...operational.operationalCompetency, competencyObjective: 'Comprender la carta.' } }).some((error) => error.includes('competencyObjective')));
assert.ok(validateOperationalCompetency({ ...operational, whyItMatters: 'Esto se verá después.', operationalCompetency: { ...operational.operationalCompetency, futureLearningTargets: [] } }).some((error) => error.includes('futureLearningTargets')));

const root = process.cwd();
const readAsset = (asset) => readFileSync(join(root, asset), 'utf8');
const kabqLessons = ['airport-diagram-basics', 'atc-taxi', 'sid-star', 'approach-charts', 'ils-rnav'];
for (const id of kabqLessons) {
  const lesson = JSON.parse(readFileSync(join(root, 'content', 'lessons', `${id}.json`), 'utf8'));
  assert.deepEqual(validateOperationalCompetency(lesson, { readAsset }), [], `${id} debe cumplir Operational Competency 1.1 y conservar hechos de fuente`);
}

const brokenAside = JSON.parse(readFileSync(join(root, 'content', 'lessons', 'sid-star.json'), 'utf8'));
brokenAside.steps[2].instruction = brokenAside.steps[2].instruction.replaceAll('ASIDE', '');
brokenAside.steps[2].visual.recognizedElements = brokenAside.steps[2].visual.recognizedElements.filter((item) => item !== 'ASIDE');
brokenAside.operationalCompetency.competencyEvidence = brokenAside.operationalCompetency.competencyEvidence.filter((item) => !item.includes('ASIDE'));
brokenAside.commonMistakes = brokenAside.commonMistakes.filter((item) => !item.mistake.includes('ASIDE'));
brokenAside.quiz = brokenAside.quiz.filter((item) => !item.question.includes('fix no puede omitirse'));
assert.ok(validateOperationalCompetency(brokenAside, { readAsset }).some((error) => error.includes('aside')), 'el auditor debe detectar ASIDE ausente del contenido');

const brokenVda = JSON.parse(readFileSync(join(root, 'content', 'lessons', 'ils-rnav.json'), 'utf8'));
brokenVda.steps[1].instruction = brokenVda.steps[1].instruction.replace('VDA advisory', 'glidepath aprobado');
brokenVda.operationalCompetency.sourceVerification.prohibitedClaims.push('glidepath aprobado');
assert.ok(validateOperationalCompetency(brokenVda, { readAsset }).some((error) => error.includes('afirmación prohibida')), 'el auditor debe detectar VDA convertido en glidepath aprobado');

console.log('operational competency tests passed; KABQ source facts audited');
