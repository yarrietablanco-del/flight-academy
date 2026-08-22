import { spawnSync } from 'node:child_process';
const count = Number(process.argv[2] ?? 1);
if (!Number.isInteger(count) || count < 1) throw new Error('Uso: npm run author:batch -- <cantidad positiva>');
for (let index = 0; index < count; index += 1) {
  const result = spawnSync(process.execPath, ['authoring/author-next.mjs'], { cwd: process.cwd(), stdio: 'inherit' });
  if (result.status !== 0) process.exit(result.status || 1);
}
