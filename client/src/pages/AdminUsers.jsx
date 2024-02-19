import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { Link } from "react-router-dom";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  const { authorizationToken, API } = useAuth();

  const getAllUserData = async () => {
    try {
      const response = await fetch(`${API}/api/admin/users`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      const data = await response.json();
      console.log(`users ${data}`);
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Delete the user onClick Delete button
  const deleteUser = async (id, isAdmin) => {
    try {
      if (isAdmin) {
        alert("Admin can't be Deleted");
        return;
      } else {
        const response = await fetch(`${API}/api/admin/users/delete/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: authorizationToken,
          },
        });

        const data = await response.json();
        console.log(`users after delete: ${data}`);

        if (response.ok) {
          getAllUserData();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUserData();
  }, []);

  return (
    <>
      <section className="admin-users-section">
        <div className="container">
          <h1 className="main-heading">Admin Users Data </h1>
        </div>
        <div className="container admin-users">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((currentUser, index) => {
                  const { username, email, phone, _id, isAdmin } = currentUser;
                  return (
                    <tr key={index}>
                      <td>{username}</td>
                      <td>{email}</td>
                      <td>{phone}</td>
                      <td>
                        <Link
                          className="updateLink"
                          to={`/admin/users/${_id}/edit`}
                        >
                          Edit
                        </Link>
                      </td>
                      <td>
                        <button onClick={() => deleteUser(_id, isAdmin)}>
                          delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
