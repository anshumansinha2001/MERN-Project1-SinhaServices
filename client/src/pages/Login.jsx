import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { storeTokenInLS, API } = useAuth();
  const URL = `${API}/api/auth/login`;

  //handling the input values
  const handleInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setUser({
      ...user,
      [name]: value,
    });
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
      console.log("login form", response);
      const res_data = await response.json();

      if (response.ok) {
        //<-- stored the token in localhost -->
        storeTokenInLS(res_data.token);
        setUser({ email: "", password: "" });
        toast.success("Login Successful !");
        navigate("/");
      } else {
        toast.error(
          res_data.extraDetails ? res_data.extraDetails : res_data.message
        );
      }
    } catch (error) {
      console.log("login ", error);
    }
  };

  return (
    <>
      <section className="section-login">
        <div className="container grid grid-two-cols">
          <div className="login-image">
            <img
              src="/images/login.png"
              alt="login-image"
              width="500"
              height="500"
            />
          </div>

          {/* Lets takle Login form */}
          <div className="login-form">
            <h1 className="main-heading mb-3">login form</h1>
            <br />

            <form onSubmit={handleSubmit}>
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
                login
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
