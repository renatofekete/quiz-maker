// import { httpService as api } from "@/api/httpService";
import { localStorageService as api } from "@/api/localStorageService";
import type { Quiz, QuizCreateRequest } from "@/types";

export const quizService = {
  getAll: () => {
    return api.get<Quiz[]>("/quizzes");
  },
  getById: (id: number | string) => {
    return api.get<Quiz>(`/quizzes/${id}`);
  },
  create: (data: QuizCreateRequest) => {
    return api.post<Quiz>("/quizzes", data);
  },
  update: (id: number | string, data: Partial<QuizCreateRequest>) => {
    return api.put<Quiz>(`/quizzes/${id}`, data);
  },
  delete: (id: number | string) => {
    return api.delete<void>(`/quizzes/${id}`);
  },
};
