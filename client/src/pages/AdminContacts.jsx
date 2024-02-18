import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";

export default function AdminContacts() {
  const [contactData, setContactData] = useState([]);
  const { authorizationToken, API } = useAuth();

  //Responsible for get All contacts
  const getContactsData = async () => {
    try {
      const response = await fetch(`${API}/api/admin/contacts`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      console.log("contact data: ", data);
      if (response.ok) {
        setContactData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handling onClick deleteContactById
  const deleteContactById = async (id) => {
    try {
      const response = await fetch(`${API}/api/admin/contacts/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (response.ok) {
        getContactsData();
        toast.success("deleted successfully");
      } else {
        toast.error("Not Deleted ");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getContactsData();
  }, []);

  return (
    <>
      <section className="admin-contacts-section">
        <div className="container">
          <h1 className="main-heading">Admin Contact Data </h1>
        </div>

        <div className="container  admin-users">
          {contactData &&
            contactData.map((curContactData, index) => {
              const { username, email, message, _id } = curContactData;

              return (
                <div key={index}>
                  <p>{username}</p>
                  <p>{email}</p>
                  <p>{message}</p>
                  <button
                    className="btn"
                    onClick={() => deleteContactById(_id)}
                  >
                    delete
                  </button>
                </div>
              );
            })}
        </div>
      </section>
    </>
  );
}
