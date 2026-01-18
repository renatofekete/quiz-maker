import React, { useState, useEffect } from "react";
import { questionService } from "@/api";
import type { Question } from "@/types";

interface RecycleQuestionsModalProps {
  onClose: () => void;
  onSelect: (questions: Question[]) => void;
  existingQuestionIds: (string | number)[];
}

export const RecycleQuestionsModal: React.FC<RecycleQuestionsModalProps> = ({
  onClose,
  onSelect,
  existingQuestionIds,
}) => {
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await questionService.getAll();
        const filtered = data.filter(
          (q: Question) => !existingQuestionIds.includes(q.id),
        );
        setAllQuestions(filtered);
      } catch (err) {
        console.error("Failed to load questions", err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [existingQuestionIds]);

  const toggleSelect = (id: string | number) => {
    setSelectedIds((prev: (string | number)[]) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleConfirm = () => {
    const selected = allQuestions.filter((q: Question) =>
      selectedIds.includes(q.id),
    );
    onSelect(selected);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="bg-white rounded-3xl w-full max-w-2xl relative z-10 shadow-2xl flex flex-col max-h-[80vh]">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Recycle Questions
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Pick from questions you've used before.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-all cursor-pointer"
          >
            <svg
              className="w-6 h-6 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {loading ? (
            <div className="text-center py-10 text-gray-400">
              Loading questions pool...
            </div>
          ) : allQuestions.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              No previous questions found to recycle.
            </div>
          ) : (
            allQuestions.map((q) => (
              <div
                key={q.id}
                onClick={() => toggleSelect(q.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-4 ${
                  selectedIds.includes(q.id)
                    ? "border-indigo-400 bg-indigo-50/50"
                    : "border-gray-100 hover:border-indigo-200 bg-white"
                }`}
              >
                <div
                  className={`mt-1 w-5 h-5 rounded border flex items-center justify-center transition-all ${
                    selectedIds.includes(q.id)
                      ? "bg-indigo-500 border-indigo-500"
                      : "bg-white border-gray-300"
                  }`}
                >
                  {selectedIds.includes(q.id) && (
                    <svg
                      className="w-3 h-3 text-white"
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
                  )}
                </div>
                <div>
                  <p className="font-bold text-gray-900 mb-1 leading-tight">
                    {q.question}
                  </p>
                  <p className="text-xs text-indigo-600 font-bold uppercase tracking-widest">
                    {q.answer}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-6 border-t border-gray-100 flex justify-end items-center gap-4 bg-gray-50/50 rounded-b-3xl">
          <button
            onClick={onClose}
            className="px-6 py-2 text-gray-500 font-bold hover:text-gray-700 transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={selectedIds.length === 0}
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 transform active:scale-95 text-white font-bold rounded-xl transition-all shadow-lg cursor-pointer"
          >
            Add {selectedIds.length}{" "}
            {selectedIds.length === 1 ? "Question" : "Questions"}
          </button>
        </div>
      </div>
    </div>
  );
};
