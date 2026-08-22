import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const curriculum = JSON.parse(readFileSync(join(root, 'curriculum', 'curriculum.json'), 'utf8'));
const allowed = new Set(['planned', 'generated', 'validated', 'published']);
const ids = new Set();
const errors = [];

for (const level of curriculum.levels ?? []) {
  if (!Number.isInteger(level.level)) errors.push('Nivel sin número entero.');
  for (const module of level.modules ?? []) for (const lesson of module.lessons ?? []) {
    for (const key of ['id', 'order', 'title', 'objective', 'prerequisites', 'status']) if (lesson[key] === undefined || lesson[key] === '') errors.push(`${lesson.id ?? 'lección'}: falta ${key}.`);
    if (ids.has(lesson.id)) errors.push(`ID duplicado: ${lesson.id}.`);
    ids.add(lesson.id);
    if (!allowed.has(lesson.status)) errors.push(`${lesson.id}: estado editorial inválido ${lesson.status}.`);
    const file = join(root, 'content', 'lessons', `${lesson.id}.json`);
    if (lesson.status !== 'planned' && !existsSync(file)) errors.push(`${lesson.id}: estado ${lesson.status} sin documento de lección.`);
    if (existsSync(file)) {
      const document = JSON.parse(readFileSync(file, 'utf8'));
      if (document.metadata?.id !== lesson.id) errors.push(`${lesson.id}: metadata.id no coincide.`);
    }
  }
}

if (errors.length) { console.error(`PRUEBA DEL MOTOR FALLÓ (${errors.length})\n${errors.map((error) => `- ${error}`).join('\n')}`); process.exit(1); }
console.log(`PRUEBA DEL MOTOR OK: ${ids.size} lecciones en el currículo; todas las lecciones editoriales tienen documento.`);
