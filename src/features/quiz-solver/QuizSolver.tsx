import React, { useState } from "react";
import { useQuiz } from "@/hooks/useQuiz";
import { QuestionSlide } from "./components/QuestionSlide";
import { QuizResults } from "./components/QuizResults";

interface QuizSolverProps {
  quizId: string | number;
}

export const QuizSolver: React.FC<QuizSolverProps> = ({ quizId }) => {
  const { detailsQuery } = useQuiz(quizId);
  const { data: quiz, isLoading, error } = detailsQuery;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-500 font-medium">
          Loading quiz content...
        </p>
      </div>
    );
  }

  if (error || !quiz) {
    return (
      <div className="text-center py-20 bg-red-50 rounded-2xl border border-red-100">
        <h3 className="text-lg font-bold text-red-900">Failed to load quiz</h3>
        <p className="mt-1 text-red-600">
          The quiz you're looking for might have been deleted.
        </p>
      </div>
    );
  }

  const handleNext = () => {
    if (currentIndex < quiz.questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  if (isFinished) {
    return (
      <QuizResults
        quizTitle={quiz.title}
        totalQuestions={quiz.questions.length}
      />
    );
  }

  return (
    <div className="w-full">
      <header className="mb-12 text-center">
        <h1 className="text-xl font-bold text-gray-400 capitalize">
          {quiz.title}
        </h1>
      </header>

      <div className="relative">
        <QuestionSlide
          question={quiz.questions[currentIndex]}
          index={currentIndex}
          total={quiz.questions.length}
        />

        <div className="mt-10 flex items-center justify-between max-w-2xl mx-auto px-4">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`flex items-center px-4 py-2 font-bold transition-all rounded-lg ${
              currentIndex === 0
                ? "text-gray-300 cursor-not-allowed"
                : "text-gray-600 hover:bg-gray-100 cursor-pointer"
            }`}
          >
            ← Previous
          </button>

          <button
            onClick={handleNext}
            className="flex items-center px-6 py-3 bg-gray-900 hover:bg-black text-white rounded-xl font-bold transition-all shadow-lg active:scale-95 cursor-pointer"
          >
            {currentIndex === quiz.questions.length - 1
              ? "Finish Quiz"
              : "Next Question →"}
          </button>
        </div>
      </div>
    </div>
  );
};
