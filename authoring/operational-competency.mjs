const operationalWords = /carta|chart|mapa|airport|aeropuerto|taxi|interfaz|efb|g1000|instrumento|pantalla|cockpit|hardware|sid|star|ils|rnav|mcdu|fcu|ecam|procedimiento/i;
const deferredWords = /más adelante|lo veremos|se verá después|consulta el poh|según la variante/i;

const normalize = (value) => String(value ?? '')
  .normalize('NFD')
  .replace(/\p{Diacritic}/gu, '')
  .toLowerCase()
  .replace(/\s+/g, ' ')
  .trim();

function lessonTextWithoutVerification(lesson) {
  const competency = lesson.operationalCompetency ?? {};
  return normalize(JSON.stringify({
    ...lesson,
    operationalCompetency: { ...competency, sourceVerification: undefined },
  }));
}

export function validateOperationalCompetency(lesson, options = {}) {
  const errors = [];
  const competency = lesson.operationalCompetency;
  if (!competency) return ['falta operationalCompetency Standard 1.1.'];
  if (typeof competency.competencyObjective !== 'string' || competency.competencyObjective.trim().length < 24) errors.push('competencyObjective debe describir una acción observable.');
  if (!Array.isArray(competency.competencyEvidence) || competency.competencyEvidence.length === 0) errors.push('falta competencyEvidence observable.');

  const needsReference = operationalWords.test(`${competency.competencyObjective} ${lesson.metadata?.title ?? ''}`);
  const references = (lesson.steps ?? [])
    .flatMap((step) => [step.visual, ...(step.referenceVisuals ?? [])])
    .filter((visual) => visual?.visualCategory === 'reference' && visual.asset && ['real', 'recreated-faithful'].includes(visual.fidelity));
  if (needsReference && references.length === 0) errors.push('competencia operacional sin referenceVisual real o recreated-faithful.');

  if (needsReference) {
    const transfer = competency.transferExercise;
    if (!transfer || !['scenario', 'task', 'expectedCompetency', 'successCriteria'].every((key) => typeof transfer[key] === 'string' && transfer[key].trim().length >= 16)) errors.push('competencia operacional sin transferExercise evaluable.');
    const coverage = (lesson.steps ?? []).flatMap((step) => step.requiredVisualCoverage ?? []);
    if (coverage.some((item) => item.status === 'notRequired' && operationalWords.test(item.reason ?? ''))) errors.push('notRequired no puede ocultar una referencia operacional necesaria.');
  }

  const text = JSON.stringify(lesson);
  if (deferredWords.test(text) && (!Array.isArray(competency.futureLearningTargets) || competency.futureLearningTargets.length === 0)) errors.push('tema diferido sin futureLearningTargets.');

  const verification = competency.sourceVerification;
  if (verification && typeof verification === 'object') {
    const contentText = lessonTextWithoutVerification(lesson);
    for (const fact of verification.requiredFacts ?? []) {
      if (!contentText.includes(normalize(fact))) errors.push(`${lesson.metadata?.id ?? 'lección'}: falta hecho verificado en contenido: ${fact}`);
    }
    for (const claim of verification.prohibitedClaims ?? []) {
      if (contentText.includes(normalize(claim))) errors.push(`${lesson.metadata?.id ?? 'lección'}: contiene afirmación prohibida: ${claim}`);
    }

    if (Array.isArray(verification.assetFacts)) {
      if (typeof options.readAsset !== 'function') {
        errors.push(`${lesson.metadata?.id ?? 'lección'}: sourceVerification requiere readAsset para comprobar assets.`);
      } else {
        for (const spec of verification.assetFacts) {
          let assetText = '';
          try {
            assetText = normalize(options.readAsset(spec.asset));
          } catch (error) {
            errors.push(`${lesson.metadata?.id ?? 'lección'}: no se pudo leer asset ${spec.asset}: ${error.message}`);
            continue;
          }
          for (const fact of spec.requiredFacts ?? []) {
            if (!assetText.includes(normalize(fact))) errors.push(`${lesson.metadata?.id ?? 'lección'}: asset ${spec.asset} omite hecho verificado: ${fact}`);
          }
          for (const claim of spec.prohibitedClaims ?? []) {
            if (assetText.includes(normalize(claim))) errors.push(`${lesson.metadata?.id ?? 'lección'}: asset ${spec.asset} contiene afirmación prohibida: ${claim}`);
          }
        }
      }
    }
  }

  return errors;
}
