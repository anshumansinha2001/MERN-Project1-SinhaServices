const mongoose = require("mongoose");

// const URI = "mongodb://127.0.0.1:27017/mern_admin";
const URI = process.env.MONGODB_URI;

// mongoose.connect(URI);

const connectionDb = async () => {
    try {
        await mongoose.connect(URI);
        console.log("Database connected successfully!");
    } catch (error) {
        console.error("Failed!!! database connection");
    }
}

module.exports = connectionDb;