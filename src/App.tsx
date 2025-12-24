import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createBrowserRouter, Outlet } from "react-router";
import { RouterProvider } from "react-router/dom";

import Home from "./pages/Home";

// import Header from "./components/Header";
// import { Stats } from "./components/Stats";
import { AppSidebar } from "./components/Sidebar";
import Category from "./pages/Category";
import Trash from "./pages/Trash";
import MyTasks from "./pages/MyTasks";

const Body = () => {
  return (
    <AppSidebar>
      <div className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth">
        <Outlet />
      </div>
    </AppSidebar>
  );
};

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Body />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/my-tasks",
          element: <MyTasks />,
        },
        {
          path: "/category",
          element: <Category />,
        },
        {
          path: "/trash",
          element: <Trash />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}

export default App;
