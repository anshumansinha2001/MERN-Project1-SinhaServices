const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// <-- Secure the password using bcrypt -->
userSchema.pre("save", async function (next) {
  // console.log("pre method", this);
  const user = this;

  if (!user.isModified("password")) {
    next();
  }

  try {
    const saltRounds = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(user.password, saltRounds);
    user.password = hash_password;
  } catch (error) {
    next(error);
  }
});

// json web token (JWT)
userSchema.methods.generateToken = async function () {
  // console.log("I am token");
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "30d",
      }
    );
  } catch (error) {
    console.error("Token Error: ", error);
  }
};

//<-- Compare the user password -->
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// <-- define the model or the collection name -->
const User = new mongoose.model("User", userSchema);

module.exports = User;
