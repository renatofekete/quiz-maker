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

  if (isLoading)
    return (
      <div className="flex justify-center h-64 items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  if (error || !quiz)
    return (
      <div className="text-center py-20 bg-red-50 rounded-2xl border border-red-100">
        <h3 className="text-lg font-bold text-red-900">Failed to load quiz</h3>
      </div>
    );

  const handleNext = () =>
    currentIndex < (quiz?.questions?.length ?? 0) - 1
      ? setCurrentIndex((prev: number) => prev + 1)
      : setIsFinished(true);

  if (isFinished)
    return (
      <QuizResults
        quizTitle={quiz.title}
        totalQuestions={quiz.questions.length}
      />
    );

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
            onClick={() => setCurrentIndex((p: number) => p - 1)}
            disabled={currentIndex === 0}
            className={`px-4 py-2 font-bold transition-all ${currentIndex === 0 ? "text-gray-300" : "text-gray-600 hover:bg-gray-100 cursor-pointer"}`}
          >
            ← Previous
          </button>
          <button
            onClick={handleNext}
            className="px-6 py-3 bg-gray-900 hover:bg-black text-white rounded-xl font-bold shadow-lg cursor-pointer transition-all active:scale-95"
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
