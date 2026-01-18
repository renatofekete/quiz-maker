import React from "react";
import { useNavigate } from "react-router-dom";
import { PATHS as paths } from "@/routes/paths";

interface QuizResultsProps {
  quizTitle: string;
  totalQuestions: number;
}

export const QuizResults: React.FC<QuizResultsProps> = ({
  quizTitle,
  totalQuestions,
}) => {
  const navigate = useNavigate();

  return (
    <div className="text-center py-12 px-6">
      <div className="mb-8 inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full text-green-600">
        <svg
          className="w-12 h-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
        Quiz Completed!
      </h2>
      <p className="text-xl text-gray-500 mb-10 max-w-md mx-auto">
        You've reached the end of{" "}
        <span className="font-bold text-gray-900">{quizTitle}</span>. You've
        answered{" "}
        <span className="font-bold text-gray-900">{totalQuestions}</span>{" "}
        questions.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={() => window.location.reload()}
          className="w-full sm:w-auto px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-indigo-200 cursor-pointer"
        >
          Solve Again
        </button>
        <button
          onClick={() => navigate(paths.home.getHref())}
          className="w-full sm:w-auto px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold transition-all cursor-pointer"
        >
          Back to List
        </button>
      </div>
    </div>
  );
};
