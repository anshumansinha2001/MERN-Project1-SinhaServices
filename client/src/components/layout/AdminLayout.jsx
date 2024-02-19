import { NavLink, Outlet, Navigate } from "react-router-dom";
import { FaUser, FaHome, FaRegListAlt } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { useAuth } from "../../store/auth";

export default function AdminLayout() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <h1>Loading ...</h1>;
  }

  if (!user.isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <center>
        <p>Admin Pannel</p>
      </center>

      <header>
        <div className="container-admin">
          <nav>
            <ul>
              <li>
                <NavLink to="/admin">
                  <FaHome /> Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/users">
                  <FaUser /> users
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/contacts">
                  <FaMessage /> Contact
                </NavLink>
              </li>
              <li>
                <NavLink to="admin/services">
                  <FaRegListAlt /> Services
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <Outlet />
    </>
  );
}
