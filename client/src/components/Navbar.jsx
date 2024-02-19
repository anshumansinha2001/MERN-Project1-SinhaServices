import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../store/auth";

export default function Navbar() {
  const { isLoggedIn, user } = useAuth();

  return (
    <>
      <header>
        <div className="logo-brand">
          <NavLink to="/">AnshumanSinha</NavLink>
        </div>

        <nav>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/service">Services</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
            {isLoggedIn ? (
              <li>
                <NavLink to="/logout">Logout</NavLink>
              </li>
            ) : (
              <>
                <li>
                  <NavLink to="/register">Register</NavLink>
                </li>
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
              </>
            )}
            {user.isAdmin ? (
              <li>
                <NavLink to="/admin">Admin</NavLink>
              </li>
            ) : null}
          </ul>
        </nav>
      </header>
    </>
  );
}
