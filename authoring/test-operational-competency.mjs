import assert from 'node:assert/strict';
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
console.log('operational competency tests passed');
