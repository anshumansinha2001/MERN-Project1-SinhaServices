import React, { useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const defaultContactFormData = {
  username: "",
  email: "",
  message: "",
};

export default function Contact() {
  const [contact, setContact] = useState(defaultContactFormData);
  const [userData, setUserData] = useState(true);

  const { user } = useAuth();

  if (userData && user) {
    setContact({
      username: user.username,
      email: user.email,
      message: "",
    });

    setUserData(false);
  }

  // Handling the input value
  const handleInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setContact({
      ...contact,
      [name]: value,
    });
  };

  // Handling the Form getFormSubmitionInfo
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/api/form/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
      });

      if (response.ok) {
        setContact(defaultContactFormData);
        const data = await response.json();
        console.log(data);
        toast.success("Message send successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Message not send!");
    }
  };

  return (
    <>
      <section className="section-contact container">
        <div className="contact-content">
          <h1 className="main-heading">contact us</h1>
        </div>
        {/* contact page main  */}
        <div className="grid grid-two-cols">
          <div className="contact-image">
            <img src="/images/support.png" alt="we are always ready to help" />
          </div>

          {/* contact form content actual  */}
          <section className="contact-form">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="off"
                  value={contact.username}
                  onChange={handleInput}
                  required
                />
              </div>

              <div>
                <label htmlFor="email">email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="off"
                  value={contact.email}
                  onChange={handleInput}
                  required
                />
              </div>

              <div>
                <label htmlFor="message">message</label>
                <textarea
                  name="message"
                  id="message"
                  autoComplete="off"
                  value={contact.message}
                  onChange={handleInput}
                  required
                  cols="30"
                  rows="6"
                ></textarea>
              </div>

              <div>
                <button type="submit">submit</button>
              </div>
            </form>
          </section>
        </div>
      </section>

      <div className="">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d408.4814621317328!2d77.6331567366657!3d13.08952059779437!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae19965bde8a43%3A0x9af484136448ee19!2s15%2C%207th%20Cross%20Rd%2C%20opp.%20to%20BHARTIYA%20CITY%2C%202nd%20Block%2C%20Agrahara%20Badavane%2C%20Thirumenahalli%2C%20Karnataka%20560064!5e0!3m2!1sen!2sin!4v1708001826445!5m2!1sen!2sin"
          width="100%"
          height="450"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </>
  );
}
