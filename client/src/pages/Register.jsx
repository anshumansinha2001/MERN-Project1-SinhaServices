import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export default function Regsiter() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const navigate = useNavigate();
  const URL = "http://localhost:5000/api/auth/register";
  const { storeTokenInLS } = useAuth();

  // handling the input value
  const handleInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUser({
      ...user, //<-- spread operator
      [name]: value, //<-- we make name dynamic for choose the current state
    });
    console.log(event);
  };

  // handling the Form Submition
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const res_data = await response.json();
      console.log("res from server", res_data);

      if (response.ok) {
        //<-- stored the token in localhost -->
        storeTokenInLS(res_data.token);
        // localStorage.setItem("token", res_data.token);
        setUser({ username: "", email: "", phone: "", password: "" });
        toast.success("Registration Successful !");
        navigate("/");
      } else {
        toast.error(
          res_data.extraDetails ? res_data.extraDetails : res_data.message
        );
      }
    } catch (error) {
      console.log("register ", error);
    }
  };

  return (
    <>
      <section className="section-registration">
        <div className="container grid grid-two-cols">
          <div className="registration-image">
            <img src="/images/register.png" alt="registration-image" />
          </div>

          {/* Lets takle registration form */}
          <div className="registration-form">
            <h1 className="main-heading mb-3">registration form</h1>
            <br />

            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">username</label>
                <input
                  type="text"
                  name="username"
                  placeholder="enter your username"
                  id="username"
                  required
                  autoComplete="off"
                  value={user.username}
                  onChange={handleInput}
                />
              </div>

              <div>
                <label htmlFor="email">email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="enter your email"
                  id="email"
                  required
                  autoComplete="off"
                  value={user.email}
                  onChange={handleInput}
                />
              </div>

              <div>
                <label htmlFor="phone">phone</label>
                <input
                  type="number"
                  name="phone"
                  placeholder="enter your phone"
                  id="phone"
                  required
                  autoComplete="off"
                  value={user.phone}
                  onChange={handleInput}
                />
              </div>

              <div>
                <label htmlFor="password">password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="enter your password"
                  id="password"
                  required
                  autoComplete="off"
                  value={user.password}
                  onChange={handleInput}
                />
              </div>

              <br />
              <button type="submit" className="btn btn-submit">
                Register now
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
