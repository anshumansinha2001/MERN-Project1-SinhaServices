const User = require("../models/user-model");
const bcrypt = require("bcrypt");

// *------------------
// Home Logic
// *------------------

const home = async (req, res) => {
  try {
    res
      .status(200)
      .send(
        "Welcome to wold best mern series by AnshumanSinha via using router!"
      );
  } catch (error) {
    console.log(error);
  }
};

// *------------------
// User Regestration Logic
// *------------------

const register = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: "Email already exists !" });
    }

    // <-- Hash the password (secure the pswd) --> [but we choosen alternative directly in schema]
    // const saltRounds = 10;
    // const hash_password = await bcrypt.hash(password, saltRounds);

    const userCreated = await User.create({ username, email, phone, password });
    //<-- token cant store in DB so we use here below in client side server -->
    res.status(201).json({
      msg: "Registration Successful",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    res.status(400).send({ msg: "internal server error!" });
  }
};

// *------------------
// User Login Logic
// *------------------

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (!userExist) {
      res.status(400).json({ message: "Invalid Credentails !" });
    }

    // const user = await bcrypt.compare(password, userExist.password);
    const user = await userExist.comparePassword(password);

    if (user) {
      res.status(200).json({
        msg: "Login Successful",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).send({ message: "Invalid email or password !" });
    }
  } catch (error) {
    // res.status(400).send({ msg: "internal server error!" })
    next(error);
  }
};

// *------------------
// to send user data - User Logic
// *------------------

const user = async (req, res) => {
  try {
    const userData = req.user;
    console.log(userData);
    return res.status(200).json({ userData });
  } catch (error) {
    console.log(`error from the user route ${error}`);
  }
};

module.exports = { home, register, login, user };
