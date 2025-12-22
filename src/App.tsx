import { createBrowserRouter, Link, Outlet } from "react-router";
import { RouterProvider } from "react-router/dom";

import Home from "./pages/Home";
import Completed from "./pages/Completed";
import InCompleted from "./pages/InCompleted";
import Counter from "./pages/Counter";
import All from "./pages/All";

import { ThemeToggler } from "./components/ThemeToggler";
import { useTheme } from "./stores/useTheme";
import Category from "./pages/Category";

const NavBar = () => {
  const { isDark } = useTheme();
  return (
    <div className={`nav-container ${isDark ? "app-dark" : "app-light"}`}>
      <Link to="/">📋Oraganizer</Link>

      <div className="nav-list">
        <Link to="/category">Category</Link>
        <Link to="/all">All</Link>
        <Link to="/completed">Completed</Link>
        <Link to="/incompleted">InCompleted</Link>
        <Link to="/counter">Counter</Link>

        <ThemeToggler />
      </div>
    </div>
  );
};

const Body = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
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
