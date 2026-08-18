export type LessonStatus = "locked" | "available" | "in-progress" | "completed";
export type LessonSection = {
  kind:
    | "APRENDE"
    | "ENTIENDE"
    | "PRUÉBALO EN MSFS"
    | "PROCEDIMIENTO"
    | "ERRORES COMUNES";
  title: string;
  content: string;
};
export type FlightSetup = {
  mode: string;
  aircraft: string;
  airport: string;
  position: string;
  altitude: string;
  weather: string;
  time: string;
  note: string;
};
export type LessonContinuity = { start: string; finish: string; next: string };
export type Lesson = {
  id: string;
  title: string;
  description: string;
  level: number;
  moduleTitle: string;
  estimatedTime: string;
  objectives: string[];
  sections: LessonSection[];
  checklist: string[];
  exercise: { title: string; instructions: string };
  prerequisites: string[];
  flightSetup?: FlightSetup;
  continuity?: LessonContinuity;
};
export type CourseModule = {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
};
export type CourseLevel = {
  id: string;
  number: number;
  title: string;
  description: string;
  modules: CourseModule[];
};
