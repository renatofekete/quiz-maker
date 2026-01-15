import { useNavigate, useParams } from "react-router-dom";
import { PATHS } from "@/routes";

const EditQuizPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  if (!id) {
    navigate(PATHS.home.path);
    return null;
  }
  return (
    <div>
      <h1>Welcome to the Edit Quiz Page</h1>
      <p>Quiz editing page</p>
      <p>Quiz ID: {id}</p>
    </div>
  );
};

export default EditQuizPage;
