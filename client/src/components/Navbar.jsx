import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex items-center justify-between border-b px-6 py-4">
      <NavLink to="/" className="text-xl font-bold">
        Task Manager
      </NavLink>

      <div className="flex gap-4">
        <NavLink to="/tasks">Tasks</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/register">Register</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;