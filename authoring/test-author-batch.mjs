import assert from 'node:assert/strict';
import { EventEmitter } from 'node:events';
import { runBatch, runChildWithTimeout, selectNextLesson } from './author-batch.mjs';
const curriculum = (items) => ({ levels: [{ modules: [{ lessons: items.map((item) => ({ prerequisites: [], ...item })) }] }] });
async function exercise(items, outcomes, count = 5) {
  let state = curriculum(items); const logs = [];
  const summary = await runBatch({ root: 'mock-root', count, timeoutMs: 1, timeoutMinutes: 20, readCurriculum: () => state, writeCurriculum: (_, value) => { state = value; }, log: (line) => logs.push(line), errorLog: (line) => logs.push(line), runChild: async ({ args }) => {
    const id = args.at(-1); const outcome = outcomes[id]; if (outcome === 'ok') state.levels[0].modules[0].lessons.find((lesson) => lesson.id === id).status = 'validated';
    if (outcome === 'timeout') return { timedOut: true, code: null, stderr: '' }; if (outcome === 'error') return { timedOut: false, code: 17, stderr: 'Codex failed' }; return { timedOut: false, code: 0, stderr: '' };
  } }); return { state, summary, logs };
}
assert.equal(selectNextLesson(curriculum([{ id: 'done', order: 1, status: 'validated' }, { id: 'next', order: 2, status: 'planned', prerequisites: ['done'] }])).id, 'next');
assert.equal(selectNextLesson(curriculum([{ id: 'blocked', order: 1, status: 'planned', prerequisites: ['missing'] }])), undefined);
let result = await exercise([{ id: 'a', order: 1, status: 'planned' }, { id: 'b', order: 2, status: 'planned', prerequisites: ['a'] }], { a: 'ok', b: 'ok' }, 2);
assert.deepEqual(result.summary.validated, ['a', 'b']); assert.deepEqual(result.summary.pending, []);
assert.equal(result.summary.completed.length, 2);
result = await exercise([{ id: 'a', order: 1, status: 'planned' }, { id: 'b', order: 2, status: 'planned' }], { a: 'timeout', b: 'ok' }, 2);
assert.deepEqual(result.summary.timeout, ['a']); assert.deepEqual(result.summary.validated, ['b']); assert.equal(result.state.levels[0].modules[0].lessons[0].status, 'planned'); assert.ok(result.logs.some((line) => line.includes('TIMEOUT después de 20 min')));
result = await exercise([{ id: 'done', order: 1, status: 'validated' }, { id: 'a', order: 2, status: 'planned' }, { id: 'b', order: 3, status: 'planned' }], { a: 'error', b: 'ok' }, 2);
assert.deepEqual(result.summary.failed, ['a']); assert.deepEqual(result.summary.validated, ['b']); assert.equal(result.state.levels[0].modules[0].lessons.find((lesson) => lesson.id === 'a').status, 'planned'); assert.ok(result.logs.some((line) => line.includes('exit code 17')));
result = await exercise([{ id: 'done', order: 1, status: 'published' }, { id: 'resume', order: 2, status: 'planned' }], { resume: 'ok' }, 2);
assert.deepEqual(result.summary.validated, ['resume']); assert.deepEqual(result.summary.pending, []); console.log('author-batch tests passed');

const spawned = []; const child = new EventEmitter(); child.pid = 4242; child.stderr = new EventEmitter();
const timeoutResult = await runChildWithTimeout({ command: 'node', args: [], options: {}, timeoutMs: 1, platform: 'win32', spawnProcess: (command, args) => {
  spawned.push([command, args]);
  if (command === 'taskkill.exe') { const killer = new EventEmitter(); setImmediate(() => child.emit('close', 1)); return killer; }
  return child;
} });
assert.equal(timeoutResult.timedOut, true);
assert.deepEqual(spawned[1], ['taskkill.exe', ['/pid', '4242', '/T', '/F']]);
