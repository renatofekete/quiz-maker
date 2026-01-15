import type { Question } from "@/types/Question";

export interface Quiz {
  id: number | string;
  title: string;
  questions: Question[];
}

export type QuizCreateRequest = Omit<Quiz, "id">;
