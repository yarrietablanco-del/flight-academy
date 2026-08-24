import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { homedir } from 'node:os';

const root = process.cwd();
const curriculumPath = join(root, 'curriculum', 'curriculum.json');
const curriculum = JSON.parse(readFileSync(curriculumPath, 'utf8'));
const lessons = curriculum.levels.flatMap((level) => level.modules.flatMap((module) => module.lessons.map((lesson) => ({ ...lesson, level: level.level, module: module.module }))));
const requested = process.argv.indexOf('--lesson');
const editoriallyReady = new Set(['validated', 'published']);
const next = requested >= 0
  ? lessons.find((lesson) => lesson.id === process.argv[requested + 1])
  : lessons
    .filter((lesson) => lesson.status === 'planned')
    .filter((lesson) => lesson.prerequisites.every((id) => editoriallyReady.has(lessons.find((item) => item.id === id)?.status)))
    .sort((a, b) => a.order - b.order)[0];
if (!next) { console.log('No hay lecciones planned.'); process.exit(0); }
if (next.status !== 'planned') { console.error(`${next.id} no está planned.`); process.exit(1); }
const context = lessons.filter((lesson) => next.prerequisites.includes(lesson.id)).map((lesson) => ({ id: lesson.id, title: lesson.title, objective: lesson.objective }));
const prompt = `Trabaja en ${root}. Lee AGENTS.md, authoring/AUTHORING_RULES.md y authoring/lesson-schema.json. Genera SOLO content/lessons/${next.id}.json y los SVG pedagógicos exactos que hagan falta en content/assets/. Lección editorial: ${JSON.stringify(next)}. Contexto de prerrequisitos: ${JSON.stringify(context)}. El JSON debe pasar node authoring/validate-content.mjs --lesson ${next.id}. No uses placeholders; para hardware/cabina/cartas sin fuente marca visual.requiresReference=true. No cambies UI, package ni curriculum.`;
const resolvedHome = process.env.HOME || process.env.USERPROFILE || homedir();
if (!resolvedHome) throw new Error('No se pudo resolver HOME, USERPROFILE ni os.homedir().');
const childEnv = {
  ...process.env,
  HOME: resolvedHome,
  USERPROFILE: process.env.USERPROFILE || resolvedHome,
  // Conserva la sesión de Codex ya autenticada bajo el home del usuario.
  CODEX_HOME: process.env.CODEX_HOME || join(resolvedHome, '.codex'),
};

function resolveCodexExecutable() {
  if (process.platform !== 'win32') return { command: 'codex', args: [], display: 'codex' };
  const found = spawnSync('where.exe', ['codex.cmd'], { cwd: root, env: childEnv, encoding: 'utf8' });
  const globalRoot = spawnSync('npm.cmd', ['root', '-g'], { cwd: root, env: childEnv, encoding: 'utf8' });
  const packageRoots = [globalRoot.stdout?.trim(), process.env.APPDATA ? join(process.env.APPDATA, 'npm', 'node_modules') : ''].filter(Boolean);
  for (const packageRoot of packageRoots) {
    const nodeEntry = join(packageRoot, '@openai', 'codex', 'bin', 'codex.js');
    if (existsSync(nodeEntry)) return { command: process.execPath, args: [nodeEntry], display: `${process.execPath} ${nodeEntry}` };
  }
  const npmCandidate = packageRoots[0] ? join(dirname(packageRoots[0]), 'codex.cmd') : '';
  throw new Error(`Se encontró ${npmCandidate || 'ningún lanzador'} pero falta la entrada ejecutable de Codex. where stderr: ${(found.stderr || '').trim() || '(vacío)'}; npm root -g stderr: ${(globalRoot.stderr || '').trim() || '(vacío)'}`);
}

const codexExecutable = resolveCodexExecutable();
function run(instruction) {
  console.log(`[authoring] ruta de proyecto: ${root}`);
  console.log(`[authoring] home resuelto: ${resolvedHome}`);
  console.log(`[authoring] CODEX_HOME: ${childEnv.CODEX_HOME}`);
  console.log(`[authoring] ejecutable Codex: ${codexExecutable.display}`);
  const result = spawnSync(codexExecutable.command, [...codexExecutable.args, 'exec', '-C', root, instruction], {
    cwd: root,
    env: childEnv,
    encoding: 'utf8',
  });
  if (result.stdout) process.stdout.write(result.stdout);
  if (result.stderr) process.stderr.write(result.stderr);
  console.log(`[authoring] exit code: ${result.status ?? 'sin código'}`);
  if (result.error) console.error(`[authoring] error de proceso: ${result.error.message}`);
  if (result.status !== 0 && result.stderr) console.error(`[authoring] stderr: ${result.stderr.trim()}`);
  return result;
}
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
