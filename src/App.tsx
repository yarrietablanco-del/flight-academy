import { useEffect, useMemo, useRef, useState } from "react";
import { course, getLesson, lessonOrder } from "./data/course";
import type { Lesson, LessonStatus } from "./types/course";
import { Checklist } from "./components/Checklist";
import { ProgressRing } from "./components/ProgressRing";
import { useProgress } from "./hooks/useProgress";
import "./App.css";

type View = "dashboard" | "course" | "velocityone" | "hangar" | "lesson";

const navItems: { id: Exclude<View, "lesson">; label: string; icon: string }[] =
  [
    { id: "dashboard", label: "Panel de vuelo", icon: "⌂" },
    { id: "course", label: "Mi entrenamiento", icon: "◫" },
    { id: "velocityone", label: "Mi VelocityOne", icon: "⌘" },
    { id: "hangar", label: "Hangar", icon: "◇" },
  ];

function statusLabel(status: LessonStatus) {
  return {
    completed: "Completada",
    available: "Disponible",
    "in-progress": "En progreso",
    locked: "Bloqueada",
  }[status];
}

function App() {
  const [view, setView] = useState<View>("dashboard");
  const [selectedLessonId, setSelectedLessonId] = useState(lessonOrder[0]);
  const [returnFocusLessonId, setReturnFocusLessonId] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const {
    statuses,
    completeLesson,
    startLesson,
    resetProgress,
    exportProgress,
    importProgress,
    feedback,
    saveFeedback,
    completedCount,
    progress,
    sync,
  } = useProgress(lessonOrder);
  const selectedLesson = getLesson(selectedLessonId);
  const recommended = useMemo(
    () =>
      course
        .flatMap((level) => level.modules)
        .flatMap((module) => module.lessons)
        .find((lesson) => statuses[lesson.id] !== "completed"),
    [statuses],
  );

  const openLesson = (lesson: Lesson) => {
    if (statuses[lesson.id] === "locked") return;
    setSelectedLessonId(lesson.id);
    setView("lesson");
    setMenuOpen(false);
    startLesson(lesson.id);
  };

  const navigate = (next: Exclude<View, "lesson">) => {
    setView(next);
    setMenuOpen(false);
  };

  return (
    <div className="app-shell">
      <aside className={`sidebar ${menuOpen ? "is-open" : ""}`}>
        <div className="brand">
          <span className="brand-mark">✦</span>
          <div>
            <strong>FLIGHT</strong>
            <span>ACADEMY</span>
          </div>
        </div>
        <p className="sidebar-caption">SIMULACIÓN DE VUELO</p>
        <nav>
          {navItems.map((item) => (
            <button
              key={item.id}
              className={view === item.id ? "nav-item active" : "nav-item"}
              onClick={() => navigate(item.id)}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
        <SyncPanel {...sync} />
        <div className="sidebar-level">
          <span className="eyebrow">RANGO ACTUAL</span>
          <strong>Nivel 0</strong>
          <span>Preparación</span>
          <div className="mini-progress">
            <i style={{ width: `${progress}%` }} />
          </div>
          <small>
            {completedCount} / {lessonOrder.length} lecciones
          </small>
        </div>
        <div className="progress-actions">
          <button className="reset-button" onClick={resetProgress}>
            ↻ Reiniciar progreso
          </button>
          <button className="reset-button" onClick={exportProgress}>
            ⇩ Guardar copia
          </button>
          <label className="reset-button import-button">
            ⇧ Restaurar copia
            <input
              type="file"
              accept="application/json"
              onChange={async (event) => {
                const file = event.target.files?.[0];
                if (!file) return;
                const imported = await importProgress(file);
                window.alert(
                  imported
                    ? "Progreso restaurado."
                    : "No pudimos leer esa copia de seguridad.",
                );
                event.target.value = "";
              }}
            />
          </label>
        </div>
      </aside>

      <main>
        <header className="topbar">
          <button
            className="menu-button"
            aria-label="Abrir menú"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
          <div className="breadcrumb">
            ACADEMIA <span>/</span>{" "}
            {view === "lesson"
              ? selectedLesson?.title
              : navItems.find((item) => item.id === view)?.label}
          </div>
          <div className="pilot">
            <span>ALUMNO PILOTO</span>
            <b>AP</b>
          </div>
        </header>
        <div className="content">
          {view === "dashboard" && (
            <Dashboard
              progress={progress}
              completedCount={completedCount}
              recommended={recommended}
              statuses={statuses}
              openLesson={openLesson}
              navigate={navigate}
            />
          )}
          {view === "course" && (
            <Course statuses={statuses} openLesson={openLesson} focusLessonId={returnFocusLessonId} onFocused={() => setReturnFocusLessonId(null)} />
          )}
          {view === "velocityone" && <VelocityOne />}
          {view === "hangar" && <Hangar />}
          {view === "lesson" && selectedLesson && (
            <LessonView
              lesson={selectedLesson}
              status={statuses[selectedLesson.id]}
              feedback={feedback[selectedLesson.id] ?? ""}
              onSaveFeedback={(value) => saveFeedback(selectedLesson.id, value)}
              onComplete={() => {
                completeLesson(selectedLesson.id);
                setReturnFocusLessonId(selectedLesson.id);
                navigate("course");
              }}
              onBack={() => navigate("course")}
            />
          )}
        </div>
      </main>
      {menuOpen && (
        <button
          className="menu-backdrop"
          aria-label="Cerrar menú"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </div>
  );
}

function SyncPanel({
  email,
  message,
  signUp,
  signIn,
  signOut,
}: {
  email: string | null;
  message: string;
  signUp: (email: string, password: string) => Promise<string>;
  signIn: (email: string, password: string) => Promise<string>;
  signOut: () => Promise<void>;
}) {
  const [accountEmail, setAccountEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);
  const submit = async (action: "signin" | "signup") => {
    setBusy(true);
    setNotice(
      await (action === "signin"
        ? signIn(accountEmail, password)
        : signUp(accountEmail, password)),
    );
    setBusy(false);
  };
  if (email)
    return (
      <section className="sync-panel">
        <p className="eyebrow">SINCRONIZACIÓN</p>
        <strong>☁ {email}</strong>
        <small>{message}</small>
        <button onClick={() => void signOut()}>Cerrar sesión</button>
      </section>
    );
  return (
    <section className="sync-panel">
      <p className="eyebrow">SINCRONIZA TU PROGRESO</p>
      <p>Inicia sesión para continuar en celular y PC.</p>
      <input
        type="email"
        value={accountEmail}
        onChange={(event) => setAccountEmail(event.target.value)}
        placeholder="tu@correo.com"
        aria-label="Correo electrónico"
      />
      <input
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="Contraseña"
        aria-label="Contraseña"
      />
      <div>
        <button
          disabled={busy || !accountEmail || password.length < 6}
          onClick={() => void submit("signin")}
        >
          Entrar
        </button>
        <button
          disabled={busy || !accountEmail || password.length < 6}
          onClick={() => void submit("signup")}
        >
          Crear cuenta
        </button>
      </div>
      <small>{notice || message}</small>
    </section>
  );
}

function Dashboard({
  progress,
  completedCount,
  recommended,
  statuses,
  openLesson,
  navigate,
}: {
  progress: number;
  completedCount: number;
  recommended?: Lesson;
  statuses: Record<string, LessonStatus>;
  openLesson: (lesson: Lesson) => void;
  navigate: (view: Exclude<View, "lesson">) => void;
}) {
  const currentLevel =
    course.find((level) =>
      level.modules.some((module) =>
        module.lessons.some((lesson) => statuses[lesson.id] !== "locked"),
      ),
    ) ?? course[0];
  return (
    <>
      <section className="page-intro">
        <p className="eyebrow">TU RUTA DE ENTRENAMIENTO</p>
        <h1>
          Bienvenido a <em>Flight Academy</em>
        </h1>
        <p>
          Una ruta práctica, clara y progresiva para aprender a volar en
          Microsoft Flight Simulator.
        </p>
      </section>
      <section className="dashboard-grid">
        <article className="progress-card">
          <div>
            <p className="eyebrow">PROGRESO GENERAL</p>
            <h2>Tu bitácora</h2>
            <p className="muted">
              Cada lección completada abre el siguiente paso de tu
              entrenamiento.
            </p>
            <div className="stat-line">
              <strong>{completedCount}</strong>
              <span>
                de {lessonOrder.length} lecciones
                <br />
                completadas
              </span>
            </div>
          </div>
          <ProgressRing value={progress} />
        </article>
        <article className="level-card">
          <p className="eyebrow">NIVEL ACTUAL</p>
          <span className="level-number">
            {currentLevel.number.toString().padStart(2, "0")}
          </span>
          <h2>{currentLevel.title}</h2>
          <p>{currentLevel.description}</p>
          <button className="text-button" onClick={() => navigate("course")}>
            Ver ruta de entrenamiento →
          </button>
        </article>
      </section>
      <section className="recommendation">
        <div className="rec-icon">✦</div>
        <div>
          <p className="eyebrow">CONTINÚA TU ENTRENAMIENTO</p>
          <h2>
            {recommended ? recommended.title : "¡Ruta inicial completada!"}
          </h2>
          <p>
            {recommended
              ? recommended.description
              : "Has completado todas las lecciones de demostración disponibles."}
          </p>
          <div className="lesson-meta">
            ◷ {recommended?.estimatedTime ?? "—"} &nbsp; · &nbsp;{" "}
            {recommended?.objectives.length ?? 0} objetivos
          </div>
        </div>
        {recommended && (
          <button
            className="primary-button"
            onClick={() => openLesson(recommended)}
          >
            Abrir lección <span>→</span>
          </button>
        )}
      </section>
      <section className="section-head">
        <div>
          <p className="eyebrow">VISTA RÁPIDA</p>
          <h2>Tu entrenamiento</h2>
        </div>
        <button className="text-button" onClick={() => navigate("course")}>
          Ver todo el curso →
        </button>
      </section>
      <div className="module-summary">
        {course.slice(0, 2).map((level) => (
          <article key={level.id} className="module-card">
            <div className="module-top">
              <span>NIVEL {level.number}</span>
              <b>{level.title}</b>
            </div>
            {level.modules.map((module) => (
              <div key={module.id} className="module-row">
                <span className="module-dot">◌</span>
                <div>
                  <strong>{module.title}</strong>
                  <small>
                    {
                      module.lessons.filter(
                        (lesson) => statuses[lesson.id] === "completed",
                      ).length
                    }{" "}
                    / {module.lessons.length} lecciones
                  </small>
                </div>
              </div>
            ))}
          </article>
        ))}
      </div>
      <section className="metrics">
        <article>
          <span>◷</span>
          <div>
            <strong>0 h</strong>
            <small>Horas de entrenamiento</small>
          </div>
        </article>
        <article>
          <span>✓</span>
          <div>
            <strong>{completedCount}</strong>
            <small>Lecciones completadas</small>
          </div>
        </article>
        <article>
          <span>◎</span>
          <div>
            <strong>1</strong>
            <small>Objetivo actual</small>
          </div>
        </article>
      </section>
    </>
  );
}

function Course({
  statuses,
  openLesson,
  focusLessonId,
  onFocused,
}: {
  statuses: Record<string, LessonStatus>;
  openLesson: (lesson: Lesson) => void;
  focusLessonId: string | null;
  onFocused: () => void;
}) {
  const focusedLesson = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!focusLessonId || !focusedLesson.current) return;
    focusedLesson.current.focus({ preventScroll: true });
    focusedLesson.current.scrollIntoView({ behavior: "smooth", block: "center" });
    onFocused();
  }, [focusLessonId, onFocused]);

  return (
    <>
      <section className="page-intro compact">
        <p className="eyebrow">RUTA DE FORMACIÓN</p>
        <h1>
          Mi <em>entrenamiento</em>
        </h1>
        <p>
          Completa las lecciones en orden. La siguiente se desbloquea
          automáticamente.
        </p>
      </section>
      <div className="course-list">
        {course.map((level) => (
          <section className="level-section" key={level.id}>
            <div className="level-header">
              <span className="level-badge">{level.number}</span>
              <div>
                <p className="eyebrow">NIVEL {level.number}</p>
                <h2>{level.title}</h2>
                <p>{level.description}</p>
              </div>
            </div>
            {level.modules.map((module) => (
              <article className="course-module" key={module.id}>
                <div className="course-module-title">
                  <span>◫</span>
                  <div>
                    <h3>{module.title}</h3>
                    <p>{module.description}</p>
                  </div>
                </div>
                <div className="lesson-list">
                  {module.lessons.map((lesson, index) => {
                    const status = statuses[lesson.id];
                    return (
                      <button
                        key={lesson.id}
                        ref={lesson.id === focusLessonId ? focusedLesson : undefined}
                        disabled={status === "locked"}
                        className={`lesson-row ${status} ${lesson.id === focusLessonId ? "return-focus" : ""}`}
                        onClick={() => openLesson(lesson)}
                      >
                        <span className="lesson-state">
                          {status === "completed"
                            ? "✓"
                            : status === "locked"
                              ? "⌕"
                              : index + 1}
                        </span>
                        <div>
                          <strong>{lesson.title}</strong>
                          <small>
                            {lesson.estimatedTime} · {statusLabel(status)}
                          </small>
                        </div>
                        <span className="row-arrow">→</span>
                      </button>
                    );
                  })}
                </div>
              </article>
            ))}
          </section>
        ))}
      </div>
    </>
  );
}

function CockpitInstrumentMap() {
  const instruments = [
    ["Izquierda", "Velocidad", "Te dice qué tan rápido se mueve el avión. La unidad es nudos (kt)."],
    ["Centro", "Horizonte artificial", "Cielo arriba y tierra abajo. Si la línea se inclina, las alas también."],
    ["Derecha", "Altitud", "Te dice a qué altura estás. La unidad es pies (ft)."],
    ["Abajo", "Rumbo", "La dirección hacia la que apunta el morro, medida en grados."],
    ["Centro bajo", "Giro y bola", "Muestra si giras y si el giro está coordinado. Solo ubícalo por ahora."],
  ];
  return (
    <section className="cockpit-map" aria-label="Mapa básico de instrumentos del Cessna 172">
      <p className="eyebrow">MAPA DE CABINA · PRIMERO MIRA, NO TOQUES</p>
      <h2>Las cinco zonas que verás en pantalla</h2>
      <figure className="reference-figure">
        <img src={`${import.meta.env.BASE_URL}references/g1000-pfd-reference.png`} alt="Pantalla primaria Garmin G1000 con indicadores numerados" />
        <figcaption>Referencia del PFD Garmin G1000. Hoy usa solo: 2 velocidad, 20 horizonte artificial, 15 altitud, 4 rumbo y 19 coordinación. Las demás zonas se explican cuando sean necesarias.</figcaption>
      </figure>
      <div className="instrument-grid">
        {instruments.map(([position, name, description]) => (
          <article key={name}>
            <span>{position}</span>
            <h3>{name}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function FirstFlightPfdGuide() {
  const areas = [
    ["1 · izquierda", "Velocidad", "Indica qué tan rápido atraviesas el aire. El número aumenta al acelerar y baja al frenar. Está en KIAS (nudos), no km/h. Hoy solo observa cómo cambia."],
    ["2 · centro", "Horizonte artificial", "Azul es cielo y marrón es tierra. La línea entre ambos representa el horizonte. Si se inclina, tus alas también. Al centrar el yoke, buscas que esa línea vuelva horizontal."],
    ["3 · derecha", "Altitud", "Indica qué tan alto estás, en pies (ft). El número aumenta cuando subes y baja cuando desciendes. Si baja demasiado en este primer ejercicio, pausa y reinicia: no tienes que salvar el vuelo."],
    ["4 · abajo", "Rumbo", "Es una brújula: te dice hacia dónde apunta el morro. Al girar, cambian los grados. 360° es norte, 090° este, 180° sur y 270° oeste."],
    ["5 · arriba del centro", "Bola", "Muestra si el giro está equilibrado. No la corrijas todavía; por ahora solo reconoce dónde está. Te enseñaré a usarla cuando practiquemos virajes."],
  ];

  return (
    <section className="cockpit-map first-flight-pfd" aria-label="Guía visual de la pantalla G1000 para el primer vuelo">
      <p className="eyebrow">ANTES DE MOVER EL YOKE</p>
      <h2>La pantalla te cuenta cinco cosas</h2>
      <p className="instrument-intro">La imagen es una pantalla G1000 real de referencia. Las etiquetas turquesa señalan solo lo que usarás hoy; ignora los otros números de Garmin.</p>
      <figure className="reference-figure pfd-first-flight">
        <img src={`${import.meta.env.BASE_URL}references/g1000-pfd-reference.png`} alt="Pantalla Garmin G1000 con velocidad a la izquierda, horizonte al centro, altitud a la derecha y rumbo abajo" />
        <span className="pfd-callout pfd-speed">1 · velocidad</span>
        <span className="pfd-callout pfd-attitude">2 · horizonte</span>
        <span className="pfd-callout pfd-altitude">3 · altitud</span>
        <span className="pfd-callout pfd-heading">4 · rumbo</span>
        <span className="pfd-callout pfd-ball">5 · bola</span>
        <figcaption>No memorices cifras ni botones aún. Tu tarea es observar qué cambia después de cada movimiento pequeño del yoke.</figcaption>
      </figure>
      <div className="instrument-grid first-flight-grid">
        {areas.map(([position, name, explanation]) => (
          <article key={name}>
            <span>{position}</span>
            <h3>{name}</h3>
            <p>{explanation}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function EfbReference() {
  return (
    <section className="cockpit-map efb-reference" aria-label="Referencia visual de la EFB de Microsoft Flight Simulator 2024">
      <p className="eyebrow">EFB · PLANIFICA ANTES DE VOLAR</p>
      <h2>La tablet de MSFS 2024, vista sobre el Mapa mundial</h2>
      <p className="instrument-intro">Esta es una captura oficial de MSFS 2024. La EFB es el panel oscuro del centro; el mapa mundial queda detrás. Su apariencia puede cambiar un poco entre actualizaciones o aviones.</p>
      <figure className="reference-figure efb-figure">
        <img src={`${import.meta.env.BASE_URL}references/msfs2024-efb-world-map.png`} alt="EFB de Microsoft Flight Simulator 2024 abierta sobre el mapa mundial" />
        <span className="efb-callout efb-search">1 · buscar</span>
        <span className="efb-callout efb-apps">2 · apps</span>
        <span className="efb-callout efb-map">3 · mapa</span>
        <figcaption>1: aquí buscarás aeropuertos más adelante. 2: accesos a las aplicaciones de la EFB. 3: mapa en el que verás avión, aeropuertos y rutas. Hoy solo identifica las zonas.</figcaption>
      </figure>
      <div className="instrument-grid">
        <article><span>HOY</span><h3>Solo abre y reconoce</h3><p>No escribas un origen ni un destino todavía. Abrir, ubicar y cerrar la EFB ya es el objetivo completo de esta primera lección.</p></article>
        <article><span>DESPUÉS</span><h3>Ruta y aviónica</h3><p>Cuando conozcas mapa y G1000, crearás una ruta VFR corta y la enviarás a la aviónica. No se hace durante taxi ni despegue.</p></article>
      </div>
    </section>
  );
}

function VelocityOneReference() {
  return (
    <section className="velocityone-reference" aria-label="Referencia visual del Turtle Beach VelocityOne Flight">
      <p className="eyebrow">ANTES DE USAR EL CONTROL</p>
      <h2>Tu Turtle Beach VelocityOne Flight</h2>
      <figure className="reference-figure velocityone-annotated-photo">
        <img src={`${import.meta.env.BASE_URL}references/turtlebeach-velocityone-official.png`} alt="Turtle Beach VelocityOne Flight: yoke, base y cuadrante de potencia" />
        <span className="photo-callout callout-lb">LB: hombro del agarre izquierdo</span>
        <span className="photo-callout callout-rb">RB: hombro del agarre derecho</span>
        <span className="photo-callout callout-b4">B4<br /><small>parking</small></span>
        <span className="photo-callout callout-b7">B7<br /><small>flaps −</small></span>
        <span className="photo-callout callout-b8">B8<br /><small>flaps +</small></span>
        <figcaption>Foto oficial anotada. Los marcadores B4, B7 y B8 señalan los botones blancos del cuadrante; LB/RB están en los hombros de los agarres del yoke y se usan con los índices.</figcaption>
      </figure>
      <div className="profile-warning">
        <strong>Configuración del curso:</strong> Xbox + <em>Single-Engine Prop</em>. Las letras son nombres impresos en el control; esta guía siempre te dirá primero dónde está la pieza física. Comprueba que este mismo perfil aparezca en la pantalla del VelocityOne y en MSFS antes de practicar.
      </div>
      <section className="control-location-guide" aria-label="Dónde están LB, RB y los botones del cuadrante">
        <h3>Ubícalos antes de usarlos</h3>
        <div className="location-cards">
          <article><b>LB</b><span>Botón superior del agarre <strong>izquierdo</strong> del yoke: donde llega tu índice izquierdo.</span><em>Freno izquierdo</em></article>
          <article><b>RB</b><span>Botón superior del agarre <strong>derecho</strong> del yoke: donde llega tu índice derecho.</span><em>Freno derecho</em></article>
          <article><b>LT / RT</b><span>Gatillos que están detrás de esos mismos agarres: LT a la izquierda, RT a la derecha.</span><em>Dirección en tierra</em></article>
        </div>
        <div className="quadrant-location">
          <div>
            <h4>Botones blancos del cuadrante (derecha)</h4>
            <p>Son dos filas de cinco. Míralos de frente: <strong>B7</strong> es el botón de arriba en la tercera columna; <strong>B8</strong> es el de abajo justo debajo de B7.</p>
          </div>
          <div className="quadrant-button-grid" aria-label="Distribución física de los botones B3 a B12">
            <span>B3</span><span>B5</span><span className="focus-button">B7<br /><small>flaps menos</small></span><span>B9</span><span>B11</span>
            <span className="focus-button">B4<br /><small>parking</small></span><span>B6</span><span className="focus-button">B8<br /><small>flaps más</small></span><span>B10</span><span>B12</span>
          </div>
        </div>
        <p className="location-note"><strong>Ahora solo necesitas LB y RB para frenar.</strong> B4 se verá al dejar el avión estacionado. B7/B8 se enseñan en aproximación; no los presiones todavía.</p>
      </section>
    </section>
  );
}

function VelocityOneOverlay() {
  return (
    <div className="velocityone-overlay" aria-label="Flechas para ubicar todos los grupos de controles del VelocityOne">
      <span className="velocityone-pin pin-left-grip">LB · LT<br /><small>freno / timón</small></span>
      <span className="velocityone-pin pin-left-face">A B X Y · B1<br /><small>cámara · ATC</small></span>
      <span className="velocityone-pin pin-yoke">YOKE<br /><small>alerón / elevador</small></span>
      <span className="velocityone-pin pin-right-grip">RB · RT<br /><small>freno / timón</small></span>
      <span className="velocityone-pin pin-hats">POV · HAT 1/2<br /><small>vistas / trim</small></span>
      <span className="velocityone-pin pin-trim">TRIM<br /><small>elevador</small></span>
      <span className="velocityone-pin pin-levers">PALANCAS 1–4<br /><small>potencia · prop · mezcla · flaps</small></span>
      <span className="velocityone-pin pin-buttons">B3–B12<br /><small>panel 2 × 5</small></span>
      <span className="velocityone-pin pin-pp">PUSH/PULL<br /><small>potencia · prop · mezcla</small></span>
    </div>
  );
}

function TaxiRouteMap() {
  return (
    <section className="taxi-map" aria-label="Ruta básica de taxi en un aeropuerto">
      <p className="eyebrow">MAPA DE TAXI · USA LA CINTA AZUL DE MSFS</p>
      <h2>Tu recorrido antes de despegar</h2>
      <div className="taxi-route" aria-label="Plataforma, calle de rodaje, línea de espera y pista">
        <div className="taxi-stop parking"><strong>1</strong><span>Plataforma<br />Empiezas aquí</span></div>
        <div className="taxi-line" aria-hidden="true" />
        <div className="taxi-stop taxiway"><strong>2</strong><span>Calle de rodaje<br />Sigue cinta azul y línea amarilla</span></div>
        <div className="taxi-line" aria-hidden="true" />
        <div className="taxi-stop hold"><strong>3</strong><span>Línea de espera<br />Detente aquí</span></div>
        <div className="runway-block"><span>PISTA · NO ENTRAR TODAVÍA</span></div>
      </div>
      <p className="taxi-map-note">La forma real cambia en cada aeropuerto. No memorices este dibujo: pide taxi y sigue la cinta azul que MSFS dibuja sobre el suelo.</p>
    </section>
  );
}

function CircuitPatternMap() {
  const legs = [
    ["1", "Salida", "Recto tras despegar, siguiendo el rumbo de pista."],
    ["2", "Viento cruzado", "Primer giro de 90°. Es un tramo, no una orden sobre el viento."],
    ["3", "Viento en cola", "Paralelo a la pista, pero volando en sentido contrario al aterrizaje."],
    ["4", "Base", "Segundo giro de 90°: vas hacia la prolongación de pista."],
    ["5", "Final", "Alineado con la pista. La aproximación se enseña en la siguiente lección."],
  ];
  return (
    <section className="circuit-map" aria-label="Mapa de un circuito de tránsito izquierdo">
      <p className="eyebrow">EJEMPLO · CONFIRMA PISTA Y SENTIDO CON MSFS/ATC</p>
      <h2>El avión da una vuelta alrededor de la pista</h2>
      <p className="circuit-map-intro">El número de pista marca aproximadamente su rumbo de aterrizaje. Este dibujo enseña la forma del circuito, no asigna una pista ni un sentido de giro: sigue ATC, las señales del aeropuerto o la guía de MSFS.</p>
      <ol>
        {legs.map(([number, title, description]) => (
          <li key={number}>
            <strong>{number}</strong>
            <div><h3>{title}</h3><p>{description}</p></div>
          </li>
        ))}
      </ol>
      <div className="wind-example"><strong>Viento:</strong> 360°/8 kt viene del norte. Para pista 01 es casi de cara; 180° sería de cola y 090°/270° lateral.</div>
    </section>
  );
}

void CircuitPatternMap;

function TrafficPatternGuide() {
  const legs = [
    ["1", "Salida", "Recto después de despegar, siguiendo la dirección de la pista."],
    ["2", "Viento cruzado", "Primer tramo de 90° que te aleja del eje de pista."],
    ["3", "Viento en cola", "Paralelo a la pista, pero en dirección opuesta al aterrizaje."],
    ["4", "Base", "Giro de regreso hacia la prolongación de pista. Se verá más adelante."],
    ["5", "Final", "Alineado con la pista. Aproximación y aterrizaje se enseñan después."],
  ];
  return (
    <section className="circuit-map" aria-label="Guía básica de circuito de tránsito">
      <p className="eyebrow">MAPA DE FORMA · NO ASIGNA UNA PISTA</p>
      <h2>Así se ordena un circuito alrededor de la pista</h2>
      <p className="circuit-map-intro">El dibujo muestra posiciones, no un aeropuerto real ni una instrucción de giro. Usa la pista y el sentido que te indique MSFS/ATC; un circuito puede ser izquierdo o derecho.</p>
      <ol>{legs.map(([number, title, description]) => <li key={number}><strong>{number}</strong><div><h3>{title}</h3><p>{description}</p></div></li>)}</ol>
      <div className="wind-example"><strong>Viento:</strong> 360°/8 kt viene desde el norte. Compáralo con el rumbo de pista asignado: parecido = de cara; opuesto = de cola; unos 90° de diferencia = lateral. En la primera práctica usa 0–3 kt.</div>
    </section>
  );
}

function LessonIllustration({ lessonId }: { lessonId: string }) {
  const illustrations: Record<
    string,
    { src: string; alt: string; caption: string }
  > = {
    "vfr-map-route": { src: `${import.meta.env.BASE_URL}navigation-flow.svg`, alt: "Flujo visual de mapa, VOR, GPS y piloto automático", caption: "Primero entiendes la ruta en el mapa; después eliges qué instrumento usar." },
    "nav-time-fuel": { src: `${import.meta.env.BASE_URL}navigation-flow.svg`, alt: "Flujo visual de mapa, VOR, GPS y piloto automático", caption: "La planificación conecta distancia, tiempo y combustible antes de entrar a cabina." },
    "vor-dme-basics": { src: `${import.meta.env.BASE_URL}navigation-flow.svg`, alt: "Flujo visual de mapa, VOR, GPS y piloto automático", caption: "VOR entrega dirección y DME distancia; verifica siempre señal y fuente CDI." },
    "g1000-gps-route": { src: `${import.meta.env.BASE_URL}navigation-flow.svg`, alt: "Flujo visual de mapa, VOR, GPS y piloto automático", caption: "Antes de seguir la línea magenta, confirma que el CDI muestra GPS." },
    "c172-autopilot-basics": { src: `${import.meta.env.BASE_URL}navigation-flow.svg`, alt: "Flujo visual de mapa, VOR, GPS y piloto automático", caption: "HDG, ALT y NAV son modos diferentes: confirma el PFD y supervisa el resultado." },
    "navigation-consolidation": { src: `${import.meta.env.BASE_URL}navigation-flow.svg`, alt: "Flujo visual de mapa, VOR, GPS y piloto automático", caption: "La secuencia completa es planificar, volar estable, confirmar navegación y supervisar automatización." },
    "c172-fuel-basics": {
      src: `${import.meta.env.BASE_URL}c172-performance-card.svg`,
      alt: "Tarjeta visual de combustible y despegue del Cessna 172",
      caption:
        "Calcula primero y carga desde el EFB antes de encender el motor.",
    },
    "c172-takeoff-card": {
      src: `${import.meta.env.BASE_URL}c172-performance-card.svg`,
      alt: "Tarjeta visual de combustible y despegue del Cessna 172",
      caption: "Mantén esta tarjeta visible al iniciar el primer despegue.",
    },
    "know-velocityone": {
      src: `${import.meta.env.BASE_URL}velocityone-c172-map.svg`,
      alt: "Ruta visual para abrir los controles del VelocityOne en MSFS 2024",
      caption: "Guía visual: ruta al perfil del controlador.",
    },
    "initial-controls-check": {
      src: `${import.meta.env.BASE_URL}velocityone-c172-map.svg`,
      alt: "Ruta visual para abrir los controles del VelocityOne en MSFS 2024",
      caption:
        "Ten esta guía abierta mientras haces la comprobación en tierra.",
    },
    "c172-taxi-basics": {
      src: `${import.meta.env.BASE_URL}airport-ground-map.svg`,
      alt: "Mapa ilustrado de plataforma, calle de rodaje, pista y línea de espera",
      caption:
        "El taxi ocurre sobre la línea amarilla; la pista todavía no es tu destino.",
    },
    "c172-taxi-to-hold": {
      src: `${import.meta.env.BASE_URL}airport-ground-map.svg`,
      alt: "Mapa ilustrado de plataforma, calle de rodaje, pista y línea de espera",
      caption:
        "Sigue la línea amarilla y la guía de MSFS hasta detenerte antes de la línea de espera.",
    },
    "c172-engine-runup": {
      src: `${import.meta.env.BASE_URL}c172-start-flow.svg`,
      alt: "Flujo visual de preparación y arranque del Cessna 172 G1000",
      caption:
        "La prueba de motor se hace detenido, con freno aplicado y sin entrar a la pista.",
    },
    "c172-before-takeoff": {
      src: `${import.meta.env.BASE_URL}c172-start-flow.svg`,
      alt: "Flujo visual de preparación y arranque del Cessna 172 G1000",
      caption:
        "La checklist final te deja listo para rodar; todavía no equivale a despegar.",
    },
    "c172-lineup": {
      src: `${import.meta.env.BASE_URL}airport-ground-map.svg`,
      alt: "Mapa ilustrado de plataforma, calle de rodaje, pista y línea de espera",
      caption:
        "La pista es el destino final del taxi; entra solo desde la línea de espera.",
    },
    "c172-takeoff-roll": {
      src: `${import.meta.env.BASE_URL}flight-basics.svg`,
      alt: "Ilustración de referencias básicas durante el vuelo",
      caption:
        "Durante la carrera mira lejos y mantén el avión centrado; no hagas correcciones bruscas.",
    },
    "c172-climb-out": {
      src: `${import.meta.env.BASE_URL}flight-basics.svg`,
      alt: "Ilustración de referencias básicas durante el vuelo",
      caption:
        "Tras despegar, altura y calma primero; la navegación puede esperar.",
    },
    "airport-map-basics": {
      src: `${import.meta.env.BASE_URL}airport-ground-map.svg`,
      alt: "Mapa ilustrado de plataforma, calle de rodaje, pista y línea de espera",
      caption:
        "No ruedes hasta poder distinguir estas cuatro zonas desde tu posición.",
    },
    "airport-radio-basics": {
      src: `${import.meta.env.BASE_URL}airport-ground-map.svg`,
      alt: "Guía visual del panel Comunicaciones de Microsoft Flight Simulator",
      caption:
        "La radio básica va antes del taxi: solicita la ruta y aprende a detenerte en Hold Short.",
    },
    "c172-cold-dark": {
      src: `${import.meta.env.BASE_URL}c172-start-flow.svg`,
      alt: "Flujo visual de preparación y arranque del Cessna 172 G1000",
      caption:
        "Lee el flujo completo primero; después realiza un paso a la vez en cabina.",
    },
    "c172-before-start": {
      src: `${import.meta.env.BASE_URL}c172-start-flow.svg`,
      alt: "Flujo visual de preparación y arranque del Cessna 172 G1000",
      caption:
        "En esta lección completa únicamente las tarjetas 1 y 2; no gires la llave todavía.",
    },
    "c172-engine-start": {
      src: `${import.meta.env.BASE_URL}c172-start-flow.svg`,
      alt: "Flujo visual de preparación y arranque del Cessna 172 G1000",
      caption:
        "Sigue las tarjetas 3 y 4; la tarjeta 5 pertenece a la lección siguiente.",
    },
    "c172-after-start": {
      src: `${import.meta.env.BASE_URL}c172-start-flow.svg`,
      alt: "Flujo visual de preparación y arranque del Cessna 172 G1000",
      caption:
        "Después del arranque, usa la tarjeta 5 antes de pensar en rodar.",
    },
    "know-c172": {
      src: `${import.meta.env.BASE_URL}flight-basics.svg`,
      alt: "Ilustración de referencias básicas durante el vuelo",
      caption:
        "Antes de tocar algo, mira fuera; después confirma velocidad y altitud.",
    },
    "three-axes": {
      src: `${import.meta.env.BASE_URL}flight-basics.svg`,
      alt: "Ilustración de referencias básicas durante el vuelo",
      caption:
        "Haz un movimiento pequeño y observa la referencia exterior antes de hacer otro.",
    },
    "throttle-power": {
      src: `${import.meta.env.BASE_URL}flight-basics.svg`,
      alt: "Ilustración de referencias básicas durante el vuelo",
      caption:
        "Potencia es solo una parte: observa siempre la actitud y la velocidad.",
    },
    "what-is-trim": {
      src: `${import.meta.env.BASE_URL}flight-basics.svg`,
      alt: "Ilustración de referencias básicas durante el vuelo",
      caption:
        "El trim se usa después de estabilizar el avión, no para recuperarlo.",
    },
    "first-cockpit-exercise": {
      src: `${import.meta.env.BASE_URL}flight-basics.svg`,
      alt: "Ilustración de referencias básicas durante el vuelo",
      caption:
        "La secuencia es: mirar fuera, comprobar, corregir poco y esperar.",
    },
    "straight-and-level": {
      src: `${import.meta.env.BASE_URL}flight-basics.svg`,
      alt: "Ilustración de referencias básicas durante el vuelo",
      caption:
        "Recto y nivelado empieza por la referencia exterior, no por perseguir números.",
    },
    "turns-and-coordination": {
      src: `${import.meta.env.BASE_URL}flight-basics.svg`,
      alt: "Ilustración de referencias básicas durante el vuelo",
      caption:
        "Después de cada viraje, nivela las alas y vuelve a estabilizar.",
    },
    "airport-traffic-pattern": {
      src: `${import.meta.env.BASE_URL}vfr-pattern.svg`,
      alt: "Diagrama de circuito VFR alrededor de una pista",
      caption:
        "El circuito organiza la llegada; no tienes que inventar una ruta al azar.",
    },
    "c172-approach-setup": {
      src: `${import.meta.env.BASE_URL}c172-landing-flow.svg`,
      alt: "Flujo visual de aproximación y aterrizaje del Cessna 172",
      caption:
        "Flaps y velocidad se incorporan por etapas desde viento en cola; no de golpe en final.",
    },
    "c172-landing": {
      src: `${import.meta.env.BASE_URL}c172-landing-flow.svg`,
      alt: "Flujo visual de aproximación y aterrizaje del Cessna 172",
      caption:
        "La pista debe ser alcanzable y el avión estar estable; si no, aplica frustrada.",
    },
    "c172-go-around": {
      src: `${import.meta.env.BASE_URL}c172-landing-flow.svg`,
      alt: "Flujo visual de aproximación y aterrizaje del Cessna 172",
      caption:
        "La línea naranja recuerda la alternativa: potencia, actitud, velocidad y flaps por etapas.",
    },
    "first-vfr-navigation": {
      src: `${import.meta.env.BASE_URL}vfr-pattern.svg`,
      alt: "Diagrama de circuito VFR alrededor de una pista",
      caption:
        "La navegación visual combina referencias en tierra y mapa como respaldo.",
    },
    "vfr-consolidation": {
      src: `${import.meta.env.BASE_URL}vfr-pattern.svg`,
      alt: "Diagrama de circuito VFR alrededor de una pista",
      caption:
        "La consolidación une tierra, despegue, control, navegación y llegada.",
    },
    "sensitivity-deadzones": {
      src: `${import.meta.env.BASE_URL}sensitivity-guide.svg`,
      alt: "Ilustración de curva de sensibilidad inicial para el Cessna 172",
      caption:
        "Valores de partida: ajústalos únicamente después de probar el eje.",
    },
  };
  const illustration = illustrations[lessonId];
  return illustration ? (
    <figure className="lesson-illustration">
      <img src={illustration.src} alt={illustration.alt} />
      <figcaption>{illustration.caption}</figcaption>
    </figure>
  ) : null;
}

function LessonFeedback({
  lesson,
  value,
  onSave,
}: {
  lesson: Lesson;
  value: string;
  onSave: (value: string) => void;
}) {
  const [draft, setDraft] = useState(value);
  const [notice, setNotice] = useState("");
  useEffect(() => setDraft(value), [value, lesson.id]);
  const save = () => {
    onSave(draft.trim());
    setNotice("Guardado en este dispositivo.");
  };
  const copyForReview = async () => {
    const text = `Feedback · ${lesson.title}\nNivel ${lesson.level} · ${lesson.moduleTitle}\n\n${draft.trim()}`;
    try {
      await navigator.clipboard.writeText(text);
      setNotice("Copiado: pégalo en el chat para que lo revise.");
    } catch {
      setNotice("No se pudo copiar automáticamente; selecciona el texto y pégalo en el chat.");
    }
  };
  return (
    <section className="lesson-feedback" aria-label="Feedback de esta lección">
      <p className="eyebrow">TU FEEDBACK</p>
      <h2>¿Qué ajustarías de esta lección?</h2>
      <p>Escribe lo que fue confuso, faltó, no coincide con tu control o debería cambiar. Se guarda en tu dispositivo y en tu copia de progreso.</p>
      <textarea value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Ejemplo: B6 no aparece asignado en mi perfil de MSFS 2024; agrega una explicación o una alternativa." rows={6} />
      <div className="feedback-actions">
        <button type="button" className="secondary-button" onClick={save}>Guardar feedback</button>
        <button type="button" className="feedback-copy" onClick={() => void copyForReview()}>Copiar para revisión</button>
      </div>
      {notice && <small>{notice}</small>}
    </section>
  );
}

function DetailedLessonView({
  lesson,
  status,
  feedback,
  onSaveFeedback,
  onComplete,
  onBack,
}: {
  lesson: Lesson;
  status: LessonStatus;
  feedback: string;
  onSaveFeedback: (value: string) => void;
  onComplete: () => void;
  onBack: () => void;
}) {
  return (
    <>
      <button className="back-button" onClick={onBack}>
        ← Volver al entrenamiento
      </button>
      <section className="lesson-hero">
        <p className="eyebrow">
          NIVEL {lesson.level} · {lesson.moduleTitle}
        </p>
        <h1>{lesson.title}</h1>
        <p>{lesson.description}</p>
        <div className="lesson-meta">
          ◷ {lesson.estimatedTime} · Estado: {statusLabel(status)}
        </div>
      </section>
      <div className="lesson-layout">
        <article className="lesson-content">
          <section className="objective-panel">
            <span>◎</span>
            <div>
              <p className="eyebrow">OBJETIVO DE LA LECCIÓN</p>
              <h2>Al terminar podrás:</h2>
              <ul>
                {lesson.objectives.map((objective) => (
                  <li key={objective}>{objective}</li>
                ))}
              </ul>
            </div>
          </section>
          {lesson.id === "first-flight-now" && <FirstFlightPfdGuide />}
          {lesson.id === "efb-first-look" && <EfbReference />}
          {["ifr-route-briefing", "ifr-approach-briefing", "ifr-gps-approach"].includes(lesson.id) && <EfbReference />}
          {lesson.id === "c172-instruments-first" && <CockpitInstrumentMap />}
          {lesson.id.startsWith("ifr-") && <CockpitInstrumentMap />}
          {["know-velocityone", "initial-controls-check", "c172-controls-first"].includes(lesson.id) && <VelocityOneReference />}
          {["airport-map-basics", "c172-taxi-basics", "c172-taxi-to-hold"].includes(lesson.id) && <TaxiRouteMap />}
          {lesson.id === "airport-traffic-pattern" && <TrafficPatternGuide />}
          {lesson.flightSetup && (
            <section className="flight-setup">
              <p className="eyebrow">CONFIGURACIÓN EN MSFS 2024</p>
              <h2>Prepara tu vuelo</h2>
              <dl>
                <div>
                  <dt>Modo</dt>
                  <dd>{lesson.flightSetup.mode}</dd>
                </div>
                <div>
                  <dt>Aeronave</dt>
                  <dd>{lesson.flightSetup.aircraft}</dd>
                </div>
                <div>
                  <dt>Aeropuerto</dt>
                  <dd>{lesson.flightSetup.airport}</dd>
                </div>
                <div>
                  <dt>Inicio</dt>
                  <dd>{lesson.flightSetup.position}</dd>
                </div>
                <div>
                  <dt>Altura</dt>
                  <dd>{lesson.flightSetup.altitude}</dd>
                </div>
                <div>
                  <dt>Clima</dt>
                  <dd>{lesson.flightSetup.weather}</dd>
                </div>
                <div>
                  <dt>Hora</dt>
                  <dd>{lesson.flightSetup.time}</dd>
                </div>
              </dl>
              <p className="setup-note">{lesson.flightSetup.note}</p>
            </section>
          )}
          {lesson.continuity && (
            <section
              className="lesson-continuity"
              aria-label="Continuidad de la lección"
            >
              <p className="eyebrow">RUTA SIN SALTOS</p>
              <h2>Antes, durante y después</h2>
              <dl>
                <div>
                  <dt>Empiezas aquí</dt>
                  <dd>{lesson.continuity.start}</dd>
                </div>
                <div>
                  <dt>Al terminar</dt>
                  <dd>{lesson.continuity.finish}</dd>
                </div>
                <div>
                  <dt>Siguiente paso</dt>
                  <dd>{lesson.continuity.next}</dd>
                </div>
              </dl>
            </section>
          )}
          <LessonIllustration lessonId={lesson.id} />
          {lesson.sections.map((section) => (
            <section className="lesson-section" key={section.title}>
              <p className="eyebrow">{section.kind}</p>
              <h2>{section.title}</h2>
              <p>{section.content}</p>
            </section>
          ))}
          <section className="lesson-section exercise">
            <p className="eyebrow">EJERCICIO</p>
            <h2>{lesson.exercise.title}</h2>
            <p>{lesson.exercise.instructions}</p>
          </section>
          <LessonFeedback lesson={lesson} value={feedback} onSave={onSaveFeedback} />
        </article>
        <aside className="lesson-sidebar">
          <Checklist title="Checklist de la lección" items={lesson.checklist} />
          <button
            className={
              status === "completed"
                ? "complete-button done"
                : "complete-button"
            }
            onClick={onComplete}
          >
            {status === "completed"
              ? "✓ Lección completada"
              : "Completar lección"}
          </button>
        </aside>
      </div>
    </>
  );
}

function LessonView({
  lesson: sourceLesson,
  status,
  feedback,
  onSaveFeedback,
  onComplete,
  onBack,
}: {
  lesson: Lesson;
  status: LessonStatus;
  feedback: string;
  onSaveFeedback: (value: string) => void;
  onComplete: () => void;
  onBack: () => void;
}) {
  const lesson = sourceLesson as Lesson & {
    flightSetup: NonNullable<Lesson["flightSetup"]>;
  };
  if (!lesson.flightSetup)
    return (
      <DetailedLessonView
        lesson={lesson}
        status={status}
        feedback={feedback}
        onSaveFeedback={onSaveFeedback}
        onComplete={onComplete}
        onBack={onBack}
      />
    );
  return (
    <DetailedLessonView
      lesson={lesson}
      status={status}
      feedback={feedback}
      onSaveFeedback={onSaveFeedback}
      onComplete={onComplete}
      onBack={onBack}
    />
  );
  return (
    <>
      <button className="back-button" onClick={onBack}>
        ← Volver al entrenamiento
      </button>
      <section className="lesson-hero">
        <p className="eyebrow">
          NIVEL {lesson.level} · {lesson.moduleTitle}
        </p>
        <h1>{lesson.title}</h1>
        <p>{lesson.description}</p>
        <div className="lesson-meta">
          ◷ {lesson.estimatedTime} &nbsp; · &nbsp; Estado: {statusLabel(status)}
        </div>
      </section>
      <div className="lesson-layout">
        <article className="lesson-content">
          <section className="objective-panel">
            <span>◎</span>
            <div>
              <p className="eyebrow">OBJETIVO DE LA LECCIÓN</p>
              <h2>Al terminar podrás:</h2>
              <ul>
                {lesson.objectives.map((objective) => (
                  <li key={objective}>{objective}</li>
                ))}
              </ul>
            </div>
          </section>
          {lesson.flightSetup && (
            <section className="flight-setup">
              <p className="eyebrow">CONFIGURACIÓN EN MSFS 2024</p>
              <h2>Prepara tu vuelo</h2>
              <dl>
                <div>
                  <dt>Modo</dt>
                  <dd>{lesson.flightSetup.mode}</dd>
                </div>
                <div>
                  <dt>Aeronave</dt>
                  <dd>{lesson.flightSetup.aircraft}</dd>
                </div>
                <div>
                  <dt>Aeropuerto</dt>
                  <dd>{lesson.flightSetup.airport}</dd>
                </div>
                <div>
                  <dt>Inicio</dt>
                  <dd>{lesson.flightSetup.position}</dd>
                </div>
                <div>
                  <dt>Altura</dt>
                  <dd>{lesson.flightSetup.altitude}</dd>
                </div>
                <div>
                  <dt>Clima</dt>
                  <dd>{lesson.flightSetup.weather}</dd>
                </div>
                <div>
                  <dt>Hora</dt>
                  <dd>{lesson.flightSetup.time}</dd>
                </div>
              </dl>
              <p className="setup-note">{lesson.flightSetup.note}</p>
            </section>
          )}
          {lesson.sections.map((section) => (
            <section className="lesson-section" key={section.title}>
              <p className="eyebrow">{section.kind}</p>
              <h2>{section.title}</h2>
              <p>{section.content}</p>
            </section>
          ))}
          <section className="lesson-section exercise">
            <p className="eyebrow">EJERCICIO</p>
            <h2>{lesson.exercise.title}</h2>
            <p>{lesson.exercise.instructions}</p>
          </section>
        </article>
        <aside className="lesson-sidebar">
          <Checklist title="Checklist de la lección" items={lesson.checklist} />
          <button
            className={
              status === "completed"
                ? "complete-button done"
                : "complete-button"
            }
            onClick={onComplete}
          >
            {status === "completed"
              ? "✓ Lección completada"
              : "Completar lección"}
          </button>
        </aside>
      </div>
    </>
  );
}

function VelocityOne() {
  const zones = [
    ["01", "Yoke", "Gira: Aileron Axis. Empuja/tira: Elevator Axis. Es el control principal de alabeo y cabeceo."],
    ["02", "LT / RT", "Gatillos traseros de los agarres: Rudder Axis izquierda/derecha en el perfil Single-Engine Prop."],
    ["03", "LB / RB", "Hombros superiores: freno izquierdo y freno derecho. Ambos juntos detienen el avión."],
    ["04", "A · B · X · Y", "A: cámara inteligente. B: sin asignar. X: muestra tramo NAV. Y: abre ATC."],
    ["05", "B1 / B2", "B1 cambia vista cabina/exterior. B2 restablece la vista exterior."],
    ["06", "POV y HAT", "POV mueve vistas. HAT 1 cambia instrumentos y trim de alerón; HAT 2 mueve cámara y trim de timón."],
    ["07", "Palancas 1–4", "Throttle, propeller, mixture y flaps axis. En C172 usarás sobre todo throttle, prop y mezcla."],
    ["08", "Trim / Push-Pull", "Rueda: elevator trim. Las tres palancas push-pull repiten potencia, propeller y mezcla."],
  ];
  const panelButtons = [
    ["B3", "Auto Start Engine"], ["B4", "Toggle Parking Brake"],
    ["B5", "Toggle Fuel Pump"], ["B6", "Toggle All Fuel Valves"],
    ["B7", "Decrease Flaps"], ["B8", "Increase Flaps"],
    ["B9", "Toggle Autopilot Master"], ["B10", "Toggle Taxi Lights"],
    ["B11", "Toggle Landing Gear"], ["B12", "Toggle Landing Lights"],
  ];
  return (
    <>
      <section className="page-intro compact">
        <p className="eyebrow">TU EQUIPO DE VUELO</p>
        <h1>
          Mi <em>VelocityOne</em>
        </h1>
        <p>
          Conoce y prepara tu Turtle Beach VelocityOne Flight antes de empezar a
          volar.
        </p>
      </section>
      <section className="hardware-panel">
        <div className="hardware-screen">
          <span className="screen-label">DIAGRAMA INTERACTIVO</span>
          <img className="velocityone-product-image" src={`${import.meta.env.BASE_URL}references/turtlebeach-velocityone-official.png`} alt="Turtle Beach VelocityOne Flight" />
          <div className="hardware-grid" />
          <VelocityOneOverlay />
        </div>
        <div className="hardware-copy">
          <p className="eyebrow">PREPARACIÓN DEL CONTROL</p>
          <h2>Un perfil para cada etapa</h2>
          <p>
            Referencia práctica para el C172 con el perfil Single-Engine Prop.
            Consulta este mapa antes de cambiar una asignación en MSFS.
          </p>
          <div className="profile-card">
            <span>PERFIL ACTIVO</span>
            <strong>Xbox · C172 — Single-Engine Prop</strong>
            <small>Comprueba el mismo perfil en MSFS y en la pantalla del control.</small>
          </div>
          <button className="secondary-button">
            Gestionar perfiles <span>→</span>
          </button>
        </div>
      </section>
      <section className="section-head">
        <div>
          <p className="eyebrow">ÁREAS DEL CONTROL</p>
          <h2>Mapa de controles</h2>
        </div>
      </section>
      <div className="control-cards">
        {zones.map(([number, title, description]) => (
          <article key={title}>
            <span>{number}</span>
            <h3>{title}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>
      <section className="velocityone-defaults" aria-label="Funciones predeterminadas de botones B3 a B12">
        <div>
          <p className="eyebrow">BOTONES BLANCOS DEL CUADRANTE · PERFIL SINGLE-ENGINE PROP</p>
          <h2>Todos los botones B3–B12, en su posición real</h2>
          <p>Las flechas de la foto apuntan a este panel de dos filas. Estas son las funciones predeterminadas del perfil oficial; MSFS 2024 o un perfil personalizado pueden cambiarlas, así que compáralas con <strong>Configuración → Controles</strong> antes de volar.</p>
        </div>
        <div className="velocityone-button-map">
          {panelButtons.map(([button, action]) => (
            <article key={button} className={button === "B4" || button === "B7" || button === "B8" || button === "B9" ? "is-essential" : ""}>
              <b>{button}</b><span>{action}</span>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function Hangar() {
  return (
    <>
      <section className="page-intro compact">
        <p className="eyebrow">FLOTA DE ENTRENAMIENTO</p>
        <h1>
          El <em>hangar</em>
        </h1>
        <p>Explora los aviones que acompañarán tu progresión como piloto.</p>
      </section>
      <div className="aircraft-grid">
        <article className="aircraft-card c172">
          <div className="aircraft-silhouette">✈</div>
          <p className="eyebrow">AIRCRAFT DE ENTRENAMIENTO</p>
          <h2>Cessna 172</h2>
          <p>
            Tu primera plataforma para construir fundamentos de vuelo,
            procedimientos y navegación visual.
          </p>
          <div className="aircraft-tags">
            <span>PISTÓN</span>
            <span>VFR</span>
            <span>DISPONIBLE</span>
          </div>
          <button className="secondary-button">
            Explorar aeronave <span>→</span>
          </button>
        </article>
        <article className="aircraft-card locked-aircraft">
          <div className="aircraft-silhouette">✈</div>
          <p className="eyebrow">PRÓXIMA TRANSICIÓN</p>
          <h2>Airbus A320</h2>
          <p>
            Operación de línea aérea, sistemas, MCDU y procedimientos IFR
            avanzados.
          </p>
          <div className="aircraft-tags">
            <span>JET</span>
            <span>IFR</span>
            <span>BLOQUEADO</span>
          </div>
          <button className="secondary-button" disabled>
            Disponible en Nivel 6
          </button>
        </article>
      </div>
    </>
  );
}

export default App;
