import { useNavigate, useParams } from "react-router-dom";
import { PATHS as paths } from "@/routes/paths";
import { QuizForm } from "@/features/quiz-management";

const EditQuizPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  if (!id) {
    navigate(paths.home.getHref());
    return null;
  }

  return <QuizForm quizId={id} />;
};

export default EditQuizPage;
