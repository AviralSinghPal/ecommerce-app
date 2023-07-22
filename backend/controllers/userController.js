// backend/controllers/userController.js
const User = require("../models/User");
const jwt = require("jsonwebtoken");
// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email, password });
    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create user", error: error.message });
  }
};

// Login user
const generateJWTToken = (user) => {
  const token = jwt.sign({ userId: user._id , role:user.role }, "your_secret_key_here", {
    expiresIn: "10h",
  });
  return token;
};
// Login user and send JWT token in an HTTP-only cookie
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = generateJWTToken(user);
    console.log(user);
    // Set the JWT token in an HTTP-only cookie
    res.cookie("token", token, { httpOnly: true });
    user.token = token;

    res.status(200).json({ message: "User logged in successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Failed to log in", error: error.message });
  }
};

// Get the currently logged-in user based on the JWT token
exports.getUserByToken = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ message: "No token found. Please log in." });
    }

    const decodedToken = jwt.verify(token, "your_secret_key_here");
    const user = await User.findById(decodedToken.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch user", error: error.message });
  }
};
// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password");
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch users", error: error.message });
  }
};

// Get a single user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id, "-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch user", error: error.message });
  }
};

// Update a user by ID
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update user", error: error.message });
  }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete user", error: error.message });
  }
};


// Logout user
exports.logoutUser = (req, res) => {
  try {
    // Clear the JWT token from cookies
    res.clearCookie("token");

    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to logout", error: error.message });
  }
};