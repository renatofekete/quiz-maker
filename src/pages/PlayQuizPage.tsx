import { useNavigate, useParams } from "react-router-dom";
import { PATHS as paths } from "@/routes/paths";
import { QuizSolver } from "@/features/quiz-solver";

const PlayQuizPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  if (!id) {
    navigate(paths.home.getHref());
    return null;
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl min-h-[80vh] flex flex-col justify-center">
      <QuizSolver quizId={id} />
    </div>
  );
};

export default PlayQuizPage;
