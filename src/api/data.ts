import type { Quiz, Question } from "@/types";

export const MOCK_QUESTIONS: Question[] = [
  { id: 1, question: "Koji je glavni grad Hrvatske?", answer: "Zagreb" },
  {
    id: 2,
    question: "Tko je napisao 'Povratak Filipa Latinovicza'?",
    answer: "Miroslav Krleža",
  },
];

export const MOCK_QUIZZES: Quiz[] = [
  {
    id: 1,
    title: "Enterwell Opće Znanje",
    questions: [MOCK_QUESTIONS[0], MOCK_QUESTIONS[1]],
  },
];
