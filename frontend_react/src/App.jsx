import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Main from "./layout/Main";
import { action as postCrateAction } from "./components/PostForm";
import { action as postUpdateAction } from "./components/PostForm";
import Posts, { loader as postsLoader } from "./pages/Posts";
import Details, {
  loader as detailsLoader,
  action as deleteAction,
} from "./pages/Details";
import EditPost from "./pages/EditPost";
import Error from "./pages/Error";
import Create from "./pages/Create";
import Auth, { action as AuthAction } from "./pages/Auth";
import { loader as logoutLoader } from "./pages/Logout";
import { checkTokenLoader, tokenLoader } from "./util/auth";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      errorElement: <Error />,
      id: "root",
      loader: tokenLoader,
      children: [
        {
          index: true,
          element: <Posts />,
          loader: postsLoader,
        },
        {
          path: "/create-post",
          element: <Create />,
          action: postCrateAction,
          loader: checkTokenLoader,
        },
        {
          path: "/auth",
          element: <Auth />,
          action: AuthAction,
        },
        {
          path: "/logout",
          loader: logoutLoader,
        },
        {
          path: ":id",
          id: "post-details",
          loader: detailsLoader,
          children: [
            {
              index: true,
              element: <Details />,
              action: deleteAction,
            },
            {
              path: "edit-post",
              element: <EditPost />,
              action: postUpdateAction,
              loader: checkTokenLoader,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
