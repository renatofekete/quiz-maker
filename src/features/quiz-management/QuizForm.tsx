import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "@/hooks/useQuiz";
import { PATHS as paths } from "@/routes/paths";
import type { Question } from "@/types";
import { RecycleQuestionsModal } from "./components/RecycleQuestionsModal";

interface QuizFormProps {
  quizId?: string | number;
}

const QuizFormHeader = ({
  title,
  onTitleChange,
  onCancel,
  onSubmit,
  isSubmitting,
  isEdit,
}: any) => (
  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
    <div className="flex-1 w-full">
      <label className="block text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">
        Quiz Title
      </label>
      <input
        type="text"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        placeholder="Enter quiz title..."
        className="w-full text-3xl font-extrabold text-gray-900 border-none bg-transparent focus:ring-0 placeholder-gray-200 p-0"
        autoFocus
      />
    </div>
    <div className="flex items-center space-x-3 w-full md:w-auto">
      <button
        onClick={onCancel}
        type="button"
        className="flex-1 md:flex-none px-6 py-3 text-gray-500 font-bold hover:bg-gray-100 rounded-xl transition-all cursor-pointer"
      >
        Cancel
      </button>
      <button
        onClick={onSubmit}
        disabled={isSubmitting || !title.trim()}
        type="button"
        className="flex-1 md:flex-none px-8 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-100 cursor-pointer flex items-center justify-center min-w-[140px]"
      >
        {isSubmitting && (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
        )}
        {isEdit ? "Update Quiz" : "Create Quiz"}
      </button>
    </div>
  </div>
);

const QuestionItem = ({ question, index, onUpdate, onRemove }: any) => (
  <div className="bg-white rounded-2xl border border-gray-100 p-6 relative group hover:border-indigo-100 transition-all shadow-sm">
    <div className="absolute -left-3 top-6 w-8 h-8 bg-white border border-gray-100 rounded-lg flex items-center justify-center text-sm font-bold text-gray-400 group-hover:text-indigo-500 group-hover:border-indigo-100 transition-all">
      {index + 1}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-4">
      <div>
        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
          Question
        </label>
        <textarea
          value={question.question || ""}
          onChange={(e) => onUpdate({ question: e.target.value })}
          className="w-full bg-gray-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-indigo-100 transition-all resize-none min-h-[100px]"
        />
      </div>
      <div>
        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
          Answer
        </label>
        <textarea
          value={question.answer || ""}
          onChange={(e) => onUpdate({ answer: e.target.value })}
          className="w-full bg-gray-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-indigo-100 transition-all resize-none min-h-[100px]"
        />
      </div>
    </div>
    <button
      onClick={onRemove}
      type="button"
      className="absolute -right-2 -top-2 w-8 h-8 bg-red-50 text-red-500 rounded-full flex items-center justify-center hover:bg-red-100 transition-all opacity-0 group-hover:opacity-100 cursor-pointer shadow-sm border border-red-100"
    >
      &times;
    </button>
  </div>
);

export const QuizForm: React.FC<QuizFormProps> = ({ quizId }) => {
  const navigate = useNavigate();
  const isEdit = !!quizId;
  const { detailsQuery, createMutation, updateMutation } = useQuiz(quizId);
  const { data: initialQuiz, isLoading: isFetching } = detailsQuery;

  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState<Partial<Question>[]>([]);
  const [showRecycleModal, setShowRecycleModal] = useState(false);

  useEffect(() => {
    if (initialQuiz) {
      setTitle(initialQuiz.title);
      setQuestions(initialQuiz.questions);
    }
  }, [initialQuiz]);

  const handleAddQuestion = () => {
    const newId = Math.floor(Math.random() * 1000000);
    setQuestions([...questions, { id: newId, question: "", answer: "" }]);
  };

  const handleUpdateQuestion = (index: number, data: Partial<Question>) => {
    const updated = [...questions];
    updated[index] = { ...updated[index], ...data };
    setQuestions(updated);
  };

  const handleRecycleSelect = (selected: Question[]) => {
    setQuestions([...questions, ...selected]);
    setShowRecycleModal(false);
  };

  const handleSubmit = async () => {
    if (!title.trim()) return;
    const processedQuestions = questions.filter(
      (q) => q.question?.trim() || q.answer?.trim(),
    );

    if (isEdit) {
      await updateMutation.mutateAsync({
        id: quizId!,
        data: { title, questions: processedQuestions as Question[] },
      });
    } else {
      await createMutation.mutateAsync({
        title,
        questions: processedQuestions as Question[],
      });
    }
    navigate(paths.home.getHref());
  };

  if (isEdit && isFetching) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl pb-20">
      <QuizFormHeader
        title={title}
        onTitleChange={setTitle}
        onCancel={() => navigate(paths.home.getHref())}
        onSubmit={handleSubmit}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
        isEdit={isEdit}
      />

      <div className="space-y-6">
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest">
          Questions ({questions.length})
        </h2>
        {questions.map((q, index) => (
          <QuestionItem
            key={q.id || index}
            question={q}
            index={index}
            onUpdate={(data: any) => handleUpdateQuestion(index, data)}
            onRemove={() =>
              setQuestions(questions.filter((_, i) => i !== index))
            }
          />
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 mt-12 py-8 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-100 px-6">
        <button
          onClick={handleAddQuestion}
          type="button"
          className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-indigo-50 text-indigo-600 border border-indigo-100 font-bold rounded-2xl shadow-sm cursor-pointer"
        >
          + Add New Question
        </button>
        <span className="text-gray-300 font-medium hidden sm:block">or</span>
        <button
          onClick={() => setShowRecycleModal(true)}
          type="button"
          className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-green-50 text-green-600 border border-green-100 font-bold rounded-2xl shadow-sm cursor-pointer"
        >
          Recycle Questions
        </button>
      </div>

      {showRecycleModal && (
        <RecycleQuestionsModal
          onClose={() => setShowRecycleModal(false)}
          onSelect={handleRecycleSelect}
          existingQuestionIds={questions
            .map((q) => q.id)
            .filter((id): id is string | number => !!id)}
        />
      )}
    </div>
  );
};
