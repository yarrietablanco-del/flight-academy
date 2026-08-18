import { useMemo, useState } from "react";
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
  const [menuOpen, setMenuOpen] = useState(false);
  const {
    statuses,
    completeLesson,
    startLesson,
    resetProgress,
    exportProgress,
    importProgress,
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
            <Course statuses={statuses} openLesson={openLesson} />
          )}
          {view === "velocityone" && <VelocityOne />}
          {view === "hangar" && <Hangar />}
          {view === "lesson" && selectedLesson && (
            <LessonView
              lesson={selectedLesson}
              status={statuses[selectedLesson.id]}
              onComplete={() => completeLesson(selectedLesson.id)}
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
}: {
  statuses: Record<string, LessonStatus>;
  openLesson: (lesson: Lesson) => void;
}) {
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
                        disabled={status === "locked"}
                        className={`lesson-row ${status}`}
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

function LessonIllustration({ lessonId }: { lessonId: string }) {
  const illustrations: Record<
    string,
    { src: string; alt: string; caption: string }
  > = {
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
    "airport-map-basics": {
      src: `${import.meta.env.BASE_URL}airport-ground-map.svg`,
      alt: "Mapa ilustrado de plataforma, calle de rodaje, pista y línea de espera",
      caption: "No ruedes hasta poder distinguir estas cuatro zonas desde tu posición.",
    },
    "airport-radio-basics": {
      src: `${import.meta.env.BASE_URL}airport-ground-map.svg`,
      alt: "Guía visual del panel Comunicaciones de Microsoft Flight Simulator",
      caption: "La radio básica va antes del taxi: solicita la ruta y aprende a detenerte en Hold Short.",
    },
    "c172-cold-dark": {
      src: `${import.meta.env.BASE_URL}c172-start-flow.svg`,
      alt: "Flujo visual de preparación y arranque del Cessna 172 G1000",
      caption: "Lee el flujo completo primero; después realiza un paso a la vez en cabina.",
    },
    "c172-before-start": {
      src: `${import.meta.env.BASE_URL}c172-start-flow.svg`,
      alt: "Flujo visual de preparación y arranque del Cessna 172 G1000",
      caption: "En esta lección completa únicamente las tarjetas 1 y 2; no gires la llave todavía.",
    },
    "c172-engine-start": {
      src: `${import.meta.env.BASE_URL}c172-start-flow.svg`,
      alt: "Flujo visual de preparación y arranque del Cessna 172 G1000",
      caption: "Sigue las tarjetas 3 y 4; la tarjeta 5 pertenece a la lección siguiente.",
    },
    "c172-after-start": {
      src: `${import.meta.env.BASE_URL}c172-start-flow.svg`,
      alt: "Flujo visual de preparación y arranque del Cessna 172 G1000",
      caption: "Después del arranque, usa la tarjeta 5 antes de pensar en rodar.",
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

function DetailedLessonView({
  lesson,
  status,
  onComplete,
  onBack,
}: {
  lesson: Lesson;
  status: LessonStatus;
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
  onComplete,
  onBack,
}: {
  lesson: Lesson;
  status: LessonStatus;
  onComplete: () => void;
  onBack: () => void;
}) {
  const lesson = sourceLesson as Lesson & {
    flightSetup: NonNullable<Lesson['flightSetup']>;
  };
  if (!lesson.flightSetup)
    return (
      <DetailedLessonView
        lesson={lesson}
        status={status}
        onComplete={onComplete}
        onBack={onBack}
      />
    );
  return (
    <DetailedLessonView
      lesson={lesson}
      status={status}
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
    "Yoke",
    "Throttle Quadrant",
    "Trim Wheel",
    "Flaps",
    "Mixture",
    "Propeller",
    "Rudder",
    "Buttons",
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
          <div className="control yoke">YOKE</div>
          <div className="control throttle">
            THROTTLE
            <br />
            QUADRANT
          </div>
          <div className="control trim">TRIM</div>
          <div className="control flaps">FLAPS</div>
          <div className="control buttons">BUTTONS</div>
          <div className="hardware-grid" />
        </div>
        <div className="hardware-copy">
          <p className="eyebrow">PREPARACIÓN DEL CONTROL</p>
          <h2>Un perfil para cada etapa</h2>
          <p>
            Esta área está preparada para incorporar diagramas, perfiles y
            valores verificados de sensibilidad más adelante.
          </p>
          <div className="profile-card">
            <span>PERFIL ACTIVO</span>
            <strong>C172 — Training</strong>
            <small>Configuración pendiente de verificación</small>
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
        {zones.map((zone, i) => (
          <article key={zone}>
            <span>{String(i + 1).padStart(2, "0")}</span>
            <h3>{zone}</h3>
            <p>Disponible para configurar y practicar en próximas lecciones.</p>
          </article>
        ))}
      </div>
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
