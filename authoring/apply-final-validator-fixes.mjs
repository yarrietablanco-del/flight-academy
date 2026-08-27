import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const ids = ['vor-dme', 'g1000-gps', 'g1000-autopilot', 'a320-displays-fcu', 'a320-mcdu-performance'];
const generatedAssets = new Set([
  'content/assets/g1000-nxi-c172-controls-reference.svg',
  'content/assets/a320-v2-displays-fcu-reference.svg',
  'content/assets/a320-v2-mcdu-perf-reference.svg'
]);

for (const id of ids) {
  const path = join(root, 'content', 'lessons', `${id}.json`);
  const lesson = JSON.parse(readFileSync(path, 'utf8'));
  for (const step of lesson.steps ?? []) {
    for (const visual of [step.visual, ...(step.referenceVisuals ?? [])].filter(Boolean)) {
      if (generatedAssets.has(visual.asset)) visual.primaryTeachingObjective = 'Reconocer referencia';
    }
  }
  if (id === 'a320-mcdu-performance') {
    const step2 = (lesson.steps ?? []).find((item) => item.number === 2);
    if (step2) {
      step2.instruction = step2.instruction.replace(/ Para despegue, incluye V1, VR y V2 únicamente cuando provengan[\s\S]*$/i, '');
      step2.tip = 'V1, VR y V2 se verifican desde la fuente de performance del mismo escenario; no se reutilizan valores de otro vuelo.';
    }
  }
  writeFileSync(path, `${JSON.stringify(lesson, null, 2)}\n`);
}
console.log('Final schema normalizations applied.');
