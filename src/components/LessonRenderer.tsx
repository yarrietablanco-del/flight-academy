import { useState } from "react";
import type { ReactNode } from "react";
import type { LessonDocument } from "../content/courseEngine";
import { visualUrl } from "../content/courseEngine";
import type { Lesson, LessonStatus } from "../types/course";
import { Checklist } from "./Checklist";

type Props = { lesson: Lesson; document?: LessonDocument; status: LessonStatus; onBack: () => void; onComplete: () => void; feedback: ReactNode };

export function LessonRenderer({ lesson, document, status, onBack, onComplete, feedback }: Props) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  if (!document) return <>
    <button className="back-button" onClick={onBack}>← Volver al entrenamiento</button>
    <section className="lesson-hero"><p className="eyebrow">NIVEL {lesson.level} · {lesson.moduleTitle}</p><h1>{lesson.title}</h1><p>{lesson.description}</p></section>
    <section className="lesson-section"><p className="eyebrow">CONTENIDO EN PRODUCCIÓN</p><h2>Lección planificada</h2><p>Esta lección figura en el currículo, pero aún no tiene un documento validado. No presenta instrucciones incompletas como si fueran un procedimiento.</p></section>
  </>;
  return <>
    <button className="back-button" onClick={onBack}>← Volver al entrenamiento</button>
    <section className="lesson-hero"><p className="eyebrow">NIVEL {lesson.level} · {lesson.moduleTitle}</p><h1>{document.metadata.title}</h1><p>{document.metadata.subtitle}</p><div className="lesson-meta">◦ {document.metadata.estimatedTime} · Estado: {status === "completed" ? "Completada" : "Disponible"}</div></section>
    <div className="lesson-layout"><article className="lesson-content">
      <section className="objective-panel"><span>◎</span><div><p className="eyebrow">OBJETIVO</p><h2>Al terminar podrás</h2><p>{document.metadata.objective}</p></div></section>
      <section className="lesson-section"><p className="eyebrow">POR QUÉ IMPORTA</p><h2>Antes de hacerlo</h2><p>{document.whyItMatters}</p></section>
      <section className="lesson-section"><p className="eyebrow">CONCEPTOS</p><h2>Palabras que vas a usar</h2><dl className="concept-list">{document.concepts.map((concept) => <div key={concept.term}><dt>{concept.term}</dt><dd>{concept.meaning}</dd></div>)}</dl></section>
      <section className="lesson-section"><p className="eyebrow">PASO A PASO EN MSFS</p><h2>Hazlo en este orden</h2>{document.steps.map((step) => <div className="lesson-step" key={step.number}><p className="eyebrow">PASO {step.number}</p><h3>{step.title}</h3><p><strong>Haz:</strong> {step.instruction}</p><p>{step.explanation}</p>{renderVisual(step.visual)}<p><strong>En MSFS:</strong> {step.simulatorAction}</p><p><strong>Debes ver:</strong> {step.expectedResult}</p>{step.warning && <p className="lesson-warning"><strong>Atención:</strong> {step.warning}</p>}{step.tip && <p className="lesson-tip"><strong>Consejo:</strong> {step.tip}</p>}</div>)}</section>
      <section className="lesson-section exercise"><p className="eyebrow">PRÁCTICA</p><h2>{document.practice.title}</h2><p><strong>Situación:</strong> {document.practice.scenario}</p><p>{document.practice.task}</p><p><strong>Señal de éxito:</strong> {document.practice.successSignal}</p></section>
      <section className="lesson-section"><p className="eyebrow">ERRORES COMUNES</p><h2>Si algo sale distinto</h2>{document.commonMistakes.map((item) => <p key={item.mistake}><strong>{item.mistake}</strong><br />{item.recovery}</p>)}</section>
      <section className="lesson-section"><p className="eyebrow">COMPRUEBA LO APRENDIDO</p><h2>Mini evaluación</h2>{document.quiz.map((item, index) => <div className="quiz-item" key={item.question}><p><strong>{item.question}</strong></p>{item.options.map((option) => <label key={option}><input type="radio" name={`quiz-${index}`} checked={answers[index] === option} onChange={() => setAnswers({ ...answers, [index]: option })} /> {option}</label>)}{answers[index] && <p className={answers[index] === item.answer ? "quiz-correct" : "lesson-warning"}>{answers[index] === item.answer ? "Correcto. " : "Aún no. "}{item.explanation}</p>}</div>)}</section>
      <section className="lesson-section"><p className="eyebrow">CRITERIOS DE FINALIZACIÓN</p><h2>Cuándo marcarla completa</h2><ul>{document.completionCriteria.map((criterion) => <li key={criterion}>{criterion}</li>)}</ul></section>
      <section className="lesson-section"><p className="eyebrow">FUENTES</p><h2>Referencias</h2><ul>{document.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.title}</a>{source.verified ? " · verificada" : " · requiere verificación"}</li>)}</ul></section>{feedback}
    </article><aside className="lesson-sidebar"><Checklist title="Checklist de la lección" items={document.checklist} /><button className={status === "completed" ? "complete-button done" : "complete-button"} onClick={onComplete}>{status === "completed" ? "✓ Lección completada" : "Completar lección"}</button></aside></div>
  </>;
}

function renderVisual(visual: LessonDocument["steps"][number]["visual"]) {
  const source = visualUrl(visual.asset);
  if (source) return <figure className="lesson-illustration"><img src={source} alt={visual.alt} /><figcaption>{visual.alt}</figcaption></figure>;
  return <div className="reference-required"><strong>Referencia necesaria</strong><p>{visual.alt}. Esta visual requiere comprobar una fuente real antes de dibujarla.</p></div>;
}
