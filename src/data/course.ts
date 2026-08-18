import type { CourseLevel, Lesson } from '../types/course'

const makeLesson = (id: string, title: string, description: string, level: number, moduleTitle: string, objectives: string[], focus: string): Lesson => ({
  id, title, description, level, moduleTitle, estimatedTime: '10–15 min', objectives,
  sections: [
    { kind: 'APRENDE', title: 'Tu siguiente paso', content: `Esta lección te introduce a ${focus} con una explicación breve y enfocada en la práctica.` },
    { kind: 'ENTIENDE', title: 'Antes de sentarte a volar', content: 'No necesitas memorizarlo todo. Identifica las ideas principales, observa los controles y avanza a tu propio ritmo.' },
    { kind: 'PRUÉBALO EN MSFS', title: 'Llévalo al simulador', content: 'Abre Microsoft Flight Simulator 2024 en un entorno tranquilo y realiza este paso sin presión. Repite la práctica las veces que necesites.' },
    { kind: 'ERRORES COMUNES', title: 'Mantén el proceso simple', content: 'Evita cambiar varias configuraciones a la vez. Haz un cambio, pruébalo y toma nota de cómo se siente el control.' },
  ],
  checklist: ['Revisé el objetivo de la lección', 'Preparé mi simulador y controles', 'Realicé la práctica propuesta', 'Anoté una duda o aprendizaje'],
  exercise: { title: 'Práctica guiada', instructions: `Dedica unos minutos a reconocer ${focus} dentro de tu cabina virtual. No hay una puntuación: el objetivo es familiarizarte con el proceso.` }, prerequisites: [],
})

export const course: CourseLevel[] = [
  { id: 'level-0', number: 0, title: 'Preparación', description: 'Prepara tu entorno de simulación y tus controles.', modules: [
    { id: 'welcome', title: 'Bienvenido a Flight Academy', description: 'La forma de aprender dentro de la academia.', lessons: [makeLesson('how-training-works', 'Cómo funcionará tu entrenamiento', 'Conoce la ruta de aprendizaje práctica que seguirás desde cero.', 0, 'Bienvenido a Flight Academy', ['Reconocer las etapas de cada lección', 'Saber cómo registrar tu progreso', 'Preparar una rutina de práctica'], 'la estructura de tu entrenamiento')] },
    { id: 'msfs-prep', title: 'Preparación de MSFS 2024', description: 'Deja el simulador listo para aprender.', lessons: [makeLesson('prepare-msfs', 'Preparando Microsoft Flight Simulator 2024', 'Revisa tu entorno de simulación antes de tu primera práctica.', 0, 'Preparación de MSFS 2024', ['Identificar un entorno adecuado para practicar', 'Comprender qué revisar antes de una sesión'], 'la preparación de Microsoft Flight Simulator 2024')] },
    { id: 'velocityone', title: 'VelocityOne Flight', description: 'Conoce tu sistema de control antes de configurarlo.', lessons: [
      makeLesson('know-velocityone', 'Conociendo tu VelocityOne', 'Identifica las áreas principales de tu Turtle Beach VelocityOne Flight.', 0, 'VelocityOne Flight', ['Ubicar los grupos principales de controles', 'Entender por qué cada control importa'], 'los grupos de control del VelocityOne'),
      makeLesson('initial-controls-check', 'Verificación inicial de controles', 'Haz una comprobación básica de tus controles antes de volar.', 0, 'VelocityOne Flight', ['Seguir una comprobación ordenada', 'Detectar comportamientos que debas revisar'], 'la verificación inicial de los controles'),
      makeLesson('sensitivity-deadzones', 'Concepto de sensibilidad y zonas muertas', 'Comprende los conceptos antes de ajustar cualquier valor.', 0, 'VelocityOne Flight', ['Distinguir sensibilidad y zonas muertas', 'Entender por qué se deben verificar los ajustes'], 'sensibilidad y zonas muertas'),
    ] },
  ] },
  { id: 'level-1', number: 1, title: 'Alumno Piloto', description: 'Tus primeros conceptos y prácticas con el Cessna 172.', modules: [
    { id: 'c172-contact', title: 'Primer contacto con el Cessna 172', description: 'Primeros pasos en tu aeronave de entrenamiento.', lessons: [
      makeLesson('know-c172', 'Conoce tu Cessna 172', 'Familiarízate con la cabina y el papel del avión de entrenamiento.', 1, 'Primer contacto con el Cessna 172', ['Reconocer la cabina como espacio de trabajo', 'Identificar el propósito de una aeronave de entrenamiento'], 'tu Cessna 172'),
      makeLesson('three-axes', 'Los tres ejes del avión', 'Descubre cómo se mueve un avión en sus tres ejes básicos.', 1, 'Primer contacto con el Cessna 172', ['Identificar los tres ejes del avión', 'Relacionarlos con los controles principales'], 'los tres ejes del avión'),
      makeLesson('throttle-power', 'Throttle y potencia', 'Comprende el papel de la potencia dentro de la práctica de vuelo.', 1, 'Primer contacto con el Cessna 172', ['Reconocer el control de potencia', 'Observar su efecto de forma segura en el simulador'], 'throttle y potencia'),
      makeLesson('what-is-trim', 'Qué es el trim', 'Introduce el trim como una ayuda para mantener el control.', 1, 'Primer contacto con el Cessna 172', ['Identificar el propósito del trim', 'Reconocer cuándo observar su efecto'], 'el trim'),
      makeLesson('first-cockpit-exercise', 'Primer ejercicio en cabina', 'Una práctica tranquila para reunir los primeros conceptos.', 1, 'Primer contacto con el Cessna 172', ['Aplicar lo observado en la cabina', 'Completar tu primera práctica guiada'], 'tu primera práctica en cabina'),
    ] },
  ] },
  ...[2, 3, 4, 5, 6, 7].map((number) => ({ id: `level-${number}`, number, title: ['Piloto VFR', 'Navegación', 'Piloto IFR', 'Transición a Airbus', 'A320', 'Operaciones A320'][number - 2], description: 'Contenido próximo en la ruta de Flight Academy.', modules: [] })),
]

const levelTwo = course.find((level) => level.number === 2)
if (levelTwo) {
  levelTwo.description = 'Domina las maniobras esenciales y completa tus primeros vuelos visuales con seguridad.'
  levelTwo.modules.push({
    id: 'vfr-foundations',
    title: 'Fundamentos VFR',
    description: 'Control, circuito y navegación visual para vuelos cortos.',
    lessons: [
      makeLesson('straight-and-level', 'Vuelo recto y nivelado', 'Mantén rumbo, altitud y potencia de forma estable.', 2, 'Fundamentos VFR', ['Establecer una actitud de crucero', 'Mantener rumbo y altitud', 'Usar el trim para reducir esfuerzo'], 'el vuelo recto y nivelado'),
      makeLesson('turns-and-coordination', 'Virajes coordinados', 'Practica virajes suaves sin perder el control de la aeronave.', 2, 'Fundamentos VFR', ['Iniciar y salir de un viraje', 'Vigilar altitud y velocidad', 'Coordinar los mandos'], 'los virajes coordinados'),
      makeLesson('airport-traffic-pattern', 'El circuito de tránsito', 'Aprende la secuencia básica alrededor de un aeropuerto.', 2, 'Fundamentos VFR', ['Reconocer los tramos del circuito', 'Planear una aproximación estable', 'Mantener separación y orden'], 'el circuito de tránsito'),
      makeLesson('first-vfr-navigation', 'Tu primera navegación VFR', 'Sigue una ruta corta usando referencias visuales y el mapa.', 2, 'Fundamentos VFR', ['Planear una ruta sencilla', 'Identificar referencias en tierra', 'Corregir el rumbo con calma'], 'la navegación visual'),
      makeLesson('vfr-consolidation', 'Vuelo VFR de consolidación', 'Une lo aprendido en un vuelo corto de principio a fin.', 2, 'Fundamentos VFR', ['Preparar un vuelo corto', 'Aplicar control y navegación', 'Revisar tu desempeño'], 'un vuelo VFR completo'),
    ],
  })
}

const lessonPlan = (concept: string, procedure: string, errors: string, exerciseTitle: string, exercise: string, checklist: string[]): Partial<Lesson> => ({
  estimatedTime: '15–20 min',
  sections: [
    { kind: 'APRENDE', title: 'Idea clave', content: concept },
    { kind: 'PROCEDIMIENTO', title: 'Práctica paso a paso', content: procedure },
    { kind: 'ERRORES COMUNES', title: 'Qué vigilar', content: errors },
  ] as Lesson['sections'],
  checklist,
  exercise: { title: exerciseTitle, instructions: exercise },
})

const lessonDetails: Record<string, Partial<Lesson>> = {
  'how-training-works': {
    estimatedTime: '12 min',
    sections: [
      { kind: 'APRENDE', title: 'Entrena una habilidad cada vez', content: 'Volar se aprende acumulando pequeñas rutinas. Cada lección de la academia se centra en una habilidad concreta: leer una indicación, preparar el avión, practicar y revisar lo que ocurrió. No avances por velocidad; avanza cuando puedas explicar qué hiciste y por qué.' },
      { kind: 'PROCEDIMIENTO', title: 'El ciclo de una sesión', content: 'Antes de abrir el simulador, lee el objetivo y prepara una práctica corta. Durante el vuelo, cambia una sola variable a la vez. Al terminar, anota qué controlaste bien y qué quieres repetir. Cinco o diez minutos conscientes rinden más que una sesión larga sin objetivo.' },
      { kind: 'ERRORES COMUNES', title: 'No busques perfección en el primer vuelo', content: 'No necesitas dominar los instrumentos ni memorizar listas completas todavía. Evita saltar entre aviones, aeropuertos y configuraciones. En esta etapa, la consistencia de tu entorno y de tu rutina es tu principal herramienta.' },
    ] as Lesson['sections'],
    checklist: ['Leí el objetivo antes de abrir el simulador', 'Reservé una práctica breve y sin interrupciones', 'Elegí una sola habilidad para practicar', 'Anoté un aprendizaje al finalizar'],
    exercise: { title: 'Crea tu rutina de piloto', instructions: 'Abre MSFS 2024 y, sin iniciar un vuelo todavía, prepara tu puesto: control conectado, auriculares si los usas y una libreta o nota digital. Escribe una frase: “En esta sesión practicaré…”. Conserva esa rutina para las próximas lecciones.' },
  },
  'prepare-msfs': {
    estimatedTime: '15 min',
    sections: [
      { kind: 'APRENDE', title: 'Un entorno estable acelera el aprendizaje', content: 'Para las primeras prácticas, reduce las distracciones. Escoge un aeropuerto conocido, condiciones de día y cielo despejado, y una aeronave sencilla. El objetivo no es demostrar realismo extremo: es poder ver con claridad la respuesta del avión a tus acciones.' },
      { kind: 'PROCEDIMIENTO', title: 'Configuración inicial recomendada', content: 'Inicia un vuelo libre con el Cessna 172 en plataforma o pista. Usa clima preestablecido despejado, hora diurna y ayudas de navegación visuales si las necesitas. Verifica que el freno de estacionamiento y los controles respondan antes de acelerar.' },
      { kind: 'ERRORES COMUNES', title: 'Cambia solo lo necesario', content: 'No ajustes sensibilidad, cámaras, clima y asistencias al mismo tiempo. Si algo se siente extraño, identifica primero si proviene del avión, de una ayuda del simulador o de tu controlador. Así podrás corregirlo sin perder tu referencia.' },
    ] as Lesson['sections'],
    checklist: ['Seleccioné el Cessna 172', 'Elegí condiciones diurnas y despejadas', 'Confirmé que el controlador responde', 'Comprobé que puedo pausar y volver al menú'],
    exercise: { title: 'Prepara un vuelo de práctica', instructions: 'Configura un vuelo libre de día, con cielo despejado y el Cessna 172 en un aeropuerto que conozcas. Quédate en tierra. Mueve suavemente el yoke, el throttle y los pedales para confirmar que las entradas se reflejan en cabina.' },
  },
  'know-velocityone': {
    estimatedTime: '15 min',
    sections: [
      { kind: 'APRENDE', title: 'El control traduce tus intenciones', content: 'El VelocityOne reúne los mandos que usarás con mayor frecuencia. El yoke controla la actitud del avión; el throttle regula potencia; el trim reduce la fuerza que necesitarías mantener; y los controles de flaps y mezcla se incorporarán de forma gradual.' },
      { kind: 'PROCEDIMIENTO', title: 'Reconoce antes de asignar', content: 'Con el simulador abierto, identifica físicamente cada grupo de control y después observa su nombre en las opciones de MSFS. No cambies asignaciones todavía. Primero confirma que cada eje se mueve de forma fluida, regresa al centro y no produce entradas involuntarias.' },
      { kind: 'ERRORES COMUNES', title: 'No ajustes sensibilidad por intuición', content: 'Una respuesta brusca puede venir de una asignación duplicada, una cámara activa o una ayuda de vuelo; no necesariamente de la sensibilidad. Antes de modificar valores, comprueba qué eje está actuando y si el avión está detenido en una situación estable.' },
    ] as Lesson['sections'],
    checklist: ['Ubique el yoke y sus ejes principales', 'Identifiqué throttle y trim', 'Reconocí flaps y mezcla sin moverlos en vuelo', 'Verifiqué que no hay una asignación duplicada'],
    exercise: { title: 'Mapa físico de controles', instructions: 'Con el Cessna 172 detenido, toca cada grupo de control del VelocityOne y busca su reacción en cabina. Hazlo uno por uno: yoke, throttle, trim y flaps. Si una entrada no corresponde, anótala para revisarla en la siguiente lección.' },
  },
  'initial-controls-check': lessonPlan(
    'Una comprobación en tierra evita que una asignación inesperada aparezca cuando ya estás rodando o en el aire. El objetivo es confirmar recorrido, dirección y punto neutro de cada eje.',
    'En Vuelo libre, elige el Cessna 172 detenido en plataforma. Mueve el yoke lentamente a izquierda, derecha, adelante y atrás; observa alerones y elevador. Después mueve throttle, trim, flaps y pedales uno por uno. Vuelve cada mando a una posición segura antes de tocar el siguiente.',
    'No pruebes los mandos con el avión acelerando. Si un eje se mueve al revés, no lo compenses mentalmente: corrige la asignación antes de practicar. Si dos controles actúan a la vez, busca una asignación duplicada.',
    'Comprobación de cabina en tierra',
    'Completa una vuelta ordenada de mandos con el avión inmovilizado. Di en voz alta qué superficie o indicador cambia con cada entrada. Anota cualquier eje invertido, salto o movimiento sin tocar el control.',
    ['Avión inmovilizado en plataforma', 'Yoke comprobado en todos sus ejes', 'Pedales o rudder comprobados', 'Potencia, trim y flaps revisados', 'Sin asignaciones duplicadas detectadas'],
  ),
  'sensitivity-deadzones': lessonPlan(
    'La sensibilidad define cuán rápido responde una entrada; la zona muerta ignora los pequeños movimientos cercanos al centro. Ambos ajustes sirven para que el avión responda con precisión, no para ocultar una asignación incorrecta.',
    'Primero verifica en tierra que cada eje llega a sus extremos y vuelve al centro. Haz un vuelo corto y recto en condiciones calmas. Si el avión se mueve sin tocar el control, añade una zona muerta mínima. Si una entrada es demasiado brusca, ajusta sensibilidad poco a poco y vuelve a probar el mismo ejercicio.',
    'Evita copiar valores de otra persona: cada controlador y cada avión se sienten distinto. No modifiques varios ejes a la vez y no uses una zona muerta grande para corregir un eje que está mal centrado o duplicado.',
    'Ajuste controlado',
    'En Vuelo libre, mantén el Cessna en una situación tranquila. Cambia solo un ajuste del yoke, repite el mismo movimiento suave y anota la diferencia. Si no puedes explicar el efecto, vuelve al valor anterior.',
    ['Controles verificados antes de ajustar', 'Un solo eje elegido para la prueba', 'Cambio pequeño aplicado', 'Misma práctica repetida', 'Resultado anotado'],
  ),
  'know-c172': lessonPlan(
    'El Cessna 172 es un avión de entrenamiento porque te deja percibir con claridad la relación entre actitud, potencia y trim. La cabina es un puesto de trabajo: primero ubica lo esencial, después practica los movimientos.',
    'Con el avión detenido, identifica el indicador de velocidad, horizonte artificial, altímetro, coordinador de viraje y brújula o rumbo. Ubica también el throttle, mezcla, flaps y trim. No necesitas memorizar todos los sistemas: aprende qué información usarás en cada fase.',
    'No fijes la mirada en un solo instrumento ni muevas palancas por curiosidad sin saber su función. En tierra, el motor puede estar encendido; confirma freno de estacionamiento antes de explorar.',
    'Tour de cabina',
    'Sentado en el Cessna 172 en plataforma, señala los cinco instrumentos básicos y los cuatro mandos principales. Luego configura una cámara que te permita volver con facilidad a la vista de instrumentos.',
    ['Freno de estacionamiento confirmado', 'Instrumentos básicos ubicados', 'Throttle, mezcla, flaps y trim identificados', 'Vista de cabina preparada'],
  ),
  'three-axes': lessonPlan(
    'El avión gira sobre tres ejes: alabeo, cabeceo y guiñada. El yoke mueve alerones para el alabeo y elevador para el cabeceo; los pedales controlan el rudder para la guiñada. Entenderlos evita usar el mando equivocado.',
    'En tierra, mueve el yoke a los lados y observa alerones; llévalo adelante y atrás y observa elevador; pisa cada pedal y observa el rudder. Después, en vuelo recto y tranquilo, prueba entradas mínimas de uno en uno y vuelve al centro.',
    'No combines entradas grandes para “ver qué pasa”. Un viraje no se corrige con rudder solamente y una subida no se logra tirando indefinidamente del yoke. Usa movimientos pequeños y observa la respuesta.',
    'Tres movimientos, una respuesta',
    'Realiza tres secuencias separadas: una inclinación suave, un cambio leve de actitud de cabeceo y una pulsación breve de rudder. Describe qué cambió en la actitud del avión después de cada una.',
    ['Alerones identificados', 'Elevador identificado', 'Rudder identificado', 'Entradas realizadas de una en una'],
  ),
  'throttle-power': lessonPlan(
    'El throttle controla la potencia del motor. La potencia influye de forma importante en velocidad y en la capacidad de subir o bajar, pero siempre trabaja junto con la actitud del avión.',
    'En vuelo recto y nivelado, anota potencia y velocidad de crucero. Reduce potencia suavemente unos segundos sin cambiar la actitud y observa la tendencia. Vuelve al valor inicial. Repite aumentando potencia de forma moderada, sin hacer maniobras bruscas.',
    'No empujes potencia al máximo sin tener una razón y una actitud preparada. Evita usar el throttle como único control de altitud: observa también velocidad, actitud y trim.',
    'Observa la potencia',
    'En un vuelo libre despejado, establece crucero. Haz un cambio pequeño de potencia, espera a que el avión responda y regresa al punto inicial. Repite una vez. Tu objetivo es describir la tendencia, no mantener una cifra exacta.',
    ['Vuelo estable antes de la prueba', 'Potencia inicial anotada', 'Cambio suave aplicado', 'Velocidad y actitud observadas'],
  ),
  'what-is-trim': lessonPlan(
    'El trim no gira el avión por ti; alivia la presión necesaria para mantener una actitud. Se ajusta después de establecer la actitud y potencia deseadas, con cambios pequeños y tiempo para observar.',
    'En vuelo recto, establece una actitud estable con el yoke. Mantén la presión necesaria y ajusta el trim en pequeños toques hasta que puedas relajar el esfuerzo. Si el avión se aleja de la actitud, vuelve con el yoke y repite lentamente.',
    'No uses trim para recuperarte de una desviación grande ni lo ajustes rápido. Si pierdes el control de la actitud, vuelve primero al yoke, estabiliza y solo entonces recorta.',
    'Encuentra el punto neutro',
    'En condiciones calmas, mantén el Cessna recto y nivelado. Ajusta trim en incrementos pequeños hasta que el avión requiera menos fuerza en el yoke. Haz dos intentos y anota cuál fue más suave.',
    ['Actitud estable establecida', 'Potencia mantenida', 'Trim ajustado en pasos pequeños', 'Resultado comparado'],
  ),
  'first-cockpit-exercise': lessonPlan(
    'Tu primera práctica integra observación, control suave y una rutina de cierre. No se trata de hacer un vuelo perfecto: se trata de terminar sabiendo qué repetir.',
    'Configura Vuelo libre de día y despejado con el Cessna 172. Haz la comprobación de controles, inicia un tramo de vuelo tranquilo y practica cambios pequeños de yoke, potencia y trim. Termina pausando o aterrizando cuando estés listo y registra una observación concreta.',
    'No añadas clima complejo, tráfico denso o una ruta larga. Si una maniobra se desordena, pausa, vuelve a un escenario estable y repite solo el elemento que estabas aprendiendo.',
    'Sesión de integración',
    'Completa una sesión de 15 minutos: preparación, reconocimiento de instrumentos, control suave y una nota final. La meta es completar el proceso entero sin prisa.',
    ['Vuelo libre configurado', 'Controles comprobados', 'Instrumentos revisados', 'Potencia y trim practicados', 'Aprendizaje anotado'],
  ),
  'straight-and-level': lessonPlan(
    'Recto y nivelado es la referencia de casi todas las maniobras. Requiere mirar afuera, confirmar instrumentos, usar una potencia razonable y recortar el avión para no luchar contra el yoke.',
    'En Vuelo libre, despega con ayudas si aún no dominas el despegue o inicia en el aire. Elige una referencia lejana frente al morro, establece una actitud suave, ajusta potencia de crucero y trim. Alterna la vista exterior con velocidad, altitud y rumbo.',
    'No persigas cada pequeña oscilación. Espera unos segundos tras cada corrección, usa entradas mínimas y evita mirar solo el altímetro. La tendencia importa más que una lectura instantánea.',
    'Mantén la referencia',
    'Mantén un tramo recto y nivelado durante tres minutos en clima despejado. Cada vez que corrijas, di qué variable cambió: actitud, potencia o trim.',
    ['Condiciones calmas seleccionadas', 'Referencia exterior elegida', 'Potencia de crucero establecida', 'Trim aplicado', 'Tres minutos completados'],
  ),
  'turns-and-coordination': lessonPlan(
    'Un viraje coordinado combina una inclinación moderada, presión suave hacia atrás para sostener altitud y rudder solo lo necesario para mantener la bola centrada. La salida comienza antes del rumbo deseado.',
    'Desde vuelo recto y nivelado, mira un punto de referencia, inclina suavemente con yoke y añade la presión necesaria. Vigila la altitud y el coordinador. Aproxima la salida con anticipación, nivela las alas y verifica el rumbo final.',
    'No inclines demasiado ni corrijas la pérdida de altitud tirando fuerte. No pises rudder a fondo para “girar”. Si el viraje se desorganiza, nivela alas, estabiliza y vuelve a intentarlo con menos inclinación.',
    'Virajes de referencia',
    'Realiza dos virajes suaves, uno a cada lado, usando una referencia visual. Empieza y termina cada viraje en vuelo recto y nivelado.',
    ['Vuelo recto establecido', 'Referencia exterior elegida', 'Viraje a cada lado practicado', 'Altitud revisada al salir'],
  ),
  'airport-traffic-pattern': lessonPlan(
    'El circuito de tránsito organiza el flujo alrededor de la pista. Sus tramos básicos son salida, viento cruzado, viento en cola, base y final. En simulación lo usarás para construir una aproximación predecible.',
    'Elige un aeropuerto de poca complejidad y una pista con buen tiempo. Revisa la dirección de la pista, despega o inicia cerca del circuito y recorre sus tramos con giros suaves. Mantén una separación visual razonable de la pista y prepara la aproximación antes de llegar a final.',
    'No bajes tarde ni gires directamente a final sin entender tu posición. Evita preocuparte por una fraseología perfecta al comienzo: primero construye el patrón visual y la estabilidad del avión.',
    'Vuelta al circuito',
    'Vuela un circuito completo en clima despejado. Identifica en voz alta cada tramo y realiza una aproximación estabilizada. Puedes reiniciar el vuelo si la aproximación se vuelve inestable.',
    ['Pista identificada', 'Circuito visualizado', 'Cinco tramos nombrados', 'Aproximación estable intentada'],
  ),
  'first-vfr-navigation': lessonPlan(
    'La navegación VFR usa referencias visuales, orientación y una ruta sencilla. Al principio, elige trayectos cortos entre aeropuertos cercanos y evita depender de una línea mágica en el mapa.',
    'En el mapa mundial, escoge dos aeropuertos cercanos y un trayecto fácil de reconocer. Observa rumbo general, distancia y dos referencias en tierra, como una costa, río, carretera o población. Durante el vuelo, compara tu posición real con el mapa y corrige con pequeños cambios de rumbo.',
    'No empieces con mal tiempo, noche o terreno sin referencias. Si te desorientas, mantén el control del avión primero, vuelve a una referencia conocida y usa el mapa para reconstruir tu posición.',
    'Ruta de dos referencias',
    'Planifica un vuelo de 10 a 20 minutos entre dos aeropuertos cercanos. Antes de despegar, escribe dos referencias visuales. Durante el vuelo, confirma cada una y anota si necesitaste corregir el rumbo.',
    ['Ruta corta elegida', 'Dos referencias anotadas', 'Rumbo inicial revisado', 'Posición comprobada durante el vuelo', 'Correcciones anotadas'],
  ),
  'vfr-consolidation': lessonPlan(
    'Esta práctica consolida la cadena completa: preparar, despegar o iniciar estable, mantener control, navegar, entrar al circuito y revisar. El valor está en seguir tu plan con calma.',
    'Planifica un vuelo VFR corto en Vuelo libre, de día y con clima despejado. Revisa controles, define salida, destino y referencias. Durante el trayecto mantén el avión estable, realiza al menos un viraje suave y entra al circuito de destino. Cierra con una revisión breve.',
    'No conviertas este vuelo en un examen. Si necesitas pausar o reiniciar, hazlo. Elige un trayecto que puedas terminar en menos de treinta minutos y mantén las ayudas que te permitan aprender con seguridad.',
    'Primer vuelo VFR completo',
    'Vuela una ruta corta que incluya preparación, tramo recto y nivelado, dos virajes, dos referencias visuales y llegada a un circuito. Al final, escribe una cosa que harías igual y una que practicarías de nuevo.',
    ['Vuelo libre configurado', 'Ruta y referencias preparadas', 'Control estable practicado', 'Virajes completados', 'Circuito de destino intentado', 'Debriefing escrito'],
  ),
}

const setup = (airport: string, position: string, altitude: string, weather: string, time: string, note: string): NonNullable<Lesson['flightSetup']> => ({ mode: 'Vuelo libre', aircraft: 'Cessna 172', airport, position, altitude, weather, time, note })

const flightSetups: Record<string, NonNullable<Lesson['flightSetup']>> = {
  'how-training-works': setup('SKBO · El Dorado, Bogotá', 'En plataforma', 'Altitud del aeropuerto', 'Preestablecido: despejado', 'Día, 10:00', 'No inicies el vuelo: prepara tu rutina y conoce el entorno.'),
  'prepare-msfs': setup('SKBO · El Dorado, Bogotá', 'En plataforma', 'Altitud del aeropuerto', 'Preestablecido: despejado', 'Día, 10:00', 'Usa una puerta o plataforma tranquila; confirma mandos antes de rodar.'),
  'know-velocityone': setup('SKPE · Matecaña, Pereira', 'En plataforma', 'Altitud del aeropuerto', 'Preestablecido: despejado', 'Día, 10:00', 'Ideal para reconocer mandos con el avión detenido.'),
  'initial-controls-check': setup('SKPE · Matecaña, Pereira', 'En plataforma', 'Altitud del aeropuerto', 'Preestablecido: despejado', 'Día, 10:00', 'Mantén freno de estacionamiento aplicado durante toda la comprobación.'),
  'sensitivity-deadzones': setup('SKCL · Alfonso Bonilla Aragón, Cali', 'En aire', '6,500 ft MSL', 'Preestablecido: despejado, sin viento', 'Día, 10:00', 'Crea una situación estable para observar una entrada cada vez.'),
  'know-c172': setup('SKPE · Matecaña, Pereira', 'En plataforma', 'Altitud del aeropuerto', 'Preestablecido: despejado', 'Día, 10:00', 'Tour de cabina en tierra; no necesitas despegar.'),
  'three-axes': setup('SKCL · Alfonso Bonilla Aragón, Cali', 'En aire', '6,500 ft MSL', 'Preestablecido: despejado, sin viento', 'Día, 10:00', 'Empieza recto y nivelado, lejos del aeropuerto y del relieve.'),
  'throttle-power': setup('SKCL · Alfonso Bonilla Aragón, Cali', 'En aire', '6,500 ft MSL', 'Preestablecido: despejado, sin viento', 'Día, 11:00', 'Mantén una zona amplia y segura para observar los cambios de potencia.'),
  'what-is-trim': setup('SKCL · Alfonso Bonilla Aragón, Cali', 'En aire', '6,500 ft MSL', 'Preestablecido: despejado, sin viento', 'Día, 11:00', 'Usa aire calmo; ajusta trim solo después de estabilizar la actitud.'),
  'first-cockpit-exercise': setup('SKCL · Alfonso Bonilla Aragón, Cali', 'En aire', '6,500 ft MSL', 'Preestablecido: despejado, sin viento', 'Día, 11:00', 'Sesión tranquila para unir mandos, instrumentos, potencia y trim.'),
  'straight-and-level': setup('SKCL · Alfonso Bonilla Aragón, Cali', 'En aire', '7,500 ft MSL', 'Preestablecido: despejado, sin viento', 'Día, 10:00', 'Selecciona un inicio alejado del circuito y mantén amplio margen visual.'),
  'turns-and-coordination': setup('SKCL · Alfonso Bonilla Aragón, Cali', 'En aire', '7,500 ft MSL', 'Preestablecido: despejado, sin viento', 'Día, 10:00', 'Practica virajes suaves con altura suficiente para recuperar con calma.'),
  'airport-traffic-pattern': setup('SKPE · Matecaña, Pereira', 'En pista o plataforma', 'Altitud del aeropuerto', 'Preestablecido: despejado, viento ligero', 'Día, 09:00', 'Si el terreno te resulta exigente, usa SKCL como alternativa de circuito más amplio.'),
  'first-vfr-navigation': setup('SKCL · Alfonso Bonilla Aragón, Cali', 'En plataforma', 'Altitud del aeropuerto', 'Preestablecido: despejado', 'Día, 09:00', 'Planifica una ruta corta hacia SKUL · La Florida, Tuluá, siguiendo el valle.'),
  'vfr-consolidation': setup('SKCL · Alfonso Bonilla Aragón, Cali', 'En plataforma', 'Altitud del aeropuerto', 'Preestablecido: despejado, viento ligero', 'Día, 09:00', 'Vuela una ruta corta SKCL–SKUL; mantén ayudas activas si las necesitas.'),
}

course.forEach((level) => level.modules.forEach((module) => module.lessons.forEach((lesson) => Object.assign(lesson, lessonDetails[lesson.id], { flightSetup: flightSetups[lesson.id] }))))

export const lessonOrder = course.flatMap((level) => level.modules.flatMap((module) => module.lessons.map((lesson) => lesson.id)))
export const getLesson = (id: string) => course.flatMap((level) => level.modules).flatMap((module) => module.lessons).find((lesson) => lesson.id === id)
