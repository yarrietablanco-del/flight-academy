import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { basename, join } from 'node:path';

const root = process.cwd();
const lessonsDir = join(root, 'content', 'lessons');
const assetsDir = join(root, 'content', 'assets');
const maxBlock = 420;
const required = ['metadata', 'whyItMatters', 'concepts', 'steps', 'practice', 'commonMistakes', 'checklist', 'quiz', 'completionCriteria', 'sources'];
const stepRequired = ['number', 'title', 'instruction', 'explanation', 'expectedResult', 'visual', 'simulatorAction'];
const issue = (file, message) => `${basename(file)}: ${message}`;

function validate(file) {
  const errors = [];
  let lesson;
  try { lesson = JSON.parse(readFileSync(file, 'utf8')); } catch { return [issue(file, 'JSON inválido')]; }
  for (const key of required) if (!lesson[key] || (Array.isArray(lesson[key]) && lesson[key].length === 0)) errors.push(issue(file, `falta ${key}`));
  for (const key of ['id', 'title', 'subtitle', 'objective', 'estimatedTime', 'prerequisites', 'level', 'module']) if (lesson.metadata?.[key] === undefined || lesson.metadata?.[key] === '') errors.push(issue(file, `metadata.${key} falta`));
  const blocks = [lesson.whyItMatters, ...(lesson.concepts ?? []).map((item) => item.meaning), ...(lesson.steps ?? []).flatMap((step) => [step.instruction, step.explanation, step.expectedResult, step.warning, step.tip]), lesson.practice?.scenario, lesson.practice?.task, lesson.practice?.successSignal];
  for (const block of blocks.filter(Boolean)) if (block.length > maxBlock) errors.push(issue(file, `bloque de texto excede ${maxBlock} caracteres`));
  for (const step of lesson.steps ?? []) {
    for (const key of stepRequired) if (step[key] === undefined || step[key] === '') errors.push(issue(file, `paso ${step.number ?? '?'} sin ${key}`));
    const visual = step.visual;
    if (visual && !visual.requiresReference && !visual.asset) errors.push(issue(file, `paso ${step.number} requiere asset visual o requiresReference:true`));
    if (visual?.asset && !existsSync(join(root, visual.asset))) errors.push(issue(file, `asset visual inexistente: ${visual.asset}`));
  }
  const text = JSON.stringify(lesson).toLowerCase();
  const forbidden = [
    ['TODO', /(^|[^a-záéíóúñ])todo([^a-záéíóúñ]|$)/i],
    ['imagen aquí', /imagen\s+aqu[ií]/i],
    ['placeholder', /placeholder/i],
  ];
  for (const [marker, expression] of forbidden) if (expression.test(text)) errors.push(issue(file, `contiene placeholder prohibido: ${marker}`));
  if (text.includes('no verificado') && !text.includes('requiresreference')) errors.push(issue(file, 'dato no verificado sin requiresReference:true'));
  return errors;
}

const lessonArg = process.argv.indexOf('--lesson');
const target = lessonArg >= 0 ? `${process.argv[lessonArg + 1]}.json` : null;
const files = target ? [join(lessonsDir, target)] : readdirSync(lessonsDir).filter((file) => file.endsWith('.json')).map((file) => join(lessonsDir, file));
const errors = files.flatMap((file) => existsSync(file) ? validate(file) : [issue(file, 'archivo no existe')]);
if (errors.length) { console.error(`VALIDACIÓN FALLÓ (${errors.length})\n${errors.map((error) => `- ${error}`).join('\n')}`); process.exit(1); }
console.log(`VALIDACIÓN OK: ${files.length} lección(es), assets en ${assetsDir}`);
