import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { quizService } from "@/api";
import type { QuizCreateRequest } from "@/types";

export const useQuiz = (id?: number | string) => {
  const queryClient = useQueryClient();

  const listQuery = useQuery({
    queryKey: ["quizzes"],
    queryFn: () => quizService.getAll(),
  });

  const detailsQuery = useQuery({
    queryKey: ["quiz", String(id)],
    queryFn: () => quizService.getById(id!),
    enabled: !!id,
  });

  const createMutation = useMutation({
    mutationFn: quizService.create,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["quizzes"] }),
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number | string;
      data: Partial<QuizCreateRequest>;
    }) => quizService.update(id, data),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["quizzes", String(id)],
        refetchType: "all",
      }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number | string) => quizService.delete(id),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["quizzes", String(id)],
        refetchType: "all",
      }),
  });

  return {
    listQuery,
    detailsQuery,
    createMutation,
    updateMutation,
    deleteMutation,
  };
};
