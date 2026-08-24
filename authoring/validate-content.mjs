import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { basename, extname, join } from 'node:path';

const root = process.cwd();
const lessonsDir = join(root, 'content', 'lessons');
const assetsDir = join(root, 'content', 'assets');
const required = ['metadata', 'whyItMatters', 'concepts', 'steps', 'practice', 'commonMistakes', 'checklist', 'quiz', 'completionCriteria', 'sources'];
const stepRequired = ['number', 'title', 'instruction', 'explanation', 'expectedResult', 'simulatorAction', 'visual'];
const visualRequired = ['type', 'alt', 'purpose', 'teaches', 'primaryTeachingObjective', 'userQuestionAnswered', 'tiedToStep', 'expectedObservation', 'view', 'visualCategory', 'fidelity', 'recognitionGoal', 'recognizedElements', 'actionAfterViewing'];
const coverageTypes = new Set(['cockpit', 'instrument', 'hardware', 'chart', 'exteriorView', 'airport']);
const validViews = new Set(['vistaExterior', 'instrumento', 'controlFisico', 'flujo', 'comparacion']);
const validQuestions = new Set(['dondeMirar', 'queControlTocar', 'queCambioEsperar', 'queErrorEvitar']);
const rasterExtensions = new Set(['.png', '.jpg', '.jpeg', '.webp']);
const issue = (file, message) => `${basename(file)}: ${message}`;
const isText = (value, min = 20) => typeof value === 'string' && value.trim().length >= min;

function validateVisual(file, step, visual, label) {
  const errors = [];
  if (!visual) return [issue(file, `${label} del paso ${step.number} falta`)];
  for (const key of visualRequired) if (visual[key] === undefined || visual[key] === '' || (Array.isArray(visual[key]) && visual[key].length === 0)) errors.push(issue(file, `${label} del paso ${step.number} sin ${key}`));
  if (!visual.asset && !visual.requiresReference) errors.push(issue(file, `${label} del paso ${step.number} requiere asset o requiresReference:true`));
  if (visual.asset && !existsSync(join(root, visual.asset))) errors.push(issue(file, `asset inexistente: ${visual.asset}`));
  if (visual.tiedToStep !== step.number) errors.push(issue(file, `${label} del paso ${step.number} no coincide con tiedToStep`));
  if (!validViews.has(visual.view)) errors.push(issue(file, `${label} del paso ${step.number} tiene view inválido`));
  if (!['conceptual', 'reference'].includes(visual.visualCategory)) errors.push(issue(file, `${label} del paso ${step.number} debe ser conceptual o reference`));
  if (!Array.isArray(visual.userQuestionAnswered) || visual.userQuestionAnswered.some((question) => !validQuestions.has(question))) errors.push(issue(file, `${label} del paso ${step.number} no declara pregunta pedagógica válida`));
  for (const key of ['alt', 'purpose', 'teaches', 'expectedObservation', 'recognitionGoal', 'actionAfterViewing']) if (!isText(visual[key])) errors.push(issue(file, `${label} del paso ${step.number} tiene ${key} insuficiente`));
  if (!isText(visual.primaryTeachingObjective, 12)) errors.push(issue(file, `${label} del paso ${step.number} sin primaryTeachingObjective claro`));
  if (/[,;]|\by\b|\bo\b/i.test(visual.primaryTeachingObjective ?? '')) errors.push(issue(file, `${label} del paso ${step.number} mezcla varios objetivos principales`));
  if (!Array.isArray(visual.recognizedElements) || visual.recognizedElements.length === 0) errors.push(issue(file, `${label} del paso ${step.number} sin elementos reconocibles`));
  if (visual.visualCategory === 'conceptual') {
    if (visual.fidelity !== 'conceptual') errors.push(issue(file, `visual conceptual del paso ${step.number} debe usar fidelity conceptual`));
    if (['vistaExterior', 'instrumento', 'controlFisico'].includes(visual.view)) errors.push(issue(file, `visual conceptual del paso ${step.number} no cubre reconocimiento operativo`));
    for (const key of ['perspective', 'movingElement', 'axisOfMovement', 'directionOfMovement']) if (!isText(visual[key], 3)) errors.push(issue(file, `visual conceptual del paso ${step.number} sin ${key}`));
    if (visual.type === 'comparisonDiagram' && !isText(visual.comparisonJustification)) errors.push(issue(file, `comparisonDiagram del paso ${step.number} sin justificación`));
  }
  if (visual.visualCategory === 'reference') {
    if (!['real', 'recreated-faithful'].includes(visual.fidelity)) errors.push(issue(file, `referenceVisual del paso ${step.number} no es real ni recreated-faithful`));
    if (visual.fidelity === 'real' && visual.asset && extname(visual.asset).toLowerCase() === '.svg') errors.push(issue(file, `referenceVisual real del paso ${step.number} no puede usar SVG`));
    const quality = visual.quality;
    if (!quality || !Number.isInteger(quality.sourceWidth) || !Number.isInteger(quality.sourceHeight) || !Number.isInteger(quality.intendedDisplayWidth) || quality.supportsZoom !== true || !isText(quality.detailTarget)) errors.push(issue(file, `referenceVisual del paso ${step.number} sin calidad o zoom operativo`));
    if (quality && visual.asset && rasterExtensions.has(extname(visual.asset).toLowerCase()) && quality.sourceWidth < quality.intendedDisplayWidth * 2) errors.push(issue(file, `referenceVisual raster del paso ${step.number} no alcanza 2×`));
  }
  return errors;
}

function validateCoverage(file, step) {
  const errors = [];
  if (!Array.isArray(step.requiredVisualCoverage) || step.requiredVisualCoverage.length === 0) return [issue(file, `paso ${step.number} V3 sin requiredVisualCoverage`)];
  const needed = new Set();
  for (const declaration of step.requiredVisualCoverage) {
    if (!coverageTypes.has(declaration?.type)) errors.push(issue(file, `paso ${step.number} declara coverage inválido`));
    if (!['required', 'notRequired'].includes(declaration?.status)) errors.push(issue(file, `paso ${step.number} declara estado de coverage inválido`));
    if (declaration?.status === 'notRequired' && !isText(declaration.reason)) errors.push(issue(file, `paso ${step.number} debe justificar notRequired`));
    if (declaration?.status === 'required') needed.add(declaration.type);
  }
  const inferred = { controlFisico: ['hardware'], instrumento: ['instrument'], vistaExterior: ['cockpit', 'exteriorView'], flujo: ['cockpit'], comparacion: [] };
  const references = [step.visual, ...(step.referenceVisuals ?? [])].filter((visual) => visual?.visualCategory === 'reference' && visual.asset && !visual.requiresReference);
  const covered = new Set(references.flatMap((visual) => visual.coverage ?? inferred[visual.view] ?? []));
  for (const type of needed) if (!covered.has(type)) errors.push(issue(file, `paso ${step.number} requiere ${type} sin referencia fiel`));
  return errors;
}

function validatePractice(file, practice) {
  const errors = [];
  for (const key of ['title', 'scenario', 'task', 'successSignal', 'conceptDemonstrated']) if (!isText(practice?.[key], key === 'conceptDemonstrated' ? 12 : 1)) errors.push(issue(file, `práctica sin ${key}`));
  if (!Array.isArray(practice?.possibleConfounders)) errors.push(issue(file, 'práctica debe declarar possibleConfounders'));
  if (!isText(practice?.whyThisExerciseDemonstratesTheConcept, 30)) errors.push(issue(file, 'práctica sin whyThisExerciseDemonstratesTheConcept suficiente'));
  if (/yaw/i.test(practice?.conceptDemonstrated ?? '') && /estacionado|detenido|tierra/i.test(practice?.scenario ?? '')) errors.push(issue(file, 'práctica de yaw no puede usar una situación detenida en tierra'));
  return errors;
}

function validate(file) {
  let lesson;
  try { lesson = JSON.parse(readFileSync(file, 'utf8')); } catch { return [issue(file, 'JSON inválido')]; }
  const errors = [];
  for (const key of required) if (!lesson[key] || (Array.isArray(lesson[key]) && lesson[key].length === 0)) errors.push(issue(file, `falta ${key}`));
  for (const key of ['id', 'title', 'subtitle', 'objective', 'estimatedTime', 'prerequisites', 'level', 'module']) if (lesson.metadata?.[key] === undefined || lesson.metadata[key] === '') errors.push(issue(file, `metadata.${key} falta`));
  if (lesson.metadata?.visualStandardVersion !== 3) errors.push(issue(file, 'requiere metadata.visualStandardVersion: 3 (Authoring Standard 1.0)'));
  errors.push(...validatePractice(file, lesson.practice));
  for (const step of lesson.steps ?? []) {
    for (const key of stepRequired) if (step[key] === undefined || step[key] === '') errors.push(issue(file, `paso ${step.number ?? '?'} sin ${key}`));
    errors.push(...validateVisual(file, step, step.visual, 'visual'));
    for (const visual of step.referenceVisuals ?? []) errors.push(...validateVisual(file, step, visual, 'referenceVisual'));
    errors.push(...validateCoverage(file, step));
  }
  const blocks = [lesson.whyItMatters, ...(lesson.concepts ?? []).map((item) => item.meaning), ...(lesson.steps ?? []).flatMap((step) => [step.instruction, step.explanation, step.expectedResult, step.warning, step.tip]), lesson.practice?.scenario, lesson.practice?.task, lesson.practice?.successSignal];
  for (const block of blocks.filter(Boolean)) if (block.length > 420) errors.push(issue(file, 'bloque de texto excede 420 caracteres'));
  if (/placeholder|imagen\s+aqu[ií]/i.test(JSON.stringify(lesson))) errors.push(issue(file, 'contiene placeholder prohibido'));
  return errors;
}

const index = process.argv.indexOf('--lesson');
const target = index >= 0 ? `${process.argv[index + 1]}.json` : null;
const files = target ? [join(lessonsDir, target)] : readdirSync(lessonsDir).filter((file) => file.endsWith('.json')).map((file) => join(lessonsDir, file));
const errors = files.flatMap((file) => existsSync(file) ? validate(file) : [issue(file, 'archivo no existe')]);
if (errors.length) { console.error(`VALIDACIÓN FALLÓ (${errors.length})\n${errors.map((error) => `- ${error}`).join('\n')}`); process.exit(1); }
console.log(`VALIDACIÓN OK: ${files.length} lección(es), assets en ${assetsDir}`);
