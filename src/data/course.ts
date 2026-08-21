import type { CourseLevel, Lesson } from "../types/course";

const makeLesson = (
  id: string,
  title: string,
  description: string,
  level: number,
  moduleTitle: string,
  objectives: string[],
  focus: string,
): Lesson => ({
  id,
  title,
  description,
  level,
  moduleTitle,
  estimatedTime: "10–15 min",
  objectives,
  sections: [
    {
      kind: "APRENDE",
      title: "Tu siguiente paso",
      content: `Esta lección te introduce a ${focus} con una explicación breve y enfocada en la práctica.`,
    },
    {
      kind: "ENTIENDE",
      title: "Antes de sentarte a volar",
      content:
        "No necesitas memorizarlo todo. Identifica las ideas principales, observa los controles y avanza a tu propio ritmo.",
    },
    {
      kind: "PRUÉBALO EN MSFS",
      title: "Llévalo al simulador",
      content:
        "Abre Microsoft Flight Simulator 2024 en un entorno tranquilo y realiza este paso sin presión. Repite la práctica las veces que necesites.",
    },
    {
      kind: "ERRORES COMUNES",
      title: "Mantén el proceso simple",
      content:
        "Evita cambiar varias configuraciones a la vez. Haz un cambio, pruébalo y toma nota de cómo se siente el control.",
    },
  ],
  checklist: [
    "Revisé el objetivo de la lección",
    "Preparé mi simulador y controles",
    "Realicé la práctica propuesta",
    "Anoté una duda o aprendizaje",
  ],
  exercise: {
    title: "Práctica guiada",
    instructions: `Dedica unos minutos a reconocer ${focus} dentro de tu cabina virtual. No hay una puntuación: el objetivo es familiarizarte con el proceso.`,
  },
  prerequisites: [],
});

export const course: CourseLevel[] = [
  {
    id: "level-0",
    number: 0,
    title: "Preparación",
    description: "Prepara tu entorno de simulación y tus controles.",
    modules: [
      {
        id: "welcome",
        title: "Bienvenido a Flight Academy",
        description: "La forma de aprender dentro de la academia.",
        lessons: [
          makeLesson(
            "how-training-works",
            "Cómo funcionará tu entrenamiento",
            "Conoce la ruta de aprendizaje práctica que seguirás desde cero.",
            0,
            "Bienvenido a Flight Academy",
            [
              "Reconocer las etapas de cada lección",
              "Saber cómo registrar tu progreso",
              "Preparar una rutina de práctica",
            ],
            "la estructura de tu entrenamiento",
          ),
        ],
      },
      {
        id: "msfs-prep",
        title: "Preparación de MSFS 2024",
        description: "Deja el simulador listo para aprender.",
        lessons: [
          makeLesson(
            "prepare-msfs",
            "Preparando Microsoft Flight Simulator 2024",
            "Revisa tu entorno de simulación antes de tu primera práctica.",
            0,
            "Preparación de MSFS 2024",
            [
              "Identificar un entorno adecuado para practicar",
              "Comprender qué revisar antes de una sesión",
            ],
            "la preparación de Microsoft Flight Simulator 2024",
          ),
        ],
      },
      {
        id: "velocityone",
        title: "VelocityOne Flight",
        description: "Conoce tu sistema de control antes de configurarlo.",
        lessons: [
          makeLesson(
            "know-velocityone",
            "Conociendo tu VelocityOne",
            "Identifica las áreas principales de tu Turtle Beach VelocityOne Flight.",
            0,
            "VelocityOne Flight",
            [
              "Ubicar los grupos principales de controles",
              "Entender por qué cada control importa",
            ],
            "los grupos de control del VelocityOne",
          ),
          makeLesson(
            "initial-controls-check",
            "Verificación inicial de controles",
            "Haz una comprobación básica de tus controles antes de volar.",
            0,
            "VelocityOne Flight",
            [
              "Seguir una comprobación ordenada",
              "Detectar comportamientos que debas revisar",
            ],
            "la verificación inicial de los controles",
          ),
          makeLesson(
            "sensitivity-deadzones",
            "Concepto de sensibilidad y zonas muertas",
            "Comprende los conceptos antes de ajustar cualquier valor.",
            0,
            "VelocityOne Flight",
            [
              "Distinguir sensibilidad y zonas muertas",
              "Entender por qué se deben verificar los ajustes",
            ],
            "sensibilidad y zonas muertas",
          ),
        ],
      },
    ],
  },
  {
    id: "level-1",
    number: 1,
    title: "Alumno Piloto",
    description: "Tus primeros conceptos y prácticas con el Cessna 172.",
    modules: [
      {
        id: "cockpit-basics",
        title: "La cabina desde cero",
        description: "Aprende a leer la pantalla antes de tocar los mandos.",
        lessons: [
          makeLesson(
            "c172-instruments-first",
            "La pantalla del Cessna: qué estás viendo",
            "Un recorrido sin vuelo: identifica los instrumentos que te dicen si el avión va rápido, alto, recto o girando.",
            1,
            "La cabina desde cero",
            [
              "Saber qué instrumento mirar para velocidad, altura y actitud",
              "Distinguir información esencial de información que puede esperar",
              "Leer la cabina sin mover el avión",
            ],
            "los instrumentos básicos del Cessna 172",
          ),
          makeLesson(
            "c172-controls-first",
            "Las palancas del Cessna: para qué sirve cada una",
            "Ubica los mandos principales y aprende qué no debes mover todavía.",
            1,
            "La cabina desde cero",
            [
              "Reconocer potencia, mezcla, flaps y trim",
              "Saber qué mando usar en cada situación básica",
              "Mantener el avión detenido mientras exploras",
            ],
            "los mandos básicos del Cessna 172",
          ),
        ],
      },
      {
        id: "c172-contact",
        title: "Primer contacto con el Cessna 172",
        description: "Primeros pasos en tu aeronave de entrenamiento.",
        lessons: [
          makeLesson(
            "know-c172",
            "Conoce tu Cessna 172",
            "Familiarízate con la cabina y el papel del avión de entrenamiento.",
            1,
            "Primer contacto con el Cessna 172",
            [
              "Reconocer la cabina como espacio de trabajo",
              "Identificar el propósito de una aeronave de entrenamiento",
            ],
            "tu Cessna 172",
          ),
          makeLesson(
            "three-axes",
            "Los tres ejes del avión",
            "Descubre cómo se mueve un avión en sus tres ejes básicos.",
            1,
            "Primer contacto con el Cessna 172",
            [
              "Identificar los tres ejes del avión",
              "Relacionarlos con los controles principales",
            ],
            "los tres ejes del avión",
          ),
          makeLesson(
            "throttle-power",
            "Throttle y potencia",
            "Comprende el papel de la potencia dentro de la práctica de vuelo.",
            1,
            "Primer contacto con el Cessna 172",
            [
              "Reconocer el control de potencia",
              "Observar su efecto de forma segura en el simulador",
            ],
            "throttle y potencia",
          ),
          makeLesson(
            "what-is-trim",
            "Qué es el trim",
            "Introduce el trim como una ayuda para mantener el control.",
            1,
            "Primer contacto con el Cessna 172",
            [
              "Identificar el propósito del trim",
              "Reconocer cuándo observar su efecto",
            ],
            "el trim",
          ),
          makeLesson(
            "first-cockpit-exercise",
            "Primer ejercicio en cabina",
            "Una práctica tranquila para reunir los primeros conceptos.",
            1,
            "Primer contacto con el Cessna 172",
            [
              "Aplicar lo observado en la cabina",
              "Completar tu primera práctica guiada",
            ],
            "tu primera práctica en cabina",
          ),
        ],
      },
    ],
  },
  ...[2, 3, 4, 5, 6, 7].map((number) => ({
    id: `level-${number}`,
    number,
    title: [
      "Piloto VFR",
      "Navegación",
      "Piloto IFR",
      "Transición a Airbus",
      "A320",
      "Operaciones A320",
    ][number - 2],
    description: "Contenido próximo en la ruta de Flight Academy.",
    modules: [],
  })),
];

const levelTwo = course.find((level) => level.number === 2);
if (levelTwo) {
  levelTwo.description =
    "Domina las maniobras esenciales y completa tus primeros vuelos visuales con seguridad.";
  levelTwo.modules.push({
    id: "vfr-foundations",
    title: "Fundamentos VFR",
    description: "Control, circuito y navegación visual para vuelos cortos.",
    lessons: [
      makeLesson(
        "straight-and-level",
        "Vuelo recto y nivelado",
        "Mantén rumbo, altitud y potencia de forma estable.",
        2,
        "Fundamentos VFR",
        [
          "Establecer una actitud de crucero",
          "Mantener rumbo y altitud",
          "Usar el trim para reducir esfuerzo",
        ],
        "el vuelo recto y nivelado",
      ),
      makeLesson(
        "turns-and-coordination",
        "Virajes coordinados",
        "Practica virajes suaves sin perder el control de la aeronave.",
        2,
        "Fundamentos VFR",
        [
          "Iniciar y salir de un viraje",
          "Vigilar altitud y velocidad",
          "Coordinar los mandos",
        ],
        "los virajes coordinados",
      ),
      makeLesson(
        "airport-traffic-pattern",
        "El circuito de tránsito",
        "Aprende la secuencia básica alrededor de un aeropuerto.",
        2,
        "Fundamentos VFR",
        [
          "Reconocer los tramos del circuito",
          "Planear una aproximación estable",
          "Mantener separación y orden",
        ],
        "el circuito de tránsito",
      ),
      makeLesson(
        "c172-approach-setup",
        "Preparar la aproximaciÃ³n",
        "Reduce velocidad, usa flaps por etapas y construye una final ordenada.",
        2,
        "Fundamentos VFR",
        [
          "Reconocer el momento de configurar el aviÃ³n",
          "Usar potencia y flaps por etapas",
          "Llegar estabilizado a final",
        ],
        "la preparaciÃ³n de una aproximaciÃ³n",
      ),
      makeLesson(
        "c172-landing",
        "Aterrizaje paso a paso",
        "Aprende quÃ© mirar, cuÃ¡ndo reducir potencia y cÃ³mo dejar que el C172 aterrice.",
        2,
        "Fundamentos VFR",
        [
          "Mantener una velocidad de aproximaciÃ³n adecuada",
          "Hacer redondeo suave",
          "Controlar el aviÃ³n despuÃ©s de tocar pista",
        ],
        "el aterrizaje del Cessna 172",
      ),
      makeLesson(
        "c172-go-around",
        "Frustrada: decidir no aterrizar",
        "Aprende a abandonar una aproximaciÃ³n inestable de forma ordenada.",
        2,
        "Fundamentos VFR",
        [
          "Reconocer una aproximaciÃ³n inestable",
          "Aplicar potencia y ascender",
          "Reconfigurar el aviÃ³n con calma",
        ],
        "la maniobra de frustrada",
      ),
      makeLesson(
        "first-vfr-navigation",
        "Tu primera navegación VFR",
        "Sigue una ruta corta usando referencias visuales y el mapa.",
        2,
        "Fundamentos VFR",
        [
          "Planear una ruta sencilla",
          "Identificar referencias en tierra",
          "Corregir el rumbo con calma",
        ],
        "la navegación visual",
      ),
      makeLesson(
        "vfr-consolidation",
        "Vuelo VFR de consolidación",
        "Une lo aprendido en un vuelo corto de principio a fin.",
        2,
        "Fundamentos VFR",
        [
          "Preparar un vuelo corto",
          "Aplicar control y navegación",
          "Revisar tu desempeño",
        ],
        "un vuelo VFR completo",
      ),
    ],
  });
}

const levelThree = course.find((level) => level.number === 3);
if (levelThree) {
  levelThree.title = "Navegación y automatización";
  levelThree.description = "Planifica, navega y usa las ayudas del C172 sin dejar de pilotar.";
  levelThree.modules.push({
    id: "navigation-foundations",
    title: "Sección 8 · Navegación en el C172",
    description: "Mapa, VOR, GPS G1000 y piloto automático, en una secuencia única.",
    lessons: [
      makeLesson("vfr-map-route", "Mapa VFR: dibuja tu ruta antes de salir", "Usa el EFB para entender origen, destino, rumbo y referencias antes de encender.", 3, "Sección 8 · Navegación en el C172", ["Identificar origen y destino", "Leer rumbo y distancia", "Elegir referencias visuales"], "el mapa VFR"),
      makeLesson("nav-time-fuel", "Rumbo, tiempo y combustible restante", "Convierte una ruta corta en un plan que puedas seguir y comprobar en vuelo.", 3, "Sección 8 · Navegación en el C172", ["Estimar tiempo de ruta", "Calcular combustible con reserva", "Revisar el plan durante el vuelo"], "el cálculo VFR básico"),
      makeLesson("vor-dme-basics", "VOR y DME desde cero", "Sintoniza una estación, interpreta radial, TO/FROM y distancia sin adivinar.", 3, "Sección 8 · Navegación en el C172", ["Entender qué mide un VOR", "Distinguir TO y FROM", "Usar DME como distancia"], "la navegación por radio"),
      makeLesson("g1000-gps-route", "GPS G1000: seguir un plan de vuelo", "Comprueba que GPS guía el CDI y usa el plan sin apartar la vista del vuelo.", 3, "Sección 8 · Navegación en el C172", ["Ver el plan activo", "Confirmar fuente GPS", "Usar Direct-To sin perder orientación"], "el GPS del G1000"),
      makeLesson("c172-autopilot-basics", "Piloto automático: HDG, ALT y NAV", "Aprende a activar cada modo, comprobar qué está haciendo y desconectarlo.", 3, "Sección 8 · Navegación en el C172", ["Preparar rumbo y altitud antes de activar", "Distinguir HDG de NAV", "Supervisar y desconectar"], "el piloto automático básico"),
      makeLesson("navigation-consolidation", "Vuelo de navegación SKCL–SKUL", "Une planificación, mapa, GPS y piloto automático en una ruta corta colombiana.", 3, "Sección 8 · Navegación en el C172", ["Ejecutar una ruta VFR corta", "Cruzar datos entre mapa y cabina", "Mantener control manual como prioridad"], "un vuelo de navegación completo"),
    ],
  });
}

const levelFour = course.find((level) => level.number === 4);
if (levelFour) {
  levelFour.title = "Piloto IFR · fundamentos";
  levelFour.description =
    "Aprende a controlar el C172 por instrumentos antes de seguir procedimientos IFR.";
  levelFour.modules.push(
    {
      id: "ifr-instrument-control",
      title: "Sección 9 · Volar mirando instrumentos",
      description:
        "Del PFD al control estable: primero entiendes, después practicas.",
      lessons: [
        makeLesson(
          "ifr-boundaries",
          "Qué es IFR y qué practicarás aquí",
          "Entiende cuándo mirar instrumentos y por qué este curso es una práctica de simulador, no una autorización real.",
          4,
          "Sección 9 · Volar mirando instrumentos",
          [
            "Distinguir volar visual de volar por instrumentos",
            "Entender por qué se practica primero en aire calmo",
            "Reconocer los límites de una lección de simulador",
          ],
          "los fundamentos y límites del entrenamiento IFR",
        ),
        makeLesson(
          "ifr-pfd-scan",
          "El PFD: tu mirada debe tener un orden",
          "Aprende a leer actitud, velocidad, altitud, rumbo y coordinación sin fijarte en un solo número.",
          4,
          "Sección 9 · Volar mirando instrumentos",
          [
            "Iniciar un escaneo radial del PFD",
            "Detectar una tendencia antes de que crezca",
            "Volver siempre al horizonte artificial",
          ],
          "el escaneo básico del PFD G1000",
        ),
        makeLesson(
          "ifr-straight-level",
          "Recto y nivelado sin mirar afuera",
          "Mantén una altitud, rumbo y velocidad con correcciones pequeñas y deliberadas.",
          4,
          "Sección 9 · Volar mirando instrumentos",
          [
            "Estabilizar actitud y potencia",
            "Mantener 6.500 ft MSL y un rumbo elegido",
            "Corregir una variable por vez",
          ],
          "el vuelo recto y nivelado por instrumentos",
        ),
        makeLesson(
          "ifr-climbs-descents",
          "Ascender y descender con un objetivo",
          "Usa actitud, potencia y trim para cambiar altitud sin perder el control del rumbo.",
          4,
          "Sección 9 · Volar mirando instrumentos",
          [
            "Iniciar un ascenso y una bajada estabilizados",
            "Nivelar antes de la altitud objetivo",
            "Comprobar velocidad y rumbo durante el cambio",
          ],
          "ascensos y descensos por instrumentos",
        ),
        makeLesson(
          "ifr-standard-turns",
          "Virajes por instrumentos: banco, rumbo y salida",
          "Haz virajes suaves y termina en el rumbo previsto sin perseguir la aguja.",
          4,
          "Sección 9 · Volar mirando instrumentos",
          [
            "Usar un banco moderado y coordinado",
            "Anticipar la salida del viraje",
            "Recuperar alas niveladas en el rumbo objetivo",
          ],
          "virajes coordinados por instrumentos",
        ),
      ],
    },
    {
      id: "ifr-procedures",
      title: "Sección 10 · Procedimientos IFR en simulador",
      description:
        "Plan, briefing, aproximación y frustrada: una secuencia que puedes explicar antes de volarla.",
      lessons: [
        makeLesson(
          "ifr-route-briefing",
          "Antes de IFR: plan y briefing",
          "Aprende qué debes saber de una ruta antes de conectar el piloto automático o seguir una indicación.",
          4,
          "Sección 10 · Procedimientos IFR en simulador",
          [
            "Explicar origen, destino, altitud y ruta",
            "Confirmar la fuente GPS antes de navegar",
            "Definir una salida segura si algo no coincide",
          ],
          "el briefing IFR básico",
        ),
        makeLesson(
          "ifr-approach-briefing",
          "Cómo leer una aproximación antes de volarla",
          "Reconoce las partes de un procedimiento sin intentar memorizar una carta completa.",
          4,
          "Sección 10 · Procedimientos IFR en simulador",
          [
            "Identificar el aeropuerto, pista y tipo de aproximación",
            "Encontrar frecuencia, curso y altitudes publicadas",
            "Saber qué harías si no puedes aterrizar",
          ],
          "el briefing de aproximación",
        ),
        makeLesson(
          "ifr-gps-approach",
          "Aproximación GPS: seguir, comprobar, estabilizar",
          "Practica una aproximación GPS en clima bueno; la meta es entender la secuencia, no aterrizar a ciegas.",
          4,
          "Sección 10 · Procedimientos IFR en simulador",
          [
            "Confirmar la aproximación cargada y activa",
            "Vigilar fuente CDI, rumbo y altitud",
            "Decidir temprano entre continuar visual o frustrar",
          ],
          "una aproximación GPS de entrenamiento",
        ),
        makeLesson(
          "ifr-missed-approach",
          "Frustrada IFR: abandonar con un plan",
          "Cuando la pista no está a la vista o la aproximación se desordena, ascender es la decisión correcta.",
          4,
          "Sección 10 · Procedimientos IFR en simulador",
          [
            "Reconocer el momento de frustrar",
            "Aplicar potencia, actitud y ascenso en ese orden",
            "Revisar el procedimiento antes de reintentar",
          ],
          "la frustrada por instrumentos",
        ),
      ],
    },
  );
}

// La transición al reactor se aprende por fases: supervisar, configurar,
// volar y decidir. Las lecciones conservan una única tarea por sesión.
const a320Lesson = (
  id: string, title: string, description: string, level: number,
  moduleTitle: string, objectives: string[], concept: string,
  procedure: string, errors: string, exercise: string,
): Lesson => ({
  id, title, description, level, moduleTitle, objectives,
  estimatedTime: "20–30 min",
  sections: [
    { kind: "APRENDE", title: "Lo que cambia en el A320", content: concept },
    { kind: "PROCEDIMIENTO", title: "Práctica paso a paso", content: procedure },
    { kind: "ERRORES COMUNES", title: "Mantén el control", content: errors },
  ],
  checklist: ["Objetivo revisado", "Escenario confirmado", "Una habilidad practicada", "Resultado anotado"],
  exercise: { title: "Práctica de simulador", instructions: exercise },
  prerequisites: [],
});

const levelFive = course.find((level) => level.number === 5);
if (levelFive) {
  levelFive.title = "Transición al Airbus A320";
  levelFive.description = "Cambia de la lógica del C172 a la del A320 sin perder tus hábitos de piloto.";
  levelFive.modules.push(
    {
      id: "a320-orientation", title: "Sección 11 · Conoce el Airbus",
      description: "La cabina, las pantallas y la automatización antes de iniciar un vuelo.",
      lessons: [
        a320Lesson("a320-mindset", "Del C172 al Airbus: qué cambia", "El A320 automatiza tareas, pero no reemplaza tu supervisión.", 5, "Sección 11 · Conoce el Airbus", ["Distinguir control directo y automatización", "Mantener la prioridad de la trayectoria", "Saber cuándo pausar"], "En el C172 ajustabas sistemas directamente. En el A320 seleccionas objetivos y compruebas qué modo los está cumpliendo. La regla no cambia: primero trayectoria y energía; después pantallas y botones.", "1. Carga el A320neo en plataforma, de día y con clima bueno. 2. Sin encender nada, observa sidestick, palancas de potencia, FCU y pantallas PFD/ND. 3. Busca el FMA arriba del PFD. 4. Pausa y explica qué mirarías si el avión no siguiera lo esperado.", "No memorices todos los sistemas ni inicies un vuelo complejo. Nunca supongas que el avión hace lo que pediste: confirma el modo mostrado en el FMA.", "Localiza PFD, ND, ECAM, FCU, sidestick y thrust levers sin moverlos."),
        a320Lesson("a320-displays", "PFD, ND y ECAM: tres preguntas", "Lee solo la información necesaria para controlar y vigilar el avión.", 5, "Sección 11 · Conoce el Airbus", ["Encontrar actitud, velocidad, altitud y rumbo", "Reconocer el FMA", "Usar ECAM como aviso"], "El PFD responde cómo vuela el avión; el ND responde dónde está y hacia dónde va; ECAM avisa del estado de sistemas. El FMA confirma quién controla velocidad, rumbo y altitud.", "Con el avión estacionado, señala velocidad, horizonte, altitud, rumbo, FMA, ruta en ND y mensajes ECAM. Luego inicia un escenario en aire estable y mira exterior, PFD y ND en ciclos cortos.", "No persigas cada número ni leas ECAM como curiosidad. Si aparece una advertencia relevante, estabiliza el avión y pausa antes de experimentar.", "Durante dos minutos en vuelo estable, alterna exterior → PFD → ND → exterior y nombra el modo FMA."),
        a320Lesson("a320-flight-controls", "Sidestick, trim y protecciones", "Comprende la respuesta del A320 antes de hacer maniobras.", 5, "Sección 11 · Conoce el Airbus", ["Usar entradas pequeñas", "Entender el trim automático", "Reconocer límites de las protecciones"], "El sidestick manda una demanda de actitud; no se siente como el yoke del C172. En ley normal el A320 suele gestionar trim. Las protecciones ayudan dentro de límites, pero no reemplazan decisiones prudentes.", "Inicia en aire calmo, recto y nivelado. Haz una entrada muy pequeña de alabeo, vuelve a neutro y espera. Repite con una variación leve de cabeceo. Estabiliza después de cada prueba.", "No sujetes el sidestick fuera del centro ni combines entradas grandes. No uses protecciones como permiso para acercarte a límites.", "Realiza dos cambios de rumbo suaves de 20° y vuelve a estabilizarte sin tocar trim manual."),
      ],
    },
    {
      id: "a320-preflight", title: "Sección 12 · Preparación simple",
      description: "Una ruta corta, energía en tierra y una cabina preparada sin saltar pasos.",
      lessons: [
        a320Lesson("a320-cold-dark", "Cabina apagada: prepara antes de encender", "Construye una rutina corta y visible para no empezar con prisas.", 5, "Sección 12 · Preparación simple", ["Confirmar situación segura", "Reconocer alimentación eléctrica", "Preparar ruta corta"], "Una cabina apagada no es un acertijo. La meta es una secuencia repetible: estado seguro, energía, configuración y verificación. En operación real se usan listas del operador; aquí practicas su lógica.", "1. Elige plataforma y aplica freno. 2. Comprueba que no estás en pista. 3. Conecta la fuente eléctrica disponible y espera pantallas. 4. Configura una ruta corta en el mapa mundial o MCDU. 5. Revisa origen, destino y pista antes de avanzar.", "No arranques motores para explorar botones ni continúes si ruta o aeropuerto no coinciden. Una pantalla activa no significa que el avión esté listo para rodar.", "Deja la cabina con energía y una ruta corta cargada; anota origen, destino y pista prevista."),
        a320Lesson("a320-mcdu-basics", "MCDU: cargar y comprobar el plan", "Usa el MCDU para verificar un plan sencillo, no para programar a ciegas.", 5, "Sección 12 · Preparación simple", ["Introducir origen y destino", "Revisar datos extraños", "Confirmar el plan en ND"], "El MCDU organiza el plan; el ND permite comprobarlo visualmente. Antes de aceptar algo, compáralo con el mapa: aeropuerto, rumbo inicial, ruta y destino deben tener sentido.", "Introduce una ruta directa o muy corta. Revisa el plan, elimina solo discontinuidades que comprendas y muestra la ruta en ND. Confirma que comienza en tu aeropuerto y termina en el destino elegido.", "No copies rutas largas ni borres elementos sin saber qué son. Si el plan se ve extraño, vuelve al mapa y simplifica: una ruta directa basta para aprender.", "Carga una ruta directa de menos de 30 minutos y explíscala mirando el ND, sin mover el avión."),
      ],
    },
    {
      id: "a320-dispatch", title: "Sección 13 · Despacho y plan de vuelo",
      description: "Planifica un vuelo de pasajeros antes de abrir la cabina.",
      lessons: [
        a320Lesson("a320-airline-route", "Una ruta de línea: origen, destino y alterno", "Convierte una idea de vuelo en un plan breve que puedas explicar.", 5, "Sección 13 · Despacho y plan de vuelo", ["Elegir una ruta proporcionada", "Definir un alterno", "Explicar por qué cada aeropuerto sirve"], "Un vuelo con pasajeros comienza antes de entrar al avión. Para entrenar, una ruta de 30 a 60 minutos es suficiente: origen, destino y un alterno razonable. El alterno no es decoración; es tu plan si el destino deja de ser una opción.", "1. En el mapa mundial, elige dos aeropuertos con pistas adecuadas para el A320 y buen tiempo. 2. Escoge un tercero cercano como alterno. 3. Anota distancia aproximada, duración prevista y pista de salida/llegada. 4. Comprueba que el alterno no sea el mismo aeropuerto ni dependa del mismo problema meteorológico simulado.", "No elijas una ruta larga para que parezca más realista. No asumas que cualquier pista o aeropuerto sirve para un A320. En una operación real se aplican limitaciones de compañía, rendimiento y normativa que este curso no sustituye.", "Prepara una tarjeta de despacho de cinco líneas: origen, destino, alterno, duración y razón de elegir la ruta."),
        a320Lesson("a320-weather-notam", "Clima, METAR y avisos: decidir antes de volar", "Usa la información disponible para preparar una sesión segura y creíble.", 5, "Sección 13 · Despacho y plan de vuelo", ["Leer viento, visibilidad y techo", "Comparar destino y alterno", "Decidir si el escenario es apropiado"], "METAR resume condiciones observadas; pronósticos y avisos ayudan a anticipar cambios. Para aprender los flujos del A320 empieza con tiempo benigno, pero acostúmbrate a mirar el viento, visibilidad y nubes antes de aceptar una pista o aproximación.", "Consulta el clima de origen, destino y alterno en MSFS o una fuente de briefing. Identifica dirección/velocidad de viento, visibilidad y nubes. Elige una pista coherente con el viento y anota un riesgo simple: por ejemplo, visibilidad reducida o viento lateral. Si no entiendes un dato, usa clima preestablecido bueno y continúa el entrenamiento.", "No interpretes un METAR aislado como autorización operativa ni vueles condiciones difíciles solo por practicar. Los NOTAM y la información aeroportuaria real deben revisarse en fuentes oficiales para vuelos reales.", "Compara el viento de los tres aeropuertos y explica qué pista elegirías en el destino bajo condiciones de simulador."),
        a320Lesson("a320-payload-fuel", "Pasajeros, carga y combustible", "Relaciona ocupación, combustible y margen de decisión sin convertirlo en una adivinanza.", 5, "Sección 13 · Despacho y plan de vuelo", ["Reconocer el efecto de peso", "Separar combustible de ruta y reserva", "Comprobar valores cargados en MSFS"], "Los pasajeros y la carga afectan el peso; el combustible de ruta no es todo el combustible a bordo. Un plan conservador distingue taxi, ruta, contingencia/reserva y combustible para alterno según el escenario. MSFS simplifica algunos cálculos: úsalo para aprender a comprobar, no como planificador de vuelo real.", "Abre peso y combustible del A320. Elige una ocupación moderada para una ruta corta y carga combustible suficiente para ruta, alterno y margen. Revisa que los valores aparezcan coherentes en la aeronave o herramientas del simulador. Anota combustible inicial y el mínimo con el que decidirías no continuar en tu práctica.", "No cargues combustible al azar ni uses cifras del curso para una operación real. No ignores el peso porque el simulador permita despegar: el rendimiento cambia con masa, temperatura, pista y configuración.", "Configura una carga de pasajeros moderada y anota combustible inicial, estimado en destino y reserva de entrenamiento."),
        a320Lesson("a320-sid-star-approach", "SID, STAR y aproximación: dibuja la ruta completa", "Comprende cómo salida, crucero y llegada se conectan antes de programar el MCDU.", 5, "Sección 13 · Despacho y plan de vuelo", ["Distinguir SID, STAR y aproximación", "Relacionar pista con procedimiento", "Verificar la ruta en el ND"], "Una SID organiza la salida; una STAR organiza la llegada; la aproximación lleva hacia la pista. No son rutas para seleccionar por nombre: deben corresponder a pista, aeronave, condiciones y autorización. En MSFS empieza con procedimientos simples que puedas ver completos en el mapa.", "Con origen y destino ya definidos, observa las SID disponibles para la pista de salida y las STAR/aproximaciones del destino. Elige una combinación simple o una ruta directa si el simulador la muestra claramente. Cárgala y mira el ND/mapa completo: confirma que no existan saltos inesperados ni un giro de regreso al origen.", "No cargues procedimientos al azar ni borres discontinuidades que no comprendas. ATC real puede asignar otra salida, llegada o pista; en el simulador sigue el escenario y actualiza el briefing si cambia.", "Muestra la ruta completa en el ND y señala dónde termina salida, comienza crucero y empieza llegada."),
        a320Lesson("a320-dispatch-briefing", "Briefing de pasajeros: el vuelo antes de la puerta", "Reúne el plan en una explicación corta antes de comenzar la operación.", 5, "Sección 13 · Despacho y plan de vuelo", ["Resumir ruta y clima", "Confirmar combustible y alterno", "Definir el primer punto de decisión"], "El briefing de línea alinea a la tripulación antes de que la carga de trabajo aumente. En simulación, decir el plan en voz alta revela huecos: si no puedes explicar pista, ruta, combustible y llegada, todavía no estás listo para cerrar puertas virtuales.", "Usa tus notas y presenta: origen, destino, alterno, pasajeros/carga de entrenamiento, combustible inicial, pista prevista, SID, STAR o aproximación, y una condición que haría que pauses o frustres. Mantén el briefing en menos de dos minutos.", "No conviertas el briefing en una lista interminable ni inventes autorizaciones. Actualiza el plan si cambia el viento, la pista o el ATC simulado.", "Graba o escribe un briefing de dos minutos para tu ruta corta antes de abrir MSFS."),
      ],
    },
  );
}

const levelSix = course.find((level) => level.number === 6);
if (levelSix) {
  levelSix.title = "A320: vuelo y aproximación";
  levelSix.description = "Vuela el A320 con objetivos claros de energía, modos y trayectoria.";
  levelSix.modules.push({
    id: "a320-flight-basics", title: "Sección 13 · Despegue y crucero", description: "De la pista al vuelo estable, siempre verificando modos.", lessons: [
      a320Lesson("a320-takeoff-setup", "Antes del despegue: configuración y llamada", "Prepara una salida de entrenamiento antes de alinear el avión.", 6, "Sección 13 · Despegue y crucero", ["Confirmar pista y configuración", "Identificar velocidades mostradas", "Definir una acción ante discrepancias"], "En un reactor, la salida comienza en tierra. Las velocidades y configuración se revisan antes de entrar a pista; si algo no coincide, se detiene el proceso. Usa los valores y ayudas que MSFS presente para el A320 seleccionado.", "Confirma pista, flaps/configuración indicada, trim según simulador y velocidades mostradas. Antes de alinearte, di: pista, rumbo, primera altitud y qué harás si falta una indicación.", "No inventes velocidades ni despegar con mensajes pendientes. No aceleres mientras buscas información en el MCDU.", "Completa la preparación y pausa antes de entrar a pista; comprueba cada elemento una segunda vez."),
      a320Lesson("a320-takeoff-climb", "Despegar y vigilar el FMA", "La tarea es seguir trayectoria y confirmar modos, no pulsar más botones.", 6, "Sección 13 · Despegue y crucero", ["Mantener eje de pista", "Rotar con suavidad", "Leer modos de ascenso"], "Tras el despegue, el A320 puede capturar modos de guiado; el FMA es tu comprobación. El piloto sigue responsable de trayectoria, velocidad y separación del terreno.", "Usa clima calmo y pista larga. Mantén eje, aplica potencia según configuración MSFS y rota a la indicación presentada. Una vez positivo el ascenso, retrae tren cuando corresponda y confirma en FMA modo vertical y lateral.", "No persigas el director de vuelo con brusquedad ni conectes automatización sin leer FMA. Si se desordena, vuela recto y nivelado o pausa.", "Haz un despegue y detén la práctica al estabilizar el ascenso. Anota los modos FMA vistos."),
      a320Lesson("a320-managed-selected", "Managed y selected: elegir sin adivinar", "Distingue objetivos gestionados por el plan de objetivos seleccionados manualmente.", 6, "Sección 13 · Despegue y crucero", ["Reconocer selección de rumbo y altitud", "Comprobar FMA", "Volver a control simple si hay duda"], "Los mandos FCU permiten seleccionar un valor o dejar que el sistema gestione el plan. Elige solo lo que entiendes y verifica el resultado en FMA.", "En vuelo estable, selecciona una altitud segura y observa el anuncio FMA; confirma que el avión inicia la respuesta. Haz un cambio de rumbo pequeño y vuelve al rumbo inicial. Practica una variable por vez.", "No gires varios selectores ni pulses para probar. Si no puedes explicar el modo, conserva una trayectoria segura y pausa.", "Realiza un cambio de altitud y uno de rumbo, separados por un minuto de vuelo estable."),
    ],
  });
  levelSix.modules.push({
    id: "a320-ground-and-radio", title: "Sección 14 · Puerta, tierra y radio", description: "Pon el A320 en movimiento con una secuencia clara y comunicaciones prácticas.", lessons: [
      a320Lesson("a320-gate-pushback", "En la puerta: embarque, puertas y pushback", "Deja el avión listo para salir antes de pedir movimiento.", 6, "Sección 14 · Puerta, tierra y radio", ["Confirmar cabina y ruta", "Preparar salida de puerta", "Coordinar pushback en el simulador"], "En una operación de pasajeros, la aeronave no se mueve hasta que la cabina y el plan están listos. MSFS representa este flujo de forma simplificada: úsalo para practicar una secuencia ordenada, no para reproducir una lista certificada.", "Con ruta, combustible y cabina listos, confirma freno aplicado, puertas/carga cerradas según el estado que muestre el simulador y área libre. Solicita o inicia pushback mediante la herramienta de tierra de MSFS. Durante el retroceso, no programes el MCDU: vigila posición, dirección y el final del movimiento.", "No inicies pushback sin saber hacia dónde vas ni sueltes freno sin confirmación visual. Si el servicio de tierra queda en una posición extraña, detén el ejercicio y reinicia de forma segura.", "Completa un pushback y termina alineado para la salida, con freno aplicado antes de continuar."),
      a320Lesson("a320-engine-start", "Arranque de motores: observar antes de avanzar", "Sigue el estado del avión y las indicaciones de MSFS durante el arranque.", 6, "Sección 14 · Puerta, tierra y radio", ["Reconocer condición segura de arranque", "Vigilar indicaciones de motor", "Esperar estabilización"], "El arranque es una transición de energía: seleccionas el procedimiento y confirmas que cada motor acelera y se estabiliza como corresponde. Para operación real, usa siempre documentación oficial del operador y la aeronave; aquí entrenas la disciplina de observar y no apresurar la secuencia.", "Después del pushback y según la guía del A320 de MSFS, inicia un motor y vigila las indicaciones en ECAM. Espera que se estabilice antes del segundo. Confirma que no quedan avisos relevantes para el escenario y que los sistemas necesarios para taxi están configurados.", "No inicies ambos motores de manera indiscriminada ni avances con avisos que no entiendes. No intentes resolver fallos simulados durante esta lección: pausa y vuelve a un escenario normal.", "Haz un arranque normal y espera diez segundos de indicaciones estables antes de pedir taxi."),
      a320Lesson("a320-radio-atc", "Radio y ATC: escuchar, anotar y responder", "Practica comunicaciones útiles sin sacrificar el control del avión.", 6, "Sección 14 · Puerta, tierra y radio", ["Identificar fases de comunicación", "Anotar autorización esencial", "Responder con claridad en simulador"], "La radio ordena el movimiento de muchas aeronaves: autorización IFR, pushback, taxi, torre, salida, centro, llegada y tierra. En MSFS usa el menú ATC, texto o voz según tu configuración. La prioridad sigue siendo controlar el avión; si te saturas, pausa o usa ayudas.", "Antes de llamar, prepara una nota con matrícula/callsign de simulador, posición, destino y solicitud. Al recibir una instrucción, anota solo pista, ruta/rumbo, altitud y frecuencia siguiente si aparecen. Lee de vuelta los elementos importantes que el simulador solicite y no cambies de frecuencia hasta completar la instrucción actual.", "No inventes fraseología ni aceptes una instrucción que no entendiste. En redes ATC reales se aplican reglas y procedimientos específicos; primero practica en el ATC integrado o desconectado.", "Completa una secuencia simulada: autorización o plan, pushback, taxi y contacto con torre; anota cada pista/altitud/frecuencia mostrada."),
      a320Lesson("a320-taxi-runup", "Taxi A320: lento, mapa y punto de espera", "Mueve el avión grande con anticipación y sin perder tu ubicación.", 6, "Sección 14 · Puerta, tierra y radio", ["Usar mapa de aeropuerto", "Mantener velocidad de taxi prudente", "Detenerse antes de la pista"], "El A320 necesita más espacio y anticipación que el C172. El mapa del aeropuerto y la cinta de guía de MSFS son herramientas válidas de aprendizaje. La regla simple: si no sabes dónde estás, detente antes de crear otro problema.", "Abre el mapa del aeropuerto y marca puerta, taxiways y pista asignada. Sigue la instrucción de ATC o una ruta simple, usando potencia mínima y frenos suaves. Detente completamente en el punto de espera antes de cruzar cualquier línea o entrar a pista. Revisa configuración de despegue solo estando detenido.", "No aceleres para recuperar tiempo ni gires cerrado sin mirar la trayectoria. No cruces una pista por intuición: espera autorización del simulador o mantente fuera de ella.", "Rueda de la puerta al punto de espera y pausa allí; señala en el mapa la pista y la calle de taxi usada."),
    ],
  });
}

const levelSeven = course.find((level) => level.number === 7);
if (levelSeven) {
  levelSeven.title = "Operaciones A320";
  levelSeven.description = "Une planificación, automatización y toma de decisiones en vuelos cortos y repetibles.";
  levelSeven.modules.push({
    id: "a320-arrival-operations", title: "Sección 14 · Llegada y operación completa", description: "Planifica el descenso, estabiliza la aproximación y decide con calma.", lessons: [
      a320Lesson("a320-descent-briefing", "Antes de descender: plan y briefing", "Un descenso previsible empieza mucho antes de bajar potencia.", 7, "Sección 14 · Llegada y operación completa", ["Identificar pista y aproximación", "Definir llegada", "Preparar alternativa simple"], "El briefing responde qué pista, qué aproximación, qué altitudes y qué harás si no queda estable. En simulador usa buen tiempo mientras aprendes la secuencia.", "Antes del descenso, abre la aproximación en el plan y compárala con ND. Di pista, curso final, primera altitud relevante y punto de frustrada. Selecciona una llegada sencilla y confirma combustible para repetir.", "No cargues una aproximación al último minuto ni desciendas sin saber qué altitud buscas. Si hay duda, mantén altura segura y pausa.", "Redacta un briefing de cuatro frases para una aproximación de buen tiempo en un aeropuerto conocido."),
      a320Lesson("a320-stabilized-approach", "Aproximación estabilizada: energía primero", "Configura temprano y evalúa si la aproximación sigue siendo segura.", 7, "Sección 14 · Llegada y operación completa", ["Seguir senda y velocidad objetivo", "Configurar anticipadamente", "Reconocer inestabilidad"], "Una buena aproximación no se rescata al final. Velocidad, senda, rumbo y configuración deben estar bajo control. Si una variable se aleja mucho, frustrar y repetir es correcto.", "Con buen tiempo, sigue una ILS o aproximación GPS que entiendas. Reduce energía temprano, configura flaps y tren según el simulador y vigila PFD/FMA. En final pregúntate: ¿velocidad, senda y eje están estables?", "No arregles una llegada alta y rápida con grandes cambios cerca de pista. No continúes por orgullo: una frustrada temprana es buena decisión.", "Vuela una aproximación; si no queda estable, aplica frustrada o pausa y anota qué variable se adelantó."),
      a320Lesson("a320-go-around", "Frustrada A320: volver a una trayectoria segura", "Practica abandonar una aproximación sin improvisar.", 7, "Sección 14 · Llegada y operación completa", ["Reconocer el momento", "Aplicar potencia y actitud con orden", "Confirmar guiado y limpiar gradualmente"], "Frustrar no es fallar: es la maniobra prevista cuando la pista no está disponible o la aproximación deja de ser estable. En MSFS sigue su guía y verifica actitud, potencia y FMA.", "En una aproximación de buen tiempo, decide frustrar a altura segura: aplica el comando que indique MSFS, sigue director de vuelo, confirma modo en FMA y retrae configuración solo cuando el avión acelere. Continúa hacia una altitud segura.", "No retraigas flaps o tren de golpe ni pierdas actitud por mirar botones. Si FMA no muestra lo esperado, vuela seguro y pausa.", "Practica una frustrada planeada una vez, sin intentar aterrizar después."),
      a320Lesson("a320-line-flight", "Vuelo corto completo: prepara, vuela y revisa", "Cierra la ruta con supervisión, no con perfección.", 7, "Sección 14 · Llegada y operación completa", ["Seguir un plan completo", "Comprobar automatización por fases", "Hacer debriefing honesto"], "Una operación completa une los pasos practicados. Una sesión corta y repetible permite reconocer dónde se rompe tu rutina y corregir una sola cosa en el siguiente intento.", "Elige dos aeropuertos cercanos y clima benigno. Prepara ruta y cabina, realiza despegue estable, observa FMA en ascenso y crucero, completa briefing y termina con aproximación o frustrada. Anota una decisión correcta y una habilidad por repetir.", "No añadas clima, fallos o tráfico hasta que esta secuencia sea consistente. Pausa antes de que una duda se convierta en desorden.", "Completa un vuelo de menos de 45 minutos y registra modos vistos, punto de más carga y objetivo de siguiente sesión."),
    ],
  });
  levelSeven.modules.push({
    id: "a320-arrival-to-gate", title: "Sección 15 · Llegada, puerta y decisiones", description: "Termina el vuelo con la misma disciplina con la que lo preparaste.", lessons: [
      a320Lesson("a320-tod-star", "TOD y STAR: empezar el descenso a tiempo", "Planifica la llegada antes de que el avión quede alto o rápido.", 7, "Sección 15 · Llegada, puerta y decisiones", ["Reconocer el punto de descenso", "Comprobar restricciones", "Actualizar llegada tras cambios"], "El Top of Descent es una referencia para iniciar el descenso con energía controlada; una STAR aporta ruta y restricciones. La automatización puede ayudar, pero tú confirmas que altitudes, velocidades y trayectoria son razonables.", "En crucero, revisa STAR y aproximación. Identifica el TOD mostrado por el simulador o estima un descenso temprano y conservador. Selecciona una altitud autorizada/segura para entrenamiento, confirma el FMA y vigila que el avión comience a descender sin ganar velocidad excesiva.", "No esperes al último minuto ni fuerces un descenso pronunciado para recuperar el plan. Si cambia pista o STAR, vuelve al briefing antes de aceptar la nueva ruta.", "Inicia un descenso de entrenamiento y anota el modo FMA, altitud seleccionada y primera restricción que viste."),
      a320Lesson("a320-arrival-radio", "Radio de llegada: de centro a tierra", "Mantén el hilo de comunicaciones mientras preparas el avión.", 7, "Sección 15 · Llegada, puerta y decisiones", ["Reconocer cambios de frecuencia", "Separar vuelo y comunicación", "Confirmar pista y taxi-in"], "En llegada, la carga sube: ATC puede cambiar rumbo, altitud, velocidad, pista o frecuencia. No necesitas responder instantáneamente si compromete el control; estabiliza primero y usa la pausa o ayudas de MSFS mientras aprendes.", "Durante una llegada de simulador, anota cada transferencia y confirma en el ND/PFD las instrucciones de rumbo, altitud o velocidad antes de ejecutarlas. Al aterrizar, cambia a tierra solo cuando la instrucción lo indique y pide o sigue taxi hasta la puerta asignada.", "No programas el MCDU mientras el avión está inestable ni cambies tres cosas a la vez. Si ATC y el plan discrepan, sigue el escenario activo o pausa para reconciliarlo.", "Completa una llegada con al menos una transferencia de frecuencia y anota pista, última altitud y puerta."),
      a320Lesson("a320-landing-taxi-in", "Aterrizaje, reversa y taxi-in", "Termina la operación con control direccional y sin apresurar la salida de pista.", 7, "Sección 15 · Llegada, puerta y decisiones", ["Mantener eje de pista", "Gestionar desaceleración según MSFS", "Vaciar pista antes de cambiar la atención"], "El aterrizaje no termina al tocar pista. Primero mantén dirección y desacelera; después toma una salida adecuada, confirma que estás fuera de pista y solo entonces cambia el foco a radio, taxi y puerta.", "Tras una aproximación estable, aterriza siguiendo las indicaciones del simulador. Mantén eje, aplica reversa/frenado conforme al modelo MSFS y abandona por una calle de salida cuando la velocidad y el espacio lo permitan. Detente si hace falta para consultar el mapa y sigue taxi hasta puerta.", "No empieces a reprogramar pantallas ni a llamar a tierra durante la toma. No gires hacia una salida a velocidad excesiva ni cruces una línea de pista sin saber dónde estás.", "Aterriza, deja la pista completamente libre y pausa antes de iniciar taxi-in. Identifica la calle de salida y la puerta en el mapa."),
      a320Lesson("a320-shutdown-debrief", "En la puerta: apagar y hacer debriefing", "Cierra el vuelo, registra combustible y transforma errores en el siguiente objetivo.", 7, "Sección 15 · Llegada, puerta y decisiones", ["Asegurar avión en puerta", "Seguir apagado normal de MSFS", "Comparar plan y resultado"], "El final de una operación permite revisar el plan: combustible real frente a previsto, ruta seguida, decisiones y carga de trabajo. Un buen debriefing es específico y pequeño: una cosa que funcionó y una que practicarás de nuevo.", "En puerta, aplica freno, completa el apagado normal indicado por el A320 de MSFS y conecta servicios de tierra si quieres simular desembarque. Anota combustible final, cualquier cambio de pista/ruta, una buena decisión y una mejora concreta. No abras otro vuelo hasta escribir esa última nota.", "No confundas terminar el vuelo con abandonar la revisión. No intentes repetir una sesión difícil sin cambiar una sola variable de práctica.", "Cierra un vuelo y compara combustible previsto/final; escribe una mejora específica para la próxima ruta."),
      a320Lesson("a320-disruption", "Cambio de plan: pista, frustrada o desvío", "Practica decidir temprano cuando la operación ya no coincide con el plan.", 7, "Sección 15 · Llegada, puerta y decisiones", ["Detectar una discrepancia", "Estabilizar antes de reprogramar", "Elegir frustrada o alterno de entrenamiento"], "Las operaciones reales cambian. Una pista distinta, una aproximación inestable o combustible menor al margen planificado exigen parar, priorizar la trayectoria y escoger el siguiente paso. El objetivo no es resolver una emergencia compleja, sino evitar que una sorpresa se convierta en improvisación.", "En una ruta corta, simula un cambio: selecciona otra pista o decide frustrar. Mantén control, pausa si necesitas, actualiza ruta/briefing y continúa solo cuando sepas altitud, rumbo y siguiente acción. Para un desvío de entrenamiento, regresa al alterno que anotaste en el despacho y carga una ruta simple.", "No aceptes cambios sin releer el FMA y el ND. No continúes una aproximación inestable solo para terminar el vuelo. Para fallos o emergencias reales, usa procedimientos oficiales y entrenamiento cualificado.", "Haz una frustrada o desvío planificado y escribe qué información tuviste que revisar antes de continuar."),
    ],
  });
}

const levelZero = course.find((level) => level.number === 0);
if (levelZero) {
  levelZero.modules.splice(
    0,
    0,
    {
      id: "first-flight-now",
      title: "Empieza a volar ahora",
      description: "Una misión corta en el aire, sin taxi ni procedimientos todavía. Primero sientes el avión; luego aprenderás por qué hace cada cosa.",
      lessons: [
        makeLesson(
          "first-flight-now",
          "Tu primer vuelo: controla el C172 durante 10 minutos",
          "Empieza ya en el aire, con buen tiempo. Mantén el avión tranquilo y vuelve al menú: no hay taxi, despegue ni aterrizaje en esta primera misión.",
          0,
          "Empieza a volar ahora",
          [
            "Sentir cómo responde el yoke sin intentar hacer maniobras",
            "Mirar velocidad, altitud y horizonte en la pantalla G1000",
            "Terminar la sesión con el avión estable, sin tener que aterrizar",
          ],
          "tu primer vuelo seguro en el Cessna 172",
        ),
      ],
    },
    {
      id: "efb-first-look",
      title: "Tu EFB: mapa y plan antes de moverte",
      description: "Aprende qué es la tablet de MSFS, cómo reconocer sus partes y qué usarás más adelante para planear y hacer taxi.",
      lessons: [
        makeLesson(
          "efb-first-look",
          "La EFB desde cero: tu mapa de vuelo",
          "Reconoce la tablet de MSFS 2024 antes de pedirte crear una ruta. Hoy solo abrirás, mirarás y cerrarás el mapa.",
          0,
          "Tu EFB: mapa y plan antes de moverte",
          [
            "Saber qué es la EFB y cuándo usarla",
            "Distinguir mapa, ruta y aplicaciones sin pulsar al azar",
            "Abrir y cerrar la EFB antes de iniciar el vuelo",
          ],
          "la EFB de Microsoft Flight Simulator 2024",
        ),
      ],
    },
  );

  levelZero.modules.splice(
    2,
    0,
    {
      id: "flight-plan-basics",
      title: "SecciÃ³n 2 Â· Plan antes de encender",
      description:
        "Carga combustible razonable y conoce las velocidades que usarÃ¡s en este C172 de entrenamiento.",
      lessons: [
        makeLesson(
          "c172-fuel-basics",
          "Combustible: cuÃ¡nto cargar y dÃ³nde hacerlo",
          "Calcula una carga de entrenamiento sencilla y aplÃ­cala en el EFB de MSFS.",
          0,
          "SecciÃ³n 2 Â· Plan antes de encender",
          [
            "Calcular combustible de salida y reserva",
            "Cargarlo desde el EFB sin adivinar",
            "Comprender por quÃ© peso y combustible importan",
          ],
          "la planificaciÃ³n bÃ¡sica de combustible",
        ),
        makeLesson(
          "c172-takeoff-card",
          "Tarjeta de despegue: flaps y velocidades",
          "Prepara una tarjeta simple con la configuraciÃ³n que usarÃ¡s antes de llegar a la pista.",
          0,
          "SecciÃ³n 2 Â· Plan antes de encender",
          [
            "Diferenciar KIAS de RPM",
            "Saber la configuraciÃ³n normal de flaps",
            "Reconocer VR y velocidad de ascenso",
          ],
          "la tarjeta de despegue del C172",
        ),
      ],
    },
    {
      id: "before-start",
      title: "Sección 3 · Antes de encender",
      description: "Prepara el Cessna 172 Skyhawk G1000 apagado en plataforma.",
      lessons: [
        makeLesson(
          "c172-cold-dark",
          "Escenario apagado: Cold & Dark",
          "Entra a la cabina con el motor y los sistemas apagados.",
          0,
          "Sección 3 · Antes de encender",
          [
            "Seleccionar el estado correcto de inicio",
            "Reconocer cuándo el avión está realmente apagado",
            "Preparar una práctica segura en plataforma",
          ],
          "el escenario Cold & Dark",
        ),
        makeLesson(
          "c172-before-start",
          "Checklist antes de encender",
          "Prepara cabina, combustible y electricidad antes de arrancar.",
          0,
          "Sección 3 · Antes de encender",
          [
            "Seguir el flujo previo al arranque",
            "Entender el propósito de cada elemento",
            "Dejar el C172 listo para el motor",
          ],
          "la preparación antes de encender",
        ),
      ],
    },
    {
      id: "engine-start",
      title: "Sección 4 · Encendido realista",
      description: "Arranca y comprueba el motor del Cessna paso a paso.",
      lessons: [
        makeLesson(
          "c172-engine-start",
          "Arranque del motor",
          "Enciende el motor del Cessna 172 usando el flujo normal.",
          0,
          "Sección 4 · Encendido realista",
          [
            "Cebar y arrancar sin saltar pasos",
            "Reconocer el momento en que el motor toma vida",
            "Estabilizar el motor al ralentí",
          ],
          "el arranque normal del motor",
        ),
        makeLesson(
          "c172-after-start",
          "Verificación después del arranque",
          "Confirma que el motor y los sistemas básicos están saludables antes de rodar.",
          0,
          "Sección 4 · Encendido realista",
          [
            "Verificar presión de aceite y carga eléctrica",
            "Encender la aviónica en el orden correcto",
            "Decidir si el avión está listo para continuar",
          ],
          "la comprobación posterior al arranque",
        ),
      ],
    },
    {
      id: "ground-operations",
      title: "Sección 5 · Operación en tierra",
      description:
        "Aprende a rodar y preparar el motor antes del primer despegue.",
      lessons: [
        makeLesson(
          "airport-map-basics",
          "El mapa del aeropuerto: dónde estás y adónde puedes ir",
          "Distingue plataforma, calle de rodaje, pista y línea de espera antes de mover el avión.",
          0,
          "Sección 5 · Operación en tierra",
          [
            "Ubicar el avión en plataforma",
            "Reconocer una calle de rodaje y una pista",
            "Saber dónde detenerse antes de la pista",
          ],
          "el mapa básico del aeropuerto",
        ),
        makeLesson(
          "airport-radio-basics",
          "Radio y ATC: tu primera solicitud de taxi",
          "Abre Comunicaciones, solicita taxi y usa la ayuda visual de MSFS.",
          0,
          "Sección 5 · Operación en tierra",
          [
            "Abrir el panel Comunicaciones",
            "Solicitar taxi sin usar fraseología manual",
            "Entender qué significa Hold Short",
          ],
          "la radio básica de aeropuerto",
        ),
        makeLesson(
          "c172-taxi-basics",
          "Primer taxi: mover el avión en tierra",
          "Suelta el freno, prueba los frenos y rueda despacio sin despegar.",
          0,
          "Sección 5 · Operación en tierra",
          [
            "Diferenciar rodar de volar",
            "Moverse despacio y detenerse",
            "Hacer una prueba inicial de frenos",
          ],
          "el taxi básico",
        ),
        makeLesson(
          "c172-taxi-to-hold",
          "Taxi guiado hasta la línea de espera",
          "Sigue la ruta de taxi de MSFS hasta el punto donde debes detenerte antes de la pista.",
          0,
          "Sección 5 · Operación en tierra",
          [
            "Seguir una ruta de taxi paso a paso",
            "Reconocer el punto de espera",
            "Detener el avión antes de cruzar la pista",
          ],
          "el taxi hasta la línea de espera",
        ),
        makeLesson(
          "c172-engine-runup",
          "Prueba del motor antes del despegue",
          "En una zona segura, confirma que el motor responde antes de usar la pista.",
          0,
          "Sección 5 · Operación en tierra",
          [
            "Preparar el avión para la prueba",
            "Observar los indicadores básicos del motor",
            "Terminar con el motor estable",
          ],
          "la prueba de motor",
        ),
        makeLesson(
          "c172-before-takeoff",
          "Checklist antes de despegue",
          "Deja el Cessna listo, pero detenido, antes del primer vuelo.",
          0,
          "Sección 5 · Operación en tierra",
          [
            "Completar una comprobación previa al despegue",
            "Entender que aún no es momento de volar",
            "Detenerse en el punto correcto",
          ],
          "la preparación final en tierra",
        ),
      ],
    },
    {
      id: "first-departure",
      title: "Sección 6 · Primer despegue",
      description: "Entra a la pista, despega y sube a una altura segura.",
      lessons: [
        makeLesson(
          "c172-lineup",
          "Entrar y alinearte en la pista",
          "Reconoce el momento de entrar a la pista y mantén el avión centrado.",
          0,
          "Sección 6 · Primer despegue",
          [
            "Esperar en la línea correcta",
            "Entrar a la pista sin prisa",
            "Alinear el avión con el centro",
          ],
          "la alineación en pista",
        ),
        makeLesson(
          "c172-takeoff-roll",
          "Carrera de despegue",
          "Acelera de forma continua y deja que el C172 vuele.",
          0,
          "Sección 6 · Primer despegue",
          [
            "Aplicar potencia de despegue",
            "Mantener una trayectoria recta",
            "Reconocer cuándo el avión está listo para elevarse",
          ],
          "la carrera de despegue",
        ),
        makeLesson(
          "c172-climb-out",
          "Ascenso inicial y zona segura",
          "Después de despegar, establece un ascenso estable antes de practicar maniobras.",
          0,
          "Sección 6 · Primer despegue",
          [
            "Mantener una velocidad segura de ascenso",
            "Alejarse del aeropuerto",
            "Estabilizar el avión a una altura de práctica",
          ],
          "el ascenso inicial",
        ),
      ],
    },
  );
}

const levelOne = course.find((level) => level.number === 1);
if (levelOne?.modules[0]) {
  levelOne.modules[0].title = "Sección 7 · Primer control en el aire";
  levelOne.modules[0].description =
    "Después del ascenso, aprende a estabilizar y controlar el C172 en una zona segura.";
  const [references, axes, power, trim, integration] =
    levelOne.modules[0].lessons;
  if (references) {
    references.title = "Tus tres referencias en vuelo";
    references.moduleTitle = levelOne.modules[0].title;
  }
  if (axes) {
    axes.title = "Mover el avión con suavidad";
    axes.moduleTitle = levelOne.modules[0].title;
  }
  if (power) {
    power.title = "Potencia: acelerar, subir y bajar";
    power.moduleTitle = levelOne.modules[0].title;
  }
  if (trim) {
    trim.title = "Trim: dejar de pelear con el yoke";
    trim.moduleTitle = levelOne.modules[0].title;
  }
  if (integration) {
    integration.title = "Primer vuelo controlado";
    integration.moduleTitle = levelOne.modules[0].title;
  }
}

const lessonPlan = (
  concept: string,
  procedure: string,
  errors: string,
  exerciseTitle: string,
  exercise: string,
  checklist: string[],
): Partial<Lesson> => ({
  estimatedTime: "15–20 min",
  sections: [
    { kind: "APRENDE", title: "Idea clave", content: concept },
    {
      kind: "PROCEDIMIENTO",
      title: "Práctica paso a paso",
      content: procedure,
    },
    { kind: "ERRORES COMUNES", title: "Qué vigilar", content: errors },
  ] as Lesson["sections"],
  checklist,
  exercise: { title: exerciseTitle, instructions: exercise },
});

const lessonDetails: Record<string, Partial<Lesson>> = {
  "how-training-works": {
    estimatedTime: "12 min",
    sections: [
      {
        kind: "APRENDE",
        title: "Entrena una habilidad cada vez",
        content:
          "Volar se aprende acumulando pequeñas rutinas. Cada lección de la academia se centra en una habilidad concreta: leer una indicación, preparar el avión, practicar y revisar lo que ocurrió. No avances por velocidad; avanza cuando puedas explicar qué hiciste y por qué.",
      },
      {
        kind: "PROCEDIMIENTO",
        title: "El ciclo de una sesión",
        content:
          "Antes de abrir el simulador, lee el objetivo y prepara una práctica corta. Durante el vuelo, cambia una sola variable a la vez. Al terminar, anota qué controlaste bien y qué quieres repetir. Cinco o diez minutos conscientes rinden más que una sesión larga sin objetivo.",
      },
      {
        kind: "ERRORES COMUNES",
        title: "No busques perfección en el primer vuelo",
        content:
          "No necesitas dominar los instrumentos ni memorizar listas completas todavía. Evita saltar entre aviones, aeropuertos y configuraciones. En esta etapa, la consistencia de tu entorno y de tu rutina es tu principal herramienta.",
      },
    ] as Lesson["sections"],
    checklist: [
      "Leí el objetivo antes de abrir el simulador",
      "Reservé una práctica breve y sin interrupciones",
      "Elegí una sola habilidad para practicar",
      "Anoté un aprendizaje al finalizar",
    ],
    exercise: {
      title: "Crea tu rutina de piloto",
      instructions:
        "Abre MSFS 2024 y, sin iniciar un vuelo todavía, prepara tu puesto: control conectado, auriculares si los usas y una libreta o nota digital. Escribe una frase: “En esta sesión practicaré…”. Conserva esa rutina para las próximas lecciones.",
    },
  },
  "prepare-msfs": {
    estimatedTime: "15 min",
    sections: [
      {
        kind: "APRENDE",
        title: "Un entorno estable acelera el aprendizaje",
        content:
          "Para las primeras prácticas, reduce las distracciones. Escoge un aeropuerto conocido, condiciones de día y cielo despejado, y una aeronave sencilla. El objetivo no es demostrar realismo extremo: es poder ver con claridad la respuesta del avión a tus acciones.",
      },
      {
        kind: "PROCEDIMIENTO",
        title: "Configuración inicial recomendada",
        content:
          "Inicia un vuelo libre con el Cessna 172 en plataforma o pista. Usa clima preestablecido despejado, hora diurna y ayudas de navegación visuales si las necesitas. Verifica que el freno de estacionamiento y los controles respondan antes de acelerar.",
      },
      {
        kind: "ERRORES COMUNES",
        title: "Cambia solo lo necesario",
        content:
          "No ajustes sensibilidad, cámaras, clima y asistencias al mismo tiempo. Si algo se siente extraño, identifica primero si proviene del avión, de una ayuda del simulador o de tu controlador. Así podrás corregirlo sin perder tu referencia.",
      },
    ] as Lesson["sections"],
    checklist: [
      "Seleccioné el Cessna 172",
      "Elegí condiciones diurnas y despejadas",
      "Confirmé que el controlador responde",
      "Comprobé que puedo pausar y volver al menú",
    ],
    exercise: {
      title: "Prepara un vuelo de práctica",
      instructions:
        "Configura un vuelo libre de día, con cielo despejado y el Cessna 172 en un aeropuerto que conozcas. Quédate en tierra. Mueve suavemente el yoke, el throttle y los pedales para confirmar que las entradas se reflejan en cabina.",
    },
  },
  "know-velocityone": {
    estimatedTime: "15 min",
    sections: [
      {
        kind: "APRENDE",
        title: "El control traduce tus intenciones",
        content:
          "El VelocityOne reúne los mandos que usarás con mayor frecuencia. El yoke controla la actitud del avión; el throttle regula potencia; el trim reduce la fuerza que necesitarías mantener; y los controles de flaps y mezcla se incorporarán de forma gradual.",
      },
      {
        kind: "PROCEDIMIENTO",
        title: "Reconoce antes de asignar",
        content:
          "Con el simulador abierto, identifica físicamente cada grupo de control y después observa su nombre en las opciones de MSFS. No cambies asignaciones todavía. Primero confirma que cada eje se mueve de forma fluida, regresa al centro y no produce entradas involuntarias.",
      },
      {
        kind: "ERRORES COMUNES",
        title: "No ajustes sensibilidad por intuición",
        content:
          "Una respuesta brusca puede venir de una asignación duplicada, una cámara activa o una ayuda de vuelo; no necesariamente de la sensibilidad. Antes de modificar valores, comprueba qué eje está actuando y si el avión está detenido en una situación estable.",
      },
    ] as Lesson["sections"],
    checklist: [
      "Ubique el yoke y sus ejes principales",
      "Identifiqué throttle y trim",
      "Reconocí flaps y mezcla sin moverlos en vuelo",
      "Verifiqué que no hay una asignación duplicada",
    ],
    exercise: {
      title: "Mapa físico de controles",
      instructions:
        "Con el Cessna 172 detenido, toca cada grupo de control del VelocityOne y busca su reacción en cabina. Hazlo uno por uno: yoke, throttle, trim y flaps. Si una entrada no corresponde, anótala para revisarla en la siguiente lección.",
    },
  },
  "initial-controls-check": lessonPlan(
    "Una comprobación en tierra evita que una asignación inesperada aparezca cuando ya estás rodando o en el aire. El objetivo es confirmar recorrido, dirección y punto neutro de cada eje.",
    "En Vuelo libre, elige el Cessna 172 detenido en plataforma. Mueve el yoke lentamente a izquierda, derecha, adelante y atrás; observa alerones y elevador. Después mueve throttle, trim, flaps y pedales uno por uno. Vuelve cada mando a una posición segura antes de tocar el siguiente.",
    "No pruebes los mandos con el avión acelerando. Si un eje se mueve al revés, no lo compenses mentalmente: corrige la asignación antes de practicar. Si dos controles actúan a la vez, busca una asignación duplicada.",
    "Comprobación de cabina en tierra",
    "Completa una vuelta ordenada de mandos con el avión inmovilizado. Di en voz alta qué superficie o indicador cambia con cada entrada. Anota cualquier eje invertido, salto o movimiento sin tocar el control.",
    [
      "Avión inmovilizado en plataforma",
      "Yoke comprobado en todos sus ejes",
      "Pedales o rudder comprobados",
      "Potencia, trim y flaps revisados",
      "Sin asignaciones duplicadas detectadas",
    ],
  ),
  "sensitivity-deadzones": lessonPlan(
    "La sensibilidad define cuán rápido responde una entrada; la zona muerta ignora los pequeños movimientos cercanos al centro. Ambos ajustes sirven para que el avión responda con precisión, no para ocultar una asignación incorrecta.",
    "Primero verifica en tierra que cada eje llega a sus extremos y vuelve al centro. Haz un vuelo corto y recto en condiciones calmas. Si el avión se mueve sin tocar el control, añade una zona muerta mínima. Si una entrada es demasiado brusca, ajusta sensibilidad poco a poco y vuelve a probar el mismo ejercicio.",
    "Evita copiar valores de otra persona: cada controlador y cada avión se sienten distinto. No modifiques varios ejes a la vez y no uses una zona muerta grande para corregir un eje que está mal centrado o duplicado.",
    "Ajuste controlado",
    "En Vuelo libre, mantén el Cessna en una situación tranquila. Cambia solo un ajuste del yoke, repite el mismo movimiento suave y anota la diferencia. Si no puedes explicar el efecto, vuelve al valor anterior.",
    [
      "Controles verificados antes de ajustar",
      "Un solo eje elegido para la prueba",
      "Cambio pequeño aplicado",
      "Misma práctica repetida",
      "Resultado anotado",
    ],
  ),
  "c172-instruments-first": lessonPlan(
    "No necesitas entender todos los números de la cabina. Para empezar, usa solo cuatro preguntas: ¿voy demasiado lento o rápido?, ¿estoy subiendo o bajando?, ¿las alas están niveladas?, ¿hacia dónde apunta el avión? La pantalla G1000 reúne esa información; no es una prueba que debas memorizar.",
    "Con el C172 detenido y el freno de estacionamiento aplicado, mira el panel sin tocar palancas. 1. Busca la cinta vertical de la izquierda: es la velocidad en nudos; por ahora solo observa que el número aumenta cuando el avión acelera. 2. Mira el centro: el horizonte artificial muestra cielo arriba y tierra abajo; una línea inclinada significa alas inclinadas. 3. Busca la cinta vertical derecha: es la altitud, en pies. 4. Arriba o abajo del centro encuentra el rumbo: es la dirección hacia la que apunta el morro. 5. Localiza el indicador de giro y la bola: más adelante te ayudará a saber si el giro es ordenado. No hace falta usarlo hoy.",
    "No intentes leer todos los mensajes, botones o pantallas a la vez. Tampoco confundas velocidad con altitud: la velocidad está a la izquierda y la altitud a la derecha. Si la cabina te abruma, vuelve siempre a estas tres referencias: velocidad, horizonte y altitud.",
    "Un panel que ya no intimida",
    "Sin mover el avión, señala en tu pantalla: velocidad a la izquierda, horizonte en el centro y altitud a la derecha. Después di en voz alta qué mirarías para saber si el avión se está inclinando. Solo cuando puedas encontrar esas tres referencias sin buscar, termina la lección.",
    [
      "Freno de estacionamiento aplicado",
      "Velocidad ubicada a la izquierda",
      "Horizonte artificial ubicado en el centro",
      "Altitud ubicada a la derecha",
      "Rumbo identificado",
      "Sin palancas movidas durante la exploración",
    ],
  ),
  "c172-controls-first": lessonPlan(
    "Las palancas no son botones que se prueban al azar. La palanca negra, throttle, da potencia al motor. La roja, mezcla, regula la proporción de combustible y aire y se deja en rica para las primeras prácticas. La palanca de flaps baja superficies que ayudan a volar lento; al inicio déjalos arriba. El trim ajusta la presión del yoke, pero solo se usa cuando ya vuelas estable.",
    "Con el C172 detenido y freno aplicado: 1. Señala la palanca negra de throttle; no la muevas todavía. 2. Señala la roja de mezcla y confirma que está hacia delante/rica. 3. Encuentra el control de flaps y confirma UP/arriba. 4. Localiza la rueda de trim, pero no la gires. 5. En tu VelocityOne identifica la palanca Throttle, la rueda Trim y los controles de flaps. Para esta etapa solo usarás throttle cuando la lección lo indique.",
    "No muevas mezcla, flaps o trim para ver qué ocurre mientras el motor está encendido. No sueltes el freno de estacionamiento todavía. Si una palanca del simulador se mueve sin que la toques, pausa y revisa el mapeo de tu VelocityOne antes de continuar.",
    "Señalar antes de usar",
    "Con el avión inmovilizado, apunta a cada mando y completa la frase: negra = potencia; roja = mezcla; flaps = ayuda a baja velocidad; trim = alivia la fuerza del yoke. No hace falta accionarlos hoy.",
    [
      "Throttle negro identificado",
      "Mezcla roja identificada",
      "Flaps confirmados arriba",
      "Rueda de trim localizada",
      "Freno de estacionamiento mantenido",
    ],
  ),
  "know-c172": lessonPlan(
    "El Cessna 172 es un avión de entrenamiento porque te deja percibir con claridad la relación entre actitud, potencia y trim. La cabina es un puesto de trabajo: primero ubica lo esencial, después practica los movimientos.",
    "Con el avión detenido, identifica el indicador de velocidad, horizonte artificial, altímetro, coordinador de viraje y brújula o rumbo. Ubica también el throttle, mezcla, flaps y trim. No necesitas memorizar todos los sistemas: aprende qué información usarás en cada fase.",
    "No fijes la mirada en un solo instrumento ni muevas palancas por curiosidad sin saber su función. En tierra, el motor puede estar encendido; confirma freno de estacionamiento antes de explorar.",
    "Tour de cabina",
    "Sentado en el Cessna 172 en plataforma, señala los cinco instrumentos básicos y los cuatro mandos principales. Luego configura una cámara que te permita volver con facilidad a la vista de instrumentos.",
    [
      "Freno de estacionamiento confirmado",
      "Instrumentos básicos ubicados",
      "Throttle, mezcla, flaps y trim identificados",
      "Vista de cabina preparada",
    ],
  ),
  "three-axes": lessonPlan(
    "El avión gira sobre tres ejes: alabeo, cabeceo y guiñada. El yoke mueve alerones para el alabeo y elevador para el cabeceo; los pedales controlan el rudder para la guiñada. Entenderlos evita usar el mando equivocado.",
    "En tierra, mueve el yoke a los lados y observa alerones; llévalo adelante y atrás y observa elevador; pisa cada pedal y observa el rudder. Después, en vuelo recto y tranquilo, prueba entradas mínimas de uno en uno y vuelve al centro.",
    "No combines entradas grandes para “ver qué pasa”. Un viraje no se corrige con rudder solamente y una subida no se logra tirando indefinidamente del yoke. Usa movimientos pequeños y observa la respuesta.",
    "Tres movimientos, una respuesta",
    "Realiza tres secuencias separadas: una inclinación suave, un cambio leve de actitud de cabeceo y una pulsación breve de rudder. Describe qué cambió en la actitud del avión después de cada una.",
    [
      "Alerones identificados",
      "Elevador identificado",
      "Rudder identificado",
      "Entradas realizadas de una en una",
    ],
  ),
  "throttle-power": lessonPlan(
    "El throttle controla la potencia del motor. La potencia influye de forma importante en velocidad y en la capacidad de subir o bajar, pero siempre trabaja junto con la actitud del avión.",
    "En vuelo recto y nivelado, anota potencia y velocidad de crucero. Reduce potencia suavemente unos segundos sin cambiar la actitud y observa la tendencia. Vuelve al valor inicial. Repite aumentando potencia de forma moderada, sin hacer maniobras bruscas.",
    "No empujes potencia al máximo sin tener una razón y una actitud preparada. Evita usar el throttle como único control de altitud: observa también velocidad, actitud y trim.",
    "Observa la potencia",
    "En un vuelo libre despejado, establece crucero. Haz un cambio pequeño de potencia, espera a que el avión responda y regresa al punto inicial. Repite una vez. Tu objetivo es describir la tendencia, no mantener una cifra exacta.",
    [
      "Vuelo estable antes de la prueba",
      "Potencia inicial anotada",
      "Cambio suave aplicado",
      "Velocidad y actitud observadas",
    ],
  ),
  "what-is-trim": lessonPlan(
    "El trim no gira el avión por ti; alivia la presión necesaria para mantener una actitud. Se ajusta después de establecer la actitud y potencia deseadas, con cambios pequeños y tiempo para observar.",
    "En vuelo recto, establece una actitud estable con el yoke. Mantén la presión necesaria y ajusta el trim en pequeños toques hasta que puedas relajar el esfuerzo. Si el avión se aleja de la actitud, vuelve con el yoke y repite lentamente.",
    "No uses trim para recuperarte de una desviación grande ni lo ajustes rápido. Si pierdes el control de la actitud, vuelve primero al yoke, estabiliza y solo entonces recorta.",
    "Encuentra el punto neutro",
    "En condiciones calmas, mantén el Cessna recto y nivelado. Ajusta trim en incrementos pequeños hasta que el avión requiera menos fuerza en el yoke. Haz dos intentos y anota cuál fue más suave.",
    [
      "Actitud estable establecida",
      "Potencia mantenida",
      "Trim ajustado en pasos pequeños",
      "Resultado comparado",
    ],
  ),
  "first-cockpit-exercise": lessonPlan(
    "Tu primera práctica integra observación, control suave y una rutina de cierre. No se trata de hacer un vuelo perfecto: se trata de terminar sabiendo qué repetir.",
    "Configura Vuelo libre de día y despejado con el Cessna 172. Haz la comprobación de controles, inicia un tramo de vuelo tranquilo y practica cambios pequeños de yoke, potencia y trim. Termina pausando o aterrizando cuando estés listo y registra una observación concreta.",
    "No añadas clima complejo, tráfico denso o una ruta larga. Si una maniobra se desordena, pausa, vuelve a un escenario estable y repite solo el elemento que estabas aprendiendo.",
    "Sesión de integración",
    "Completa una sesión de 15 minutos: preparación, reconocimiento de instrumentos, control suave y una nota final. La meta es completar el proceso entero sin prisa.",
    [
      "Vuelo libre configurado",
      "Controles comprobados",
      "Instrumentos revisados",
      "Potencia y trim practicados",
      "Aprendizaje anotado",
    ],
  ),
  "straight-and-level": lessonPlan(
    "Recto y nivelado es la referencia de casi todas las maniobras. Requiere mirar afuera, confirmar instrumentos, usar una potencia razonable y recortar el avión para no luchar contra el yoke.",
    "En Vuelo libre, despega con ayudas si aún no dominas el despegue o inicia en el aire. Elige una referencia lejana frente al morro, establece una actitud suave, ajusta potencia de crucero y trim. Alterna la vista exterior con velocidad, altitud y rumbo.",
    "No persigas cada pequeña oscilación. Espera unos segundos tras cada corrección, usa entradas mínimas y evita mirar solo el altímetro. La tendencia importa más que una lectura instantánea.",
    "Mantén la referencia",
    "Mantén un tramo recto y nivelado durante tres minutos en clima despejado. Cada vez que corrijas, di qué variable cambió: actitud, potencia o trim.",
    [
      "Condiciones calmas seleccionadas",
      "Referencia exterior elegida",
      "Potencia de crucero establecida",
      "Trim aplicado",
      "Tres minutos completados",
    ],
  ),
  "turns-and-coordination": lessonPlan(
    "Un viraje coordinado combina una inclinación moderada, presión suave hacia atrás para sostener altitud y rudder solo lo necesario para mantener la bola centrada. La salida comienza antes del rumbo deseado.",
    "Desde vuelo recto y nivelado, mira un punto de referencia, inclina suavemente con yoke y añade la presión necesaria. Vigila la altitud y el coordinador. Aproxima la salida con anticipación, nivela las alas y verifica el rumbo final.",
    "No inclines demasiado ni corrijas la pérdida de altitud tirando fuerte. No pises rudder a fondo para “girar”. Si el viraje se desorganiza, nivela alas, estabiliza y vuelve a intentarlo con menos inclinación.",
    "Virajes de referencia",
    "Realiza dos virajes suaves, uno a cada lado, usando una referencia visual. Empieza y termina cada viraje en vuelo recto y nivelado.",
    [
      "Vuelo recto establecido",
      "Referencia exterior elegida",
      "Viraje a cada lado practicado",
      "Altitud revisada al salir",
    ],
  ),
  "airport-traffic-pattern": lessonPlan(
    "El circuito de tránsito organiza el flujo alrededor de la pista. Sus tramos básicos son salida, viento cruzado, viento en cola, base y final. En simulación lo usarás para construir una aproximación predecible.",
    "Elige un aeropuerto de poca complejidad y una pista con buen tiempo. Revisa la dirección de la pista, despega o inicia cerca del circuito y recorre sus tramos con giros suaves. Mantén una separación visual razonable de la pista y prepara la aproximación antes de llegar a final.",
    "No bajes tarde ni gires directamente a final sin entender tu posición. Evita preocuparte por una fraseología perfecta al comienzo: primero construye el patrón visual y la estabilidad del avión.",
    "Vuelta al circuito",
    "Vuela un circuito completo en clima despejado. Identifica en voz alta cada tramo y realiza una aproximación estabilizada. Puedes reiniciar el vuelo si la aproximación se vuelve inestable.",
    [
      "Pista identificada",
      "Circuito visualizado",
      "Cinco tramos nombrados",
      "Aproximación estable intentada",
    ],
  ),
  "first-vfr-navigation": lessonPlan(
    "La navegación VFR usa referencias visuales, orientación y una ruta sencilla. Al principio, elige trayectos cortos entre aeropuertos cercanos y evita depender de una línea mágica en el mapa.",
    "En el mapa mundial, escoge dos aeropuertos cercanos y un trayecto fácil de reconocer. Observa rumbo general, distancia y dos referencias en tierra, como una costa, río, carretera o población. Durante el vuelo, compara tu posición real con el mapa y corrige con pequeños cambios de rumbo.",
    "No empieces con mal tiempo, noche o terreno sin referencias. Si te desorientas, mantén el control del avión primero, vuelve a una referencia conocida y usa el mapa para reconstruir tu posición.",
    "Ruta de dos referencias",
    "Planifica un vuelo de 10 a 20 minutos entre dos aeropuertos cercanos. Antes de despegar, escribe dos referencias visuales. Durante el vuelo, confirma cada una y anota si necesitaste corregir el rumbo.",
    [
      "Ruta corta elegida",
      "Dos referencias anotadas",
      "Rumbo inicial revisado",
      "Posición comprobada durante el vuelo",
      "Correcciones anotadas",
    ],
  ),
  "vfr-consolidation": lessonPlan(
    "Esta práctica consolida la cadena completa: preparar, despegar o iniciar estable, mantener control, navegar, entrar al circuito y revisar. El valor está en seguir tu plan con calma.",
    "Planifica un vuelo VFR corto en Vuelo libre, de día y con clima despejado. Revisa controles, define salida, destino y referencias. Durante el trayecto mantén el avión estable, realiza al menos un viraje suave y entra al circuito de destino. Cierra con una revisión breve.",
    "No conviertas este vuelo en un examen. Si necesitas pausar o reiniciar, hazlo. Elige un trayecto que puedas terminar en menos de treinta minutos y mantén las ayudas que te permitan aprender con seguridad.",
    "Primer vuelo VFR completo",
    "Vuela una ruta corta que incluya preparación, tramo recto y nivelado, dos virajes, dos referencias visuales y llegada a un circuito. Al final, escribe una cosa que harías igual y una que practicarías de nuevo.",
    [
      "Vuelo libre configurado",
      "Ruta y referencias preparadas",
      "Control estable practicado",
      "Virajes completados",
      "Circuito de destino intentado",
      "Debriefing escrito",
    ],
  ),
};

const setup = (
  airport: string,
  position: string,
  altitude: string,
  weather: string,
  time: string,
  note: string,
): NonNullable<Lesson["flightSetup"]> => ({
  mode: "Vuelo libre",
  aircraft: "Cessna 172",
  airport,
  position,
  altitude,
  weather,
  time,
  note,
});

// Guía operativa para las primeras lecciones. Se mantiene separada del texto
// conceptual para que el alumno tenga una ruta concreta dentro de MSFS 2024.
const practicalLevelZeroDetails: Record<string, Partial<Lesson>> = {
  "prepare-msfs": {
    estimatedTime: "25 min",
    objectives: [
      "Abrir y reconocer el menú correcto de configuración",
      "Crear una base de práctica estable",
      "Dejar listos avión, clima y ayudas antes de tocar los mandos",
    ],
    sections: [
      {
        kind: "PROCEDIMIENTO",
        title: "Ruta exacta para preparar el simulador",
        content:
          "1. Desde la pantalla principal entra en VUELO LIBRE. No uses Modo Carrera para estas lecciones.\n2. En el mapa mundial selecciona Cessna 172 y el aeropuerto indicado arriba.\n3. Elige una plataforma (no una pista) para las lecciones de control; así el avión no se moverá mientras pruebas ejes.\n4. Abre CLIMA y selecciona un preajuste despejado. Pon hora de día, idealmente 10:00.\n5. Antes de iniciar, revisa que el viento sea calmo o muy ligero.\n6. Inicia el vuelo y aplica freno de estacionamiento. Solo entonces pasa a Configuración de controles.",
      },
      {
        kind: "APRENDE",
        title: "Configuración inicial que sí conviene usar",
        content:
          "Para aprender, deja activadas las ayudas que eviten frustración: etiquetas o indicaciones de navegación si las necesitas, pausa disponible y daño/desgaste desactivado al principio. No hay premio por desactivar ayudas demasiado pronto. La meta del Nivel 0 es que cada movimiento del control produzca una respuesta comprensible.",
      },
      {
        kind: "ERRORES COMUNES",
        title: "No ajustes dentro de un vuelo complicado",
        content:
          "No pruebes sensibilidad con viento fuerte, tormenta, noche, tráfico o una aproximación. Si cambias un eje, vuelve a esta misma situación: C172, día, despejado, avión detenido o vuelo recto. Así sabrás qué cambió realmente.",
      },
    ] as Lesson["sections"],
    checklist: [
      "Entré en Vuelo libre",
      "Elegí Cessna 172 y una plataforma",
      "Puse día, cielo despejado y viento ligero",
      "Apliqué freno de estacionamiento",
      "Dejé las ayudas de principiante activas",
    ],
    exercise: {
      title: "Escenario base de entrenamiento",
      instructions:
        "Crea el escenario indicado y no despegues todavía. Pausa si lo necesitas. Tu resultado correcto es ver el C172 quieto en plataforma, de día y sin clima que complique las pruebas.",
    },
  },
  "know-velocityone": {
    estimatedTime: "30 min",
    objectives: [
      "Crear un perfil propio para el C172",
      "Ver qué asignaciones reconoce MSFS",
      "Ubicar los ejes y botones esenciales antes de volar",
    ],
    sections: [
      {
        kind: "PROCEDIMIENTO",
        title: "Entra al perfil del VelocityOne",
        content:
          "1. Dentro de Vuelo libre, abre el engranaje de la esquina superior derecha; durante un vuelo también puedes pulsar ESC y entrar en Configuración.\n2. Abre CONTROLES. Verás los dispositivos detectados. Selecciona Turtle Beach VelocityOne Flight.\n3. Crea o duplica un perfil y llámalo C172 — Training. Conserva el perfil predeterminado sin cambios para poder volver atrás.\n4. En Customization/Personalización, usa la búsqueda y escribe el nombre de cada acción. Al seleccionar una acción, mueve el mando físico cuando el simulador lo pida.\n5. Si el dispositivo fue reconocido, primero revisa las asignaciones existentes; no es necesario reasignarlas todas.",
      },
      {
        kind: "APRENDE",
        title: "Lo mínimo que debe funcionar hoy",
        content:
          "Ejes: Aileron Axis (girar yoke izquierda/derecha), Elevator Axis (empujar/tirar yoke), Throttle Axis, y si cuentas con pedales, Rudder Axis.\nPalancas: Flaps, Mixture y Propeller Axis pueden permanecer en el perfil detectado; todavía no las usarás en vuelo.\nBotones esenciales: Parking Brake, Brakes, Flaps Increase/Decrease, Elevator Trim Up/Down, Pause/Active Pause y una vista de cabina. No necesitas programar todos los botones del panel para comenzar.",
      },
      {
        kind: "ERRORES COMUNES",
        title: "Antes de crear una asignación nueva",
        content:
          "Busca primero la acción y comprueba si ya existe. Dos asignaciones para el mismo eje pueden producir movimientos inesperados. Si un mando queda invertido, usa Reverse Axis en esa acción: no cambies de sitio los cables ni intentes compensarlo con la mano.",
      },
    ] as Lesson["sections"],
    checklist: [
      "VelocityOne seleccionado en Controles",
      "Perfil C172 — Training creado o duplicado",
      "Aileron y Elevator Axis reconocidos",
      "Throttle Axis reconocido",
      "Botones de freno, trim, flaps y pausa revisados",
    ],
    exercise: {
      title: "Inventario real de tu control",
      instructions:
        "Con el avión quieto, entra al perfil y comprueba una acción por vez. Mueve el yoke, luego throttle y después cada palanca. Para cada eje responde: ¿se mueve?, ¿va en el sentido correcto?, ¿vuelve a cero sin temblar? No cambies sensibilidad todavía.",
    },
  },
  "initial-controls-check": {
    estimatedTime: "25 min",
    sections: [
      {
        kind: "PROCEDIMIENTO",
        title: "Prueba de ejes, en este orden",
        content:
          "Con el C172 inmovilizado y freno de estacionamiento aplicado:\n1. Yoke a la izquierda: el alerón izquierdo debe subir y el derecho bajar.\n2. Yoke a la derecha: ocurre lo contrario.\n3. Yoke hacia ti: el elevador sube; yoke hacia delante: el elevador baja.\n4. Throttle: confirma que el porcentaje de potencia sube al avanzar y baja al retroceder.\n5. Pedales o controles de rudder: comprueba el timón de dirección, un lado a la vez.\n6. Mueve flaps, trim y mezcla sin motor acelerado; observa el indicador o la palanca de cabina.\n7. Devuelve todo a una posición segura antes del siguiente mando.",
      },
      {
        kind: "APRENDE",
        title: "Cómo corregir algo que no coincide",
        content:
          "Eje invertido: abre la acción específica y activa Reverse Axis.\nNo se mueve: busca el nombre de la acción y usa “buscar entrada” para asignarla; luego guarda el perfil.\nSe mueven dos cosas: elimina la duplicada del perfil C172 — Training, no del perfil original.\nSe mueve solo: eso se corrige en la siguiente lección con zona muerta pequeña, después de confirmar que no hay duplicados.",
      },
      {
        kind: "ERRORES COMUNES",
        title: "No pruebes acelerando",
        content:
          "Esta lección se hace detenido. No despegues para comprobar el yoke. Si el motor está encendido, deja throttle al mínimo y freno de estacionamiento aplicado. La prueba es visual: superficies, palancas e indicadores.",
      },
    ] as Lesson["sections"],
    checklist: [
      "Freno de estacionamiento aplicado",
      "Alerones se mueven en el sentido esperado",
      "Elevador se mueve en el sentido esperado",
      "Throttle aumenta y reduce potencia correctamente",
      "Rudder, flaps y trim revisados",
      "Ningún eje está duplicado",
    ],
    exercise: {
      title: "Checklist de respuesta",
      instructions:
        "Haz la prueba de siete pasos sin prisa. Si algo falla, anótalo como “invertido”, “sin respuesta”, “duplicado” o “tiembla”. Corrige un solo problema, repite desde el paso 1 y no marques la lección completa hasta que todos los ejes principales respondan.",
    },
  },
  "sensitivity-deadzones": {
    estimatedTime: "30 min",
    objectives: [
      "Encontrar la curva de cada eje en MSFS 2024",
      "Aplicar una base de sensibilidad conservadora",
      "Ajustar zona muerta solo si existe movimiento no deseado",
    ],
    sections: [
      {
        kind: "PROCEDIMIENTO",
        title: "Dónde está la sensibilidad en MSFS 2024",
        content:
          "1. Ve a Configuración > Controles y selecciona VelocityOne Flight.\n2. Pulsa el icono de engranaje junto al dispositivo y abre Hardware Settings/Configuración de hardware.\n3. Elige el eje: Aileron, Elevator, Rudder o Throttle. En algunas versiones debes abrir la acción y pulsar Tweak Action Curve/Ajustar curva de acción.\n4. Ajusta un único eje, guarda y vuelve a probar el mismo vuelo. Si no ves “Reactivity”, es normal: MSFS 2024 puede no mostrar ese ajuste.",
      },
      {
        kind: "APRENDE",
        title: "Valores iniciales para C172 — Training",
        content:
          "Empieza con esta base, no con valores extremos:\n• Aileron: sensibilidad -20 %, zona muerta 2 %, zona muerta extrema 0 %.\n• Elevator: sensibilidad -25 %, zona muerta 2 %, zona muerta extrema 0 %.\n• Rudder: sensibilidad -15 %, zona muerta 2 %, zona muerta extrema 0 %.\n• Throttle: sensibilidad 0 %, zona muerta 0–2 %.\nSi tu yoke está perfectamente estable en el centro, deja zona muerta en 0 %. Si ves temblor sin tocarlo, súbela solo a 3–4 %. Estos son valores de partida, no una receta obligatoria.",
      },
      {
        kind: "PROCEDIMIENTO",
        title: "Método de ajuste que funciona",
        content:
          "Usa el escenario de esta lección: aire calmo, C172 recto y nivelado. Haz tres entradas muy pequeñas de un eje. Si responde demasiado brusco cerca del centro, baja sensibilidad otros 5 puntos. Si el avión se mueve sin tocar el control, añade 1–2 puntos de zona muerta. Repite la misma prueba y anota el resultado. Cambia un solo eje por sesión.",
      },
      {
        kind: "ERRORES COMUNES",
        title: "Qué NO arregla una curva",
        content:
          "La sensibilidad no corrige un eje invertido ni una asignación duplicada. Una zona muerta grande tampoco es una solución para un yoke defectuoso: solo elimina precisión. Si el avión se inclina o asciende sin tocarlo, primero verifica viento, trim, duplicados y centrado físico.",
      },
    ] as Lesson["sections"],
    checklist: [
      "Abrí Hardware Settings o Ajustar curva de acción",
      "Modifiqué un solo eje",
      "Usé cambios de máximo 5 puntos",
      "Probé en clima calmo y con el mismo avión",
      "Anoté el valor que se sintió mejor",
    ],
    exercise: {
      title: "Tu perfil inicial C172",
      instructions:
        "Configura aileron -20 % y elevator -25 %, con zona muerta 2 % solo si observas ruido al centro. Vuela recto durante dos minutos a 6.500 ft. Si aún está nervioso, baja únicamente el eje problemático 5 puntos más. Guarda el perfil C172 — Training al terminar.",
    },
  },
};

const velocityOneC172Details: Record<string, Partial<Lesson>> = {
  "know-velocityone": {
    estimatedTime: "35 min",
    objectives: [
      "Poner el perfil correcto en el dispositivo",
      "Confirmar el control y perfil correctos en Xbox",
      "Reconocer qué mando físico corresponde a cada función básica",
    ],
    sections: [
      {
        kind: "PROCEDIMIENTO",
        title: "Primero: selecciona el perfil correcto en el control",
        content:
          "1. En la pantalla del propio VelocityOne, elige Single-Engine Prop. Este es el perfil del curso para el C172 en Xbox.\n2. En MSFS 2024 abre Configuración > Controles y selecciona VelocityOne Flight. Confirma que el perfil de MSFS también diga Single-Engine Prop.\n3. No continúes si los dos nombres no coinciden. El mismo botón puede hacer otra cosa si el perfil físico y el del simulador son distintos.\n4. Si las acciones ya aparecen asignadas, no las borres ni las reasignes: esta lección es para reconocerlas y comprobarlas.",
      },
      {
        kind: "APRENDE",
        title: "Mapa de asignaciones: YOKE",
        content:
          "Mueve el VOLANTE a izquierda/derecha → “Aileron Axis”; inclina las alas.\nEmpuja o tira el VOLANTE → “Elevator Axis”; baja o sube el morro.\nGATILLO IZQUIERDO (LT) y GATILLO DERECHO (RT) → “Rudder Axis”; giran el timón de dirección.\nPara frenar: el botón superior del agarre izquierdo se llama LB y el del agarre derecho RB. Pulsa ambos para detener el C172.\nNo memorices todavía los HAT, B1/B2 o botones de cámara: se explican únicamente cuando una lección los necesite.",
      },
      {
        kind: "APRENDE",
        title: "Mapa de asignaciones: QUAD",
        content:
          "PALANCA NEGRA → “Throttle 1 Axis” o “Throttle Axis”: potencia del motor.\nEn los diez botones blancos del cuadrante: B4 es el botón de ABAJO en la primera columna y activa o libera el freno de estacionamiento.\nB7 es el botón de ARRIBA en la tercera columna; B8 es el de ABAJO justo debajo. B7 disminuye flaps y B8 aumenta flaps: no los usarás hasta la lección de aproximación.\nPALANCA AZUL y PALANCA ROJA: Propeller y Mixture se explican más adelante; no las configures todavía.\nRUEDA TRIM → “Elevator Trim”: sirve para quitar presión del yoke cuando ya estás en vuelo estable. No la muevas al azar en esta primera configuración.",
      },
      {
        kind: "ERRORES COMUNES",
        title: "Regla importante antes de asignar",
        content:
          "Si una acción ya aparece asignada, primero pruébala. Solo usa “buscar entrada” cuando la acción esté vacía o sea incorrecta. Asignar de nuevo un eje que ya existe puede dejar un duplicado. Para aprender el C172 no necesitas tocar B3–B12, los botones de autopilot ni las palancas grandes del cuadrante.",
      },
    ] as Lesson["sections"],
    checklist: [
      "Perfil Single-Engine Prop seleccionado en el control y en MSFS",
      "VelocityOne Flight identificado en MSFS",
      "Volante, LT/RT, LB/RB ubicados",
      "Palanca negra, B4, B7/B8 y rueda Trim ubicados",
    ],
    exercise: {
      title: "No asignes todavía: verifica el mapa",
      instructions:
        "Con el C172 detenido, selecciona primero YOKE y observa la línea “Aileron Axis”; gira el volante. Luego selecciona “Elevator Axis” y empuja/tira. Repite con QUAD y “Throttle 1 Axis” moviendo solo la palanca negra. Si las barras se mueven y el sentido es correcto, ya está asignado: no modifiques nada.",
    },
  },
  "initial-controls-check": {
    estimatedTime: "30 min",
    sections: [
      {
        kind: "PROCEDIMIENTO",
        title: "Comprueba y asigna solo si falta algo",
        content:
        "Hazlo con el avión detenido y freno de estacionamiento aplicado.\n1. En VelocityOne Flight, busca “Aileron Axis”. Gira el volante: si la barra no se mueve, pulsa buscar entrada y gira el volante; confirma.\n2. Busca “Elevator Axis”. Empuja/tira: si no se mueve, asigna ese movimiento.\n3. Busca “Left Brake” y “Right Brake”. Pulsa los botones superiores de los agarres izquierdo (LB) y derecho (RB), respectivamente; después prueba ambos juntos.\n4. Busca “Parking Brake”. Pulsa B4: botón blanco de ABAJO en la primera columna del cuadrante.\n5. Busca “Increase Flaps” y “Decrease Flaps”. B8 es el botón blanco de ABAJO en la tercera columna y B7 está justo arriba; todavía no los necesitas para rodar.\n6. Busca “Throttle 1 Axis”. Mueve únicamente la palanca negra.\n7. Comprueba “Rudder Axis” con LT y RT en el yoke. No necesitas pedales para este curso inicial.",
      },
      {
        kind: "APRENDE",
        title: "Cómo saber si una asignación quedó bien",
        content:
          "Barra se mueve al usar el mando correcto: bien.\nBarra se mueve al usar dos mandos distintos: hay un duplicado; elimina la entrada adicional del perfil de entrenamiento.\nBarra se mueve en sentido contrario: abre el engranaje de esa acción y marca Reverse Axis.\nNo se mueve: usa buscar entrada una vez, mueve el mando hasta el final y confirma.\nNo continúes al siguiente paso hasta resolver el mando actual.",
      },
      {
        kind: "ERRORES COMUNES",
        title: "Qué puedes dejar sin tocar hoy",
        content:
          "No asignes el tren de aterrizaje: el C172 de entrenamiento tiene tren fijo. No asignes autopiloto, spoilers, reversa, botones B3–B12 ni las palancas grandes del cuadrante. Esos sistemas se introducirán cuando tengan sentido en una lección.",
      },
    ] as Lesson["sections"],
    checklist: [
      "Aileron Axis comprobado",
      "Elevator Axis comprobado",
      "LB/RB frenos comprobados",
      "B4 para freno de estacionamiento comprobado",
      "B7/B8 para flaps comprobados",
      "Palanca negra para Throttle Axis comprobada",
      "Rudder comprobado con pedales o LT/RT",
    ],
    exercise: {
      title: "Las siete asignaciones de principiante",
      instructions:
        "Tu único objetivo es que estas siete funciones respondan: Aileron Axis, Elevator Axis, Rudder Axis con LT/RT, Left/Right Brake con LB/RB, Parking Brake con B4, Increase/Decrease Flaps con B8/B7 y Throttle 1 Axis con la palanca negra. Termina solo cuando sepas qué pieza física corresponde a cada nombre.",
    },
  },
};

const c172NormalProcedures: Record<string, Partial<Lesson>> = {
  "c172-cold-dark": {
    estimatedTime: "15 min",
    sections: [
      {
        kind: "PROCEDIMIENTO",
        title: "Crea el escenario correcto en MSFS 2024",
        content:
          "1. Entra a Vuelo libre.\n2. Elige Cessna 172 Skyhawk G1000. Esta será la única versión usada en estas lecciones.\n3. Selecciona SKCL · Alfonso Bonilla Aragón, Cali, y una posición de plataforma o estacionamiento; no elijas pista.\n4. En el selector de estado de inicio elige Parked / Shutdown / Cold & Dark, según cómo aparezca en tu versión. No selecciones Ready to Taxi ni una posición en el aire.\n5. Elige día, cielo despejado y viento ligero. Inicia el vuelo.",
      },
      {
        kind: "APRENDE",
        title: "Cómo reconocer el estado apagado",
        content:
          "Estás en el estado correcto si el motor está silencioso, la hélice no gira, las pantallas están negras y el avión permanece quieto en plataforma. Puedes usar el ratón para todos los interruptores de estas secciones; no necesitas configurar el VelocityOne.",
      },
      {
        kind: "ERRORES COMUNES",
        title: "Si aparece el motor encendido",
        content:
          "No intentes “apagarlo y empezar” todavía: volveremos al menú y elegiremos una posición de plataforma con estado apagado. La práctica solo cuenta si empiezas con la hélice detenida. MSFS puede mostrar los nombres del estado en inglés incluso con el juego en español.",
      },
    ] as Lesson["sections"],
    checklist: [
      "Vuelo libre seleccionado",
      "Cessna 172 Skyhawk G1000 seleccionado",
      "Posición de plataforma elegida",
      "Estado Parked, Shutdown o Cold & Dark elegido",
      "Motor apagado y pantallas negras al entrar",
    ],
    exercise: {
      title: "Llegar al punto cero",
      instructions:
        "No enciendas nada. Mira el avión desde fuera y luego entra a la cabina. Señala mentalmente tres evidencias: hélice detenida, pantallas negras y motor silencioso. Ese es el punto cero desde el que siempre empezará esta ruta.",
    },
  },
  "c172-before-start": {
    estimatedTime: "25 min",
    sections: [
      {
        kind: "PROCEDIMIENTO",
        title: "Flujo antes de encender: hazlo en este orden",
        content:
          "Usa el ratón y lee un paso antes de tocarlo.\n1. Freno de estacionamiento: aplicado. Así el avión no se moverá al encender.\n2. Asientos, cinturones y puertas: confirma que están asegurados en la cabina. En MSFS basta con cerrar la puerta si estuviera abierta.\n3. Selector de combustible: BOTH / Ambos. Es la perilla situada en la parte baja central de cabina; en el simulador puedes acercar la cámara y pasar el cursor hasta ver su etiqueta.\n4. Palanca roja de mezcla: atrás, en IDLE CUTOFF / corte.\n5. Palanca negra de potencia: apenas abierta, aproximadamente el ancho de un dedo.\n6. Avionics: OFF. Deja radios y pantallas de navegación sin activar por ahora.\n7. Batería y alternador (MASTER): ON. Las pantallas pueden encenderse; es normal.\n8. Luz BEACON: ON, la luz roja intermitente que avisa que vas a arrancar.",
      },
      {
        kind: "APRENDE",
        title: "Qué estás preparando, en lenguaje simple",
        content:
          "Combustible en BOTH significa que el motor puede recibir combustible de los tanques. Mezcla en corte evita que el motor arranque antes de tiempo. La palanca negra deja pasar una cantidad pequeña de aire. MASTER da energía eléctrica. BEACON es una señal visual de que el motor va a encenderse. No necesitas memorizar estas palabras: sigue la lista y luego irán teniendo sentido.",
      },
      {
        kind: "ERRORES COMUNES",
        title: "No continúes si algo no coincide",
        content:
          "No uses el interruptor de arranque todavía si la palanca roja no está atrás o si el freno no está aplicado. Si no encuentras un control, no pulses todos los botones: usa la cámara para acercarte y pasa lentamente el cursor sobre cada interruptor hasta que MSFS muestre su nombre.",
      },
    ] as Lesson["sections"],
    checklist: [
      "Freno de estacionamiento aplicado",
      "Puerta cerrada",
      "Fuel Selector en BOTH / Ambos",
      "Mezcla roja en IDLE CUTOFF / corte",
      "Potencia negra apenas abierta",
      "Avionics en OFF",
      "MASTER en ON",
      "BEACON en ON",
    ],
    exercise: {
      title: "Cabina lista, motor aún apagado",
      instructions:
        "Completa los ocho pasos y detente. Debes tener energía eléctrica y el motor aún apagado. No continúes por intuición: compara cada elemento con la checklist, marca cada casilla y solo después abre la siguiente lección.",
    },
  },
  "c172-engine-start": {
    estimatedTime: "20 min",
    sections: [
      {
        kind: "PROCEDIMIENTO",
        title: "Arranque normal del C172 G1000",
        content:
          "Parte de la cabina lista de la lección anterior.\n1. Bomba eléctrica de combustible: ON.\n2. Mueve la mezcla roja a FULL RICH / rica solo unos segundos, hasta que el indicador de flujo de combustible se estabilice.\n3. Devuelve la mezcla roja a IDLE CUTOFF / corte.\n4. Bomba eléctrica: OFF.\n5. Mira fuera de la cabina y confirma que el área frente a la hélice está libre. En el simulador es una comprobación visual.\n6. Gira la llave de ignición a START y mantenla solo hasta que el motor empiece a girar y encender.\n7. Al encender, suelta la llave: debe volver a BOTH. Lleva suavemente la mezcla a FULL RICH / rica.\n8. Ajusta la palanca negra para estabilizar el motor cerca de 1.000 RPM.",
      },
      {
        kind: "APRENDE",
        title: "La señal de que funcionó",
        content:
          "Verás la hélice girar, escucharás el motor y aparecerán lecturas activas en la pantalla. “Rica” no es un ajuste de potencia: permite que el motor reciba combustible para mantenerse encendido después de arrancar. La llave no se queda en START; vuelve a BOTH cuando la sueltas.",
      },
      {
        kind: "ERRORES COMUNES",
        title: "Si el motor no arranca",
        content:
          "Detente y vuelve a comprobar: combustible en BOTH, mezcla en corte antes de girar START, bomba usada solo para cebar y MASTER encendido. No mantengas START indefinidamente ni hagas muchos intentos seguidos. En simulación, reinicia el escenario si no puedes identificar qué paso se omitió.",
      },
    ] as Lesson["sections"],
    checklist: [
      "Bomba de combustible usada para cebar",
      "Mezcla volvió a corte antes de START",
      "Área de hélice comprobada visualmente",
      "Llave soltada en BOTH tras el arranque",
      "Mezcla llevada a rica tras encender",
      "Motor estabilizado cerca de 1.000 RPM",
    ],
    exercise: {
      title: "Primer arranque completo",
      instructions:
        "Haz el flujo completo sin acelerar. Al escuchar el motor, no ruedes ni despegues. Solo estabilízalo cerca de 1.000 RPM y mantén el freno aplicado. El objetivo es entender el orden, no ir rápido.",
    },
  },
  "c172-after-start": {
    estimatedTime: "18 min",
    sections: [
      {
        kind: "PROCEDIMIENTO",
        title: "Comprobación inmediata después del arranque",
        content:
          "1. Mira la pantalla del motor y busca presión de aceite: debe subir poco después de encender.\n2. Comprueba que no haya una alerta roja persistente relacionada con el motor.\n3. Confirma que el sistema eléctrico está cargando: batería/alternador deben mostrar que reciben energía.\n4. Enciende AVIONICS para habilitar los equipos de navegación y comunicación.\n5. Verifica que ambas pantallas G1000 estén encendidas y sin una X roja grande.\n6. Mantén freno de estacionamiento aplicado. Todavía no rodamos: el siguiente bloque del curso será taxi y prueba de frenos.",
      },
      {
        kind: "APRENDE",
        title: "Qué estás comprobando",
        content:
          "La presión de aceite confirma que el motor está lubricándose. La carga eléctrica confirma que la batería no se está agotando. Las pantallas G1000 muestran navegación y estado del avión. Una alerta roja persistente no se ignora: en simulación, pausa y reinicia el escenario mientras aprendes.",
      },
      {
        kind: "ERRORES COMUNES",
        title: "Encender no significa salir rodando",
        content:
          "No quites el freno ni aceleres todavía. Arrancar, comprobar y rodar son tres fases distintas. La disciplina de detenerse tras el arranque es justamente lo que hace que el procedimiento sea realista y repetible.",
      },
    ] as Lesson["sections"],
    checklist: [
      "Presión de aceite subió tras el arranque",
      "Sin alerta roja persistente del motor",
      "Sistema eléctrico cargando",
      "AVIONICS encendido",
      "Pantallas G1000 activas",
      "Freno de estacionamiento sigue aplicado",
    ],
    exercise: {
      title: "Motor listo, avión detenido",
      instructions:
        "Después del arranque, espera unos segundos y realiza los seis chequeos. No ruedes. Cuando todo esté correcto, pausa el simulador y marca la lección como completada. Ya habrás encendido el C172 desde apagado y comprobado que está sano para continuar.",
    },
  },
};

const airAndVfrProcedures: Record<string, Partial<Lesson>> = {
  "know-c172": lessonPlan(
    "En vuelo solo necesitas tres referencias al principio: mira lejos por el parabrisas para saber hacia dónde va el avión; mira la velocidad para no volar demasiado lento; mira la altitud para confirmar si subes, bajas o mantienes nivel. No intentes leer toda la pantalla G1000.",
    "1. Al llegar a una zona segura, elige una montaña, nube o punto lejano frente al morro.\n2. Mira fuera durante unos segundos.\n3. Revisa velocidad y altitud una vez.\n4. Vuelve a mirar fuera. Repite este ciclo sin tocar nada durante un minuto.\n5. Si el avión se desvía, haz una corrección pequeña y espera a ver el resultado.",
    "No fijes la vista en el horizonte artificial ni en la pantalla durante todo el vuelo. Tampoco persigas cada número: la tendencia importa más que una variación pequeña.",
    "Mirar, comprobar, volver a mirar",
    "Mantén un rumbo aproximado durante dos minutos. Tu meta no es una cifra perfecta: es poder decir qué estabas mirando y por qué.",
    [
      "Referencia exterior elegida",
      "Velocidad revisada",
      "Altitud revisada",
      "Ciclo exterior-instrumentos repetido",
    ],
  ),
  "three-axes": lessonPlan(
    "El yoke hace dos cosas: girarlo inclina las alas; empujarlo o tirarlo cambia la altura del morro. El timón de dirección ayuda a mantener la trayectoria. En esta etapa se practican movimientos muy pequeños, uno a la vez.",
    "Con el avión estable: 1. gira apenas el yoke a la derecha y vuelve al centro; observa que el ala derecha baja. 2. Repite a la izquierda. 3. Tira apenas del yoke durante dos segundos y vuelve al centro; observa el morro. 4. Empuja apenas y vuelve al centro. 5. Espera después de cada entrada.",
    "No combines giros, tirones y potencia a la vez para “ver qué pasa”. Si el avión se inclina demasiado, nivela las alas primero y recupera con calma.",
    "Cuatro movimientos controlados",
    "Haz derecha, izquierda, nariz arriba y nariz abajo como ejercicios separados. Di en voz alta qué cambió después de cada entrada.",
    [
      "Zona de práctica segura",
      "Entrada derecha realizada",
      "Entrada izquierda realizada",
      "Cambio de morro arriba y abajo realizado",
      "Avión estabilizado al terminar",
    ],
  ),
  "throttle-power": lessonPlan(
    "La palanca negra regula cuánta potencia entrega el motor. Más potencia tiende a acelerar y ayudar a subir; menos potencia tiende a desacelerar y permitir bajar. La actitud del morro sigue siendo importante.",
    "1. En vuelo estable, anota mentalmente la velocidad. 2. Reduce potencia un poco y espera diez segundos sin cambiar el yoke. 3. Observa velocidad y altitud. 4. Vuelve a una potencia de crucero aproximada, alrededor de 2.300 RPM. 5. Aumenta suavemente y compara. No hagas cambios grandes.",
    "No uses potencia máxima como solución a cada problema y no trates de mantener altitud solo con la palanca negra. Potencia y actitud trabajan juntas.",
    "Dos cambios de potencia",
    "Haz una reducción pequeña y un aumento pequeño. Después de cada uno, espera y describe qué hizo el avión antes de corregir.",
    [
      "Vuelo estable establecido",
      "Potencia reducida una vez",
      "Potencia aumentada una vez",
      "Velocidad observada",
      "Avión estabilizado de nuevo",
    ],
  ),
  "what-is-trim": lessonPlan(
    "El trim es una ayuda para que no tengas que sostener fuerza constante en el yoke. Primero eliges la actitud y la potencia; después ajustas trim poco a poco hasta que el avión se mantenga más cómodo.",
    "1. Establece vuelo recto y nivelado. 2. Mantén la presión suave necesaria en el yoke. 3. Ajusta trim en toques pequeños en la dirección que reduce esa presión. 4. Espera unos segundos. 5. Si el avión se aleja, vuelve primero con el yoke y repite con un toque menor.",
    "No uses trim para recuperar una inclinación grande ni gires la rueda rápido. El trim no sustituye el control del avión; solo lo afina cuando ya está estable.",
    "Soltar tensión del yoke",
    "Busca un punto en el que puedas relajar las manos sin que el C172 cambie bruscamente de actitud. Si no lo logras, vuelve a la actitud estable y repite más despacio.",
    [
      "Vuelo estable antes de trim",
      "Trim ajustado en pasos pequeños",
      "Presión en yoke reducida",
      "Sin cambios bruscos",
      "Avión estable al terminar",
    ],
  ),
  "first-cockpit-exercise": lessonPlan(
    "Ahora unes las cuatro ideas: mirar fuera, controlar con suavidad, ajustar potencia y usar trim. Esta práctica ocurre en zona segura, lejos de pista y terreno.",
    "1. Mantén rumbo hacia una referencia exterior. 2. Estabiliza velocidad y altitud. 3. Haz una corrección pequeña de inclinación. 4. Ajusta potencia si cambia la velocidad. 5. Usa trim para soltar presión. 6. Mantén el resultado durante un minuto sin añadir otra maniobra.",
    "No conviertas este ejercicio en navegación ni aterrizaje. Si te desordenas, nivela alas, conserva una actitud moderada y pausa si lo necesitas.",
    "Primer minuto estable",
    "Mantén el C172 estable durante un minuto completo. Al terminar escribe una sola cosa que controlaste bien y una que deseas repetir.",
    [
      "Referencia exterior mantenida",
      "Velocidad y altitud comprobadas",
      "Corrección suave realizada",
      "Trim usado con calma",
      "Un minuto estable completado",
    ],
  ),
  "straight-and-level": lessonPlan(
    "Recto y nivelado es la habilidad que sostiene todo lo demás. Combina una referencia exterior, potencia de crucero, actitud suave y trim.",
    "A 3.500–4.500 ft MSL, elige una referencia lejana. Ajusta potencia cerca de 2.300 RPM, coloca el morro en una actitud moderada y espera. Corrige solo una cosa por vez: alas niveladas, luego altitud, luego velocidad. Finalmente ajusta trim.",
    "No hagas correcciones grandes ni mires solo el altímetro. Si estás 50–100 pies fuera, espera, observa la tendencia y corrige suavemente.",
    "Tres minutos recto y nivelado",
    "Mantén tres minutos dentro de una banda aproximada de ±150 ft y con rumbo reconocible. La estabilidad vale más que una perfección momentánea.",
    [
      "Altura de práctica segura",
      "Referencia exterior elegida",
      "Potencia de crucero aproximada",
      "Trim ajustado",
      "Tres minutos completados",
    ],
  ),
  "turns-and-coordination": lessonPlan(
    "Un viraje suave cambia el rumbo sin perder el control. Inclinas las alas, sostienes ligeramente el morro y vuelves a nivel antes del rumbo deseado.",
    "Desde vuelo recto y nivelado, elige un punto a 90 grados. Inclina el yoke suavemente hasta unos 20 grados de banco. Mantén una presión ligera hacia atrás si la altitud cae. Empieza a nivelar las alas unos 10 grados antes del rumbo objetivo. Repite al otro lado.",
    "No uses una inclinación grande ni pises dirección a fondo. Si pierdes más de 150 ft, nivela alas, estabiliza y repite con un viraje menor.",
    "Dos virajes de 90 grados",
    "Haz un viraje de 90 grados a cada lado, con pausa recta y nivelada entre ambos. Observa altitud al salir.",
    [
      "Vuelo estable al inicio",
      "Viraje derecho realizado",
      "Viraje izquierdo realizado",
      "Altitud revisada",
      "Alas niveladas al salir",
    ],
  ),
  "airport-traffic-pattern": lessonPlan(
    "Un circuito de tránsito es un rectángulo alrededor de una pista que evita que todos lleguen desde direcciones aleatorias. No es una figura que ya tengas que saber. Para aterrizar en una pista 01, el avión aterriza apuntando aproximadamente 010°; después despega en esa misma dirección. Los nombres son posiciones: SALIDA es recto tras despegar; VIENTO CRUZADO es un giro de 90° que te aleja del eje de pista; VIENTO EN COLA es el tramo paralelo a la pista, pero en dirección contraria al aterrizaje; BASE es otro giro de 90° hacia la pista; FINAL es la línea recta alineada con la pista. “Viento cruzado” también puede describir viento lateral, pero aquí primero lo usamos como nombre del tramo del circuito. Para leer el viento en MSFS: 360°/8 kt significa que viene DESDE el norte hacia el sur. En una pista 01, ese viento llega casi de frente: es viento de cara. Uno desde 180° llega por detrás: es viento de cola. Uno desde 090° o 270° llega de lado: es viento lateral. Para esta lección fija 0–3 kt y aprende primero la forma del circuito.",
    "1. Configura Vuelo libre: C172 G1000, SKCL, día, cielo despejado y viento fijado en 0–3 kt. Para el primer intento no uses viento fuerte; así el nombre de cada tramo no se mezcla con correcciones meteorológicas. 2. Completa taxi y despegue de Nivel 0. Mantén rumbo de pista y 70–75 KIAS hasta 500 ft AGL. 3. Continúa ascendiendo hasta 1.000 ft AGL: AGL significa altura sobre el aeropuerto, no altitud MSL. En SKCL, cuya elevación ronda 3.160 ft MSL, esto equivale aproximadamente a 4.160 ft MSL; usa el valor que muestre tu simulador para el aeropuerto elegido. 4. Si la guía/ATC no indica otra cosa, haz un giro suave de 90° a la izquierda: ahora estás en VIENTO CRUZADO. 5. Cuando estés separado de la pista, vuelve a girar 90° a la izquierda: ahora estás en VIENTO EN COLA. Verás la pista a tu izquierda y volarás paralela a ella, pero en sentido opuesto al de aterrizaje. Mantén 1.000 ft AGL. 6. Al quedar a la altura del umbral de pista, todavía no desciendas de golpe: la siguiente lección enseña la configuración. Para hoy, identifica base y final en el dibujo, aplica frustrada o pausa.",
    "No decidas por intuición si los giros son a la izquierda o derecha en un aeropuerto real: la carta, señales o ATC pueden indicar circuito derecho. En un aeropuerto controlado, ATC puede mandarte entrar en otro punto o hacer final directa. Para esta primera práctica usa la guía de MSFS y un circuito izquierdo de entrenamiento solo si no recibes una indicación distinta. Si no sabes qué pista está activa, no despega: abre Comunicaciones y sigue la instrucción o usa la pista que el simulador te asigne.",
    "Llegar y nombrar, sin aterrizar",
    "No necesitas aterrizar todavía. Despega, alcanza 1.000 ft AGL y completa salida → viento cruzado → viento en cola con dos giros suaves. Pausa allí y señala la pista: si está a tu izquierda y viajas paralela pero en dirección opuesta, estás en viento en cola. La próxima lección comenzará exactamente desde ese punto.",
    [
      "Viento fijado en 0–3 kt para la primera práctica",
      "Pista activa confirmada en Comunicaciones/MSFS",
      "1.000 ft AGL alcanzados",
      "Salida y viento cruzado nombrados",
      "Viento en cola reconocido con pista a un lado",
      "Base y final identificadas en el mapa visual",
      "Avión pausado o estabilizado antes de aproximar",
    ],
  ),
  "first-vfr-navigation": lessonPlan(
    "VFR significa orientarte principalmente mirando el terreno. Para empezar usarás una ruta corta y dos referencias grandes, con el mapa como respaldo.",
    "Planifica SKCL a SKUL. Antes de despegar, mira distancia, rumbo general y dos referencias: el valle y una población o carretera. En vuelo establece un rumbo general, busca la primera referencia y compárala con el mapa. Si te apartas, haz una corrección pequeña y vuelve a mirar fuera.",
    "No sigas el mapa con la cabeza abajo ni intentes una ruta larga. Si te desorientas, mantén el avión estable, recupera una referencia conocida y usa el mapa solo para confirmar.",
    "Ruta VFR corta",
    "Vuela el trayecto SKCL–SKUL en día despejado. Anota dos referencias que viste y una corrección de rumbo que hiciste.",
    [
      "Ruta revisada antes de salir",
      "Dos referencias definidas",
      "Rumbo general mantenido",
      "Mapa usado como respaldo",
      "Llegada o aproximación iniciada",
    ],
  ),
  "vfr-consolidation": lessonPlan(
    "Esta es la sesión completa: preparación, arranque, tierra, despegue, vuelo estable, navegación y llegada. No es un examen; es una forma de unir las piezas sin saltos.",
    "Prepara SKCL–SKUL de día despejado. Sigue cada checklist de tierra, solicita taxi, despega, asciende a una altura segura, mantén un tramo recto y nivelado, realiza dos virajes suaves y navega por referencias. Al llegar, intenta el circuito con las ayudas activas si las necesitas.",
    "No intentes corregir todo a la vez. Si algo se desordena, pausa o reinicia el tramo. Una buena sesión es aquella en la que sabes qué ocurrió.",
    "Vuelo VFR de consolidación",
    "Completa la ruta o, si no llegas, detente en una zona segura. Escribe: qué fue fácil, qué fue difícil y cuál será tu siguiente práctica.",
    [
      "Checklist de tierra seguida",
      "Despegue ordenado",
      "Vuelo estable practicado",
      "Dos virajes realizados",
      "Referencias VFR usadas",
      "Revisión final escrita",
    ],
  ),
};

const c172TakeoffProcedures: Record<string, Partial<Lesson>> = {
  "c172-lineup": {
    estimatedTime: "18 min",
    sections: [
      {
        kind: "PROCEDIMIENTO",
        title: "De la línea de espera a la pista",
        content:
          "1. Completa la checklist anterior y solicita o confirma autorización en Comunicaciones.\n2. Rueda lentamente hasta la línea de espera. Detente allí.\n3. Cuando tengas autorización para entrar, mira ambos lados de la pista en el simulador.\n4. Entra despacio, gira hasta quedar paralelo a la línea blanca del centro y detente.\n5. El morro debe apuntar a los números grandes de la pista. Mantén el avión centrado; aún no apliques potencia de despegue.",
      },
      {
        kind: "APRENDE",
        title: "Tu referencia visual",
        content:
          "La línea blanca discontinua de la pista es tu guía. No mires solo el morro: mira lejos, hacia el final de la pista, y corrige con movimientos pequeños. Estar alineado es una condición previa; no es una carrera.",
      },
      {
        kind: "ERRORES COMUNES",
        title: "No cruces por costumbre",
        content:
          "Si no recibiste autorización o no entiendes el mensaje de Comunicaciones, permanece detenido en la línea de espera. En este curso, detenerse es siempre una respuesta correcta cuando no sabes qué hacer.",
      },
    ] as Lesson["sections"],
    checklist: [
      "Checklist antes de despegue completada",
      "Autorización o ruta revisada",
      "Línea de espera respetada",
      "Pista libre comprobada visualmente",
      "Avión centrado y detenido en la pista",
    ],
    exercise: {
      title: "Alineación sin despegar",
      instructions:
        "Entra, alinea el C172 con el centro de la pista y detente. Mira hacia el final de pista y comprueba que la línea queda centrada bajo el morro. Reinicia si quedas inclinado o fuera de eje.",
    },
  },
  "c172-takeoff-roll": {
    estimatedTime: "20 min",
    sections: [
      {
        kind: "PROCEDIMIENTO",
        title: "Carrera de despegue del C172",
        content:
          "1. Con el avión alineado, libera el freno de estacionamiento.\n2. Aplica potencia suavemente hasta el máximo y confirma que el avión sigue recto sobre la línea central.\n3. Mantén la mirada al final de la pista; corrige dirección con entradas pequeñas.\n4. A medida que aumenta la velocidad, el yoke se vuelve más sensible. No tires de él de golpe.\n5. Cerca de 55 nudos, alivia suavemente la presión hacia delante. El avión se separará del suelo cuando esté listo.\n6. Ya en el aire, mantén el morro moderadamente arriba y busca 70–75 KIAS en la cinta de velocidad izquierda. Sigue recto sobre la prolongación de la pista hasta 500 ft por encima del aeropuerto. La siguiente lección te lleva desde esos 500 ft hasta la zona de práctica a 6.500 ft MSL.",
      },
      {
        kind: "APRENDE",
        title: "El avión despega; no lo arrancas del suelo",
        content:
          "La potencia acelera el avión y las alas generan sustentación. Tu trabajo es mantenerlo recto y hacer una transición suave. Si tiras fuerte, puedes perder velocidad; si lo mantienes pegado a la pista demasiado tiempo, acumula demasiada velocidad. La salida correcta se siente continua, no brusca.",
      },
      {
        kind: "ERRORES COMUNES",
        title: "Si algo se ve mal, detén el intento",
        content:
          "Si el C172 se desvía mucho, pierde el centro de pista o el motor no responde como esperas, reduce potencia y frena mientras aún estás en tierra. En el simulador puedes reiniciar sin penalización: repetir un despegue ordenado es parte del entrenamiento.",
      },
    ] as Lesson["sections"],
    checklist: [
      "Avión alineado antes de aplicar potencia",
      "Potencia máxima aplicada de forma continua",
      "Centro de pista mantenido",
      "Rotación suave cerca de 55 nudos",
      "Avión en el aire sin giro brusco",
      "70–75 KIAS comprobados tras despegar",
      "Ascenso recto mantenido hasta 500 ft sobre el aeropuerto",
    ],
    exercise: {
      title: "Un despegue, una sola meta",
      instructions:
        "Despega y mantén la dirección. No intentes tocar botones, radios ni mapa durante la carrera. Al dejar el suelo, mantén 70–75 KIAS y sigue recto hasta llegar a 500 ft sobre el aeropuerto. Ese es el final exacto de esta lección: abre entonces “Ascenso inicial y zona segura”, donde continuarás hasta 6.500 ft MSL.",
    },
  },
  "c172-climb-out": {
    estimatedTime: "20 min",
    sections: [
      {
        kind: "PROCEDIMIENTO",
        title: "Después de dejar la pista",
        content:
          "1. Desde 500 ft sobre el aeropuerto, mantén el morro en una actitud suave de ascenso y conserva potencia de despegue.\n2. Deja que la velocidad se estabilice cerca de 70–75 KIAS; no persigas cada variación pequeña.\n3. Si Comunicaciones o la cinta azul indican un giro de salida, hazlo suave; si no, sigue recto por el rumbo de pista.\n4. Continúa el ascenso hasta que el altímetro marque 6.500 ft MSL. Esta es tu altitud objetivo de práctica para las primeras lecciones en el aire.\n5. En 6.500 ft MSL, reduce la potencia poco a poco, nivela las alas y el morro, y prepárate para la primera lección de control en el aire.",
      },
      {
        kind: "APRENDE",
        title: "Tu prioridad es altura y calma",
        content:
          "En los primeros segundos no necesitas mirar todos los instrumentos. Mira al frente, mantén la actitud, comprueba velocidad de vez en cuando y deja que el avión gane altura. La navegación, el mapa y la radio pueden esperar hasta que el avión esté estable.",
      },
      {
        kind: "ERRORES COMUNES",
        title: "No gires ni ajustes demasiado pronto",
        content:
          "No hagas giros fuertes justo después de despegar y no reduzcas potencia antes de estar seguro. Si sientes que perdiste el control, nivela suavemente las alas, mantén una actitud moderada y, si hace falta, pausa el simulador.",
      },
    ] as Lesson["sections"],
    checklist: [
      "Ascenso estable establecido",
      "Velocidad aproximada de 70–75 nudos observada",
      "Pista alejada con seguridad",
      "Giro suave solo si la guía o ATC lo indica",
      "Altímetro en 6.500 ft MSL",
      "Avión nivelado en zona de práctica",
    ],
    exercise: {
      title: "Llegar a la zona de práctica",
      instructions:
        "Desde 500 ft sobre el aeropuerto, continúa el ascenso a 70–75 KIAS. Si no tienes una instrucción de giro, sigue recto. Cuando el altímetro marque 6.500 ft MSL, nivela el avión y ajusta potencia con calma. Ahora sí estás en el punto de inicio de la siguiente lección.",
    },
  },
};

const c172GroundProcedures: Record<string, Partial<Lesson>> = {
  "airport-map-basics": {
    estimatedTime: "18 min",
    sections: [
      {
        kind: "APRENDE",
        title: "Cuatro lugares que debes reconocer",
        content:
          "PLATAFORMA: donde el avión está estacionado; aquí empiezas y terminas.\nCALLE DE RODAJE: el camino por el que el avión se mueve lentamente en tierra; suele tener una línea central amarilla.\nPISTA: la franja larga destinada a despegar y aterrizar; no entres por ahora.\nLÍNEA DE ESPERA: dos líneas amarillas continuas y dos discontinuas antes de una pista. Siempre te detienes del lado de las líneas continuas hasta que el simulador/ATC te autorice a cruzar.",
      },
      {
        kind: "PROCEDIMIENTO",
        title: "Mira el mapa antes de liberar el freno",
        content:
          "1. Antes de iniciar el vuelo, abre Opciones > Asistencias y activa Taxi Ribbon / Cinta de taxi. Si el nombre cambia en tu versión, busca “taxi” en las asistencias visuales.\n2. Inicia el vuelo en plataforma y deja el freno aplicado.\n3. Abre Comunicaciones, solicita taxi y vuelve a la cabina: aparecerá una cinta o flechas azules sobre el suelo. Esa es tu guía; no necesitas una aplicación externa todavía.\n4. Compárala con el dibujo de esta lección: empiezas en plataforma, sigues la calle de rodaje y terminas en la línea de espera; no entras en la pista.\n5. Ya dentro del avión, encuentra también la línea amarilla real de la calle. No memorices letras ni números todavía.",
      },
      {
        kind: "ERRORES COMUNES",
        title: "La pista no es el primer destino",
        content:
          "No sigas una carretera de servicio ni cruces una línea de espera solo porque ves mucho espacio. La línea de espera es el punto de pausa: significa “detente aquí hasta saber qué sigue”. La navegación con mapas, letras de calles, rutas y EFB se explica paso a paso más adelante, en Nivel 3 · Navegación; por ahora usa la cinta azul.",
      },
    ] as Lesson["sections"],
    checklist: [
      "Plataforma identificada",
      "Calle de rodaje identificada",
      "Pista identificada",
      "Línea de espera identificada",
      "Avión sigue detenido",
    ],
    exercise: {
      title: "Orientación sin mover el avión",
      instructions:
        "Con el motor encendido y freno aplicado, localiza desde la cabina la plataforma, una línea amarilla de taxi y la pista a distancia. No ruedes. El resultado correcto es poder señalar hacia dónde está cada lugar.",
    },
  },
  "airport-radio-basics": {
    estimatedTime: "15 min",
    sections: [
      {
        kind: "APRENDE",
        title: "En MSFS no tienes que hablar por micrófono",
        content:
          "Para este curso usarás el panel de Comunicaciones de MSFS. El simulador muestra opciones de texto: tú eliges una y el ATC responde. No debes memorizar frases ni sintonizar frecuencias manualmente todavía. La radio sirve para pedir una ruta de taxi y saber dónde debes detenerte.",
      },
      {
        kind: "PROCEDIMIENTO",
        title: "Solicita taxi con la ayuda del simulador",
        content:
          "1. Mueve el cursor a la parte superior de la pantalla para mostrar la barra de herramientas.\n2. Pulsa el icono de globo de diálogo llamado Communications / Comunicaciones.\n3. En el panel, elige el aeropuerto actual y busca la opción Ground / Tierra o Request Taxi for Departure / Solicitar taxi para salida.\n4. Selecciona esa opción. MSFS puede dibujar una guía o flechas azules sobre la ruta.\n5. Lee el resultado: si aparece Hold Short, significa detenerse antes de la pista. No cruces esa línea hasta recibir una instrucción posterior.",
      },
      {
        kind: "ERRORES COMUNES",
        title: "La ayuda azul no reemplaza mirar",
        content:
          "Las flechas son una ayuda para aprender, no un permiso para cruzar una pista. Si la ruta visual parece confusa, detente en la línea de espera. Para esta etapa puedes mantener las ayudas de taxi activas.",
      },
    ] as Lesson["sections"],
    checklist: [
      "Panel Comunicaciones abierto",
      "Aeropuerto actual seleccionado",
      "Solicitud de taxi enviada",
      "Ruta visual o respuesta de ATC observada",
      "Significado de Hold Short entendido",
      "Freno sigue aplicado antes de la práctica de taxi",
    ],
    exercise: {
      title: "Pide taxi sin moverte",
      instructions:
        "Abre Comunicaciones y solicita taxi para salida, pero no sueltes el freno todavía. Solo observa la respuesta y localiza la primera dirección de la ruta. En la siguiente lección usarás esa información para rodar despacio.",
    },
  },
  "c172-taxi-basics": {
    estimatedTime: "20 min",
    sections: [
      {
        kind: "APRENDE",
        title: "Rodar no es volar",
        content:
          "Taxi significa mover el avión lentamente por la plataforma o calle de rodaje. Todavía no vas a la pista ni despegarás. El objetivo de esta lección es sentir que puedes iniciar el movimiento, mantenerlo lento y detenerlo exactamente donde quieres.",
      },
      {
        kind: "PROCEDIMIENTO",
        title: "Primer movimiento, sin prisa",
        content:
          "1. Con el motor estable y el freno de estacionamiento aplicado, mira que tengas espacio delante.\n2. Suelta el freno de estacionamiento con el ratón en cabina.\n3. Aumenta apenas la potencia; el C172 empezará a rodar lentamente. No busques una cifra exacta: si se mueve demasiado rápido, reduce potencia.\n4. Usa el control de dirección que MSFS ya reconoce para mantenerte sobre la calle de rodaje o plataforma. No cambies asignaciones en esta lección.\n5. Prueba los frenos suavemente una vez.\n6. Detén el avión, deja potencia al mínimo y vuelve a aplicar el freno de estacionamiento.",
      },
      {
        kind: "ERRORES COMUNES",
        title: "Si no puedes mantenerlo lento",
        content:
          "No aceleres para corregir dirección. Primero reduce potencia; después detén el avión con frenos. Si tu control de dirección no responde, detente y no intentes despegar: ese problema pertenece a la configuración del simulador y no a esta práctica de vuelo.",
      },
    ] as Lesson["sections"],
    checklist: [
      "Motor estable al ralentí",
      "Espacio libre delante del avión",
      "Freno de estacionamiento soltado",
      "Movimiento iniciado con potencia mínima",
      "Frenos probados",
      "Avión detenido y freno aplicado de nuevo",
    ],
    exercise: {
      title: "Avanza, frena y detente",
      instructions:
        "Rueda una distancia corta en la plataforma, equivalente a unos pocos largos de avión. Detente de forma controlada. Repite una vez. No vayas a la pista y no intentes levantar el morro: esta es una lección de suelo.",
    },
  },
  "c172-taxi-to-hold": {
    estimatedTime: "20 min",
    sections: [
      {
        kind: "PROCEDIMIENTO",
        title: "Del estacionamiento al punto de espera",
        content:
          "Parte con el motor estable, la solicitud de taxi ya enviada y la ruta azul visible.\n1. Mira la primera flecha o indicación y confirma que conduce a una calle de rodaje, no directamente a la pista.\n2. Suelta el freno de estacionamiento y añade apenas potencia para empezar a rodar.\n3. Sigue la línea amarilla y las flechas azules a velocidad de caminata rápida. Si una curva te sorprende, frena; no intentes girar bruscamente.\n4. En cada intersección, detente si no ves con claridad hacia dónde continúa la ruta. Revisa el mapa o la siguiente flecha y luego sigue.\n5. Busca las dos líneas amarillas continuas y dos discontinuas que cruzan la calle de rodaje: esa es la línea de espera.\n6. Detente antes de las líneas continuas, deja potencia al mínimo y aplica el freno de estacionamiento. No cruces la pista.",
      },
      {
        kind: "APRENDE",
        title: "El punto de espera es un destino, no una falla",
        content:
          "Llegar y detenerte antes de la pista es exactamente el resultado buscado. La autorización de taxi te lleva hasta ese punto; no te da permiso automático para entrar a la pista. La prueba de motor y la checklist final ocurren antes de continuar.",
      },
      {
        kind: "ERRORES COMUNES",
        title: "Si la ruta o las flechas desaparecen",
        content:
          "Reduce potencia y detente en una calle de rodaje o plataforma, nunca sobre la pista. Abre Comunicaciones y revisa la instrucción de taxi. Si no puedes reconstruir la ruta, reinicia esta práctica desde plataforma: repetir la ruta es mejor que adivinar.",
      },
    ] as Lesson["sections"],
    checklist: [
      "Solicitud de taxi ya enviada",
      "Ruta o flechas revisadas antes de moverse",
      "Línea amarilla seguida a baja velocidad",
      "Intersecciones recorridas sin adivinar",
      "Línea de espera identificada",
      "Avión detenido antes de la pista",
    ],
    exercise: {
      title: "Llegar y parar en el lugar correcto",
      instructions:
        "Sigue la ruta de taxi solo hasta la línea de espera. Detente antes de cruzarla, aplica el freno de estacionamiento y pausa. La siguiente lección empieza exactamente con el avión quieto en este lugar.",
    },
  },
  "c172-engine-runup": {
    estimatedTime: "25 min",
    sections: [
      {
        kind: "PROCEDIMIENTO",
        title: "Prueba de motor: avión detenido",
        content:
          "1. Detén el C172 en una zona amplia, lejos de otros aviones. Aplica el freno de estacionamiento.\n2. Confirma combustible en BOTH / Ambos, mezcla en RICH / rica y flaps arriba.\n3. Lleva la potencia a aproximadamente 1.800 RPM y observa que las lecturas del motor permanezcan estables.\n4. Enciende y apaga cada magneto usando la llave de ignición: pasa de BOTH a un lado, vuelve a BOTH, pasa al otro lado y vuelve a BOTH. Debe haber una pequeña caída de RPM, no una caída extrema.\n5. Regresa la potencia a cerca de 1.000 RPM.\n6. Si aparece una alerta persistente o el motor no responde con normalidad, pausa y reinicia el escenario; no continúes a la pista.",
      },
      {
        kind: "APRENDE",
        title: "Por qué se hace esta prueba",
        content:
          "La prueba de motor no es para hacerlo sonar fuerte. Sirve para comprobar que el motor responde antes de depender de él en el despegue. Las magnetos son dos fuentes de encendido: se prueban una por una y siempre se termina de nuevo en BOTH.",
      },
      {
        kind: "ERRORES COMUNES",
        title: "No hagas el run-up mientras ruedas",
        content:
          "El run-up se hace completamente detenido y con freno aplicado. No mantengas el motor a 1.800 RPM más tiempo del necesario. Cuando termine la comprobación, vuelve a ralentí; aún no hay autorización para despegar.",
      },
    ] as Lesson["sections"],
    checklist: [
      "Zona amplia elegida",
      "Freno de estacionamiento aplicado",
      "Fuel BOTH y mezcla RICH confirmados",
      "Prueba a aproximadamente 1.800 RPM realizada",
      "Magnetos revisadas y llave devuelta a BOTH",
      "Motor estabilizado de nuevo cerca de 1.000 RPM",
    ],
    exercise: {
      title: "Motor comprobado, avión inmóvil",
      instructions:
        "Realiza una sola prueba corta. Mantén el avión quieto, observa las RPM y termina de vuelta al ralentí. No ruedes a la pista todavía: el siguiente paso será la checklist final de tierra.",
    },
  },
  "c172-before-takeoff": {
    estimatedTime: "18 min",
    sections: [
      {
        kind: "PROCEDIMIENTO",
        title: "Checklist final antes de ir a la pista",
        content:
          "Con el C172 detenido y el motor a ralentí:\n1. Fuel Selector: BOTH / Ambos.\n2. Mixture: FULL RICH / rica.\n3. Flaps: UP / arriba para este primer despegue.\n4. Elevator Trim: TAKEOFF / neutro.\n5. Puertas y cinturones: asegurados.\n6. Pantallas G1000: encendidas, sin alerta roja persistente.\n7. Altímetro: comprueba que su lectura sea razonable para la altitud del aeropuerto.\n8. Freno de estacionamiento sigue aplicado. La lección termina aquí.",
      },
      {
        kind: "APRENDE",
        title: "Estar listo no significa despegar ya",
        content:
          "Una checklist antes de despegue prepara el avión, pero la siguiente acción todavía será rodar hasta la pista, revisar que está libre y solo entonces comenzar el despegue. Separar estos pasos evita sentir que todo ocurre de golpe.",
      },
      {
        kind: "ERRORES COMUNES",
        title: "No marques la lección mientras ruedas",
        content:
          "Haz esta lista detenido. Si ya estás en la pista, vuelve a una zona segura o reinicia la práctica. El aprendizaje correcto hoy es poder llegar a “listo para ir a la pista” sin despegar por accidente.",
      },
    ] as Lesson["sections"],
    checklist: [
      "Fuel BOTH confirmado",
      "Mezcla FULL RICH confirmada",
      "Flaps arriba",
      "Trim en posición de despegue o neutra",
      "Puertas y cinturones asegurados",
      "G1000 sin alerta roja persistente",
      "Freno de estacionamiento aplicado al terminar",
    ],
    exercise: {
      title: "Punto de pausa antes del vuelo",
      instructions:
        "Completa la checklist final, deja el avión detenido y pausa el simulador. Cuando termines esta lección habrás llegado correctamente al punto previo a rodar hacia la pista. El primer despegue será una sección posterior, no un salto automático.",
    },
  },
};

const navigationProcedures: Record<string, Partial<Lesson>> = {
  "vfr-map-route": lessonPlan("El mapa no vuela el avión: te permite saber dónde estás, qué dirección general seguir y qué deberías ver fuera. Para una primera ruta usa SKCL–SKUL, una distancia corta por el valle.", "1. En el menú de Vuelo libre, abre el mapa/EFB y fija salida SKCL y destino SKUL.\n2. Selecciona reglas VFR, día y cielo despejado.\n3. Lee tres datos: rumbo general, distancia total y tiempo estimado.\n4. Elige dos referencias grandes visibles, por ejemplo el valle y una población o carretera. Escríbelas.\n5. Antes de iniciar el vuelo, explica con tus palabras hacia dónde saldrás y qué esperas ver primero.", "No sigas una línea de mapa con la cabeza abajo. No elijas una ruta larga ni nocturna para aprender. Si no puedes describir las dos referencias, reduce la ruta antes de despegar.", "Mapa antes de motor", "Sin encender el motor, prepara SKCL–SKUL y anota rumbo general, distancia y dos referencias. El resultado correcto es un plan sencillo que puedas contar sin mirar la pantalla.", ["Origen y destino definidos", "Ruta VFR seleccionada", "Rumbo y distancia leídos", "Dos referencias anotadas", "Clima diurno y despejado confirmado"]),
  "nav-time-fuel": lessonPlan("Una navegación básica une cuatro datos: distancia, velocidad sobre el terreno, tiempo y combustible. No necesitas una calculadora complicada: tiempo aproximado = distancia ÷ velocidad. Después añades taxi y reserva a la fórmula de combustible que ya conoces.", "1. Del mapa toma la distancia de SKCL–SKUL.\n2. Para esta práctica usa 100 kt como velocidad sobre el terreno de planificación; tiempo aproximado en horas = distancia ÷ 100.\n3. Convierte el resultado a minutos y añade 15 min de taxi y 45 min de reserva.\n4. Multiplica el tiempo total por 8 gal/h.\n5. En vuelo, cada 15 minutos compara: combustible indicado, tiempo transcurrido y posición en mapa. Si uno no coincide, mantén el avión estable y revisa antes de seguir.", "No confundas la velocidad indicada con la velocidad sobre el terreno; el viento puede cambiar el tiempo real. No uses el combustible restante como una adivinanza: compáralo con tu hora de salida y tu plan.", "Plan de tres números", "Escribe distancia, tiempo previsto y combustible de salida para SKCL–SKUL. Durante un vuelo de práctica, pausa a los 15 minutos y di cuánto esperabas haber consumido.", ["Distancia anotada", "Velocidad de planificación elegida", "Tiempo estimado calculado", "Taxi y reserva agregados", "Chequeo de 15 minutos preparado"]),
  "vor-dme-basics": lessonPlan("VOR es una estación de radio que te dice en qué radial estás respecto a ella. DME muestra distancia. TO significa que el curso seleccionado te lleva hacia la estación; FROM significa que te aleja. Primero aprende a leerlos: no conectes piloto automático todavía.", "1. En una zona segura, abre el mapa o la información de navegación y elige un VOR cercano que tenga frecuencia publicada.\n2. En el G1000, sintoniza esa frecuencia en NAV1 y pásala de espera a activa.\n3. Espera una identificación o señal válida; si no hay señal, no uses la aguja.\n4. Selecciona la fuente NAV1/VOR en el CDI, no GPS.\n5. Gira el curso hasta que aparezca TO. Mira la aguja: si está a la izquierda, el curso está a tu izquierda; gira suavemente hacia ella para interceptar.\n6. Lee DME como distancia a la estación. Vuelve a GPS al terminar la práctica.", "No intentes seguir un VOR sin señal ni memorices una frecuencia inventada. No confundas radial con rumbo: un radial es la línea que sale desde la estación. Si TO/FROM cambia de forma inesperada, nivela alas y vuelve a comprobar fuente, frecuencia y curso.", "Leer antes de perseguir", "Con el C172 estable, sintoniza un VOR válido y di: frecuencia, TO o FROM, dirección de aguja y distancia DME. Solo después haz una corrección de rumbo pequeña.", ["VOR elegido en mapa", "Frecuencia NAV1 activa", "Señal válida comprobada", "CDI en NAV1/VOR", "TO/FROM leído", "DME leído", "CDI devuelto a GPS"]),
  "g1000-gps-route": lessonPlan("El GPS del G1000 puede mostrar un plan y guiar el CDI, pero no decide por ti. Antes de usarlo confirma tres cosas: el plan existe, el siguiente punto es el correcto y el CDI muestra GPS.", "1. Crea el plan SKCL–SKUL en el EFB antes de iniciar el vuelo.\n2. Ya estable en crucero, en el MFD pulsa FPL para ver el plan activo. Comprueba origen, destino y el siguiente punto.\n3. En el PFD localiza la fuente del CDI: debe decir GPS, no VOR. Si muestra VOR, usa la tecla CDI para alternar hasta GPS.\n4. Usa Direct-To solo si sabes a qué punto vas: pulsa la tecla con D→, escribe/elige SKUL y confirma.\n5. Mira el mapa como confirmación y vuelve la atención afuera. El GPS es respaldo de posición, no una razón para dejar de vigilar altura, terreno o combustible.", "No pulses NAV del piloto automático solo porque ves una línea magenta: primero confirma que el CDI dice GPS. No uses Direct-To para corregir cada desviación pequeña ni cambies el plan durante despegue, ascenso o aproximación.", "Plan activo visible", "En crucero, abre FPL, identifica el siguiente punto y confirma GPS en el CDI. Usa Direct-To únicamente si el destino correcto es SKUL y luego vuelve a la vista de vuelo.", ["Plan creado en EFB", "FPL abierto en MFD", "Origen y destino revisados", "Siguiente punto identificado", "CDI muestra GPS", "Vista exterior recuperada"]),
  "c172-autopilot-basics": lessonPlan("El piloto automático reduce trabajo, no reemplaza al piloto. HDG sigue el rumbo seleccionado; ALT mantiene la altitud actual o seleccionada; NAV sigue la fuente del CDI. Tú siempre verificas qué modo está armado o activo y estás listo para desconectarlo.", "1. Solo en vuelo recto y nivelado, lejos de terreno y a una altitud segura, ajusta primero el bug de rumbo hacia donde quieres ir.\n2. Ajusta la altitud objetivo antes de pulsar ningún modo.\n3. Pulsa AP y después HDG. Confirma en la parte superior del PFD que HDG aparece activo y que el avión gira suavemente hacia el bug.\n4. Pulsa ALT para mantener la altitud actual; confirma el anuncio en el PFD.\n5. Para seguir GPS, confirma primero CDI=GPS y que estás cerca de la línea magenta. Pulsa NAV: puede aparecer armado en blanco y activarse en verde al capturar la ruta.\n6. Prueba desconexión: pulsa AP, toma el yoke y mantén alas niveladas. Nunca esperes a que el avión se desordene para recuperar el control.", "No conectes AP justo después de despegar, durante final ni con el avión sin estabilizar. HDG no sigue el GPS; sigue el bug de rumbo. NAV no funciona bien si CDI está en VOR o si intentas capturar la línea desde un ángulo grande.", "Tres modos, una supervisión", "En aire calmo activa AP+HDG, luego ALT. Una vez estable, arma NAV con CDI=GPS y observa la captura. Desconecta AP manualmente y recupera el control antes de terminar.", ["Zona segura elegida", "Bug de rumbo ajustado", "Altitud objetivo ajustada", "HDG confirmado en PFD", "ALT confirmado en PFD", "GPS confirmado antes de NAV", "AP desconectado y control manual recuperado"]),
  "navigation-consolidation": lessonPlan("Este vuelo no es una demostración de botones. Es la cadena completa: plan, combustible, despegue manual, navegación vigilada y llegada preparada. El piloto automático se usa solo en crucero estable y se desconecta mucho antes de la llegada.", "1. Planifica SKCL–SKUL con EFB: VFR, clima despejado, rumbo, distancia, dos referencias y combustible calculado.\n2. Repite la cadena de Nivel 0 para encender, rodar y despegar.\n3. Asciende a una zona segura y estabiliza el C172 manualmente.\n4. Comprueba mapa, combustible y rumbo. Muestra FPL y confirma CDI=GPS.\n5. En crucero usa AP+HDG/ALT; si vas cerca de la línea, arma NAV y verifica la captura.\n6. Cada 15 minutos compara tiempo, combustible y posición.\n7. Antes de llegar, desconecta AP, vuelve a control manual y prepara el circuito/aterrizaje como en Nivel 2.", "No dejes el AP conectado hasta final ni uses la navegación para ignorar el clima, relieve o combustible. Si pierdes orientación, avía primero: alas niveladas, altitud segura, potencia estable; después revisa mapa o GPS.", "Vuelo completo de navegación", "Completa SKCL–SKUL o detente en una zona segura. Al final registra: rumbo previsto frente al real, combustible previsto frente al indicado, una referencia visual y un momento en que supervisaste el piloto automático.", ["Mapa y combustible preparados", "Salida manual completada", "Plan GPS comprobado", "AP usado solo en crucero", "Chequeo de 15 minutos realizado", "AP desconectado antes de llegada", "Debriefing escrito"]),
};

const ifrTrainingProcedures: Record<string, Partial<Lesson>> = {
  "ifr-boundaries": lessonPlan(
    "IFR significa volar usando instrumentos y procedimientos cuando la referencia exterior no basta. En un avión real exige formación, habilitación, planificación meteorológica y procedimientos publicados vigentes. Aquí practicarás exclusivamente en MSFS: día, cielo despejado, aire calmo y con posibilidad de pausar. El propósito no es simular una emergencia ni autorizar vuelo real; es aprender a interpretar el PFD y mantener control preciso.",
    "1. Crea un Vuelo libre con C172 G1000 ya en aire, a 6.500 ft MSL, clima despejado y sin turbulencia. 2. Pausa y localiza el horizonte artificial, velocidad, altitud y rumbo. 3. Quita la pausa y mantén mirada afuera; después mira el PFD durante cinco segundos. 4. Alterna afuera-PFD tres veces sin tocar mandos. 5. Declara la regla de esta sección: si te desorientas, alas niveladas, actitud moderada, potencia estable y pausa.",
    "No empieces con nubes, noche, clima real o tráfico denso. No conectes piloto automático para evitar aprender el control básico. Un procedimiento IFR nunca sustituye revisar cartas, clima, combustible y autorizaciones reales; estas lecciones son una práctica guiada de simulador.",
    "El límite de la práctica",
    "Con el avión estable a 6.500 ft MSL, identifica velocidad, altitud, rumbo y horizonte. Antes de terminar, di qué harás si pierdes orientación: alas niveladas, potencia estable, pausa y revisión.",
    ["Vuelo libre y clima despejado configurados", "Altitud inicial de 6.500 ft MSL confirmada", "PFD identificado", "Regla de pausa entendida", "Sin piloto automático usado"],
  ),
  "ifr-pfd-scan": lessonPlan(
    "El PFD no se lee de izquierda a derecha como un texto. El horizonte artificial del centro es tu ancla: allí ves actitud de morro y banco. Desde allí haces miradas breves a velocidad a la izquierda, altitud a la derecha, rumbo abajo y bola/coordinación cerca del centro. Lo importante es tendencia: una altitud que cambia o una velocidad que se aleja requiere una corrección pequeña, no una reacción brusca.",
    "1. Establece alas niveladas. 2. Mira el centro: ¿morro y banco son los deseados? 3. Mira velocidad a la izquierda y vuelve al centro. 4. Mira altitud a la derecha y vuelve al centro. 5. Mira rumbo en la parte baja y vuelve al centro. 6. Mira la bola/coordinación; si está desplazada, aplica una presión breve del pedal del mismo lado de la bola. 7. Repite el circuito durante un minuto. Cada mirada debe durar poco: no persigas un número exacto.",
    "No fijes los ojos en el altímetro esperando que se mueva ni uses el rumbo como única referencia de giro. No cambies cuatro controles ante una desviación. Primero identifica qué variable se apartó; después aplica una corrección pequeña y vuelve al escaneo.",
    "Un minuto de escaneo",
    "Mantén el avión estable durante un minuto repitiendo centro-velocidad-centro-altitud-centro-rumbo-centro. Al terminar, explica qué instrumento usarías para saber si las alas se inclinan.",
    ["Horizonte usado como ancla", "Velocidad comprobada", "Altitud comprobada", "Rumbo comprobado", "Coordinación observada", "Escaneo repetido un minuto"],
  ),
  "ifr-straight-level": lessonPlan(
    "Volar recto y nivelado por instrumentos consiste en mantener una actitud que produce el resultado deseado y comprobar ese resultado. El horizonte artificial te muestra la actitud; altitud, velocidad y rumbo confirman el rendimiento. Para esta práctica el objetivo es 6.500 ft MSL, rumbo actual y una velocidad de crucero cómoda; no necesitas perseguir una cifra de RPM exacta.",
    "1. En 6.500 ft MSL, nivela las alas en el horizonte artificial. 2. Ajusta el morro hasta que la altitud deje de subir o bajar. 3. Ajusta potencia suavemente para una velocidad de crucero estable. 4. Usa trim en toques pequeños para quitar presión del yoke. 5. Escanea velocidad, altitud y rumbo. 6. Si la altitud se aleja más de 100 ft, corrige primero con una actitud pequeña y espera; después vuelve a ajustar trim. 7. Mantén el resultado dos minutos.",
    "No intentes mantener altitud tirando continuamente del yoke ni corrijas cada oscilación de pocos pies. No cambies potencia y pitch a la vez sin saber qué problema corrige cada uno. Si se acumulan desviaciones, estabiliza alas, actitud y potencia antes de seguir.",
    "Dos minutos estables",
    "Mantén 6.500 ft MSL dentro de aproximadamente ±100 ft y tu rumbo dentro de unos ±10° durante dos minutos. Si te sales, recupera con calma y reinicia el conteo; el objetivo es aprender, no aprobar a la primera.",
    ["Alas niveladas en PFD", "Altitud objetivo 6.500 ft MSL elegida", "Potencia establecida", "Trim usado con pequeños toques", "Altitud dentro de ±100 ft", "Rumbo dentro de ±10° durante dos minutos"],
  ),
  "ifr-climbs-descents": lessonPlan(
    "Un ascenso o descenso por instrumentos tiene cuatro partes: decidir altitud objetivo, establecer actitud, ajustar potencia y vigilar que velocidad y rumbo sigan controlados. No es una carrera hacia un número. Para nivelar, anticipas: reduces la actitud de ascenso o descenso antes de alcanzar la altitud, porque el avión tarda en responder.",
    "1. Desde 6.500 ft MSL, elige 7.000 ft MSL como objetivo. 2. Mira el horizonte, eleva el morro ligeramente y conserva potencia suficiente para que la velocidad no caiga de forma preocupante. 3. Escanea velocidad, altitud y rumbo. 4. Unos 100 ft antes de 7.000 ft, baja suavemente el morro a actitud de nivel y ajusta potencia. 5. Estabiliza y usa trim. 6. Repite hacia 6.500 ft: reduce un poco potencia, baja el morro suavemente, y comienza a nivelar unos 100 ft antes de la altitud objetivo.",
    "No fijes el morro alto hasta que la velocidad se deteriore, ni dejes que el avión acelere sin revisar actitud. No esperes a la altitud exacta para nivelar: eso suele producir sobrepasos. Si el rumbo se mueve, corrígelo con un banco mínimo y vuelve al horizonte.",
    "Subir y volver",
    "Completa un ascenso de 6.500 a 7.000 ft MSL y un descenso de regreso. En cada nivelación, explica qué hiciste antes de llegar a la altitud y por qué.",
    ["7.000 ft MSL seleccionado", "Ascenso iniciado con actitud moderada", "Velocidad vigilada", "Nivelación anticipada", "Descenso a 6.500 ft completado", "Rumbo comprobado en ambos cambios"],
  ),
  "ifr-standard-turns": lessonPlan(
    "En instrumentos, un viraje se controla con banco, coordinación, rumbo y una salida anticipada. Para un primer ejercicio usa bancos moderados, alrededor de 15–20°, no virajes pronunciados. El rumbo cambia más rápido cuanto mayor es el banco: por eso comienzas a reducir banco unos pocos grados antes del rumbo objetivo.",
    "1. Establece 6.500 ft MSL y un rumbo redondo, por ejemplo 360°. 2. Decide el nuevo rumbo: 090°. 3. Mira el horizonte y aplica banco suave a la derecha hasta 15–20°. 4. Centra la bola con presión pequeña de rudder si es necesario. 5. Alterna horizonte, rumbo y altitud. 6. Aproximadamente 10° antes de 090°, comienza a retirar banco. 7. Nivelado en 090°, corrige con movimientos pequeños y confirma altitud. 8. Repite de 090° a 180°.",
    "No mires solo el indicador de rumbo: si lo haces, puedes perder altitud o exceder banco. No tires fuerte del yoke durante el giro para “sostener” altitud; usa una presión suave y revisa el resultado. Si pasas el rumbo, no hagas un viraje brusco de vuelta; estabiliza y corrige despacio.",
    "Dos rumbos elegidos",
    "Desde un rumbo estable, gira a dos rumbos separados 90°. Termina cada uno con alas niveladas, altitud cercana a 6.500 ft MSL y una explicación de cuándo empezaste a salir del giro.",
    ["Rumbo inicial identificado", "Rumbo objetivo elegido", "Banco moderado usado", "Bola observada", "Salida anticipada aplicada", "Dos virajes terminados estabilizados"],
  ),
  "ifr-route-briefing": lessonPlan(
    "Antes de seguir una ruta IFR debes poder contarla sin tocar botones: de dónde sales, a dónde vas, altitud planificada, qué fuente navega el CDI y qué harás si algo no coincide. En esta práctica usarás la ruta corta SKCL–SKUL en condiciones visuales. No es una ruta IFR publicada ni una autorización real: es un escenario para practicar briefing y verificación.",
    "1. En Vuelo libre/EFB crea SKCL–SKUL y anota origen, destino, rumbo general y altitud de práctica 7.500 ft MSL. 2. En cabina abre FPL y confirma que aparecen origen y destino. 3. En el PFD revisa que el CDI indique GPS, no VOR. 4. Di en voz alta: “Si el plan, CDI o rumbo no coinciden, mantengo alas niveladas, altitud segura y reviso antes de pulsar NAV”. 5. Solo después, en crucero estable, puedes usar HDG o NAV como práctica de supervisión.",
    "No copies una altitud de este curso para un vuelo real ni asumas que una línea magenta es una autorización. HDG sigue el bug de rumbo; NAV sigue la fuente del CDI. Si no sabes cuál está activa, no uses el piloto automático.",
    "Briefing de 30 segundos",
    "Antes de despegar o desde aire estable, explica en 30 segundos: origen, destino, altitud objetivo, fuente CDI y plan si algo no coincide. Luego comprueba cada dato en la pantalla.",
    ["Origen y destino definidos", "Altitud de práctica definida", "FPL revisado", "CDI confirmado en GPS", "Diferencia HDG/NAV explicada", "Plan de pausa y revisión declarado"],
  ),
  "ifr-approach-briefing": lessonPlan(
    "Una carta de aproximación no se memoriza; se lee con un orden. Primero identifica aeropuerto, pista y tipo de procedimiento. Luego confirma la frecuencia o fuente de navegación, el curso final, los fixes/puntos importantes, altitudes y el procedimiento de frustrada. Las cartas reales dependen de país, ciclo y aeropuerto: para vuelo real se usan datos vigentes y autorización ATC. Aquí solo aprenderás el orden de lectura.",
    "1. En el EFB o pantalla de procedimientos del simulador abre una aproximación GPS disponible para tu aeropuerto de práctica. 2. Di el nombre del aeropuerto, pista y tipo de aproximación. 3. Busca el curso final y localiza la altitud inicial o de cada tramo mostrada. 4. Busca el punto de frustrada y lee qué dirección/altitud indica el simulador. 5. Carga la aproximación solo después de haberla explicado. 6. Confirma que el CDI sigue en GPS antes de continuar.",
    "No inventes altitudes ni uses una carta desactualizada fuera del simulador. No cargues una aproximación durante despegue o mientras el avión no está estabilizado. Una aproximación cargada no garantiza que sea la correcta: siempre revisa aeropuerto, pista, transición y fuente CDI.",
    "Leer antes de cargar",
    "Abre una aproximación GPS y señala: aeropuerto/pista, tipo, curso final, primera altitud publicada y el texto de frustrada. Si no encuentras uno, no avances: vuelve al briefing y busca de nuevo.",
    ["Aeropuerto y pista identificados", "Tipo de aproximación identificado", "Curso final localizado", "Altitudes publicadas observadas", "Frustrada localizada", "CDI GPS confirmado antes de cargar"],
  ),
  "ifr-gps-approach": lessonPlan(
    "La aproximación GPS de esta lección se practica con tiempo bueno para que puedas comparar instrumentos y exterior. Seguir la ruta no basta: debes vigilar actitud, altitud, velocidad, fuente CDI y qué tramo está activo. Si no puedes explicar qué está haciendo el avión, la respuesta segura es nivelar, conservar una altitud segura y pausar.",
    "1. En crucero estable y con una aproximación GPS ya explicada, carga el procedimiento correcto en el G1000/EFB. 2. Comprueba aeropuerto, pista, transición y CDI=GPS. 3. Vuela o usa AP+HDG para acercarte; usa NAV solo después de verificar que el CDI sigue GPS y estás razonablemente cerca de la ruta. 4. Antes de cada descenso, verifica en la carta/EFB la siguiente altitud; no desciendas porque la línea magenta baje. 5. Mantén velocidad y configuración estable. 6. Si tienes la pista visible y el avión estable, continúa visualmente; si no, ejecuta la frustrada practicada.",
    "No uses el piloto automático como sustituto de vigilar altitud. No persigas la línea desde un ángulo grande ni desciendas antes de una altitud publicada. No intentes aterrizar si el avión no está estabilizado: frustrar es una maniobra normal.",
    "Seguir y comprobar",
    "En clima despejado, carga una aproximación GPS y completa el briefing. Vuela solamente hasta el punto en que puedas explicar qué tramo, fuente CDI y siguiente altitud aparecen. No es obligatorio aterrizar; una pausa controlada también completa el ejercicio.",
    ["Aproximación correcta cargada", "Aeropuerto y pista revisados", "CDI muestra GPS", "Siguiente tramo identificado", "Siguiente altitud verificada antes de descender", "Decisión visual o frustrada preparada"],
  ),
  "ifr-missed-approach": lessonPlan(
    "La frustrada protege el control cuando no puedes continuar una aproximación de forma segura. La prioridad es siempre: potencia, actitud, velocidad, configuración y navegación. Después de recuperar ascenso estable lees o sigues el procedimiento publicado; no intentas resolver radios, mapa y botones al mismo tiempo.",
    "1. Antes de iniciar, lee la frustrada de la aproximación elegida y anota la primera dirección o punto y altitud indicados por el simulador. 2. En una altura segura de práctica, simula el punto de frustrada. 3. Aplica potencia de ascenso. 4. Ajusta actitud de ascenso y comprueba que la velocidad se estabiliza en 70–75 KIAS. 5. Retrae flaps por etapas solo cuando el avión ascienda positivamente y según el estado que uses en el simulador. 6. Mantén alas niveladas o sigue el primer rumbo/punto de la frustrada solo cuando ya estés estable. 7. Asciende a la altitud indicada por el procedimiento o, si no estás usando datos válidos, vuelve a 6.500 ft MSL y pausa.",
    "No bajes el morro ni reduzcas potencia por mirar el GPS. No retraias toda la configuración de golpe si el avión aún no asciende. No inventes una ruta de frustrada para vuelo real: las instrucciones y altitudes publicadas son específicas de cada procedimiento.",
    "Frustrar con control",
    "Simula una frustrada en clima bueno. La práctica termina cuando vuelves a ascenso estable, 70–75 KIAS, rumbo controlado y puedes explicar cuál era tu siguiente referencia de procedimiento.",
    ["Frustrada leída antes de la práctica", "Potencia aplicada primero", "Actitud de ascenso establecida", "70–75 KIAS comprobados", "Configuración cambiada por etapas", "Ascenso y rumbo estabilizados", "Siguiente referencia explicada"],
  ),
};

const firstFlightProcedures: Record<string, Partial<Lesson>> = {
  "first-flight-now": {
    estimatedTime: "10 min",
    sections: [
      {
        kind: "APRENDE",
        title: "El objetivo de hoy: sentir el avión, no aprobar un examen",
        content:
          "Este es un vuelo de descubrimiento en el simulador. Empiezas ya en el aire para no mezclar taxi, radio, EFB, despegue y aterrizaje en tu primer minuto. Solo observarás tres zonas de la pantalla: velocidad a la izquierda, horizonte artificial al centro y altitud a la derecha. Sus nombres y funcionamiento se explicarán con calma en la siguiente lección.",
      },
      {
        kind: "PROCEDIMIENTO",
        title: "Configura el vuelo en MSFS 2024",
        content:
          "1. En Vuelo libre, elige Cessna 172 Skyhawk G1000.\n2. Elige una posición EN EL AIRE, no plataforma ni pista. Usa clima despejado y sin viento.\n3. Si el mapa permite elegir altura, selecciona 7.500 ft MSL. Si no aparece esa opción, usa cualquier inicio en aire que ofrezca MSFS y no te acerques al suelo.\n4. Inicia el vuelo. No abras EFB, ATC ni piloto automático; eso viene después.",
      },
      {
        kind: "PRUÉBALO EN MSFS",
        title: "Haz tres movimientos pequeños",
        content:
          "1. Mira por fuera y deja el yoke centrado durante 20 segundos.\n2. Gira el yoke apenas a la izquierda durante dos segundos y vuelve al centro; observa que el horizonte se inclina. Repite a la derecha.\n3. Tira apenas del yoke un segundo y vuelve al centro; después empuja apenas un segundo y vuelve al centro.\n4. No busques una cifra perfecta. Si el avión se inclina mucho, centra el yoke, reduce tus movimientos y reinicia el vuelo desde el menú.\n5. Después de diez minutos, pausa y termina la sesión desde el menú. No necesitas aterrizar hoy.",
      },
      {
        kind: "ERRORES COMUNES",
        title: "Qué no hacer todavía",
        content:
          "No pulses B7/B8, no muevas mezcla ni trim, no actives el piloto automático y no intentes aterrizar. Si ves que el avión desciende, no entres en pánico: pausa, vuelve al menú y reinicia el inicio en aire. Reiniciar es la acción correcta en esta práctica.",
      },
    ] as Lesson["sections"],
    checklist: [
      "C172 iniciado en el aire, con clima despejado",
      "Velocidad, horizonte y altitud localizados en el G1000",
      "Un giro pequeño a cada lado hecho y recuperado al centro",
      "Sesión terminada desde el menú, sin intentar aterrizar",
    ],
    exercise: {
      title: "Misión 1: conoce la sensación de volar",
      instructions:
        "Mantén el C172 razonablemente tranquilo durante 10 minutos. Tu meta observable es poder decir: izquierda inclina a la izquierda; derecha inclina a la derecha; tirar sube el morro; empujar lo baja. Termina desde el menú y continúa con la pantalla G1000.",
    },
  },
};

const efbProcedures: Record<string, Partial<Lesson>> = {
  "efb-first-look": {
    estimatedTime: "12 min",
    sections: [
      {
        kind: "APRENDE",
        title: "Qué es la EFB",
        content:
          "EFB significa Electronic Flight Bag: es la tablet de MSFS 2024. No es la pantalla G1000 del Cessna ni un menú de Xbox. Sirve para reunir mapa, ruta, clima, peso/combustible, cartas y checklist. Piensa en ella como una mesa de planificación: se usa antes de moverse y cuando el avión está estable, no durante una maniobra difícil.",
      },
      {
        kind: "APRENDE",
        title: "Las tres partes que usarás primero",
        content:
          "MAPA: te muestra dónde está el avión, aeropuertos, pistas y la línea de una ruta.\nRUTA: aquí eliges origen, destino y, más adelante, cargas un plan de vuelo.\nAPPS: son accesos a otras tareas como combustible, peso, checklist o cartas. No tienes que memorizar todos los iconos: el curso te indicará uno por uno cuándo usarlos.",
      },
      {
        kind: "PROCEDIMIENTO",
        title: "Ábrela sin iniciar un vuelo",
        content:
          "1. En el Mapa mundial de Vuelo libre, busca el acceso EFB que aparece en la interfaz.\n2. Ábrela y reconoce la tablet superpuesta sobre el mapa.\n3. Señala el campo de búsqueda, los iconos de aplicaciones y el mapa de fondo. No escribas un aeropuerto todavía.\n4. Ciérrala y vuelve a abrirla una vez. El objetivo es saber dónde está, no crear una ruta.\n5. Si en tu C172 aparece una tablet en cabina, puede verse distinta a la imagen; sigue siendo la misma idea. Si algún control de Xbox no responde, no fuerces botones: usa el panel de EFB en el mapa y detén la práctica.",
      },
      {
        kind: "ENTIENDE",
        title: "Qué aprenderás después",
        content:
          "En la próxima etapa de navegación crearás una ruta VFR corta, la cargarás en la EFB y la enviarás al G1000. Antes de taxi, aprenderás a leer el mapa del aeropuerto y la ruta de rodaje. No necesitas hacer ninguna de esas cosas hoy.",
      },
    ] as Lesson["sections"],
    checklist: [
      "EFB localizada en el Mapa mundial",
      "Mapa, Ruta y Apps diferenciados",
      "EFB abierta y cerrada sin iniciar un vuelo",
      "Entendido que el plan de vuelo se verá después",
    ],
    exercise: {
      title: "Misión 2: reconoce tu mesa de planificación",
      instructions:
        "Abre la EFB en el Mapa mundial, localiza el buscador y los accesos de aplicaciones, y ciérrala. Terminas cuando puedas explicar: la EFB sirve para preparar; el G1000 sirve para volar y seguir la información dentro del avión.",
    },
  },
};

const beginnerGroundCorrections: Record<string, Partial<Lesson>> = {
  "c172-taxi-basics": {
    sections: [
      {
        kind: "APRENDE",
        title: "Taxi: mover el avión muy despacio por el suelo",
        content: "Taxi no es despegar. Hoy no vas a una pista: solo aprenderás el ciclo completo de mover, frenar y detener el C172. En tu VelocityOne de Xbox usa la palanca negra para una cantidad mínima de potencia; LB frena la rueda izquierda, RB la derecha y ambos juntos detienen el avión.",
      },
      {
        kind: "PROCEDIMIENTO",
        title: "Una vuelta corta en plataforma",
        content: "1. Comprueba que tienes espacio despejado delante.\n2. Libera el freno de estacionamiento con B4: botón blanco de ABAJO, primera columna del cuadrante.\n3. Empuja la palanca negra apenas hacia delante hasta que el avión comience a moverse.\n4. Vuelve la palanca negra al mínimo; el avión debe seguir rodando lentamente.\n5. Presiona LB y RB juntos con suavidad hasta detenerte.\n6. Con el avión quieto, vuelve a poner B4. Repite solo una vez. No sigas la ruta de taxi todavía.",
      },
      {
        kind: "ERRORES COMUNES",
        title: "Si algo no sale bien",
        content: "Si acelera demasiado: palanca negra al mínimo y LB/RB juntos. Si gira: frena, detente y reinicia recto; no intentes corregir aumentando potencia. Si B4, LB o RB no hacen lo que esta lección dice, detente y vuelve a la comprobación visual del VelocityOne: no sigas a la pista con un freno que no reconoces.",
      },
    ] as Lesson["sections"],
    checklist: ["B4 ubicado y liberado", "Palanca negra usada solo un poco", "LB y RB probados juntos", "Avión detenido", "B4 aplicado de nuevo", "Pista no utilizada"],
    exercise: { title: "Misión de taxi: avanza y detente", instructions: "Avanza solo unos pocos largos de avión en plataforma y detente por completo usando LB/RB. El objetivo observable es quedar quieto y con B4 aplicado, sin acercarte a la pista." },
  },
  "c172-taxi-to-hold": {
    sections: [
      {
        kind: "PROCEDIMIENTO",
        title: "Sigue una ruta que el simulador ya te mostró",
        content: "1. Antes de soltar B4, abre Comunicaciones y solicita taxi. Si la cinta azul no aparece, no inventes una ruta: reinicia la solicitud o detente.\n2. Sigue la línea amarilla real y la guía azul a velocidad lenta.\n3. Si llegas a una intersección y no sabes hacia dónde ir, palanca negra al mínimo, LB/RB juntos y mira la siguiente flecha.\n4. El destino de hoy son las dos líneas amarillas de espera antes de la pista.\n5. Detente ANTES de las líneas continuas; aplica B4. Termina ahí, aunque veas la pista libre.",
      },
      {
        kind: "ENTIENDE",
        title: "Qué significa Hold Short",
        content: "Hold Short significa “detente antes de entrar a la pista”. No es un fallo ni una pausa accidental: es la meta de esta lección. La pista solo se usa en la siguiente etapa, tras una autorización/guía de MSFS y una checklist final.",
      },
    ] as Lesson["sections"],
    checklist: ["Ruta azul o instrucción de taxi visible", "Línea amarilla seguida lentamente", "Intersección resuelta sin adivinar", "Línea de espera reconocida", "Avión detenido antes de la pista", "B4 aplicado"],
    exercise: { title: "Misión de taxi: llega a Hold Short", instructions: "Sigue la guía de taxi hasta las líneas de espera y detente antes de cruzarlas. No entres a pista. Si te pierdes, vuelve a plataforma desde el menú y repite la práctica." },
  },
  "airport-traffic-pattern": {
    sections: [
      {
        kind: "APRENDE",
        title: "El circuito es una ruta ordenada alrededor de una pista",
        content: "No necesitas saberlo de memoria. Salida es recto tras despegar; viento cruzado es el primer lado corto; viento en cola es el lado paralelo a la pista pero en sentido contrario; base te lleva de vuelta hacia la pista; final queda alineado con ella. Estos nombres describen POSICIONES del circuito. “Viento cruzado” también puede referirse a viento lateral: son dos usos distintos de la misma expresión.",
      },
      {
        kind: "APRENDE",
        title: "Cómo leer el viento sin adivinar",
        content: "MSFS escribe el viento como dirección DESDE la que sopla y velocidad: 360°/8 kt viene desde el norte. Mira primero el número de la pista asignada por MSFS/ATC: una pista 02 apunta aproximadamente 020°, una 20 aproximadamente 200°. Si viento y rumbo de pista son parecidos, es viento de cara; si están enfrentados, es viento de cola; si llegan aproximadamente a 90° de lado, es lateral. Para tu primera práctica fija 0–3 kt: aprenderás la forma del circuito antes de corregir viento.",
      },
      {
        kind: "PROCEDIMIENTO",
        title: "Primera práctica: solo hasta viento en cola",
        content: "1. Usa la pista y sentido que te asigne MSFS/ATC; no asumas 01 ni giros a la izquierda.\n2. Tras despegar, sigue recto hasta la altura indicada por el simulador/ATC.\n3. Cuando tengas suficiente altura y el sentido de circuito esté confirmado, haz el primer giro de 90°: viento cruzado.\n4. Haz otro giro de 90°: viento en cola. Ahora vuelas paralelo a la pista, en sentido opuesto al aterrizaje.\n5. Pausa aquí. Base, final, flaps y aterrizaje se practican después en una lección con escenario de reinicio.",
      },
    ] as Lesson["sections"],
    checklist: ["Viento fijado en 0–3 kt", "Pista y sentido confirmados en MSFS/ATC", "Salida identificada", "Viento cruzado identificado", "Viento en cola identificado", "Práctica pausada antes de aproximar"],
    exercise: { title: "Misión de circuito: llega a viento en cola", instructions: "No aterrices hoy. Identifica salida, viento cruzado y viento en cola con la pista paralela a un lado. Pausa al completar el segundo giro; la aproximación se explicará antes de pedírtela." },
  },
};

const departureCorrections: Record<string, Partial<Lesson>> = {
  "c172-takeoff-roll": {
    sections: [
      { kind: "APRENDE", title: "Qué objetivo tiene un despegue", content: "El objetivo no es tirar del yoke para despegar. Es acelerar recto, dejar que las alas produzcan sustentación y subir suavemente. La línea central de la pista te dice si vas recto; la cinta de velocidad del G1000 te dice cuándo el avión tiene energía suficiente." },
      { kind: "PROCEDIMIENTO", title: "Carrera y despegue, una acción a la vez", content: "1. Con el avión centrado, libera B4 (parking).\n2. Empuja la palanca negra de forma continua hacia potencia máxima.\n3. Mira lejos, al final de la pista, y mantén la línea blanca bajo el morro con movimientos mínimos de LT/RT.\n4. Cerca de 55 KIAS, tira del yoke muy suavemente; no lo jales.\n5. Cuando las ruedas dejen el suelo, mantén un ascenso suave y busca 70–75 KIAS.\n6. A 500 ft AGL (sobre el aeropuerto), mantén el avión estable y pausa. Eso termina esta lección.", },
      { kind: "ERRORES COMUNES", title: "Cuándo abortar en el simulador", content: "Mientras aún estés en pista, si el avión se desvía mucho o algo no responde: palanca negra al mínimo y LB/RB juntos para frenar. Si ya estás en aire y te desorientas: alas niveladas, movimientos pequeños y pausa/reinicio. 55 KIAS y 70–75 KIAS son referencias del C172 de entrenamiento en MSFS; no sustituyen el POH de otra variante." },
    ] as Lesson["sections"],
    checklist: ["Pista y línea central visibles", "B4 liberado", "Palanca negra llevada a máxima potencia", "Rotación suave cerca de 55 KIAS", "70–75 KIAS observados en ascenso", "Pausa a 500 ft AGL"],
    exercise: { title: "Misión de despegue: llegar a 500 ft AGL", instructions: "Termina al estabilizarte aproximadamente 500 ft sobre el aeropuerto. No abras EFB, radio ni mapas durante la carrera. La siguiente lección no te enviará a una altitud fija insegura: cambiará a un escenario de práctica en aire." },
  },
  "c172-climb-out": {
    sections: [
      { kind: "APRENDE", title: "Esta lección no continúa una salida real", content: "Para no mandarte a volar sin ruta, terreno ni autorización definidos, esta práctica empieza directamente en aire. No debes seguir ascendiendo desde el aeropuerto hasta una cifra fija. La salida real depende de pista, relieve, clima y ATC." },
      { kind: "PROCEDIMIENTO", title: "Zona de práctica segura en el simulador", content: "1. Vuelve al Mapa mundial.\n2. Elige C172 G1000 y una posición EN EL AIRE con cielo despejado y sin viento.\n3. Si puedes elegirla, usa 7.500 ft MSL y aléjate de terreno elevado.\n4. Al iniciar, mira la cinta de altitud y el horizonte.\n5. Mantén las alas aproximadamente niveladas durante un minuto y termina desde el menú. La siguiente lección explicará qué mirar y cómo controlar con más detalle." },
      { kind: "ERRORES COMUNES", title: "No inventes una altitud de salida", content: "No copies 6.500 ft MSL como regla general y no sigas recto desde SKCL sin una salida definida. Para aprender control básico, iniciar en aire es intencionalmente más claro y seguro en simulación." },
    ] as Lesson["sections"],
    checklist: ["Nuevo escenario en aire creado", "Cielo despejado y sin viento", "Altitud y horizonte identificados", "Un minuto de vuelo estable intentado", "Práctica terminada desde menú"],
    exercise: { title: "Misión de ascenso: prepara el lugar para aprender", instructions: "Esta es una transición de escenario, no una salida de aeropuerto. Deja el C172 estable en aire y termina; después continúa con las lecciones de control inicial." },
  },
};

const fullC172Procedures: Record<string, Partial<Lesson>> = {
  "c172-fuel-basics": {
    estimatedTime: "25 min",
    sections: [
      {
        kind: "APRENDE",
        title: "La cuenta simple que usarÃ¡s al principio",
        content:
          "Para estas prÃ¡cticas de simulador usa una regla conservadora, no un porcentaje al azar: COMBUSTIBLE = (tiempo de vuelo + 15 min de taxi + 45 min de reserva) Ã— 8 galones US por hora. Ejemplo: un vuelo local de 45 min: (0,75 + 0,25 + 0,75) Ã— 8 = 14 galones. Carga 18 galones para dejar margen. Es una base didÃ¡ctica para el C172 estÃ¡ndar de MSFS, no una autorizaciÃ³n para un aviÃ³n real.",
      },
      {
        kind: "PROCEDIMIENTO",
        title: "Cargarlo en MSFS 2024, sin buscar un menÃº oculto",
        content:
          "1. Inicia el vuelo libre con el C172 detenido en plataforma.\n2. Mueve el cursor arriba para abrir la barra de herramientas y pulsa EFB / Tablet.\n3. En la tablet elige el icono Aircraft / AviÃ³n.\n4. Abre Flight Performance y despuÃ©s Mass and Balance / Masa y balance.\n5. Abre la pestaÃ±a Fuel / Combustible. Introduce la cantidad indicada para cada tanque o usa el control total si tu versiÃ³n lo muestra. Para esta prÃ¡ctica reparte igual entre izquierdo y derecho.\n6. Pulsa Load in Aircraft / Cargar en el aviÃ³n. Ese Ãºltimo botÃ³n es el que aplica el cambio.\n7. Cierra la tablet y comprueba en cabina que el indicador de combustible no estÃ¡ en rojo.",
      },
      {
        kind: "ERRORES COMUNES",
        title: "Lo que esta lecciÃ³n no hace",
        content:
          "No llenes los tanques solo por tranquilidad: mÃ¡s combustible tambiÃ©n significa mÃ¡s peso. No intentes calcular centro de gravedad todavÃ­a ni ajustes pasajeros y equipaje al azar. Para una prÃ¡ctica solo, carga al piloto y combustible simÃ©trico; mÃ¡s adelante se incorporarÃ¡ peso y balance completo.",
      },
    ] as Lesson["sections"],
    checklist: [
      "DuraciÃ³n estimada anotada",
      "15 min de taxi incluidos",
      "45 min de reserva incluidos",
      "Consumo de 8 gal/h usado como base",
      "Combustible repartido entre ambos tanques",
      "Load in Aircraft pulsado",
    ],
    exercise: {
      title: "Tu primera carga calculada",
      instructions:
        "Planifica 45 minutos de vuelo local. Calcula 14 galones como mÃ­nimo didÃ¡ctico y carga 18 galones repartidos entre los dos tanques. Di en voz alta quÃ© parte corresponde al vuelo, al taxi y a la reserva. Termina con el aviÃ³n apagado en plataforma.",
    },
  },
  "c172-takeoff-card": {
    estimatedTime: "18 min",
    sections: [
      {
        kind: "APRENDE",
        title: "Tu tarjeta de referencia para este curso",
        content:
          "Estas cifras son una base de entrenamiento para el Cessna 172 Skyhawk G1000 estÃ¡ndar de MSFS, con dÃ­a despejado, viento ligero y peso moderado. KIAS significa nudos indicados en el indicador de velocidad; RPM es la potencia del motor. DESPEGUE NORMAL: flaps 0Â°, potencia mÃ¡xima, rotaciÃ³n cerca de 55 KIAS y ascenso inicial 70â€“75 KIAS. Si el clima, peso o aeropuerto cambian, no inventes una cifra: pausa y vuelve a esta tarjeta o consulta la lista del aviÃ³n dentro del simulador.",
      },
      {
        kind: "PROCEDIMIENTO",
        title: "Crea una tarjeta que puedas leer sin soltar la vista",
        content:
          "Escribe estas cuatro lÃ­neas en una nota del celular o papel: \n1. Antes de pista: FLAPS 0Â° â€” TRIM neutro â€” mezcla rica.\n2. Carrera: potencia mÃ¡xima â€” mirada al final de pista.\n3. 55 KIAS: aliviar presiÃ³n y dejar que vuele.\n4. En el aire: 70â€“75 KIAS, recto y con calma.\nNo necesitas operar flaps ahora. Solo compara la palanca de flaps de cabina: debe estar arriba y el indicador debe mostrar 0Â° antes de iniciar el arranque.",
      },
      {
        kind: "ERRORES COMUNES",
        title: "No confundas las cifras",
        content:
          "55 KIAS no es una orden para tirar fuerte: es una referencia para aliviar presiÃ³n cuando el aviÃ³n ya acelera recto. 70â€“75 KIAS es la referencia posterior, no la velocidad de rodaje. La potencia se observa en RPM; la velocidad de vuelo se lee en KIAS. Una cifra no sustituye mantener el centro de pista y mirar hacia delante.",
      },
    ] as Lesson["sections"],
    checklist: [
      "KIAS y RPM diferenciados",
      "Flaps 0Â° anotados",
      "55 KIAS anotados",
      "70â€“75 KIAS anotados",
      "Tarjeta visible para el primer despegue",
    ],
    exercise: {
      title: "Leer sin memorizar",
      instructions:
        "Con el C172 apagado, localiza el indicador de flaps y el de velocidad. Repite la tarjeta en orden. No arranques ni muevas el aviÃ³n: esta tarjeta serÃ¡ tu apoyo al llegar a la pista en el Nivel 0.",
    },
  },
  "c172-approach-setup": {
    estimatedTime: "30 min",
    sections: [
      {
        kind: "APRENDE",
        title: "La aproximaciÃ³n empieza antes de final",
        content:
          "Una llegada ordenada se construye desde el circuito. No se baja de golpe ni se ponen todos los flaps de una vez. Para el C172 de este curso: entra al circuito aproximadamente 1.000 ft sobre el aeropuerto; en viento en cola reduce potencia para bajar de velocidad; a menos de 110 KIAS puedes seleccionar flaps 10Â°. Los flaps 20Â° y 30Â° solo se usan cuando estÃ¡s a menos de 85 KIAS y la pista ya estÃ¡ claramente alcanzable.",
      },
      {
        kind: "PROCEDIMIENTO",
        title: "De viento en cola a final, paso por paso",
        content:
          "1. En viento en cola, mantÃ©n la pista a tu lado y comprueba que estÃ¡s aproximadamente 1.000 ft por encima del aeropuerto.\n2. Cuando quedes a la altura del umbral de pista, reduce potencia hacia una base aproximada de 1.500â€“1.700 RPM; el objetivo es iniciar descenso, no fijar un nÃºmero perfecto.\n3. Cuando la velocidad baje de 110 KIAS, selecciona flaps 10Â°. Espera y observa.\n4. Gira suavemente a base. Si la pista se ve muy cerca, no aÃ±adas mÃ¡s flaps; conserva la separaciÃ³n.\n5. Solo bajo 85 KIAS, selecciona flaps 20Â°. En base/final, si la pista sigue claramente al alcance, puedes seleccionar flaps 30Â°.\n6. Gira a final y alinea el morro con el centro de pista. Busca alrededor de 65 KIAS como referencia inicial de final.\n7. A 500 ft sobre el aeropuerto pregunta: Â¿estoy alineado, a velocidad aproximada y con pista alcanzable? Si la respuesta es no, harÃ¡s frustrada en la siguiente lecciÃ³n.",
      },
      {
        kind: "ERRORES COMUNES",
        title: "Flaps no son frenos de emergencia",
        content:
          "No extiendas flaps por encima de sus velocidades lÃ­mite y no los subas o bajes todos de golpe. Si quedas alto, no apuntes el morro violentamente hacia la pista: reduce potencia, mantÃ©n una actitud moderada y decide pronto si debes frustrar. Una aproximaciÃ³n estable vale mÃ¡s que forzar un aterrizaje.",
      },
    ] as Lesson["sections"],
    checklist: [
      "Circuito a aproximadamente 1.000 ft AGL",
      "Flaps 10Â° solo bajo 110 KIAS",
      "Flaps 20Â°/30Â° solo bajo 85 KIAS",
      "Final alineada",
      "Referencia de 65 KIAS observada",
      "DecisiÃ³n de aterrizar o frustrar tomada a tiempo",
    ],
    exercise: {
      title: "Una aproximaciÃ³n sin aterrizar",
      instructions:
        "Vuela el circuito en SKCL. Configura hasta final con la secuencia 10Â° â†’ 20Â° â†’ 30Â° solo cuando corresponda. A unos 500 ft sobre el aeropuerto aplica frustrada deliberadamente; el aterrizaje se practica en la siguiente lecciÃ³n.",
    },
  },
  "c172-landing": {
    estimatedTime: "30 min",
    sections: [
      {
        kind: "APRENDE",
        title: "El objetivo no es tocar pronto",
        content:
          "En final mira principalmente el extremo de la pista y alterna con una revisiÃ³n breve de velocidad. Usa potencia para controlar si llegas corto o largo; usa una actitud suave para mantener la aproximaciÃ³n. Cerca del suelo, el redondeo es una elevaciÃ³n gradual del morro: no es un tirÃ³n. El C172 debe perder velocidad y posarse por sÃ­ mismo.",
      },
      {
        kind: "PROCEDIMIENTO",
        title: "De final a pista",
        content:
          "1. Llega a final alineado, con pista al alcance y alrededor de 65 KIAS como referencia inicial.\n2. Elige un punto de mira fijo en la pista. Si parece subir por el parabrisas, vas a quedar corto: aÃ±ade un poco de potencia. Si baja, vas a quedar largo: reduce un poco, sin empujar bruscamente.\n3. MantÃ©n la lÃ­nea central con correcciones pequeÃ±as y mira cada vez mÃ¡s lejos hacia el final de pista.\n4. Cerca del suelo, reduce potencia suavemente a ralentÃ­ y levanta apenas el morro para que el aviÃ³n deje de descender.\n5. Deja que las ruedas principales toquen. MantÃ©n el morro arriba suavemente mientras pierde velocidad.\n6. Cuando el aviÃ³n ya rueda lento, baja el morro con cuidado, frena suavemente y mantÃ©n el centro de pista.\n7. Sal de la pista por una calle de rodaje cuando el simulador te lo indique. DespuÃ©s del primer toque no intentes cambiar radios, mapa o configuraciones.",
      },
      {
        kind: "ERRORES COMUNES",
        title: "Si rebota, no lo persigas",
        content:
          "Un rebote es una seÃ±al para aplicar potencia y hacer frustrada; no empujes el morro para obligarlo a volver a la pista. Si estÃ¡s muy alto, muy rÃ¡pido, desalineado o la pista no parece alcanzable, no intentes corregir cuatro cosas a la vez: frustrada. En simulaciÃ³n, repetir es parte del aprendizaje.",
      },
    ] as Lesson["sections"],
    checklist: [
      "Final alineada",
      "Pista al alcance",
      "Velocidad aproximada de 65 KIAS observada",
      "Punto de mira usado",
      "Redondeo suave intentado",
      "Centro de pista mantenido despuÃ©s del toque",
      "Salida de pista solo a baja velocidad",
    ],
    exercise: {
      title: "Tres aterrizajes tranquilos",
      instructions:
        "Haz tres circuitos en SKCL. En cada uno decide antes de 500 ft AGL: aterrizar o frustrar. Solo cuenta como prÃ¡ctica de aterrizaje si llegas estable; si no, practica la frustrada y vuelve a intentarlo.",
    },
  },
  "c172-go-around": {
    estimatedTime: "20 min",
    sections: [
      {
        kind: "APRENDE",
        title: "Frustrar es una decisiÃ³n correcta",
        content:
          "La frustrada no es un fracaso ni un castigo. Es la maniobra normal cuando la aproximaciÃ³n no permite un aterrizaje controlado. Tu prioridad vuelve a ser potencia, actitud, velocidad y ascenso; la pista y la radio pueden esperar unos segundos.",
      },
      {
        kind: "PROCEDIMIENTO",
        title: "Frustrada del C172, en orden",
        content:
          "1. Aplica potencia mÃ¡xima de forma continua.\n2. MantÃ©n el eje de pista y adopta una actitud de ascenso moderada; no tires fuerte.\n3. Confirma que la velocidad aumenta y busca 70â€“75 KIAS.\n4. Si tenÃ­as flaps 30Â°, retrÃ¡elos a 20Â° de inmediato para reducir resistencia, pero no los subas todos de golpe.\n5. Cuando tengas ascenso positivo y espacio sobre la pista, retrÃ¡elos a 10Â°; despuÃ©s a 0Â° gradualmente mientras sigues ascendiendo.\n6. MantÃ©n rumbo de salida y vuelve a una altura segura. Solo entonces reorganiza el circuito y decide el siguiente intento.",
      },
      {
        kind: "ERRORES COMUNES",
        title: "Nunca sacrifiques la velocidad",
        content:
          "No retires los flaps por completo al mismo tiempo que tiras del yoke. No gires bruscamente para volver al circuito justo al aplicar potencia. Si te desordenas, mantÃ©n alas niveladas, potencia y actitud moderada; ganar altura es el trabajo inmediato.",
      },
    ] as Lesson["sections"],
    checklist: [
      "Potencia mÃ¡xima aplicada",
      "Eje de pista mantenido",
      "70â€“75 KIAS buscados",
      "Flaps retirados por etapas",
      "Ascenso positivo confirmado",
      "Circuito reorganizado solo a altura segura",
    ],
    exercise: {
      title: "Frustrada planificada",
      instructions:
        "En una final estable de SKCL, a unos 500 ft AGL aplica una frustrada deliberadamente. Di en voz alta: potencia, actitud, velocidad, flaps por etapas. Repite hasta poder hacerlo sin buscar un paso que no sabes de dÃ³nde sale.",
    },
  },
};

const flightSetups: Record<string, NonNullable<Lesson["flightSetup"]>> = {
  "first-flight-now": setup(
    "Zona de práctica en aire (elige una posición 'En el aire')",
    "En el aire; no plataforma ni pista",
    "7.500 ft MSL si el selector de MSFS lo permite",
    "Preestablecido: despejado, sin viento",
    "Día, 10:00",
    "Esta misión evita tierra y aeropuerto: puedes pausar o reiniciar desde el menú en cualquier momento.",
  ),
  "efb-first-look": setup(
    "Mapa mundial de Vuelo libre",
    "Antes de iniciar vuelo",
    "No aplica: es planificación en el menú",
    "No cambia el clima hoy",
    "No aplica",
    "Abre y cierra la EFB; no crees ruta, no cargues combustible y no inicies un vuelo en esta lección.",
  ),
  "vfr-map-route": setup("SKCL · Alfonso Bonilla Aragón, Cali", "Mapa de Vuelo libre", "Crucero planificado: 7.500 ft MSL", "Preestablecido: despejado, viento ligero", "Día, 09:00", "No inicies todavía: crea la ruta VFR SKCL–SKUL en el EFB y anota tus referencias."),
  "nav-time-fuel": setup("SKCL · Alfonso Bonilla Aragón, Cali", "Mapa de Vuelo libre", "Crucero planificado: 7.500 ft MSL", "Preestablecido: despejado, viento ligero", "Día, 09:00", "Usa la distancia de SKCL–SKUL para calcular tiempo y combustible antes de iniciar."),
  "vor-dme-basics": setup("SKCL · Alfonso Bonilla Aragón, Cali", "En aire, zona segura", "7.500 ft MSL", "Preestablecido: despejado, sin viento", "Día, 10:00", "Empieza estable; busca en el mapa un VOR cercano con frecuencia válida antes de tocar NAV1."),
  "g1000-gps-route": setup("SKCL · Alfonso Bonilla Aragón, Cali", "En aire, crucero estable", "7.500 ft MSL", "Preestablecido: despejado, sin viento", "Día, 10:00", "Crea el plan SKCL–SKUL en EFB antes de entrar al avión; no cambies el plan durante despegue."),
  "c172-autopilot-basics": setup("SKCL · Alfonso Bonilla Aragón, Cali", "En aire, recto y nivelado", "7.500 ft MSL", "Preestablecido: despejado, sin viento", "Día, 10:00", "El avión debe estar estable y lejos de la pista antes de activar AP."),
  "navigation-consolidation": setup("SKCL · Alfonso Bonilla Aragón, Cali", "Plataforma, motor apagado", "Crucero planificado: 7.500 ft MSL", "Preestablecido: despejado, viento ligero", "Día, 09:00", "Plan VFR SKCL–SKUL: calcula combustible y configura el EFB antes del arranque."),
  "c172-fuel-basics": setup(
    "SKCL Â· Alfonso Bonilla AragÃ³n, Cali",
    "Plataforma, motor apagado",
    "Altitud del aeropuerto",
    "Preestablecido: despejado, sin viento",
    "DÃ­a, 09:00",
    "Usa el EFB antes de encender. Para la prÃ¡ctica carga 18 galones US repartidos entre ambos tanques.",
  ),
  "c172-takeoff-card": setup(
    "SKCL Â· Alfonso Bonilla AragÃ³n, Cali",
    "Plataforma, motor apagado",
    "Altitud del aeropuerto",
    "Preestablecido: despejado, sin viento",
    "DÃ­a, 09:00",
    "Solo prepara la tarjeta y comprueba flaps 0Â°; todavÃ­a no arranques.",
  ),
  "how-training-works": setup(
    "SKBO · El Dorado, Bogotá",
    "En plataforma",
    "Altitud del aeropuerto",
    "Preestablecido: despejado",
    "Día, 10:00",
    "No inicies el vuelo: prepara tu rutina y conoce el entorno.",
  ),
  "prepare-msfs": setup(
    "SKBO · El Dorado, Bogotá",
    "En plataforma",
    "Altitud del aeropuerto",
    "Preestablecido: despejado",
    "Día, 10:00",
    "Usa una puerta o plataforma tranquila; confirma mandos antes de rodar.",
  ),
  "know-velocityone": setup(
    "SKCL · Alfonso Bonilla Aragón, Cali",
    "En plataforma",
    "Altitud del aeropuerto",
    "Preestablecido: despejado",
    "Día, 10:00",
    "Ideal para reconocer mandos con el avión detenido.",
  ),
  "initial-controls-check": setup(
    "SKPE · Matecaña, Pereira",
    "En plataforma",
    "Altitud del aeropuerto",
    "Preestablecido: despejado",
    "Día, 10:00",
    "Mantén freno de estacionamiento aplicado durante toda la comprobación.",
  ),
  "sensitivity-deadzones": setup(
    "SKCL · Alfonso Bonilla Aragón, Cali",
    "En aire",
    "6,500 ft MSL",
    "Preestablecido: despejado, sin viento",
    "Día, 10:00",
    "Crea una situación estable para observar una entrada cada vez.",
  ),
  "c172-cold-dark": setup(
    "SKCL · Alfonso Bonilla Aragón, Cali",
    "Plataforma o estacionamiento",
    "Altitud del aeropuerto",
    "Preestablecido: despejado, sin viento",
    "Día, 09:00",
    "Selecciona estado Parked / Shutdown / Cold & Dark; la hélice debe estar detenida.",
  ),
  "c172-before-start": setup(
    "SKCL · Alfonso Bonilla Aragón, Cali",
    "Plataforma, estado apagado",
    "Altitud del aeropuerto",
    "Preestablecido: despejado, sin viento",
    "Día, 09:00",
    "Usa el ratón en cabina. No necesitas tocar el controlador.",
  ),
  "c172-engine-start": setup(
    "SKCL · Alfonso Bonilla Aragón, Cali",
    "Plataforma, estado apagado",
    "Altitud del aeropuerto",
    "Preestablecido: despejado, sin viento",
    "Día, 09:00",
    "Continúa solo después de completar la checklist antes de encender.",
  ),
  "c172-after-start": setup(
    "SKCL · Alfonso Bonilla Aragón, Cali",
    "Plataforma, motor al ralentí",
    "Altitud del aeropuerto",
    "Preestablecido: despejado, sin viento",
    "Día, 09:00",
    "Mantén el freno aplicado: esta lección termina antes del taxi.",
  ),
  "airport-map-basics": setup(
    "SKCL · Alfonso Bonilla Aragón, Cali",
    "Plataforma, motor al ralentí",
    "Altitud del aeropuerto",
    "Preestablecido: despejado, sin viento",
    "Día, 09:00",
    "No liberes el freno: la meta es reconocer las zonas del aeropuerto.",
  ),
  "airport-radio-basics": setup(
    "SKCL · Alfonso Bonilla Aragón, Cali",
    "Plataforma, motor al ralentí",
    "Altitud del aeropuerto",
    "Preestablecido: despejado, sin viento",
    "Día, 09:00",
    "Abre Comunicaciones y solicita taxi, pero no muevas el avión.",
  ),
  "c172-taxi-basics": setup(
    "SKCL · Alfonso Bonilla Aragón, Cali",
    "Plataforma, motor al ralentí",
    "Altitud del aeropuerto",
    "Preestablecido: despejado, sin viento",
    "Día, 09:00",
    "No vayas a la pista: rueda una distancia corta y vuelve a detenerte.",
  ),
  "c172-taxi-to-hold": setup(
    "SKCL · Alfonso Bonilla Aragón, Cali",
    "Plataforma, motor al ralentí",
    "Altitud del aeropuerto",
    "Preestablecido: despejado, sin viento",
    "Día, 09:00",
    "Solicita taxi y sigue la guía hasta detenerte antes de la línea de espera.",
  ),
  "c172-engine-runup": setup(
    "SKCL · Alfonso Bonilla Aragón, Cali",
    "Punto de espera, motor encendido",
    "Altitud del aeropuerto",
    "Preestablecido: despejado, sin viento",
    "Día, 09:00",
    "Haz la prueba detenido, antes de la pista, y termina con el motor cerca de 1.000 RPM.",
  ),
  "c172-before-takeoff": setup(
    "SKCL · Alfonso Bonilla Aragón, Cali",
    "Punto de espera, motor al ralentí",
    "Altitud del aeropuerto",
    "Preestablecido: despejado, sin viento",
    "Día, 09:00",
    "Esta sección termina listo y detenido antes de la pista; no incluye despegue.",
  ),
  "c172-lineup": setup(
    "SKCL · Alfonso Bonilla Aragón, Cali",
    "Línea de espera, motor encendido",
    "Altitud del aeropuerto",
    "Preestablecido: despejado, sin viento",
    "Día, 09:00",
    "Solicita taxi y detente antes de la pista; entra solo cuando estés listo para practicar.",
  ),
  "c172-takeoff-roll": setup(
    "SKCL · Alfonso Bonilla Aragón, Cali",
    "Inicio de pista, alineado",
    "Altitud del aeropuerto",
    "Preestablecido: despejado, sin viento",
    "Día, 09:00",
    "Flaps arriba, trim neutro y pista despejada. Esta práctica termina al dejar el suelo.",
  ),
  "c172-climb-out": setup(
    "SKCL · Alfonso Bonilla Aragón, Cali",
    "Pista de salida",
    "Altitud del aeropuerto",
    "Preestablecido: despejado, sin viento",
    "Día, 09:00",
    "Asciende recto antes de practicar cualquier viraje.",
  ),
  "know-c172": setup(
    "SKCL · Alfonso Bonilla Aragón, Cali",
    "En aire, después del ascenso",
    "6,500 ft MSL",
    "Preestablecido: despejado, sin viento",
    "Día, 10:00",
    "Ya estás en zona segura: esta lección comienza después del primer despegue.",
  ),
  "three-axes": setup(
    "SKCL · Alfonso Bonilla Aragón, Cali",
    "En aire, zona segura",
    "6,500 ft MSL",
    "Preestablecido: despejado, sin viento",
    "Día, 10:00",
    "Empieza recto y nivelado, lejos del aeropuerto y del relieve.",
  ),
  "throttle-power": setup(
    "SKCL · Alfonso Bonilla Aragón, Cali",
    "En aire",
    "6,500 ft MSL",
    "Preestablecido: despejado, sin viento",
    "Día, 11:00",
    "Mantén una zona amplia y segura para observar los cambios de potencia.",
  ),
  "what-is-trim": setup(
    "SKCL · Alfonso Bonilla Aragón, Cali",
    "En aire",
    "6,500 ft MSL",
    "Preestablecido: despejado, sin viento",
    "Día, 11:00",
    "Usa aire calmo; ajusta trim solo después de estabilizar la actitud.",
  ),
  "first-cockpit-exercise": setup(
    "SKCL · Alfonso Bonilla Aragón, Cali",
    "En aire",
    "6,500 ft MSL",
    "Preestablecido: despejado, sin viento",
    "Día, 11:00",
    "Sesión tranquila para unir mandos, instrumentos, potencia y trim.",
  ),
  "straight-and-level": setup(
    "SKCL · Alfonso Bonilla Aragón, Cali",
    "En aire",
    "7,500 ft MSL",
    "Preestablecido: despejado, sin viento",
    "Día, 10:00",
    "Selecciona un inicio alejado del circuito y mantén amplio margen visual.",
  ),
  "turns-and-coordination": setup(
    "SKCL · Alfonso Bonilla Aragón, Cali",
    "En aire",
    "7,500 ft MSL",
    "Preestablecido: despejado, sin viento",
    "Día, 10:00",
    "Practica virajes suaves con altura suficiente para recuperar con calma.",
  ),
  "airport-traffic-pattern": setup(
    "SKCL · Alfonso Bonilla Aragón, Cali",
    "Plataforma, motor apagado o al ralentí",
    "Circuito: 1.000 ft AGL (aprox. 4.160 ft MSL en SKCL)",
    "Preestablecido: despejado, viento 0–3 kt",
    "Día, 09:00",
    "Completa tierra y despegue de Nivel 0. Esta lección termina en viento en cola, no en un aterrizaje.",
  ),
  "c172-approach-setup": setup(
    "SKCL · Alfonso Bonilla Aragón, Cali",
    "En aire, circuito de transito",
    "1.000 ft sobre el aeropuerto",
    "Preestablecido: despejado, viento ligero",
    "Dia, 10:00",
    "Empieza en viento en cola tras el despegue; la meta es configurar final, no aterrizar todavia.",
  ),
  "c172-landing": setup(
    "SKCL · Alfonso Bonilla Aragón, Cali",
    "En aire, final estable",
    "Aproximadamente 500 ft AGL",
    "Preestablecido: despejado, viento ligero",
    "Dia, 10:00",
    "Llega desde la leccion de aproximacion o inicia una final estable con ayuda de MSFS.",
  ),
  "c172-go-around": setup(
    "SKCL · Alfonso Bonilla Aragón, Cali",
    "En aire, final estable",
    "Aproximadamente 500 ft AGL",
    "Preestablecido: despejado, viento ligero",
    "Dia, 10:00",
    "Esta practica termina en ascenso y circuito; no necesitas aterrizar.",
  ),
  "first-vfr-navigation": setup(
    "SKCL · Alfonso Bonilla Aragón, Cali",
    "En plataforma",
    "Altitud del aeropuerto",
    "Preestablecido: despejado",
    "Día, 09:00",
    "Planifica una ruta corta hacia SKUL · La Florida, Tuluá, siguiendo el valle.",
  ),
  "vfr-consolidation": setup(
    "SKCL · Alfonso Bonilla Aragón, Cali",
    "En plataforma",
    "Altitud del aeropuerto",
    "Preestablecido: despejado, viento ligero",
    "Día, 09:00",
    "Vuela una ruta corta SKCL–SKUL; mantén ayudas activas si las necesitas.",
  ),
};

const lessonContinuity: Record<string, NonNullable<Lesson["continuity"]>> = {
  "first-flight-now": {
    start: "Menú de Vuelo libre de MSFS 2024.",
    finish: "Has volado unos minutos en aire calmo y terminado desde el menú, sin aterrizar.",
    next: "Ahora abre “Conociendo tu VelocityOne”: identificaremos cada control físico con imágenes antes de volver a usarlo.",
  },
  "efb-first-look": {
    start: "Mapa mundial de Vuelo libre, antes de pulsar Iniciar vuelo.",
    finish: "Reconoces dónde abrir la EFB y puedes diferenciar mapa, ruta y aplicaciones.",
    next: "Continúa con “Conociendo tu VelocityOne” para identificar el control físico antes de volver al C172.",
  },
  "how-training-works": {
    start: "Pantalla principal de Flight Academy; MSFS aún cerrado.",
    finish: "Tienes una rutina breve de práctica preparada.",
    next: "Abre “Preparando Microsoft Flight Simulator 2024”.",
  },
  "prepare-msfs": {
    start: "Pantalla principal de MSFS 2024.",
    finish: "C172 quieto en plataforma, de día y con clima despejado.",
    next: "Continúa con “Combustible: cuánto cargar y dónde hacerlo”.",
  },
  "c172-fuel-basics": {
    start: "C172 apagado en plataforma; Vuelo libre ya configurado.",
    finish: "Carga de 18 galones aplicada desde EFB y combustible comprobado.",
    next: "Continúa con “Tarjeta de despegue: flaps y velocidades”.",
  },
  "c172-takeoff-card": {
    start: "C172 apagado en plataforma, combustible ya cargado.",
    finish: "Tarjeta de flaps 0°, 55 KIAS y 70–75 KIAS preparada.",
    next: "Abre “Escenario apagado: Cold & Dark” y conserva la tarjeta.",
  },
  "c172-cold-dark": {
    start: "Mapa de Vuelo libre.",
    finish: "C172 apagado en plataforma: hélice quieta y pantallas negras.",
    next: "Sin mover el avión, abre “Checklist antes de encender”.",
  },
  "c172-before-start": {
    start: "Mismo C172 apagado de la lección anterior.",
    finish: "Freno aplicado, MASTER y BEACON encendidos; motor apagado.",
    next: "Abre “Arranque del motor” sin cambiar de escenario.",
  },
  "c172-engine-start": {
    start: "Cabina preparada, motor apagado.",
    finish: "Motor encendido y estable cerca de 1.000 RPM; avión inmóvil.",
    next: "Continúa con “Verificación después del arranque”.",
  },
  "c172-after-start": {
    start: "Motor al ralentí, freno de estacionamiento aplicado.",
    finish: "Aceite, carga y pantallas revisados; avión aún detenido.",
    next: "Abre “El mapa del aeropuerto”.",
  },
  "airport-map-basics": {
    start: "Mismo estacionamiento, motor al ralentí.",
    finish:
      "Sabes señalar plataforma, calle de rodaje, pista y línea de espera.",
    next: "Sin soltar el freno, continúa con “Radio y ATC”.",
  },
  "airport-radio-basics": {
    start: "Avión quieto en plataforma, motor encendido.",
    finish: "Solicitud de taxi enviada y primera indicación de ruta visible.",
    next: "Abre “Primer taxi” para aprender a avanzar y detenerte.",
  },
  "c172-taxi-basics": {
    start: "Plataforma, ruta de taxi ya solicitada.",
    finish: "Probaste avanzar, frenar y volver a detenerte en plataforma.",
    next: "Continúa con “Taxi guiado hasta la línea de espera”.",
  },
  "c172-taxi-to-hold": {
    start: "Plataforma, motor estable y guía de taxi visible.",
    finish: "Avión detenido antes de la línea de espera; freno aplicado.",
    next: "Abre “Prueba del motor antes del despegue”.",
  },
  "c172-engine-runup": {
    start: "Punto de espera, avión detenido antes de la pista.",
    finish: "Magnetos revisadas y motor otra vez cerca de 1.000 RPM.",
    next: "Sin moverte, continúa con “Checklist antes de despegue”.",
  },
  "c172-before-takeoff": {
    start: "Punto de espera, motor al ralentí.",
    finish: "Avión preparado y detenido antes de la pista.",
    next: "Abre “Entrar y alinearte en la pista”.",
  },
  "c172-lineup": {
    start: "Punto de espera, checklist final terminada.",
    finish: "Avión centrado y detenido al comienzo de la pista.",
    next: "Continúa con “Carrera de despegue”.",
  },
  "c172-takeoff-roll": {
    start: "C172 alineado al inicio de pista.",
    finish: "Ruedas fuera del suelo y ascenso recto iniciado.",
    next: "Abre inmediatamente “Ascenso inicial y zona segura”.",
  },
  "c172-climb-out": {
    start: "Justo después del despegue, en ascenso recto.",
    finish: "Avión nivelado cerca de 6.500 ft MSL en zona amplia.",
    next: "Empieza Nivel 1 con “Tus tres referencias en vuelo”.",
  },
  "know-c172": {
    start: "En aire, nivelado cerca de 6.500 ft MSL.",
    finish:
      "Puedes alternar referencia exterior, velocidad y altitud sin tocar mandos.",
    next: "Continúa con “Mover el avión con suavidad”.",
  },
  "three-axes": {
    start: "Vuelo recto y nivelado en zona segura.",
    finish: "Probaste un movimiento pequeño de alabeo y cabeceo por separado.",
    next: "Continúa con “Potencia: acelerar, subir y bajar”.",
  },
  "throttle-power": {
    start: "Avión otra vez estable y nivelado.",
    finish:
      "Observaste un cambio pequeño de potencia y volviste a estabilizar.",
    next: "Abre “Trim: dejar de pelear con el yoke”.",
  },
  "what-is-trim": {
    start: "Vuelo recto y nivelado, potencia estable.",
    finish:
      "Lograste reducir la presión sobre el yoke con toques pequeños de trim.",
    next: "Continúa con “Primer vuelo controlado”.",
  },
  "first-cockpit-exercise": {
    start: "Zona de práctica, cerca de 6.500 ft MSL.",
    finish: "Mantuviste un minuto estable usando mirada, potencia y trim.",
    next: "Pasa a Nivel 2: “Vuelo recto y nivelado”.",
  },
  "straight-and-level": {
    start: "Nuevo Vuelo libre: C172 ya en aire a 7.500 ft MSL.",
    finish: "Tres minutos de vuelo recto y nivelado completados.",
    next: "Continúa con “Virajes coordinados”.",
  },
  "turns-and-coordination": {
    start: "Nuevo Vuelo libre: aire calmo, 7.500 ft MSL y alas niveladas.",
    finish: "Un viraje de 90° a cada lado y salida estabilizada.",
    next: "Abre “El circuito de tránsito”.",
  },
  "airport-traffic-pattern": {
    start:
      "Nuevo Vuelo libre en SKCL; completa el arranque y despegue de Nivel 0 antes de practicar.",
    finish: "Reconociste salida, viento cruzado, viento en cola, base y final.",
    next: "Continúa con “Preparar la aproximación”.",
  },
  "c172-approach-setup": {
    start:
      "En viento en cola del circuito de SKCL, aproximadamente 1.000 ft AGL.",
    finish:
      "Final alineada, flaps configurados por etapas y decisión tomada antes de 500 ft AGL.",
    next: "Continúa con “Aterrizaje paso a paso”.",
  },
  "c172-landing": {
    start: "Final estable a aproximadamente 500 ft AGL; pista al alcance.",
    finish:
      "C172 en tierra, controlado y listo para salir de la pista lentamente.",
    next: "Practica “Frustrada” para saber qué hacer cuando no puedas aterrizar estable.",
  },
  "c172-go-around": {
    start:
      "Final estable o inestable; hay suficiente pista y altura para iniciar la maniobra.",
    finish:
      "Avión en ascenso, flaps retirados por etapas y circuito reorganizado.",
    next: "Continúa con “Tu primera navegación VFR”.",
  },
  "first-vfr-navigation": {
    start: "Mapa de Vuelo libre, antes de iniciar SKCL–SKUL.",
    finish: "Ruta corta planificada y dos referencias visuales identificadas.",
    next: "Realiza el vuelo y luego abre “Vuelo VFR de consolidación”.",
  },
  "vfr-consolidation": {
    start: "Mapa de Vuelo libre; ruta SKCL–SKUL preparada.",
    finish:
      "Completaste o pausaste conscientemente un vuelo VFR corto y registraste el resultado.",
    next: "El siguiente bloque será navegación por instrumentos, VOR, GPS y piloto automático; no se mezclará antes de dominar esta ruta visual.",
  },
  "vfr-map-route": {
    start: "Mapa de Vuelo libre, antes de encender el C172.",
    finish: "Ruta SKCL–SKUL, rumbo, distancia y dos referencias anotados.",
    next: "Continúa con “Rumbo, tiempo y combustible restante”.",
  },
  "nav-time-fuel": {
    start: "Ruta SKCL–SKUL ya visible en el mapa.",
    finish: "Tiempo previsto, combustible y chequeo de 15 minutos calculados.",
    next: "Abre “VOR y DME desde cero” en una zona segura de vuelo.",
  },
  "vor-dme-basics": {
    start: "C172 estabilizado en aire, lejos de pista y relieve.",
    finish: "VOR válido leído y CDI devuelto a GPS.",
    next: "Continúa con “GPS G1000: seguir un plan de vuelo”.",
  },
  "g1000-gps-route": {
    start: "Plan SKCL–SKUL creado en EFB; C172 en crucero estable.",
    finish: "FPL y CDI=GPS comprobados; sabes usar Direct-To con intención.",
    next: "Abre “Piloto automático: HDG, ALT y NAV”.",
  },
  "c172-autopilot-basics": {
    start: "Vuelo recto y nivelado, con mapa y GPS ya comprobados.",
    finish: "HDG, ALT y NAV supervisados; AP desconectado manualmente.",
    next: "Continúa con “Vuelo de navegación SKCL–SKUL”.",
  },
  "navigation-consolidation": {
    start: "Plataforma de SKCL, C172 apagado y plan preparado.",
    finish: "Ruta ejecutada o detenida de forma consciente con debriefing registrado.",
    next: "El bloque siguiente será navegación IFR; no avances hasta poder explicar cada modo del piloto automático.",
  },
};

Object.assign(flightSetups, {
  "c172-climb-out": setup(
    "Zona de práctica en aire (elige una posición 'En el aire')",
    "En el aire; no continúes la salida desde la pista",
    "7.500 ft MSL si el mapa lo permite",
    "Preestablecido: despejado, sin viento",
    "Día, 10:00",
    "Esta práctica cambia de escenario a propósito: no fija una ruta ni una altitud de salida real desde SKCL.",
  ),
  "ifr-boundaries": setup("Zona de práctica en aire", "En aire, lejos de pista", "7.500 ft MSL", "Despejado, sin viento", "Día, 10:00", "Práctica de instrumentos en VMC: no es un vuelo IFR real ni una autorización ATC."),
  "ifr-pfd-scan": setup("Zona de práctica en aire", "En aire, recto y nivelado", "7.500 ft MSL", "Despejado, sin viento", "Día, 10:00", "Antes de mover mandos, señala velocidad, horizonte, altitud, rumbo y bola en el PFD."),
  "ifr-straight-level": setup("Zona de práctica en aire", "En aire, recto y nivelado", "7.500 ft MSL", "Despejado, sin viento", "Día, 10:00", "Meta de simulador: mantén 7.500 ft y rumbo 360° con correcciones pequeñas."),
  "ifr-climbs-descents": setup("Zona de práctica en aire", "En aire, recto y nivelado", "7.500 ft MSL", "Despejado, sin viento", "Día, 10:00", "Practica tendencia de ascenso y descenso; termina de nuevo nivelado y con el avión estable."),
  "ifr-standard-turns": setup("Zona de práctica en aire", "En aire, recto y nivelado", "7.500 ft MSL", "Despejado, sin viento", "Día, 10:00", "Son virajes moderados por instrumentos, no un procedimiento IFR real de razón estándar."),
  "ifr-route-briefing": setup("Mapa mundial / EFB", "Antes de iniciar vuelo", "No aplica", "Despejado", "Día", "Práctica de interfaz: no selecciones una ruta IFR real ni una altitud publicada todavía."),
  "ifr-approach-briefing": setup("Mapa mundial / EFB", "Antes de iniciar vuelo", "No aplica", "Despejado", "Día", "Reconoce partes de una aproximación; no ejecutes una carta no explicada por el curso."),
  "ifr-gps-approach": setup("Zona de práctica en aire", "En aire, lejos de pista", "7.500 ft MSL", "Despejado, sin viento", "Día, 10:00", "Práctica de botones y confirmación GPS en VMC; no es una aproximación IFR publicada."),
  "ifr-missed-approach": setup("Zona de práctica en aire", "En aire, configuración estable", "7.500 ft MSL", "Despejado, sin viento", "Día, 10:00", "Practica la decisión de potencia y ascenso en simulación; una frustrada real sigue siempre la publicada."),
});

Object.assign(lessonContinuity, {
  "c172-takeoff-roll": {
    start: "C172 alineado y detenido al inicio de pista.",
    finish: "Ascenso estable iniciado cerca de 500 ft AGL; práctica pausada.",
    next: "Para la siguiente práctica vuelve al Mapa mundial: “Ascenso inicial y zona segura” comienza en aire, no continúa una salida real.",
  },
  "c172-climb-out": {
    start: "Mapa mundial de MSFS 2024, antes de iniciar vuelo.",
    finish: "C172 iniciado en aire y mantenido estable durante un minuto.",
    next: "Continúa con las lecciones de control inicial y pantalla G1000.",
  },
  "ifr-boundaries": { start: "C172 estable en aire VMC.", finish: "Puedes explicar que esta es práctica de simulador, no operación IFR real.", next: "Abre “El PFD: tu mirada debe tener un orden”." },
  "ifr-pfd-scan": { start: "C172 estable en aire, sin maniobra pendiente.", finish: "Velocidad, horizonte, altitud, rumbo y bola localizados visualmente.", next: "Continúa con “Recto y nivelado sin mirar afuera”." },
  "ifr-straight-level": { start: "En aire, 7.500 ft MSL y rumbo 360°.", finish: "Avión mantenido cerca de la meta de simulador y estabilizado antes de terminar.", next: "Abre “Ascender y descender con un objetivo”." },
  "ifr-climbs-descents": { start: "En aire recto y nivelado.", finish: "Un ascenso, una nivelación y un descenso observados; avión estabilizado de nuevo.", next: "Continúa con “Virajes por instrumentos”." },
  "ifr-standard-turns": { start: "En aire recto y nivelado.", finish: "Dos virajes moderados completados y alas niveladas al final.", next: "Abre “Antes de IFR: plan y briefing”." },
  "ifr-route-briefing": { start: "Mapa mundial/EFB antes de iniciar vuelo.", finish: "Sabes qué datos debe tener un plan antes de enviar nada a aviónica.", next: "Continúa con “Cómo leer una aproximación antes de volarla”." },
  "ifr-approach-briefing": { start: "EFB abierta; ninguna aproximación cargada.", finish: "Reconoces que se necesita procedimiento concreto antes de ejecutar una aproximación.", next: "Abre “Aproximación GPS”." },
  "ifr-gps-approach": { start: "En aire VMC con GPS revisado.", finish: "Fuente GPS y tramo activo comprobados; práctica detenida antes de cualquier descenso no explicado.", next: "Continúa con “Frustrada IFR”." },
  "ifr-missed-approach": { start: "En aire VMC y configuración estable.", finish: "Potencia, actitud y ascenso practicados; no se intentó seguir una frustrada publicada sin carta.", next: "Nivel IFR completo: vuelve a las lecciones que quieras reforzar." },
});

// Secuencia diseñada para quien empieza desde cero: primero contexto y control,
// después vuelo básico, operación en tierra, navegación e IFR. Los objetos de
// lección se reutilizan para conservar todos sus detalles, escenarios y visuales.
const lessonById = new Map(
  course.flatMap((level) => level.modules.flatMap((module) => module.lessons)).map((lesson) => [lesson.id, lesson]),
);
const curriculumModule = (id: string, title: string, description: string, level: number, ids: string[]) => ({
  id,
  title,
  description,
  lessons: ids.map((lessonId) => {
    const lesson = lessonById.get(lessonId);
    if (!lesson) throw new Error(`Missing lesson: ${lessonId}`);
    lesson.level = level;
    lesson.moduleTitle = title;
    return lesson;
  }),
});

const reorderedLevelZero = course.find((level) => level.number === 0);
const reorderedLevelOne = course.find((level) => level.number === 1);
const reorderedLevelTwo = course.find((level) => level.number === 2);
const reorderedLevelThree = course.find((level) => level.number === 3);
if (reorderedLevelZero && reorderedLevelOne && reorderedLevelTwo) {
  reorderedLevelZero.title = "Primeros pasos";
  reorderedLevelZero.description = "Entiende el simulador, tu control y la cabina antes de pedirte procedimientos de aeropuerto.";
  reorderedLevelZero.modules = [
    curriculumModule("start-here", "Empieza desde cero", "Un inicio breve: qué preparar y cómo empezar a sentir el avión.", 0, ["how-training-works", "prepare-msfs", "know-velocityone", "first-flight-now"]),
    curriculumModule("cockpit-from-zero", "Tu C172 y su pantalla", "Mira primero; cada control se explica antes de usarlo.", 0, ["c172-instruments-first", "c172-controls-first", "know-c172", "three-axes"]),
    curriculumModule("efb-and-controls", "Planificación y comprobación", "Conoce la EFB y verifica solo los mandos que necesitas al principio.", 0, ["efb-first-look", "initial-controls-check"]),
  ];
  reorderedLevelOne.title = "Control básico en el aire";
  reorderedLevelOne.description = "Controla el C172 en un escenario en aire antes de mezclarlo con taxi o aterrizaje.";
  reorderedLevelOne.modules = [
    curriculumModule("air-control", "Volar estable", "Potencia, trim, recto y nivelado y virajes con metas simples.", 1, ["throttle-power", "what-is-trim", "first-cockpit-exercise", "straight-and-level", "turns-and-coordination", "sensitivity-deadzones"]),
  ];
  reorderedLevelTwo.title = "Aeropuerto y primer circuito";
  reorderedLevelTwo.description = "Planifica, rueda, despega y aprende el circuito paso a paso, con ayudas de MSFS.";
  reorderedLevelTwo.modules = [
    curriculumModule("before-engine", "Antes de moverte", "Combustible, tarjeta de despegue y arranque sin prisa.", 2, ["c172-fuel-basics", "c172-takeoff-card", "c172-cold-dark", "c172-before-start", "c172-engine-start", "c172-after-start"]),
    curriculumModule("airport-ground", "Mapa, radio y taxi", "La EFB y la cinta azul te guían antes de acercarte a una pista.", 2, ["airport-map-basics", "airport-radio-basics", "c172-taxi-basics", "c172-taxi-to-hold", "c172-engine-runup", "c172-before-takeoff"]),
    curriculumModule("departure-and-return", "Despegue, circuito y aterrizaje", "Cada maniobra aparece después de comprender su objetivo y punto de reinicio.", 2, ["c172-lineup", "c172-takeoff-roll", "c172-climb-out", "airport-traffic-pattern", "c172-approach-setup", "c172-landing", "c172-go-around"]),
  ];
}
if (reorderedLevelThree) {
  reorderedLevelThree.title = "Navegación VFR, GPS y automatización";
  reorderedLevelThree.description = "Primero planificas visualmente; después aprendes GPS y piloto automático sin dejar de supervisar.";
  reorderedLevelThree.modules = [
    curriculumModule("vfr-planning", "Plan VFR desde la EFB", "Mapa, distancia, tiempo y referencias antes de encender.", 3, ["vfr-map-route", "nav-time-fuel", "first-vfr-navigation", "vfr-consolidation"]),
    curriculumModule("gps-and-automation", "G1000 y piloto automático", "Usa navegación y automatización solo cuando ya comprendes el plan.", 3, ["vor-dme-basics", "g1000-gps-route", "c172-autopilot-basics", "navigation-consolidation"]),
  ];
}

course.forEach((level) =>
  level.modules.forEach((module) =>
    module.lessons.forEach((lesson) =>
      Object.assign(
        lesson,
        lessonDetails[lesson.id],
        firstFlightProcedures[lesson.id],
        efbProcedures[lesson.id],
        practicalLevelZeroDetails[lesson.id],
        velocityOneC172Details[lesson.id],
        c172NormalProcedures[lesson.id],
        c172GroundProcedures[lesson.id],
        beginnerGroundCorrections[lesson.id],
        c172TakeoffProcedures[lesson.id],
        departureCorrections[lesson.id],
        airAndVfrProcedures[lesson.id],
        ifrTrainingProcedures[lesson.id],
        fullC172Procedures[lesson.id],
        navigationProcedures[lesson.id],
        {
          flightSetup: flightSetups[lesson.id],
          continuity: lessonContinuity[lesson.id],
        },
      ),
    ),
  ),
);

// Algunas lecciones nuevas se almacenan con secuencias UTF-8 heredadas del
// editor. Se normalizan al cargar el curso para que el alumno siempre vea
// español correcto, también en los textos extensos y las tarjetas visuales.
const normalizeDisplayText = (text: string) => {
  let value = text;

  // Algunos editores pueden aplicar la conversión UTF-8 más de una vez.
  // Reducimos primero esas capas y después reparamos las secuencias restantes.
  for (let pass = 0; pass < 3; pass += 1) {
    const reduced = value
      .replaceAll("\u00C3\u0192", "\u00C3")
      .replaceAll("\u00C2", "");
    if (reduced === value) break;
    value = reduced;
  }

  return value
    .replaceAll("\u00C3\u00A1", "á")
    .replaceAll("\u00C3\u00A9", "é")
    .replaceAll("\u00C3\u00AD", "í")
    .replaceAll("\u00C3\u00B3", "ó")
    .replaceAll("\u00C3\u00BA", "ú")
    .replaceAll("\u00C3\u00B1", "ñ")
    .replaceAll("\u00C3\u0081", "Á")
    .replaceAll("\u00C3\u0089", "É")
    .replaceAll("\u00C3\u0093", "Ó")
    .replaceAll("\u00C2\u00B0", "°")
    .replaceAll("\u00C2\u00B7", "·")
    .replaceAll("\u00E2\u20AC\u201C", "–")
    .replaceAll("\u00E2\u20AC\u201D", "—")
    .replaceAll("\u00E2\u2020\u2019", "’")
    .replaceAll("\u00C3\u2014", "×");
};

const normalizeCourseText = (value: unknown): void => {
  if (typeof value === "string") return;
  if (Array.isArray(value)) {
    value.forEach(normalizeCourseText);
    return;
  }
  if (value && typeof value === "object") {
    Object.entries(value).forEach(([key, item]) => {
      if (typeof item === "string") {
        (value as Record<string, unknown>)[key] = normalizeDisplayText(item);
      } else {
        normalizeCourseText(item);
      }
    });
  }
};

normalizeCourseText(course);

export const lessonOrder = course.flatMap((level) =>
  level.modules.flatMap((module) => module.lessons.map((lesson) => lesson.id)),
);
export const getLesson = (id: string) =>
  course
    .flatMap((level) => level.modules)
    .flatMap((module) => module.lessons)
    .find((lesson) => lesson.id === id);
