import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "@/hooks/useQuiz";
import { PATHS as paths } from "@/routes/paths";
import { QuizRow } from "./components/QuizRow";

export const QuizList: React.FC = () => {
  const navigate = useNavigate();
  const { listQuery, deleteMutation } = useQuiz();
  const { data: quizzes, isLoading } = listQuery;

  const handleDelete = (id: number | string) => {
    if (confirm("Are you sure you want to delete this quiz?")) {
      deleteMutation.mutate(id);
    }
  };

  const handlePlay = (id: number | string) => {
    navigate(paths.play.getHref(id));
  };

  const handleEdit = (id: number | string) => {
    navigate(paths.edit.getHref(id));
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className="h-20 bg-gray-100 animate-pulse rounded-xl"
          ></div>
        ))}
      </div>
    );
  }

  if (!quizzes || quizzes.length === 0) {
    return (
      <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">No quizzes found</h3>
        <p className="mt-1 text-gray-500">
          Get started by creating a new quiz.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {quizzes.map((quiz) => (
        <QuizRow
          key={quiz.id}
          quiz={quiz}
          onPlay={handlePlay}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};
