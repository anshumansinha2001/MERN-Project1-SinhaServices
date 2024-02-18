require("dotenv").config(); //handle the env (should be TOP)
const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const serviceRoute = require("./router/service-router");
const adminRoute = require("./router/admin-router");
const connectionDb = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");

// Handling CORS policy issue which occurs due to run two diffrent servers for frontend or backend
const corsOption = {
  origin: "http://localhost:5173",
  method: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};
app.use(cors(corsOption));

//MIDDLEWARE:- It helps to handle JSON data in the req body, It's important to place it before any routes
app.use(express.json());

//Mount the Router: To use router in your main express app, we can "mount" it at a specific URL prefix
app.use("/api/auth", authRoute);

app.use("/api/form", contactRoute);

app.use("/api/data", serviceRoute);

// let's define admin route
app.use("/api/admin", adminRoute);

// Before get connected to DB check the errors
app.use(errorMiddleware);

connectionDb().then(() => {
  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });
});
