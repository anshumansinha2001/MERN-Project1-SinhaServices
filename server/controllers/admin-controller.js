const User = require("../models/user-model");
const Contact = require("../models/contact-model");

// *--------------------------
// Get All Users For Admin
// *--------------------------
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No Users Found" });
    }
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// *--------------------------
// Get Single User For Admin
// *--------------------------
const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await User.findOne({ _id: id }, { password: 0 });
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

// *--------------------------
// Update Single User For Admin
// *--------------------------
const updateUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedUserData = req.body;

    const updatedData = await User.updateOne(
      { _id: id },
      {
        $set: updatedUserData,
      }
    );
    return res.status(200).json(updatedData);
  } catch (error) {
    next(error);
  }
};

// *--------------------------
// Delete the User For Admin
// *--------------------------
const deleteUserById = async (req, res) => {
  try {
    const id = req.params.id;
    await User.deleteOne({ _id: id });
    return res.status(200).json({ message: "User Deleted Successfully !" });
  } catch (error) {
    next(error);
  }
};

// *-----------------------------
// Get All Contacts For Admin
// *-----------------------------
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();

    if (!contacts || contacts.length === 0) {
      return res.status(404).json({ message: "No Contacts Found" });
    }
    return res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

// *--------------------------
// Delete the Contacts For Admin
// *--------------------------
const deleteContactById = async (req, res) => {
  try {
    const id = req.params.id;
    await Contact.deleteOne({ _id: id });
    return res.status(200).json({ message: "Contact Deleted Successfully !" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  getAllContacts,
  deleteContactById,
};
