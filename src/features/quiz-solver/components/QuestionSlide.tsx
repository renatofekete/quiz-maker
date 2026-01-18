import React, { useState, useEffect } from "react";
import type { Question } from "@/types";

interface QuestionSlideProps {
  question: Question;
  index: number;
  total: number;
}

export const QuestionSlide: React.FC<QuestionSlideProps> = ({
  question,
  index,
  total,
}) => {
  const [isRevealed, setIsRevealed] = useState(false);
  useEffect(() => setIsRevealed(false), [question.id]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6 flex justify-between items-center text-sm font-medium text-gray-400 uppercase tracking-wider">
        <span>
          Question {index + 1} of {total}
        </span>
        <div className="h-1.5 w-32 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-500 transition-all duration-300"
            style={{ width: `${((index + 1) / total) * 100}%` }}
          />
        </div>
      </div>
      <div className="bg-white rounded-3xl shadow-xl shadow-indigo-100/50 border border-gray-100 p-8 md:p-12 min-h-[300px] flex flex-col justify-center text-center transition-all">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
          {question.question}
        </h2>
        <div className="mt-12">
          {isRevealed ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <p className="text-gray-400 text-sm font-semibold uppercase tracking-widest mb-2">
                Answer
              </p>
              <p className="text-2xl font-bold text-indigo-600 bg-indigo-50 py-4 px-6 rounded-2xl inline-block">
                {question.answer}
              </p>
            </div>
          ) : (
            <button
              onClick={() => setIsRevealed(true)}
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg cursor-pointer transition-all active:scale-95"
            >
              Reveal Answer
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
