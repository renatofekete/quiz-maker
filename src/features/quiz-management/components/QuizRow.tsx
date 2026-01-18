import React from "react";
import type { Quiz } from "@/types";

interface QuizRowProps {
  quiz: Quiz;
  onPlay: (id: number | string) => void;
  onEdit: (id: number | string) => void;
  onDelete: (id: number | string) => void;
}

export const QuizRow: React.FC<QuizRowProps> = ({
  quiz,
  onPlay,
  onEdit,
  onDelete,
}) => {
  return (
    <div
      onClick={() => onEdit(quiz.id)}
      className="bg-white rounded-xl border border-gray-100 p-4 hover:border-indigo-200 hover:shadow-sm transition-all cursor-pointer group flex flex-col sm:flex-row sm:items-center justify-between gap-4"
    >
      <div className="flex-1">
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
          {quiz.title}
        </h3>
        <p className="text-gray-500 text-sm mt-1">
          {quiz.questions.length} questions
        </p>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPlay(quiz.id);
          }}
          className="px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm font-semibold cursor-pointer whitespace-nowrap"
        >
          Play
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(quiz.id);
          }}
          className="px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors text-sm font-semibold cursor-pointer whitespace-nowrap"
        >
          Delete
        </button>
      </div>
    </div>
  );
};
