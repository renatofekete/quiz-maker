import { useNavigate } from "react-router-dom";
import { QuizList } from "@/features/quiz-management";
import { PATHS as paths } from "@/routes/paths";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Quiz Maker
          </h1>
          <p className="text-gray-500 mt-2 text-lg">
            Create and distribute your quizzes with ease.
          </p>
        </div>
        <button
          onClick={() => navigate(paths.create.getHref())}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-xl hover:shadow-indigo-200 cursor-pointer flex items-center group active:scale-95"
        >
          <span className="mr-3 text-2xl group-hover:rotate-90 transition-transform inline-block">
            +
          </span>
          Create New Quiz
        </button>
      </div>

      <QuizList />
    </div>
  );
};

export default HomePage;
