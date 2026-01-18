import { localStorageService as api } from "@/api/localStorageService";
import type { Question } from "@/types";

export const questionService = {
  getAll: () => {
    return api.get<Question[]>("/questions");
  },
};
