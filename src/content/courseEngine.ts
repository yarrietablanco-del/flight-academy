import curriculum from "../../curriculum/curriculum.json";
import type { CourseLevel, Lesson } from "../types/course";

export type LessonVisual = {
  type: "diagram" | "annotatedDiagram" | "controlHighlight" | "instrumentDiagram" | "flightPathDiagram" | "comparisonDiagram" | "airportDiagram" | "chartExplanation";
  alt: string;
  asset?: string;
  requiresReference?: boolean;
  purpose: string;
  teaches: string;
  userQuestionAnswered: ("dondeMirar" | "queControlTocar" | "queCambioEsperar" | "queErrorEvitar")[];
  tiedToStep: number;
  expectedObservation: string;
  view: "vistaExterior" | "instrumento" | "controlFisico" | "flujo" | "comparacion";
  visualCategory: "conceptual" | "reference";
  fidelity: "conceptual" | "recreated-faithful" | "real";
  recognitionGoal: string;
  recognizedElements: string[];
  actionAfterViewing: string;
  coverage?: ("cockpit" | "instrument" | "hardware" | "chart" | "exteriorView" | "airport")[];
  quality?: { sourceWidth: number; sourceHeight: number; intendedDisplayWidth: number; supportsZoom: boolean; detailTarget: string };
};

export type LessonDocument = {
  metadata: { id: string; title: string; subtitle: string; objective: string; estimatedTime: string; prerequisites: string[]; level: number; module: string; visualStandardVersion?: 2 | 3 };
  whyItMatters: string;
  concepts: { term: string; meaning: string }[];
  steps: { number: number; title: string; instruction: string; explanation: string; expectedResult: string; simulatorAction: string; visual: LessonVisual; referenceVisuals?: LessonVisual[]; warning?: string; tip?: string }[];
  practice: { title: string; scenario: string; task: string; successSignal: string };
  commonMistakes: { mistake: string; recovery: string }[];
  checklist: string[];
  quiz: { question: string; options: string[]; answer: string; explanation: string }[];
  completionCriteria: string[];
  sources: { title: string; url: string; verified: boolean }[];
};

type CurriculumLesson = { id: string; order: number; title: string; objective: string; prerequisites: string[]; status: Lesson["editorialStatus"] };
type CurriculumModule = { module: string; lessons: CurriculumLesson[] };
type CurriculumLevel = { level: number; title: string; modules: CurriculumModule[] };

const documents = import.meta.glob<LessonDocument>("../../content/lessons/*.json", { eager: true, import: "default" });
const assets = import.meta.glob<string>("../../content/assets/*", { eager: true, query: "?url", import: "default" });

function documentFor(id: string) {
  return documents[`../../content/lessons/${id}.json`];
}

export function visualUrl(asset?: string) {
  if (!asset) return undefined;
  if (asset.startsWith("public/")) return `${import.meta.env.BASE_URL}${asset.slice("public/".length)}`;
  return assets[`../../${asset}`];
}

export const course: CourseLevel[] = (curriculum.levels as CurriculumLevel[]).map((level) => ({
  id: `level-${level.level}`,
  number: level.level,
  title: level.title,
  description: `Nivel ${level.level}: ${level.title}.`,
  modules: level.modules.map((module) => ({
    id: module.module,
    title: module.module,
    description: `Módulo: ${module.module}.`,
    lessons: module.lessons.map((lesson) => {
      const document = documentFor(lesson.id);
      return {
        id: lesson.id,
        title: lesson.title,
        description: lesson.objective,
        level: level.level,
        moduleTitle: module.module,
        estimatedTime: document?.metadata.estimatedTime ?? "Próximamente",
        objectives: [lesson.objective],
        sections: [],
        checklist: document?.checklist ?? [],
        exercise: { title: "Contenido editorial pendiente", instructions: "Esta lección se habilitará cuando pase la validación de contenido." },
        prerequisites: lesson.prerequisites,
        editorialStatus: lesson.status,
        document,
      } satisfies Lesson;
    }),
  })),
}));

export const lessonOrder = course.flatMap((level) => level.modules.flatMap((module) => module.lessons)).map((lesson) => lesson.id);
export const getLesson = (id: string) => course.flatMap((level) => level.modules).flatMap((module) => module.lessons).find((lesson) => lesson.id === id) ?? course[0].modules[0].lessons[0];
