const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    user = new User({ username, email, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
        name: user.username,
        email: user.email,
        description: user.description,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.json({
          token,
          name: user.username,
          email: user.email,
          description: user.description,
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const payload = {
      user: {
        id: user.id,
        name: user.username,
        email: user.email,
        description: user.description,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.json({
          token,
          name: user.username,
          email: user.email,
          description: user.description,
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.updateBio = async (req, res) => {
  const { newBio } = req.body;

  try {
    let user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.description = newBio;

    await user.save();

    res.json({
      message: "Bio updated successfully",
      description: user.description,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
