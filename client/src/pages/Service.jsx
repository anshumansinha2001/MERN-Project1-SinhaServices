import { useAuth } from "../store/auth";
import { NavLink } from "react-router-dom";

export default function Service() {
  const { services } = useAuth();
  console.log("temp", services);

  return (
    <section className="section-services">
      <div className="container">
        <h1 className="main-heading">Services </h1>
      </div>

      <div className="container grid grid-three-cols">
        {services &&
          services.map((currentElement, index) => {
            const { price, description, provider, service } = currentElement;

            return (
              <div className="card" key={index}>
                <div className="card-img">
                  <img
                    src="/images/design.png"
                    alt="our services info"
                    width="200"
                  />
                </div>

                <div className="card-details">
                  <div className="grid grid-two-cols">
                    <p>{provider}</p>
                    <p>{price}</p>
                  </div>
                  <h2>{service}</h2>
                  <p>{description}</p>
                </div>
                <NavLink to="/enroll">
                  <button>Enroll now</button>
                </NavLink>
              </div>
            );
          })}
      </div>
    </section>
  );
}
