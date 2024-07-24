import User from "../models/user.model.js";

// import generateTokenAndSetCookie from "../utils/generateToken.js";
import bcrypt from "bcryptjs";

const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullName,
      username,
      password,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });
    if (newUser) {
      const token = await newUser.generateAccessToken();

      // generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();

      const options = {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development",
      };

      res.status(201).cookie("jwt", token, options).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
        token,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup contriller", error.message);
    res.status(500).json({ error: "Server Error" });
  }
};
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    const user = await User.findOne({ username });

    if (!user || !(await user.isPasswordCorrect(password))) {
      return res.status(400).json({ message: "Invalid username or password" });
    }
    // const isPasswordCorrect = await user.isPasswordCorrect(password);

    // if (!user || !isPasswordCorrect) {
    //   return res.status(400).json({ message: "Invalid username or password" });
    // }

    const token = await user.generateAccessToken();

    const options = {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
    };

    res.status(201).cookie("jwt", token, options).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in signup contriller", error.message);
    res.status(500).json({ error: "Server Error" });
  }
};
const logout = async (req, res) => {
  try {
    const options = {
      maxAge: 0,
      httpOnly: true,
      secure: true,
    };
    // clearing cookies after logout
    return res
      .status(200)
      .cookie("jwt", "", options)
      .json({ message: "User logged out successfully" });
  } catch (error) {
    console.log("Error in signup contriller", error.message);
    res.status(500).json({ error: "Server Error" });
  }
};

export { signup, login, logout };
