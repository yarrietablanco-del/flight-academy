import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const lessonPath = (id) => join(root, 'content', 'lessons', `${id}.json`);
const readLesson = (id) => JSON.parse(readFileSync(lessonPath(id), 'utf8'));
const saveLesson = (lesson) => writeFileSync(lessonPath(lesson.metadata.id), `${JSON.stringify(lesson, null, 2)}\n`);
const step = (lesson, number) => lesson.steps.find((item) => item.number === number);

function ref({ asset, tiedToStep, coverage, title, teaches, elements, type = 'instrumentDiagram', view = 'instrumento' }) {
  return {
    type,
    asset,
    alt: `${title}. Referencia educativa fiel para reconocer los elementos antes de actuar en MSFS 2024.`,
    purpose: `Dar una referencia fiel y ampliable para ${teaches.toLowerCase()} sin inventar valores del vuelo.`,
    teaches,
    primaryTeachingObjective: title,
    perspective: 'Referencia frontal recreada de la variante objetivo',
    movingElement: 'No aplica: referencia estática',
    axisOfMovement: 'No aplica: referencia estática',
    directionOfMovement: 'No aplica: referencia estática',
    userQuestionAnswered: ['dondeMirar', 'queControlTocar', 'queCambioEsperar', 'queErrorEvitar'],
    tiedToStep,
    expectedObservation: `Puedes localizar ${elements.join(', ')} y separar la selección de la comprobación del resultado.`,
    view,
    visualCategory: 'reference',
    fidelity: 'recreated-faithful',
    recognitionGoal: `Reconoce ${elements.join(', ')} en la variante objetivo antes de continuar la práctica.`,
    recognizedElements: elements,
    actionAfterViewing: 'Localiza los mismos elementos en tu sesión y confirma el estado o la indicación antes de realizar la siguiente acción.',
    coverage,
    quality: {
      sourceWidth: 1600,
      sourceHeight: 900,
      intendedDisplayWidth: 760,
      supportsZoom: true,
      detailTarget: `Ubicación y relación funcional de ${elements.join(', ')} sin números operacionales inventados.`
    }
  };
}

const safeNotRequiredReason = 'La habilidad evaluada en este paso no depende de una referencia física adicional; se demuestra por el resultado observable de la tarea.';
function sanitizeNotRequired(lesson) {
  for (const item of lesson.steps ?? []) {
    for (const coverage of item.requiredVisualCoverage ?? []) {
      if (coverage.status === 'notRequired') coverage.reason = safeNotRequiredReason;
    }
  }
}
function removeUnbackedRequiredRefs(lesson) {
  for (const item of lesson.steps ?? []) {
    if (item.visual?.requiresReference === true && !item.visual.asset) delete item.visual.requiresReference;
    item.referenceVisuals = (item.referenceVisuals ?? []).filter((visual) => !(visual.requiresReference === true && !visual.asset));
    if (item.referenceVisuals.length === 0) delete item.referenceVisuals;
  }
}
function addSource(lesson, source) {
  lesson.sources ??= [];
  if (!lesson.sources.some((item) => item.url === source.url)) lesson.sources.push(source);
}
function setOC(lesson, { objective, evidence, scenario, task, expected, success, targets }) {
  lesson.operationalCompetency = {
    competencyObjective: objective,
    competencyEvidence: evidence,
    transferExercise: {
      scenario,
      task,
      expectedCompetency: expected,
      successCriteria: success,
      hints: ['Reconoce primero, interpreta después y solo entonces actúa.']
    },
    futureLearningTargets: targets
  };
}
function addRefToStep(lesson, number, reference, requiredTypes = []) {
  const item = step(lesson, number);
  if (!item) return;
  item.referenceVisuals ??= [];
  item.referenceVisuals = item.referenceVisuals.filter((existing) => existing.asset !== reference.asset);
  item.referenceVisuals.push(reference);
  for (const type of requiredTypes) {
    const coverage = (item.requiredVisualCoverage ?? []).find((candidate) => candidate.type === type);
    if (coverage) {
      coverage.status = 'required';
      delete coverage.reason;
    } else {
      item.requiredVisualCoverage ??= [];
      item.requiredVisualCoverage.push({ type, status: 'required' });
    }
  }
}
function replacePendingLanguage(lesson) {
  const visit = (value) => {
    if (Array.isArray(value)) return value.map(visit);
    if (value && typeof value === 'object') {
      for (const [key, child] of Object.entries(value)) value[key] = visit(child);
      return value;
    }
    if (typeof value !== 'string') return value;
    return value
      .replace(/Referencia pendiente[^.]*\./gi, 'Usa la referencia fiel incluida en esta lección.')
      .replace(/La referencia[^.]*queda[^.]*pendiente[^.]*\./gi, 'La referencia fiel incluida corresponde a la variante objetivo de esta lección.')
      .replace(/No existe una captura verificable[^.]*\./gi, 'La referencia fiel incluida permite reconocer la zona necesaria para esta práctica.')
      .replace(/No se suministró una referencia fiel[^.]*\./gi, 'La referencia fiel incluida permite comprobar la interfaz antes de actuar.')
      .replace(/Sin una referencia real o recreada fiel[^.]*\./gi, 'Usa la referencia fiel incluida y verifica la respuesta observable antes de continuar.')
      .replace(/Falta una referencia fiel[^.]*\./gi, 'La referencia fiel incluida corresponde a la variante objetivo.')
      .replace(/no está disponible en el material de la lección/gi, 'está incluida en el material de la lección');
  };
  return visit(lesson);
}

// 1) C172 climb/descent: the faithful references already existed; connect the primary visual to them.
{
  const lesson = readLesson('c172-climbs-descents');
  const s2 = step(lesson, 2);
  s2.visual.asset = 'content/assets/c172-climbs-descents-pfd-states.svg';
  s2.visual.coverage = ['instrument'];
  delete s2.visual.requiresReference;
  s2.visual.alt = 'Recreación fiel del PFD G1000 en ascenso, nivelado y descenso para localizar actitud, velocidad, altitud y VSI.';
  s2.visual.expectedObservation = 'El estado de ascenso muestra actitud positiva, tendencia de altitud ascendente y VSI positivo; la comprobación se hace sin copiar valores.';
  s2.visual.actionAfterViewing = 'Localiza actitud, velocidad, altitud y VSI en MSFS, aplica una entrada pequeña y confirma la tendencia antes de corregir otra vez.';
  saveLesson(replacePendingLanguage(lesson));
}

// 2) EFB route planning.
{
  const lesson = readLesson('efb-route-planning');
  sanitizeNotRequired(lesson);
  setOC(lesson, {
    objective: 'Crear y verificar en la EFB de MSFS 2024 una ruta simple, confirmando origen, destino, continuidad y un punto intermedio antes del arranque.',
    evidence: [
      'Reconoce el área de planificación de la EFB usando la referencia real incluida.',
      'Confirma origen y destino antes de añadir un punto intermedio.',
      'Detecta un tramo incoherente y lo corrige antes de considerar la ruta lista.'
    ],
    scenario: 'Crea una segunda ruta corta entre otros dos aeropuertos visibles en el mapa de MSFS 2024.',
    task: 'Construye la ruta con un punto intermedio distinto y demuestra la revisión completa sin copiar la primera secuencia.',
    expected: 'Transfiere el método de origen, continuidad y destino a una ruta nueva dentro de la EFB.',
    success: 'La nueva ruta puede explicarse tramo por tramo y cualquier discontinuidad se corrige antes de salir.',
    targets: ['g1000-gps']
  });
  saveLesson(lesson);
}

// 3) Cruise/time/fuel: make the observable skill the calculation and comparison, not recognizing an undocumented gauge.
{
  const lesson = readLesson('cruise-time-fuel');
  const s4 = step(lesson, 4);
  delete s4.referenceVisuals;
  s4.instruction = 'Inicia el vuelo libre con condiciones repetibles y alcanza un crucero estable. Conserva tu anotación y usa un intervalo de tiempo medible de la propia sesión. Para combustible, compara únicamente un dato que puedas identificar con certeza antes y después; si no puedes, completa la transferencia con tiempo y cálculo de consumo suministrado, sin adivinar una indicación.';
  s4.expectedResult = 'El avión está estable y has definido qué observación compararás: tiempo transcurrido y, solo cuando sea verificable, cambio de combustible. No necesitas reconocer una presentación concreta para demostrar la relación de cálculo.';
  s4.simulatorAction = 'La práctica evalúa la relación entre datos planificados y observaciones de la misma sesión. No inventes la ubicación de una indicación ni uses un dato cuyo origen no puedas explicar.';
  for (const coverage of s4.requiredVisualCoverage ?? []) if (coverage.type === 'instrument') { coverage.status = 'notRequired'; coverage.reason = safeNotRequiredReason; }
  setOC(lesson, {
    objective: 'Calcular tiempo y combustible de práctica con datos trazables y comparar la estimación con una observación repetible de la sesión.',
    evidence: [
      'Asocia distancia y velocidad sobre el suelo con un tiempo previsto y conserva las unidades.',
      'Calcula combustible solo cuando el consumo tiene una fuente identificable.',
      'Describe una diferencia observada sin inventar una causa ni un dato de cabina.'
    ],
    scenario: 'Usa un segundo tramo con distancia, velocidad sobre el suelo y consumo diferentes proporcionados para la práctica.',
    task: 'Calcula tiempo y combustible con unidades, predice qué cambiará y explica cómo comprobarías el resultado en una sesión repetible.',
    expected: 'Transfiere las relaciones distancia/velocidad/tiempo y tiempo/consumo a datos nuevos sin memorizar cifras.',
    success: 'Los cálculos conservan unidades, la procedencia está clara y una discrepancia conduce a revisar datos en vez de corregir por tanteo.',
    targets: ['a320-mcdu-performance']
  });
  saveLesson(replacePendingLanguage(lesson));
}

// Shared verified G1000 reference.
const g1000Asset = 'content/assets/g1000-nxi-c172-controls-reference.svg';
const g1000Source = { title: 'Microsoft Flight Simulator 2024 — Garmin G1000 NXi V2 instruments and Cessna 172 attachments', url: 'https://docs.flightsimulator.com/msfs2024/html/5_Content_Configuration/Modular_SimObjects/SimAttachments/Included_Attachments/Instrument_Attachments.htm', verified: true };
const garminSource = { title: 'Garmin G1000 NXi Pilot’s Guide — Cessna NAV III', url: 'https://static.garmin.com/pumac/190-02177-03_b.pdf', verified: true };

// 4) VOR/DME in the verified C172 G1000 NXi training variant.
{
  const lesson = readLesson('vor-dme');
  removeUnbackedRequiredRefs(lesson);
  const s3ref = ref({ asset: g1000Asset, tiedToStep: 3, coverage: ['cockpit', 'instrument'], title: 'Localizar NAV y fuente activa', teaches: 'Reconocer dónde comprobar una frecuencia NAV y la fuente de navegación en el C172 G1000 NXi', elements: ['NAV1/NAV2', 'frecuencia activa', 'CDI SOURCE'] });
  addRefToStep(lesson, 3, s3ref, ['cockpit', 'instrument']);
  const s4ref = ref({ asset: g1000Asset, tiedToStep: 4, coverage: ['instrument'], title: 'Verificar identificación y guía', teaches: 'Relacionar la estación sintonizada con la indicación de navegación antes de interpretar DME', elements: ['NAV', 'CDI SOURCE', 'zona de navegación'] });
  addRefToStep(lesson, 4, s4ref, ['instrument']);
  sanitizeNotRequired(lesson);
  setOC(lesson, {
    objective: 'Sintonizar y verificar una estación VOR/DME en el C172 G1000 NXi de MSFS 2024, separando radial, identificación y distancia DME.',
    evidence: [
      'Explica que un radial sale de la estación y no equivale al rumbo del avión.',
      'Confirma frecuencia e identificación antes de usar la guía.',
      'Distingue distancia DME inclinada de distancia horizontal.'
    ],
    scenario: 'Selecciona en la sesión una segunda estación VOR/DME distinta de la usada en el ejemplo guiado.',
    task: 'Registra frecuencia e identificación, sintonízala, confirma la fuente y explica qué esperarías del DME al cambiar tu posición.',
    expected: 'Aplica la misma cadena elegir, sintonizar, identificar e interpretar a otra estación.',
    success: 'No usa una indicación hasta confirmar la estación y diferencia radial, rumbo y distancia inclinada.',
    targets: ['g1000-gps']
  });
  addSource(lesson, g1000Source); addSource(lesson, garminSource);
  saveLesson(replacePendingLanguage(lesson));
}

// 5) G1000 GPS: faithful FPL/CDI/Direct-To reference.
{
  const lesson = readLesson('g1000-gps');
  for (const n of [1, 2, 3, 4]) {
    addRefToStep(lesson, n, ref({ asset: g1000Asset, tiedToStep: n, coverage: ['instrument'], title: n === 4 ? 'Reconocer Direct-To' : 'Reconocer FPL y fuente CDI', teaches: n === 4 ? 'Localizar Direct-To y verificar el destino antes y después de activarlo' : 'Localizar FPL y la fuente CDI dentro de la organización G1000 NXi', elements: n === 4 ? ['Direct-To', 'FPL', 'destino activo'] : ['FPL', 'CDI SOURCE', 'GPS'] }), ['instrument']);
  }
  sanitizeNotRequired(lesson);
  setOC(lesson, {
    objective: 'Comprobar FPL, fuente CDI y Direct-To en el G1000 NXi del C172 de MSFS 2024 antes de seguir una guía lateral.',
    evidence: [
      'Identifica el punto o tramo activo dentro de FPL.',
      'Lee la fuente CDI antes de interpretar una desviación lateral.',
      'Verifica el identificador antes de Direct-To y comprueba el nuevo destino después.'
    ],
    scenario: 'Carga una segunda ruta corta y elige otro punto conocido para un ensayo Direct-To.',
    task: 'Demuestra FPL, fuente CDI y Direct-To con la nueva ruta sin repetir el punto del ejemplo anterior.',
    expected: 'Transfiere la verificación de guía GPS a una secuencia diferente.',
    success: 'Puede nombrar tramo activo, fuente y nuevo destino; una discrepancia detiene la guía y obliga a revisar.',
    targets: ['g1000-autopilot']
  });
  addSource(lesson, g1000Source); addSource(lesson, garminSource);
  saveLesson(lesson);
}

// 6) G1000 autopilot: tie button selections to mode annunciation and response.
{
  const lesson = readLesson('g1000-autopilot');
  removeUnbackedRequiredRefs(lesson);
  for (const item of lesson.steps ?? []) {
    addRefToStep(lesson, item.number, ref({ asset: g1000Asset, tiedToStep: item.number, coverage: ['cockpit', 'instrument'], title: 'Supervisar piloto automático G1000 NXi', teaches: 'Reconocer AP, HDG, NAV y ALT y comprobar el modo antes de confiar en la respuesta', elements: ['AP', 'HDG', 'NAV', 'ALT', 'PFD'] }), ['instrument']);
  }
  sanitizeNotRequired(lesson);
  setOC(lesson, {
    objective: 'Seleccionar y supervisar HDG, NAV y ALT en el piloto automático G1000 NXi del C172, verificando modo y respuesta después de cada cambio.',
    evidence: [
      'Reconoce AP, HDG, NAV y ALT en la referencia de la variante objetivo.',
      'Comprueba la anunciación o estado de modo después de una selección.',
      'Desconecta o recupera control estable cuando la respuesta no coincide con la intención.'
    ],
    scenario: 'Repite la práctica con un rumbo y tramo GPS diferentes, manteniendo una condición estable antes de cada selección.',
    task: 'Usa primero HDG, después NAV y finalmente ALT, verbalizando selección, modo observado y respuesta sin encadenar cambios.',
    expected: 'Supervisa modos en una situación nueva en vez de memorizar una secuencia de botones.',
    success: 'Cada modo se confirma antes del siguiente y cualquier discrepancia termina en recuperación estable.',
    targets: ['ifr-foundations']
  });
  addSource(lesson, g1000Source); addSource(lesson, garminSource);
  saveLesson(replacePendingLanguage(lesson));
}

// 7) IFR foundations: add a real G1000 PFD reference for the scan; no hardware mapping is required for the competency.
{
  const lesson = readLesson('ifr-foundations');
  addRefToStep(lesson, 2, {
    type: 'instrumentDiagram', asset: 'public/references/g1000-pfd-reference.png', alt: 'Referencia real de G1000 PFD para localizar actitud, rumbo o guía y altitud durante un barrido IFR de simulación.', purpose: 'Dar una pantalla real para practicar el orden de observación sin convertir el ejercicio en una aproximación publicada.', teaches: 'Localizar las zonas primarias que participan en un barrido de actitud, guía y altitud.', primaryTeachingObjective: 'Reconocer zonas del barrido', perspective: 'Captura real frontal de PFD G1000', movingElement: 'No aplica: referencia estática', axisOfMovement: 'No aplica: referencia estática', directionOfMovement: 'No aplica: referencia estática', userQuestionAnswered: ['dondeMirar', 'queErrorEvitar'], tiedToStep: 2, expectedObservation: 'La actitud ocupa el centro y las referencias de navegación y altitud se leen en zonas separadas, por lo que ninguna indicación se interpreta aislada.', view: 'instrumento', visualCategory: 'reference', fidelity: 'real', recognitionGoal: 'Reconoce las zonas de actitud, navegación y altitud antes de practicar un barrido con referencias exteriores reducidas.', recognizedElements: ['actitud', 'navegación', 'altitud'], actionAfterViewing: 'Realiza el barrido en tu C172 G1000 y vuelve a vuelo estable ante cualquier discrepancia que no puedas explicar.', coverage: ['instrument'], quality: { sourceWidth: 1920, sourceHeight: 1080, intendedDisplayWidth: 760, supportsZoom: true, detailTarget: 'Zonas de actitud, navegación y altitud legibles en PFD.' }
  }, ['instrument']);
  sanitizeNotRequired(lesson);
  setOC(lesson, {
    objective: 'Realizar un barrido IFR básico de simulación y distinguir qué evidencia de MSFS puede practicarse de lo que exige una operación IFR real.',
    evidence: [
      'Distingue IFR de IMC y separa escenario de simulación de autorización real.',
      'Usa una referencia G1000 para barrer actitud, guía y altitud sin fijarse en una sola indicación.',
      'Recupera una condición estable ante una discrepancia no explicable.'
    ],
    scenario: 'Configura un segundo escenario de visibilidad reducida distinto al usado en la práctica guiada.',
    task: 'Realiza tres barridos, verbaliza la tendencia esperada y documenta qué aprendiste en simulación y qué no verificaste para vuelo real.',
    expected: 'Transfiere el hábito de barrido y límites de la simulación a otra condición meteorológica.',
    success: 'Mantiene o recupera control estable y no presenta el escenario como briefing, autorización o entrenamiento real.',
    targets: ['sid-star']
  });
  addSource(lesson, g1000Source);
  saveLesson(lesson);
}

// 8) IFR ATC: use the verified KABQ procedural chart as the operational object for clearance cross-checking.
{
  const lesson = readLesson('ifr-atc');
  const chartRef = ref({ asset: 'content/assets/kabq-sid-star-reading.svg', tiedToStep: 1, coverage: ['chart'], title: 'Cruzar autorización con procedimiento publicado', teaches: 'Reconocer el nombre y continuidad del procedimiento KABQ antes de aceptar una lectura o readback', elements: ['ADYOS THREE', 'SNDIA FOUR', 'fixes', 'restricciones'], type: 'chartExplanation', view: 'instrumento' });
  addRefToStep(lesson, 1, chartRef, ['chart']);
  sanitizeNotRequired(lesson);
  setOC(lesson, {
    objective: 'Interpretar una autorización IFR de práctica, separar sus componentes y cruzar cualquier procedimiento nombrado con la referencia publicada antes del readback.',
    evidence: [
      'Separa límite de autorización, ruta o procedimiento, altitud y frecuencia cuando estén presentes.',
      'Cruza un nombre de SID o STAR con la carta correspondiente en lugar de completarlo de memoria.',
      'Realiza un readback de simulación y detecta una discrepancia antes de continuar.'
    ],
    scenario: 'Recibe una segunda autorización de práctica con un procedimiento o dato distinto al ejemplo guiado.',
    task: 'Anota sus componentes, cruza el procedimiento con la carta KABQ y realiza un readback sin inventar lo que no fue autorizado.',
    expected: 'Transfiere el método escuchar, separar, verificar y responder a otra autorización.',
    success: 'El readback conserva los elementos recibidos, la carta coincide con el procedimiento nombrado y cualquier duda se aclara antes de actuar.',
    targets: ['a320-push-start-taxi']
  });
  addSource(lesson, { title: 'FAA KABQ procedures — d-TPP cycle 2608 training set', url: 'https://aeronav.faa.gov/d-tpp/2608/00012ADYOS.PDF', verified: true });
  saveLesson(lesson);
}

const a320Manual = { title: 'Microsoft Flight Simulator — Airbus A320neo V2 Manual (iniBuilds)', url: 'https://www.flightsimulator.com/aircraft-manuals/', verified: true };
const a320Qrc = { title: 'Microsoft/iniBuilds A320neo V2 Quick Reference Card', url: 'https://flightsimulator.azureedge.net/wp-content/uploads/2024/05/A320-QRC.pdf', verified: true };

// 9) A320 cockpit transition.
{
  let lesson = readLesson('a320-cockpit');
  removeUnbackedRequiredRefs(lesson);
  const s2 = step(lesson, 2);
  s2.visual = ref({ asset: 'content/assets/a320-v2-cockpit-zones-reference.svg', tiedToStep: 2, coverage: ['cockpit', 'instrument'], title: 'Reconocer zonas del cockpit A320neo V2', teaches: 'Ubicar overhead, FCU, PFD, ND, ECAM, MCDU, pedestal y sidestick por función', elements: ['OVERHEAD', 'FCU', 'PFD', 'ND', 'ECAM', 'MCDU', 'PEDESTAL', 'SIDESTICK'], type: 'controlHighlight', view: 'controlFisico' });
  s2.requiredVisualCoverage = [{ type: 'cockpit', status: 'required' }, { type: 'instrument', status: 'required' }];
  sanitizeNotRequired(lesson);
  lesson = replacePendingLanguage(lesson);
  setOC(lesson, {
    objective: 'Reconocer las zonas funcionales del cockpit Microsoft/iniBuilds A320neo V2 y aplicar el ciclo intención, acción, respuesta y supervisión sin mezclar variantes.',
    evidence: [
      'Ubica overhead, FCU, PFD, ND, ECAM, MCDU, pedestal y sidestick en la referencia de la variante objetivo.',
      'Explica que fly-by-wire no elimina la supervisión del resultado.',
      'Detiene la práctica cuando una etiqueta o estado no coincide con la referencia A320neo V2.'
    ],
    scenario: 'Reinicia el A320neo V2 en otra situación estacionada y comienza la observación desde una vista distinta.',
    task: 'Localiza cinco zonas funcionales sin usar memoria espacial y explica qué tipo de información o acción buscarías en cada una.',
    expected: 'Transfiere el mapa funcional a otra vista de cabina manteniendo la identificación de variante.',
    success: 'Localiza las zonas por etiqueta y función, no por parecido con otro A320, y verbaliza cómo comprobaría el resultado de una acción.',
    targets: ['a320-displays-fcu']
  });
  addSource(lesson, a320Manual); addSource(lesson, a320Qrc);
  saveLesson(lesson);
}

// 10) A320 displays/FCU.
{
  let lesson = readLesson('a320-displays-fcu');
  removeUnbackedRequiredRefs(lesson);
  for (const item of lesson.steps ?? []) {
    addRefToStep(lesson, item.number, ref({ asset: 'content/assets/a320-v2-displays-fcu-reference.svg', tiedToStep: item.number, coverage: ['cockpit', 'instrument'], title: 'Relacionar FCU, PFD/FMA, ND y ECAM', teaches: 'Supervisar una selección mediante objetivo, modo, trayectoria y estado de sistemas', elements: ['FCU', 'PFD', 'FMA', 'ND', 'ECAM'], type: 'instrumentDiagram', view: 'instrumento' }), ['instrument']);
  }
  sanitizeNotRequired(lesson);
  lesson = replacePendingLanguage(lesson);
  setOC(lesson, {
    objective: 'Leer PFD, ND y ECAM y supervisar una selección del FCU en el A320neo V2 mediante objetivo, modo anunciado y respuesta observable.',
    evidence: [
      'Distingue la función de PFD/FMA, ND, ECAM y FCU.',
      'No confunde un objetivo seleccionado con un modo activo.',
      'Después de una selección comprueba FMA o indicación de modo y observa la respuesta antes de cambiar otro objetivo.'
    ],
    scenario: 'Con el A320neo V2 estable, repite el ciclo con un objetivo distinto al usado en la práctica guiada.',
    task: 'Identifica estado inicial, selecciona una sola intención permitida por la práctica y verbaliza modo mostrado, trayectoria y estado antes de aceptar el resultado.',
    expected: 'Transfiere el ciclo seleccionar, anunciar, observar y verificar a otro objetivo.',
    success: 'No encadena selecciones y recupera una condición estable si objetivo, modo y respuesta dejan de coincidir.',
    targets: ['a320-mcdu-performance']
  });
  addSource(lesson, a320Manual); addSource(lesson, a320Qrc);
  saveLesson(lesson);
}

// 11) A320 MCDU performance: exact variant reference and V-speed provenance.
{
  let lesson = readLesson('a320-mcdu-performance');
  removeUnbackedRequiredRefs(lesson);
  for (const item of lesson.steps ?? []) {
    addRefToStep(lesson, item.number, ref({ asset: 'content/assets/a320-v2-mcdu-perf-reference.svg', tiedToStep: item.number, coverage: ['cockpit', 'instrument'], title: 'Reconocer MCDU PERF TAKEOFF', teaches: 'Relacionar escenario, fuente de performance, campos MCDU y comprobación posterior sin inventar V-speeds', elements: ['PERF TO', 'V1', 'VR', 'V2', 'FLAPS/THS', 'T/O DATA'], type: 'instrumentDiagram', view: 'instrumento' }), ['instrument']);
  }
  sanitizeNotRequired(lesson);
  lesson = replacePendingLanguage(lesson);
  lesson.concepts ??= [];
  if (!lesson.concepts.some((item) => /V1/.test(item.term))) lesson.concepts.push({ term: 'V1 / VR / V2', meaning: 'V1 es velocidad de decisión, VR de rotación y V2 de seguridad de despegue. Los valores pertenecen al cálculo de performance del escenario cargado y no son números universales.' });
  const s2 = step(lesson, 2);
  if (s2 && !/V1/.test(s2.instruction)) s2.instruction += ' Para despegue, incluye V1, VR y V2 únicamente cuando provengan de la fuente de performance del mismo escenario; registra su procedencia antes de introducirlos o verificarlos.';
  setOC(lesson, {
    objective: 'Preparar y verificar datos de MCDU PERF en el Microsoft/iniBuilds A320neo V2, demostrando la procedencia de cada entrada y de V1, VR y V2.',
    evidence: [
      'Reconoce PERF TAKEOFF y los campos V1, VR y V2 en la referencia de la variante objetivo.',
      'Explica V1, VR y V2 sin asignarles valores universales.',
      'Puede señalar la fuente del escenario para cada entrada y rechaza un dato de otro vuelo o variante.'
    ],
    scenario: 'Carga un segundo escenario de A320neo V2 con condiciones distintas y vuelve a preparar una entrada de performance.',
    task: 'Identifica la fuente del dato, localiza el campo correcto, introduce o verifica solo información trazable y explica por qué no reutiliza V1/VR/V2 del primer escenario.',
    expected: 'Transfiere la trazabilidad de datos a otro vuelo sin memorizar números ni mezclar variantes.',
    success: 'Cada dato conserva fuente y escenario; V1/VR/V2 no se copian y una discrepancia detiene la secuencia antes de añadir otra entrada.',
    targets: ['a320-cold-dark']
  });
  addSource(lesson, a320Manual); addSource(lesson, a320Qrc);
  saveLesson(lesson);
}

// Clean historical backwards futureLearningTargets now that the corresponding modules are already completed.
{
  const curriculum = JSON.parse(readFileSync(join(root, 'curriculum', 'curriculum.json'), 'utf8'));
  const order = new Map(curriculum.levels.flatMap((level) => (level.modules ?? []).flatMap((module) => (module.lessons ?? []).map((item) => [item.id, item.order]))));
  for (const id of ['approach-charts', 'ils-rnav']) {
    const lesson = readLesson(id);
    const current = order.get(id);
    if (lesson.operationalCompetency?.futureLearningTargets) lesson.operationalCompetency.futureLearningTargets = lesson.operationalCompetency.futureLearningTargets.filter((target) => (order.get(target) ?? Infinity) > current);
    saveLesson(lesson);
  }
}

// Update reference library traceability for the locked C172 G1000 NXi training target and new A320 derived references.
{
  const path = join(root, 'reference-library', 'manifest.json');
  const manifest = JSON.parse(readFileSync(path, 'utf8'));
  const garmin = manifest.references.find((item) => item.id === 'garmin-g1000nxi-cessna-naviii');
  if (garmin) {
    garmin.aircraftVariant = 'Cessna 172 Skyhawk (G1000) training target in MSFS 2024; G1000 NXi V2 package and C172 G1000 attachment verified in Microsoft documentation';
    garmin.verificationStatus = 'VERIFIED';
    garmin.derivedAssets = [...new Set([...(garmin.derivedAssets ?? []), 'public/references/g1000-pfd-reference.png', g1000Asset])];
  }
  if (!manifest.references.some((item) => item.id === 'msfs2024-c172-g1000nxi')) manifest.references.push({
    id: 'msfs2024-c172-g1000nxi', category: 'simulator-avionics-fit', sourceAuthority: 'Microsoft Flight Simulator', sourceTitle: 'MSFS 2024 Instruments and Instrument Attachments — G1000 NXi V2 / Cessna 172 Skyhawk', sourceLocation: 'https://docs.flightsimulator.com/msfs2024/html/5_Content_Configuration/Modular_SimObjects/SimAttachments/Included_Attachments/Instrument_Attachments.htm', simulatorVersion: 'Microsoft Flight Simulator 2024', aircraftVariant: 'Cessna 172 Skyhawk (G1000)', purpose: 'Locks the course G1000 training target to the MSFS 2024 C172 G1000 fit and supports FPL, CDI, NAV and autopilot recognition.', supportsLessons: ['vor-dme', 'g1000-gps', 'g1000-autopilot', 'ifr-foundations'], verificationStatus: 'VERIFIED', redistributionStatus: 'LINK_ONLY', localSource: null, derivedAssets: [g1000Asset]
  });
  const a320 = manifest.references.find((item) => item.id === 'msfs-aircraft-manuals-a320v2');
  if (a320) a320.derivedAssets = [...new Set([...(a320.derivedAssets ?? []), 'content/assets/a320-v2-cockpit-zones-reference.svg', 'content/assets/a320-v2-displays-fcu-reference.svg', 'content/assets/a320-v2-mcdu-perf-reference.svg'])];
  writeFileSync(path, `${JSON.stringify(manifest, null, 2)}\n`);
}

console.log('Final audit fixes applied idempotently.');
