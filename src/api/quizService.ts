import { httpService } from "@/api/httpService";
import type { Quiz, QuizCreateRequest } from "@/types";
export const quizService = {
  getAll: () => {
    return httpService.get<Quiz[]>("/quizzes");
  },
  getById: (id: number | string) => {
    return httpService.get<Quiz>(`/quizzes/${id}`);
  },
  create: (data: QuizCreateRequest) => {
    return httpService.post<Quiz>("/quizzes", data);
  },
  update: (id: number | string, data: Partial<QuizCreateRequest>) => {
    return httpService.put<Quiz>(`/quizzes/${id}`, data);
  },
  delete: (id: number | string) => {
    return httpService.delete<void>(`/quizzes/${id}`);
  },
};
