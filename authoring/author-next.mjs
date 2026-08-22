import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const curriculumPath = join(root, 'curriculum', 'curriculum.json');
const curriculum = JSON.parse(readFileSync(curriculumPath, 'utf8'));
const lessons = curriculum.levels.flatMap((level) => level.modules.flatMap((module) => module.lessons.map((lesson) => ({ ...lesson, level: level.level, module: module.module }))));
const requested = process.argv.indexOf('--lesson');
const next = requested >= 0 ? lessons.find((lesson) => lesson.id === process.argv[requested + 1]) : lessons.find((lesson) => lesson.status === 'planned');
if (!next) { console.log('No hay lecciones planned.'); process.exit(0); }
if (next.status !== 'planned') { console.error(`${next.id} no está planned.`); process.exit(1); }
const context = lessons.filter((lesson) => next.prerequisites.includes(lesson.id)).map((lesson) => ({ id: lesson.id, title: lesson.title, objective: lesson.objective }));
const prompt = `Trabaja en ${root}. Lee AGENTS.md, authoring/AUTHORING_RULES.md y authoring/lesson-schema.json. Genera SOLO content/lessons/${next.id}.json y los SVG pedagógicos exactos que hagan falta en content/assets/. Lección editorial: ${JSON.stringify(next)}. Contexto de prerrequisitos: ${JSON.stringify(context)}. El JSON debe pasar node authoring/validate-content.mjs --lesson ${next.id}. No uses placeholders; para hardware/cabina/cartas sin fuente marca visual.requiresReference=true. No cambies UI, package ni curriculum.`;
// En Windows npm instala el lanzador .cmd; evita depender de la política de scripts de PowerShell.
const codexCommand = process.platform === 'win32' ? 'codex.cmd' : 'codex';
const run = (instruction) => spawnSync(codexCommand, ['exec', instruction], { cwd: root, stdio: 'inherit' });
let result = run(prompt);
if (result.status !== 0 || !existsSync(join(root, 'content', 'lessons', `${next.id}.json`))) process.exit(result.status || 1);
for (const level of curriculum.levels) for (const module of level.modules) { const lesson = module.lessons.find((item) => item.id === next.id); if (lesson) lesson.status = 'generated'; }
writeFileSync(curriculumPath, `${JSON.stringify(curriculum, null, 2)}\n`);
result = spawnSync(process.execPath, ['authoring/validate-content.mjs', '--lesson', next.id], { cwd: root, stdio: 'inherit' });
if (result.status !== 0) {
  result = run(`${prompt}\nLa primera validación falló. Corrige exclusivamente la lección y assets; vuelve a ejecutar node authoring/validate-content.mjs --lesson ${next.id}.`);
  if (result.status !== 0) process.exit(result.status || 1);
  result = spawnSync(process.execPath, ['authoring/validate-content.mjs', '--lesson', next.id], { cwd: root, stdio: 'inherit' });
  if (result.status !== 0) process.exit(result.status || 1);
}
next.status = 'validated';
for (const level of curriculum.levels) for (const module of level.modules) { const lesson = module.lessons.find((item) => item.id === next.id); if (lesson) lesson.status = 'validated'; }
writeFileSync(curriculumPath, `${JSON.stringify(curriculum, null, 2)}\n`);
console.log(`Lección validada: ${next.id}. El renderer Vite la descubre automáticamente.`);
