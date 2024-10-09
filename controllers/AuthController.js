const bcrypt = require("bcrypt");
const { User } = require("../models"); // Adjust the path as necessary
const { generateUniqueId } = require("../utils/generateId"); // Import the utility function
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret"; // Store in .env file

class UserController {
  // Register a new user
  async register(req, res) {
    const { firstName, lastName, whatsappNumber, email, password } = req.body;

    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ where: { whatsappNumber } });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists." });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Generate unique instance_id and access_token
      const instance_id = await generateUniqueId(User, 7);
      const access_token = await generateUniqueId(User, 7);

      // Create new user
      const user = await User.create({
        firstName,
        lastName,
        whatsappNumber,
        email,
        password: hashedPassword,
        instance_id,
        access_token,
      });

      // Generate JWT token
      const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });

      return res
        .status(201)
        .json({ message: "User registered successfully.", token });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error registering user.", error });
    }
  }

  // Login user
  async login(req, res) {
    const { whatsappNumber, password } = req.body;

    try {
      // Find user by whatsappNumber
      const user = await User.findOne({ where: { whatsappNumber } });
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials." });
      }

      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials." });
      }

      // Generate JWT token
      const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });

      return res.status(200).json({ message: "Login successful.", token });
    } catch (error) {
      return res.status(500).json({ message: "Error logging in.", error });
    }
  }

  // Get user profile (example)
  async getProfile(req, res) {
    const userId = req.user.id; // Assuming user ID is set in middleware

    try {
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      return res.status(200).json(user);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error fetching user profile.", error });
    }
  }
}

module.exports = new UserController();
