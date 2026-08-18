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

const levelZero = course.find((level) => level.number === 0)
if (levelZero) {
  levelZero.modules.splice(2, 1,
    { id: 'before-start', title: 'Sección 3 · Antes de encender', description: 'Prepara el Cessna 172 Skyhawk G1000 apagado en plataforma.', lessons: [
      makeLesson('c172-cold-dark', 'Escenario apagado: Cold & Dark', 'Entra a la cabina con el motor y los sistemas apagados.', 0, 'Sección 3 · Antes de encender', ['Seleccionar el estado correcto de inicio', 'Reconocer cuándo el avión está realmente apagado', 'Preparar una práctica segura en plataforma'], 'el escenario Cold & Dark'),
      makeLesson('c172-before-start', 'Checklist antes de encender', 'Prepara cabina, combustible y electricidad antes de arrancar.', 0, 'Sección 3 · Antes de encender', ['Seguir el flujo previo al arranque', 'Entender el propósito de cada elemento', 'Dejar el C172 listo para el motor'], 'la preparación antes de encender'),
    ] },
    { id: 'engine-start', title: 'Sección 4 · Encendido realista', description: 'Arranca y comprueba el motor del Cessna paso a paso.', lessons: [
      makeLesson('c172-engine-start', 'Arranque del motor', 'Enciende el motor del Cessna 172 usando el flujo normal.', 0, 'Sección 4 · Encendido realista', ['Cebar y arrancar sin saltar pasos', 'Reconocer el momento en que el motor toma vida', 'Estabilizar el motor al ralentí'], 'el arranque normal del motor'),
      makeLesson('c172-after-start', 'Verificación después del arranque', 'Confirma que el motor y los sistemas básicos están saludables antes de rodar.', 0, 'Sección 4 · Encendido realista', ['Verificar presión de aceite y carga eléctrica', 'Encender la aviónica en el orden correcto', 'Decidir si el avión está listo para continuar'], 'la comprobación posterior al arranque'),
    ] },
    { id: 'ground-operations', title: 'Sección 5 · Operación en tierra', description: 'Aprende a rodar y preparar el motor antes del primer despegue.', lessons: [
      makeLesson('airport-map-basics', 'El mapa del aeropuerto: dónde estás y adónde puedes ir', 'Distingue plataforma, calle de rodaje, pista y línea de espera antes de mover el avión.', 0, 'Sección 5 · Operación en tierra', ['Ubicar el avión en plataforma', 'Reconocer una calle de rodaje y una pista', 'Saber dónde detenerse antes de la pista'], 'el mapa básico del aeropuerto'),
      makeLesson('airport-radio-basics', 'Radio y ATC: tu primera solicitud de taxi', 'Abre Comunicaciones, solicita taxi y usa la ayuda visual de MSFS.', 0, 'Sección 5 · Operación en tierra', ['Abrir el panel Comunicaciones', 'Solicitar taxi sin usar fraseología manual', 'Entender qué significa Hold Short'], 'la radio básica de aeropuerto'),
      makeLesson('c172-taxi-basics', 'Primer taxi: mover el avión en tierra', 'Suelta el freno, prueba los frenos y rueda despacio sin despegar.', 0, 'Sección 5 · Operación en tierra', ['Diferenciar rodar de volar', 'Moverse despacio y detenerse', 'Hacer una prueba inicial de frenos'], 'el taxi básico'),
      makeLesson('c172-engine-runup', 'Prueba del motor antes del despegue', 'En una zona segura, confirma que el motor responde antes de usar la pista.', 0, 'Sección 5 · Operación en tierra', ['Preparar el avión para la prueba', 'Observar los indicadores básicos del motor', 'Terminar con el motor estable'], 'la prueba de motor'),
      makeLesson('c172-before-takeoff', 'Checklist antes de despegue', 'Deja el Cessna listo, pero detenido, antes del primer vuelo.', 0, 'Sección 5 · Operación en tierra', ['Completar una comprobación previa al despegue', 'Entender que aún no es momento de volar', 'Detenerse en el punto correcto'], 'la preparación final en tierra'),
    ] },
  )
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

// Guía operativa para las primeras lecciones. Se mantiene separada del texto
// conceptual para que el alumno tenga una ruta concreta dentro de MSFS 2024.
const practicalLevelZeroDetails: Record<string, Partial<Lesson>> = {
  'prepare-msfs': {
    estimatedTime: '25 min',
    objectives: ['Abrir y reconocer el menú correcto de configuración', 'Crear una base de práctica estable', 'Dejar listos avión, clima y ayudas antes de tocar los mandos'],
    sections: [
      { kind: 'PROCEDIMIENTO', title: 'Ruta exacta para preparar el simulador', content: '1. Desde la pantalla principal entra en VUELO LIBRE. No uses Modo Carrera para estas lecciones.\n2. En el mapa mundial selecciona Cessna 172 y el aeropuerto indicado arriba.\n3. Elige una plataforma (no una pista) para las lecciones de control; así el avión no se moverá mientras pruebas ejes.\n4. Abre CLIMA y selecciona un preajuste despejado. Pon hora de día, idealmente 10:00.\n5. Antes de iniciar, revisa que el viento sea calmo o muy ligero.\n6. Inicia el vuelo y aplica freno de estacionamiento. Solo entonces pasa a Configuración de controles.' },
      { kind: 'APRENDE', title: 'Configuración inicial que sí conviene usar', content: 'Para aprender, deja activadas las ayudas que eviten frustración: etiquetas o indicaciones de navegación si las necesitas, pausa disponible y daño/desgaste desactivado al principio. No hay premio por desactivar ayudas demasiado pronto. La meta del Nivel 0 es que cada movimiento del control produzca una respuesta comprensible.' },
      { kind: 'ERRORES COMUNES', title: 'No ajustes dentro de un vuelo complicado', content: 'No pruebes sensibilidad con viento fuerte, tormenta, noche, tráfico o una aproximación. Si cambias un eje, vuelve a esta misma situación: C172, día, despejado, avión detenido o vuelo recto. Así sabrás qué cambió realmente.' },
    ] as Lesson['sections'],
    checklist: ['Entré en Vuelo libre', 'Elegí Cessna 172 y una plataforma', 'Puse día, cielo despejado y viento ligero', 'Apliqué freno de estacionamiento', 'Dejé las ayudas de principiante activas'],
    exercise: { title: 'Escenario base de entrenamiento', instructions: 'Crea el escenario indicado y no despegues todavía. Pausa si lo necesitas. Tu resultado correcto es ver el C172 quieto en plataforma, de día y sin clima que complique las pruebas.' },
  },
  'know-velocityone': {
    estimatedTime: '30 min',
    objectives: ['Crear un perfil propio para el C172', 'Ver qué asignaciones reconoce MSFS', 'Ubicar los ejes y botones esenciales antes de volar'],
    sections: [
      { kind: 'PROCEDIMIENTO', title: 'Entra al perfil del VelocityOne', content: '1. Dentro de Vuelo libre, abre el engranaje de la esquina superior derecha; durante un vuelo también puedes pulsar ESC y entrar en Configuración.\n2. Abre CONTROLES. Verás los dispositivos detectados. Selecciona Turtle Beach VelocityOne Flight.\n3. Crea o duplica un perfil y llámalo C172 — Training. Conserva el perfil predeterminado sin cambios para poder volver atrás.\n4. En Customization/Personalización, usa la búsqueda y escribe el nombre de cada acción. Al seleccionar una acción, mueve el mando físico cuando el simulador lo pida.\n5. Si el dispositivo fue reconocido, primero revisa las asignaciones existentes; no es necesario reasignarlas todas.' },
      { kind: 'APRENDE', title: 'Lo mínimo que debe funcionar hoy', content: 'Ejes: Aileron Axis (girar yoke izquierda/derecha), Elevator Axis (empujar/tirar yoke), Throttle Axis, y si cuentas con pedales, Rudder Axis.\nPalancas: Flaps, Mixture y Propeller Axis pueden permanecer en el perfil detectado; todavía no las usarás en vuelo.\nBotones esenciales: Parking Brake, Brakes, Flaps Increase/Decrease, Elevator Trim Up/Down, Pause/Active Pause y una vista de cabina. No necesitas programar todos los botones del panel para comenzar.' },
      { kind: 'ERRORES COMUNES', title: 'Antes de crear una asignación nueva', content: 'Busca primero la acción y comprueba si ya existe. Dos asignaciones para el mismo eje pueden producir movimientos inesperados. Si un mando queda invertido, usa Reverse Axis en esa acción: no cambies de sitio los cables ni intentes compensarlo con la mano.' },
    ] as Lesson['sections'],
    checklist: ['VelocityOne seleccionado en Controles', 'Perfil C172 — Training creado o duplicado', 'Aileron y Elevator Axis reconocidos', 'Throttle Axis reconocido', 'Botones de freno, trim, flaps y pausa revisados'],
    exercise: { title: 'Inventario real de tu control', instructions: 'Con el avión quieto, entra al perfil y comprueba una acción por vez. Mueve el yoke, luego throttle y después cada palanca. Para cada eje responde: ¿se mueve?, ¿va en el sentido correcto?, ¿vuelve a cero sin temblar? No cambies sensibilidad todavía.' },
  },
  'initial-controls-check': {
    estimatedTime: '25 min',
    sections: [
      { kind: 'PROCEDIMIENTO', title: 'Prueba de ejes, en este orden', content: 'Con el C172 inmovilizado y freno de estacionamiento aplicado:\n1. Yoke a la izquierda: el alerón izquierdo debe subir y el derecho bajar.\n2. Yoke a la derecha: ocurre lo contrario.\n3. Yoke hacia ti: el elevador sube; yoke hacia delante: el elevador baja.\n4. Throttle: confirma que el porcentaje de potencia sube al avanzar y baja al retroceder.\n5. Pedales o controles de rudder: comprueba el timón de dirección, un lado a la vez.\n6. Mueve flaps, trim y mezcla sin motor acelerado; observa el indicador o la palanca de cabina.\n7. Devuelve todo a una posición segura antes del siguiente mando.' },
      { kind: 'APRENDE', title: 'Cómo corregir algo que no coincide', content: 'Eje invertido: abre la acción específica y activa Reverse Axis.\nNo se mueve: busca el nombre de la acción y usa “buscar entrada” para asignarla; luego guarda el perfil.\nSe mueven dos cosas: elimina la duplicada del perfil C172 — Training, no del perfil original.\nSe mueve solo: eso se corrige en la siguiente lección con zona muerta pequeña, después de confirmar que no hay duplicados.' },
      { kind: 'ERRORES COMUNES', title: 'No pruebes acelerando', content: 'Esta lección se hace detenido. No despegues para comprobar el yoke. Si el motor está encendido, deja throttle al mínimo y freno de estacionamiento aplicado. La prueba es visual: superficies, palancas e indicadores.' },
    ] as Lesson['sections'],
    checklist: ['Freno de estacionamiento aplicado', 'Alerones se mueven en el sentido esperado', 'Elevador se mueve en el sentido esperado', 'Throttle aumenta y reduce potencia correctamente', 'Rudder, flaps y trim revisados', 'Ningún eje está duplicado'],
    exercise: { title: 'Checklist de respuesta', instructions: 'Haz la prueba de siete pasos sin prisa. Si algo falla, anótalo como “invertido”, “sin respuesta”, “duplicado” o “tiembla”. Corrige un solo problema, repite desde el paso 1 y no marques la lección completa hasta que todos los ejes principales respondan.' },
  },
  'sensitivity-deadzones': {
    estimatedTime: '30 min',
    objectives: ['Encontrar la curva de cada eje en MSFS 2024', 'Aplicar una base de sensibilidad conservadora', 'Ajustar zona muerta solo si existe movimiento no deseado'],
    sections: [
      { kind: 'PROCEDIMIENTO', title: 'Dónde está la sensibilidad en MSFS 2024', content: '1. Ve a Configuración > Controles y selecciona VelocityOne Flight.\n2. Pulsa el icono de engranaje junto al dispositivo y abre Hardware Settings/Configuración de hardware.\n3. Elige el eje: Aileron, Elevator, Rudder o Throttle. En algunas versiones debes abrir la acción y pulsar Tweak Action Curve/Ajustar curva de acción.\n4. Ajusta un único eje, guarda y vuelve a probar el mismo vuelo. Si no ves “Reactivity”, es normal: MSFS 2024 puede no mostrar ese ajuste.' },
      { kind: 'APRENDE', title: 'Valores iniciales para C172 — Training', content: 'Empieza con esta base, no con valores extremos:\n• Aileron: sensibilidad -20 %, zona muerta 2 %, zona muerta extrema 0 %.\n• Elevator: sensibilidad -25 %, zona muerta 2 %, zona muerta extrema 0 %.\n• Rudder: sensibilidad -15 %, zona muerta 2 %, zona muerta extrema 0 %.\n• Throttle: sensibilidad 0 %, zona muerta 0–2 %.\nSi tu yoke está perfectamente estable en el centro, deja zona muerta en 0 %. Si ves temblor sin tocarlo, súbela solo a 3–4 %. Estos son valores de partida, no una receta obligatoria.' },
      { kind: 'PROCEDIMIENTO', title: 'Método de ajuste que funciona', content: 'Usa el escenario de esta lección: aire calmo, C172 recto y nivelado. Haz tres entradas muy pequeñas de un eje. Si responde demasiado brusco cerca del centro, baja sensibilidad otros 5 puntos. Si el avión se mueve sin tocar el control, añade 1–2 puntos de zona muerta. Repite la misma prueba y anota el resultado. Cambia un solo eje por sesión.' },
      { kind: 'ERRORES COMUNES', title: 'Qué NO arregla una curva', content: 'La sensibilidad no corrige un eje invertido ni una asignación duplicada. Una zona muerta grande tampoco es una solución para un yoke defectuoso: solo elimina precisión. Si el avión se inclina o asciende sin tocarlo, primero verifica viento, trim, duplicados y centrado físico.' },
    ] as Lesson['sections'],
    checklist: ['Abrí Hardware Settings o Ajustar curva de acción', 'Modifiqué un solo eje', 'Usé cambios de máximo 5 puntos', 'Probé en clima calmo y con el mismo avión', 'Anoté el valor que se sintió mejor'],
    exercise: { title: 'Tu perfil inicial C172', instructions: 'Configura aileron -20 % y elevator -25 %, con zona muerta 2 % solo si observas ruido al centro. Vuela recto durante dos minutos a 6.500 ft. Si aún está nervioso, baja únicamente el eje problemático 5 puntos más. Guarda el perfil C172 — Training al terminar.' },
  },
}

const velocityOneC172Details: Record<string, Partial<Lesson>> = {
  'know-velocityone': {
    estimatedTime: '35 min',
    objectives: ['Poner el perfil correcto en el dispositivo', 'Identificar los dos dispositivos que aparecen en PC', 'Reconocer qué mando físico corresponde a cada función básica'],
    sections: [
      { kind: 'PROCEDIMIENTO', title: 'Primero: selecciona el perfil correcto en el control', content: '1. En la pantalla del propio VelocityOne, usa sus controles de perfil y elige Default/Predeterminado. Para estas primeras lecciones conserva sus frenos y flaps ya asignados.\n2. En MSFS 2024 abre Configuración > Controles. En PC verás dos dispositivos: YOKE (el volante) y QUAD (las palancas). Esto es normal.\n3. Selecciona YOKE y revisa que el perfil mostrado corresponda a Default/Predeterminado. Después haz lo mismo con QUAD. El perfil de MSFS y el perfil físico deben coincidir.\n4. Si el perfil predeterminado ya tiene las acciones asignadas, no las borres ni las reasignes: esta lección es para reconocerlas y comprobarlas.' },
      { kind: 'APRENDE', title: 'Mapa de asignaciones: YOKE', content: 'Mueve el VOLANTE a izquierda/derecha → busca “Aileron Axis”; inclina las alas.\nEmpuja o tira el VOLANTE → busca “Elevator Axis”; baja o sube el morro.\nGATILLO IZQUIERDO (LT) y GATILLO DERECHO (RT) → “Rudder Axis”; giran el timón de dirección.\nB2, en el mango derecho → “Brakes”; frena.\nHAT derecho ARRIBA/ABAJO → “Decrease Flaps” / “Increase Flaps”.\nHAT derecho IZQUIERDA → “Parking Brake”.\nNo memorices todo: mira la ilustración y prueba solo un mando a la vez.' },
      { kind: 'APRENDE', title: 'Mapa de asignaciones: QUAD', content: 'PALANCA NEGRA → “Throttle 1 Axis” o “Throttle Axis”: potencia del motor.\nPALANCA AZUL y PALANCA ROJA: en el perfil Default pueden quedar sin asignar; no las configures todavía. Más adelante aprenderás a usar Propeller y Mixture.\nRUEDA TRIM → “Elevator Trim”: sirve para quitar presión del yoke cuando ya estás en vuelo estable. No la muevas al azar en esta primera configuración.' },
      { kind: 'ERRORES COMUNES', title: 'Regla importante antes de asignar', content: 'Si una acción ya aparece asignada, primero pruébala. Solo usa “buscar entrada” cuando la acción esté vacía o sea incorrecta. Asignar de nuevo un eje que ya existe puede dejar un duplicado. Para aprender el C172 no necesitas tocar B3–B12, los botones de autopilot ni las palancas grandes del cuadrante.' },
    ] as Lesson['sections'],
    checklist: ['Perfil físico Default/Predeterminado seleccionado', 'YOKE identificado en MSFS', 'QUAD identificado en MSFS', 'Volante, gatillos, B2 y HAT derecho ubicados', 'Palancas negra, azul, roja y rueda Trim ubicadas'],
    exercise: { title: 'No asignes todavía: verifica el mapa', instructions: 'Con el C172 detenido, selecciona primero YOKE y observa la línea “Aileron Axis”; gira el volante. Luego selecciona “Elevator Axis” y empuja/tira. Repite con QUAD y “Throttle 1 Axis” moviendo solo la palanca negra. Si las barras se mueven y el sentido es correcto, ya está asignado: no modifiques nada.' },
  },
  'initial-controls-check': {
    estimatedTime: '30 min',
    sections: [
      { kind: 'PROCEDIMIENTO', title: 'Comprueba y asigna solo si falta algo', content: 'Hazlo con el avión detenido y freno de estacionamiento aplicado.\n1. En YOKE, busca “Aileron Axis”. Gira el volante: si la barra no se mueve, pulsa buscar entrada y gira el volante; confirma.\n2. Busca “Elevator Axis”. Empuja/tira: si no se mueve, asigna ese movimiento.\n3. Busca “Brakes”. Pulsa B2.\n4. Busca “Parking Brake”. Pulsa HAT derecho a la izquierda.\n5. Busca “Increase Flaps” y “Decrease Flaps”. Pulsa HAT derecho abajo y arriba, respectivamente.\n6. En QUAD, busca “Throttle 1 Axis”. Mueve únicamente la palanca negra.\n7. Si tienes pedales, asígnalos a “Rudder Axis”. Si no tienes pedales, comprueba LT y RT en el yoke.' },
      { kind: 'APRENDE', title: 'Cómo saber si una asignación quedó bien', content: 'Barra se mueve al usar el mando correcto: bien.\nBarra se mueve al usar dos mandos distintos: hay un duplicado; elimina la entrada adicional del perfil de entrenamiento.\nBarra se mueve en sentido contrario: abre el engranaje de esa acción y marca Reverse Axis.\nNo se mueve: usa buscar entrada una vez, mueve el mando hasta el final y confirma.\nNo continúes al siguiente paso hasta resolver el mando actual.' },
      { kind: 'ERRORES COMUNES', title: 'Qué puedes dejar sin tocar hoy', content: 'No asignes el tren de aterrizaje: el C172 de entrenamiento tiene tren fijo. No asignes autopiloto, spoilers, reversa, botones B3–B12 ni las palancas grandes del cuadrante. Esos sistemas se introducirán cuando tengan sentido en una lección.' },
    ] as Lesson['sections'],
    checklist: ['Aileron Axis comprobado', 'Elevator Axis comprobado', 'B2 frenos comprobado', 'HAT derecho hacia la izquierda para freno de estacionamiento comprobado', 'HAT arriba/abajo para flaps comprobado', 'Palanca negra para Throttle Axis comprobada', 'Rudder comprobado con pedales o LT/RT'],
    exercise: { title: 'Las siete asignaciones de principiante', instructions: 'Tu único objetivo es que estas siete funciones respondan: Aileron Axis, Elevator Axis, Rudder Axis, Brakes, Parking Brake, Increase/Decrease Flaps y Throttle 1 Axis. Termina la lección solo cuando sepas qué pieza física corresponde a cada nombre.' },
  },
}

const c172NormalProcedures: Record<string, Partial<Lesson>> = {
  'c172-cold-dark': {
    estimatedTime: '15 min',
    sections: [
      { kind: 'PROCEDIMIENTO', title: 'Crea el escenario correcto en MSFS 2024', content: '1. Entra a Vuelo libre.\n2. Elige Cessna 172 Skyhawk G1000. Esta será la única versión usada en estas lecciones.\n3. Selecciona SKCL · Alfonso Bonilla Aragón, Cali, y una posición de plataforma o estacionamiento; no elijas pista.\n4. En el selector de estado de inicio elige Parked / Shutdown / Cold & Dark, según cómo aparezca en tu versión. No selecciones Ready to Taxi ni una posición en el aire.\n5. Elige día, cielo despejado y viento ligero. Inicia el vuelo.' },
      { kind: 'APRENDE', title: 'Cómo reconocer el estado apagado', content: 'Estás en el estado correcto si el motor está silencioso, la hélice no gira, las pantallas están negras y el avión permanece quieto en plataforma. Puedes usar el ratón para todos los interruptores de estas secciones; no necesitas configurar el VelocityOne.' },
      { kind: 'ERRORES COMUNES', title: 'Si aparece el motor encendido', content: 'No intentes “apagarlo y empezar” todavía: volveremos al menú y elegiremos una posición de plataforma con estado apagado. La práctica solo cuenta si empiezas con la hélice detenida. MSFS puede mostrar los nombres del estado en inglés incluso con el juego en español.' },
    ] as Lesson['sections'],
    checklist: ['Vuelo libre seleccionado', 'Cessna 172 Skyhawk G1000 seleccionado', 'Posición de plataforma elegida', 'Estado Parked, Shutdown o Cold & Dark elegido', 'Motor apagado y pantallas negras al entrar'],
    exercise: { title: 'Llegar al punto cero', instructions: 'No enciendas nada. Mira el avión desde fuera y luego entra a la cabina. Señala mentalmente tres evidencias: hélice detenida, pantallas negras y motor silencioso. Ese es el punto cero desde el que siempre empezará esta ruta.' },
  },
  'c172-before-start': {
    estimatedTime: '25 min',
    sections: [
      { kind: 'PROCEDIMIENTO', title: 'Flujo antes de encender: hazlo en este orden', content: 'Usa el ratón y lee un paso antes de tocarlo.\n1. Freno de estacionamiento: aplicado. Así el avión no se moverá al encender.\n2. Asientos, cinturones y puertas: confirma que están asegurados en la cabina. En MSFS basta con cerrar la puerta si estuviera abierta.\n3. Selector de combustible: BOTH / Ambos. Es la perilla situada en la parte baja central de cabina; en el simulador puedes acercar la cámara y pasar el cursor hasta ver su etiqueta.\n4. Palanca roja de mezcla: atrás, en IDLE CUTOFF / corte.\n5. Palanca negra de potencia: apenas abierta, aproximadamente el ancho de un dedo.\n6. Avionics: OFF. Deja radios y pantallas de navegación sin activar por ahora.\n7. Batería y alternador (MASTER): ON. Las pantallas pueden encenderse; es normal.\n8. Luz BEACON: ON, la luz roja intermitente que avisa que vas a arrancar.' },
      { kind: 'APRENDE', title: 'Qué estás preparando, en lenguaje simple', content: 'Combustible en BOTH significa que el motor puede recibir combustible de los tanques. Mezcla en corte evita que el motor arranque antes de tiempo. La palanca negra deja pasar una cantidad pequeña de aire. MASTER da energía eléctrica. BEACON es una señal visual de que el motor va a encenderse. No necesitas memorizar estas palabras: sigue la lista y luego irán teniendo sentido.' },
      { kind: 'ERRORES COMUNES', title: 'No continúes si algo no coincide', content: 'No uses el interruptor de arranque todavía si la palanca roja no está atrás o si el freno no está aplicado. Si no encuentras un control, no pulses todos los botones: usa la cámara para acercarte y pasa lentamente el cursor sobre cada interruptor hasta que MSFS muestre su nombre.' },
    ] as Lesson['sections'],
    checklist: ['Freno de estacionamiento aplicado', 'Puerta cerrada', 'Fuel Selector en BOTH / Ambos', 'Mezcla roja en IDLE CUTOFF / corte', 'Potencia negra apenas abierta', 'Avionics en OFF', 'MASTER en ON', 'BEACON en ON'],
    exercise: { title: 'Cabina lista, motor aún apagado', instructions: 'Completa los ocho pasos y detente. Debes tener energía eléctrica y el motor aún apagado. No continúes por intuición: compara cada elemento con la checklist, marca cada casilla y solo después abre la siguiente lección.' },
  },
  'c172-engine-start': {
    estimatedTime: '20 min',
    sections: [
      { kind: 'PROCEDIMIENTO', title: 'Arranque normal del C172 G1000', content: 'Parte de la cabina lista de la lección anterior.\n1. Bomba eléctrica de combustible: ON.\n2. Mueve la mezcla roja a FULL RICH / rica solo unos segundos, hasta que el indicador de flujo de combustible se estabilice.\n3. Devuelve la mezcla roja a IDLE CUTOFF / corte.\n4. Bomba eléctrica: OFF.\n5. Mira fuera de la cabina y confirma que el área frente a la hélice está libre. En el simulador es una comprobación visual.\n6. Gira la llave de ignición a START y mantenla solo hasta que el motor empiece a girar y encender.\n7. Al encender, suelta la llave: debe volver a BOTH. Lleva suavemente la mezcla a FULL RICH / rica.\n8. Ajusta la palanca negra para estabilizar el motor cerca de 1.000 RPM.' },
      { kind: 'APRENDE', title: 'La señal de que funcionó', content: 'Verás la hélice girar, escucharás el motor y aparecerán lecturas activas en la pantalla. “Rica” no es un ajuste de potencia: permite que el motor reciba combustible para mantenerse encendido después de arrancar. La llave no se queda en START; vuelve a BOTH cuando la sueltas.' },
      { kind: 'ERRORES COMUNES', title: 'Si el motor no arranca', content: 'Detente y vuelve a comprobar: combustible en BOTH, mezcla en corte antes de girar START, bomba usada solo para cebar y MASTER encendido. No mantengas START indefinidamente ni hagas muchos intentos seguidos. En simulación, reinicia el escenario si no puedes identificar qué paso se omitió.' },
    ] as Lesson['sections'],
    checklist: ['Bomba de combustible usada para cebar', 'Mezcla volvió a corte antes de START', 'Área de hélice comprobada visualmente', 'Llave soltada en BOTH tras el arranque', 'Mezcla llevada a rica tras encender', 'Motor estabilizado cerca de 1.000 RPM'],
    exercise: { title: 'Primer arranque completo', instructions: 'Haz el flujo completo sin acelerar. Al escuchar el motor, no ruedes ni despegues. Solo estabilízalo cerca de 1.000 RPM y mantén el freno aplicado. El objetivo es entender el orden, no ir rápido.' },
  },
  'c172-after-start': {
    estimatedTime: '18 min',
    sections: [
      { kind: 'PROCEDIMIENTO', title: 'Comprobación inmediata después del arranque', content: '1. Mira la pantalla del motor y busca presión de aceite: debe subir poco después de encender.\n2. Comprueba que no haya una alerta roja persistente relacionada con el motor.\n3. Confirma que el sistema eléctrico está cargando: batería/alternador deben mostrar que reciben energía.\n4. Enciende AVIONICS para habilitar los equipos de navegación y comunicación.\n5. Verifica que ambas pantallas G1000 estén encendidas y sin una X roja grande.\n6. Mantén freno de estacionamiento aplicado. Todavía no rodamos: el siguiente bloque del curso será taxi y prueba de frenos.' },
      { kind: 'APRENDE', title: 'Qué estás comprobando', content: 'La presión de aceite confirma que el motor está lubricándose. La carga eléctrica confirma que la batería no se está agotando. Las pantallas G1000 muestran navegación y estado del avión. Una alerta roja persistente no se ignora: en simulación, pausa y reinicia el escenario mientras aprendes.' },
      { kind: 'ERRORES COMUNES', title: 'Encender no significa salir rodando', content: 'No quites el freno ni aceleres todavía. Arrancar, comprobar y rodar son tres fases distintas. La disciplina de detenerse tras el arranque es justamente lo que hace que el procedimiento sea realista y repetible.' },
    ] as Lesson['sections'],
    checklist: ['Presión de aceite subió tras el arranque', 'Sin alerta roja persistente del motor', 'Sistema eléctrico cargando', 'AVIONICS encendido', 'Pantallas G1000 activas', 'Freno de estacionamiento sigue aplicado'],
    exercise: { title: 'Motor listo, avión detenido', instructions: 'Después del arranque, espera unos segundos y realiza los seis chequeos. No ruedes. Cuando todo esté correcto, pausa el simulador y marca la lección como completada. Ya habrás encendido el C172 desde apagado y comprobado que está sano para continuar.' },
  },
}

const c172GroundProcedures: Record<string, Partial<Lesson>> = {
  'airport-map-basics': {
    estimatedTime: '18 min',
    sections: [
      { kind: 'APRENDE', title: 'Cuatro lugares que debes reconocer', content: 'PLATAFORMA: donde el avión está estacionado; aquí empiezas y terminas.\nCALLE DE RODAJE: el camino por el que el avión se mueve lentamente en tierra; suele tener una línea central amarilla.\nPISTA: la franja larga destinada a despegar y aterrizar; no entres por ahora.\nLÍNEA DE ESPERA: dos líneas amarillas continuas y dos discontinuas antes de una pista. Siempre te detienes del lado de las líneas continuas hasta que el simulador/ATC te autorice a cruzar.' },
      { kind: 'PROCEDIMIENTO', title: 'Mira el mapa antes de liberar el freno', content: '1. En la pantalla de Vuelo libre, antes de iniciar, observa el punto de salida seleccionado: debe ser una plataforma.\n2. Identifica la pista principal: tiene un número grande, por ejemplo 01 o 19.\n3. Mira el trayecto entre plataforma y pista: las calles de rodaje conectan ambos lugares.\n4. Ya dentro del avión, mira hacia fuera: encuentra la línea amarilla de la calle y la zona amplia de pista.\n5. No memorices letras ni números todavía. Solo debes distinguir “estacionamiento”, “camino amarillo” y “pista”.' },
      { kind: 'ERRORES COMUNES', title: 'La pista no es el primer destino', content: 'No sigas una carretera de servicio ni cruces una línea de espera solo porque ves mucho espacio. La línea de espera es el punto de pausa: significa “detente aquí hasta saber qué sigue”.' },
    ] as Lesson['sections'],
    checklist: ['Plataforma identificada', 'Calle de rodaje identificada', 'Pista identificada', 'Línea de espera identificada', 'Avión sigue detenido'],
    exercise: { title: 'Orientación sin mover el avión', instructions: 'Con el motor encendido y freno aplicado, localiza desde la cabina la plataforma, una línea amarilla de taxi y la pista a distancia. No ruedes. El resultado correcto es poder señalar hacia dónde está cada lugar.' },
  },
  'airport-radio-basics': {
    estimatedTime: '15 min',
    sections: [
      { kind: 'APRENDE', title: 'En MSFS no tienes que hablar por micrófono', content: 'Para este curso usarás el panel de Comunicaciones de MSFS. El simulador muestra opciones de texto: tú eliges una y el ATC responde. No debes memorizar frases ni sintonizar frecuencias manualmente todavía. La radio sirve para pedir una ruta de taxi y saber dónde debes detenerte.' },
      { kind: 'PROCEDIMIENTO', title: 'Solicita taxi con la ayuda del simulador', content: '1. Mueve el cursor a la parte superior de la pantalla para mostrar la barra de herramientas.\n2. Pulsa el icono de globo de diálogo llamado Communications / Comunicaciones.\n3. En el panel, elige el aeropuerto actual y busca la opción Ground / Tierra o Request Taxi for Departure / Solicitar taxi para salida.\n4. Selecciona esa opción. MSFS puede dibujar una guía o flechas azules sobre la ruta.\n5. Lee el resultado: si aparece Hold Short, significa detenerse antes de la pista. No cruces esa línea hasta recibir una instrucción posterior.' },
      { kind: 'ERRORES COMUNES', title: 'La ayuda azul no reemplaza mirar', content: 'Las flechas son una ayuda para aprender, no un permiso para cruzar una pista. Si la ruta visual parece confusa, detente en la línea de espera. Para esta etapa puedes mantener las ayudas de taxi activas.' },
    ] as Lesson['sections'],
    checklist: ['Panel Comunicaciones abierto', 'Aeropuerto actual seleccionado', 'Solicitud de taxi enviada', 'Ruta visual o respuesta de ATC observada', 'Significado de Hold Short entendido', 'Freno sigue aplicado antes de la práctica de taxi'],
    exercise: { title: 'Pide taxi sin moverte', instructions: 'Abre Comunicaciones y solicita taxi para salida, pero no sueltes el freno todavía. Solo observa la respuesta y localiza la primera dirección de la ruta. En la siguiente lección usarás esa información para rodar despacio.' },
  },
  'c172-taxi-basics': {
    estimatedTime: '20 min',
    sections: [
      { kind: 'APRENDE', title: 'Rodar no es volar', content: 'Taxi significa mover el avión lentamente por la plataforma o calle de rodaje. Todavía no vas a la pista ni despegarás. El objetivo de esta lección es sentir que puedes iniciar el movimiento, mantenerlo lento y detenerlo exactamente donde quieres.' },
      { kind: 'PROCEDIMIENTO', title: 'Primer movimiento, sin prisa', content: '1. Con el motor estable y el freno de estacionamiento aplicado, mira que tengas espacio delante.\n2. Suelta el freno de estacionamiento con el ratón en cabina.\n3. Aumenta apenas la potencia; el C172 empezará a rodar lentamente. No busques una cifra exacta: si se mueve demasiado rápido, reduce potencia.\n4. Usa el control de dirección que MSFS ya reconoce para mantenerte sobre la calle de rodaje o plataforma. No cambies asignaciones en esta lección.\n5. Prueba los frenos suavemente una vez.\n6. Detén el avión, deja potencia al mínimo y vuelve a aplicar el freno de estacionamiento.' },
      { kind: 'ERRORES COMUNES', title: 'Si no puedes mantenerlo lento', content: 'No aceleres para corregir dirección. Primero reduce potencia; después detén el avión con frenos. Si tu control de dirección no responde, detente y no intentes despegar: ese problema pertenece a la configuración del simulador y no a esta práctica de vuelo.' },
    ] as Lesson['sections'],
    checklist: ['Motor estable al ralentí', 'Espacio libre delante del avión', 'Freno de estacionamiento soltado', 'Movimiento iniciado con potencia mínima', 'Frenos probados', 'Avión detenido y freno aplicado de nuevo'],
    exercise: { title: 'Avanza, frena y detente', instructions: 'Rueda una distancia corta en la plataforma, equivalente a unos pocos largos de avión. Detente de forma controlada. Repite una vez. No vayas a la pista y no intentes levantar el morro: esta es una lección de suelo.' },
  },
  'c172-engine-runup': {
    estimatedTime: '25 min',
    sections: [
      { kind: 'PROCEDIMIENTO', title: 'Prueba de motor: avión detenido', content: '1. Detén el C172 en una zona amplia, lejos de otros aviones. Aplica el freno de estacionamiento.\n2. Confirma combustible en BOTH / Ambos, mezcla en RICH / rica y flaps arriba.\n3. Lleva la potencia a aproximadamente 1.800 RPM y observa que las lecturas del motor permanezcan estables.\n4. Enciende y apaga cada magneto usando la llave de ignición: pasa de BOTH a un lado, vuelve a BOTH, pasa al otro lado y vuelve a BOTH. Debe haber una pequeña caída de RPM, no una caída extrema.\n5. Regresa la potencia a cerca de 1.000 RPM.\n6. Si aparece una alerta persistente o el motor no responde con normalidad, pausa y reinicia el escenario; no continúes a la pista.' },
      { kind: 'APRENDE', title: 'Por qué se hace esta prueba', content: 'La prueba de motor no es para hacerlo sonar fuerte. Sirve para comprobar que el motor responde antes de depender de él en el despegue. Las magnetos son dos fuentes de encendido: se prueban una por una y siempre se termina de nuevo en BOTH.' },
      { kind: 'ERRORES COMUNES', title: 'No hagas el run-up mientras ruedas', content: 'El run-up se hace completamente detenido y con freno aplicado. No mantengas el motor a 1.800 RPM más tiempo del necesario. Cuando termine la comprobación, vuelve a ralentí; aún no hay autorización para despegar.' },
    ] as Lesson['sections'],
    checklist: ['Zona amplia elegida', 'Freno de estacionamiento aplicado', 'Fuel BOTH y mezcla RICH confirmados', 'Prueba a aproximadamente 1.800 RPM realizada', 'Magnetos revisadas y llave devuelta a BOTH', 'Motor estabilizado de nuevo cerca de 1.000 RPM'],
    exercise: { title: 'Motor comprobado, avión inmóvil', instructions: 'Realiza una sola prueba corta. Mantén el avión quieto, observa las RPM y termina de vuelta al ralentí. No ruedes a la pista todavía: el siguiente paso será la checklist final de tierra.' },
  },
  'c172-before-takeoff': {
    estimatedTime: '18 min',
    sections: [
      { kind: 'PROCEDIMIENTO', title: 'Checklist final antes de ir a la pista', content: 'Con el C172 detenido y el motor a ralentí:\n1. Fuel Selector: BOTH / Ambos.\n2. Mixture: FULL RICH / rica.\n3. Flaps: UP / arriba para este primer despegue.\n4. Elevator Trim: TAKEOFF / neutro.\n5. Puertas y cinturones: asegurados.\n6. Pantallas G1000: encendidas, sin alerta roja persistente.\n7. Altímetro: comprueba que su lectura sea razonable para la altitud del aeropuerto.\n8. Freno de estacionamiento sigue aplicado. La lección termina aquí.' },
      { kind: 'APRENDE', title: 'Estar listo no significa despegar ya', content: 'Una checklist antes de despegue prepara el avión, pero la siguiente acción todavía será rodar hasta la pista, revisar que está libre y solo entonces comenzar el despegue. Separar estos pasos evita sentir que todo ocurre de golpe.' },
      { kind: 'ERRORES COMUNES', title: 'No marques la lección mientras ruedas', content: 'Haz esta lista detenido. Si ya estás en la pista, vuelve a una zona segura o reinicia la práctica. El aprendizaje correcto hoy es poder llegar a “listo para ir a la pista” sin despegar por accidente.' },
    ] as Lesson['sections'],
    checklist: ['Fuel BOTH confirmado', 'Mezcla FULL RICH confirmada', 'Flaps arriba', 'Trim en posición de despegue o neutra', 'Puertas y cinturones asegurados', 'G1000 sin alerta roja persistente', 'Freno de estacionamiento aplicado al terminar'],
    exercise: { title: 'Punto de pausa antes del vuelo', instructions: 'Completa la checklist final, deja el avión detenido y pausa el simulador. Cuando termines esta lección habrás llegado correctamente al punto previo a rodar hacia la pista. El primer despegue será una sección posterior, no un salto automático.' },
  },
}

const flightSetups: Record<string, NonNullable<Lesson['flightSetup']>> = {
  'how-training-works': setup('SKBO · El Dorado, Bogotá', 'En plataforma', 'Altitud del aeropuerto', 'Preestablecido: despejado', 'Día, 10:00', 'No inicies el vuelo: prepara tu rutina y conoce el entorno.'),
  'prepare-msfs': setup('SKBO · El Dorado, Bogotá', 'En plataforma', 'Altitud del aeropuerto', 'Preestablecido: despejado', 'Día, 10:00', 'Usa una puerta o plataforma tranquila; confirma mandos antes de rodar.'),
  'know-velocityone': setup('SKPE · Matecaña, Pereira', 'En plataforma', 'Altitud del aeropuerto', 'Preestablecido: despejado', 'Día, 10:00', 'Ideal para reconocer mandos con el avión detenido.'),
  'initial-controls-check': setup('SKPE · Matecaña, Pereira', 'En plataforma', 'Altitud del aeropuerto', 'Preestablecido: despejado', 'Día, 10:00', 'Mantén freno de estacionamiento aplicado durante toda la comprobación.'),
  'sensitivity-deadzones': setup('SKCL · Alfonso Bonilla Aragón, Cali', 'En aire', '6,500 ft MSL', 'Preestablecido: despejado, sin viento', 'Día, 10:00', 'Crea una situación estable para observar una entrada cada vez.'),
  'c172-cold-dark': setup('SKCL · Alfonso Bonilla Aragón, Cali', 'Plataforma o estacionamiento', 'Altitud del aeropuerto', 'Preestablecido: despejado, sin viento', 'Día, 09:00', 'Selecciona estado Parked / Shutdown / Cold & Dark; la hélice debe estar detenida.'),
  'c172-before-start': setup('SKCL · Alfonso Bonilla Aragón, Cali', 'Plataforma, estado apagado', 'Altitud del aeropuerto', 'Preestablecido: despejado, sin viento', 'Día, 09:00', 'Usa el ratón en cabina. No necesitas tocar el controlador.'),
  'c172-engine-start': setup('SKCL · Alfonso Bonilla Aragón, Cali', 'Plataforma, estado apagado', 'Altitud del aeropuerto', 'Preestablecido: despejado, sin viento', 'Día, 09:00', 'Continúa solo después de completar la checklist antes de encender.'),
  'c172-after-start': setup('SKCL · Alfonso Bonilla Aragón, Cali', 'Plataforma, motor al ralentí', 'Altitud del aeropuerto', 'Preestablecido: despejado, sin viento', 'Día, 09:00', 'Mantén el freno aplicado: esta lección termina antes del taxi.'),
  'airport-map-basics': setup('SKCL · Alfonso Bonilla Aragón, Cali', 'Plataforma, motor al ralentí', 'Altitud del aeropuerto', 'Preestablecido: despejado, sin viento', 'Día, 09:00', 'No liberes el freno: la meta es reconocer las zonas del aeropuerto.'),
  'airport-radio-basics': setup('SKCL · Alfonso Bonilla Aragón, Cali', 'Plataforma, motor al ralentí', 'Altitud del aeropuerto', 'Preestablecido: despejado, sin viento', 'Día, 09:00', 'Abre Comunicaciones y solicita taxi, pero no muevas el avión.'),
  'c172-taxi-basics': setup('SKCL · Alfonso Bonilla Aragón, Cali', 'Plataforma, motor al ralentí', 'Altitud del aeropuerto', 'Preestablecido: despejado, sin viento', 'Día, 09:00', 'No vayas a la pista: rueda una distancia corta y vuelve a detenerte.'),
  'c172-engine-runup': setup('SKCL · Alfonso Bonilla Aragón, Cali', 'Plataforma o zona amplia, motor encendido', 'Altitud del aeropuerto', 'Preestablecido: despejado, sin viento', 'Día, 09:00', 'Haz la prueba detenido y termina con el motor cerca de 1.000 RPM.'),
  'c172-before-takeoff': setup('SKCL · Alfonso Bonilla Aragón, Cali', 'Plataforma, motor al ralentí', 'Altitud del aeropuerto', 'Preestablecido: despejado, sin viento', 'Día, 09:00', 'Esta sección termina listo para rodar; no incluye despegue.'),
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

course.forEach((level) => level.modules.forEach((module) => module.lessons.forEach((lesson) => Object.assign(lesson, lessonDetails[lesson.id], practicalLevelZeroDetails[lesson.id], velocityOneC172Details[lesson.id], c172NormalProcedures[lesson.id], c172GroundProcedures[lesson.id], { flightSetup: flightSetups[lesson.id] }))))

export const lessonOrder = course.flatMap((level) => level.modules.flatMap((module) => module.lessons.map((lesson) => lesson.id)))
export const getLesson = (id: string) => course.flatMap((level) => level.modules).flatMap((module) => module.lessons).find((lesson) => lesson.id === id)
