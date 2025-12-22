import { createBrowserRouter, Outlet } from "react-router";
import { RouterProvider } from "react-router/dom";

import All from "./pages/All";
import Completed from "./pages/Completed";
import Counter from "./pages/Counter";
import Home from "./pages/Home";
import InCompleted from "./pages/InCompleted";

import Header from "./components/Header";
import Category from "./pages/Category";
import { Stats } from "./components/Stats";

const Body = () => {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />
      <div className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth pb-32">
        <Outlet />
      </div>
      <Stats />
    </div>
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
          path: "/all",
          element: <All />,
        },
        {
          path: "/completed",
          element: <Completed />,
        },
        {
          path: "/incompleted",
          element: <InCompleted />,
        },
        {
          path: "/counter",
          element: <Counter />,
        },
        {
          path: "/category",
          element: <Category />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
