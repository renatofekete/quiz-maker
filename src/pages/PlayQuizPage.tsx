import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PATHS } from "../routes/paths";

const PlayQuizPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  if (!id) {
    navigate(PATHS.home.path);
    return null;
  }

  return (
    <div>
      <h1>Welcome to the Play Quiz Page</h1>
      <p>Quiz play page</p>
      <p>Quiz ID: {id}</p>
    </div>
  );
};

export default PlayQuizPage;
