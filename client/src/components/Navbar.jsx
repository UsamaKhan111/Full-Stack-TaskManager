import { NavLink } from "react-router-dom";

function Navbar() {
  const linkClass = ({ isActive }) =>
    `text-sm transition ${
      isActive
        ? "font-medium text-gray-900"
        : "text-gray-500 hover:text-gray-900"
    }`;

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <NavLink to="/" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-900 text-sm font-semibold text-white">
            T
          </span>
          <span className="text-lg font-semibold tracking-tight text-gray-900">
            Task Manager
          </span>
        </NavLink>

        <div className="flex items-center gap-5 sm:gap-7">
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>

          <NavLink to="/tasks" className={linkClass}>
            Tasks
          </NavLink>

          <div className="hidden h-5 border-l border-gray-200 sm:block" />

          <NavLink to="/login" className={linkClass}>
            Login
          </NavLink>

          <NavLink
            to="/register"
            className="rounded-md bg-gray-900 px-3.5 py-2 text-sm font-medium text-white transition hover:bg-gray-700"
          >
            Register
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
