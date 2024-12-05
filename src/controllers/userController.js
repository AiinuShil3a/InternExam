const User = require('../models/user');

const createUser = async (req, res) => {
  const { first_name, last_name, email } = req.body;
  try {
    const newUser = await User.create({ first_name, last_name, email });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};

module.exports = { createUser };
