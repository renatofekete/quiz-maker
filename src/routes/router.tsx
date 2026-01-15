import { PATHS } from "@/routes/paths";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import CreateQuizPage from "@/pages/CreateQuizPage";
import EditQuizPage from "@/pages/EditQuizPage";
import PlayQuizPage from "@/pages/PlayQuizPage";

export const router = createBrowserRouter([
  {
    path: PATHS.home.path,
    element: <HomePage />,
  },
  {
    path: PATHS.create.path,
    element: <CreateQuizPage />,
  },
  {
    path: PATHS.edit.path,
    element: <EditQuizPage />,
  },
  {
    path: PATHS.play.path,
    element: <PlayQuizPage />,
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
