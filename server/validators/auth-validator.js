// <-- ZOD is used to handle the form validation it validate the information (which user given) and through error if any -->

const { z } = require("zod");

//Creating an object schema for Login
const signinSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email()
    .min(3, { message: "Email must be at least of 3 characters" })
    .max(255, { message: "Email must not be more than 255 characters" }),

  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(7, { message: "Password must be at least of 7 characters" })
    .max(1024, { message: "Password must not be more than 1024 characters" }),
});

//Creating an object schema for Registration(by using extend this will use email & password from signinSchema)
const signupSchema = signinSchema.extend({
  username: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be at least of 3 characters" })
    .max(255, { message: "Name must not be more than 255 characters" }),

  phone: z
    .string({ required_error: "Phone number is required" })
    .trim()
    .min(10, { message: "Phone number must be at least of 10 characters" })
    .max(20, { message: "Phone number must not be more than 20 characters" }),
});

module.exports = { signupSchema, signinSchema };

//? THIS IS HOW ITS WORK!
// auth-validator -> validator-middleware -> auth-router -> FRONTEND
//? if error occurs then,
// validator-middleware -> error-middleware -> FRONTEND
