import User from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    let profilePic = "";
    if (req.file) {
      const uploadResult = await uploadOnCloudinary(req.file.path);
      if (!uploadResult) {
        return res
          .status(500)
          .json({ message: "Error uploading profile picture" });
      }
      profilePic = uploadResult.secure_url;
    }

    const newUser = new User({
      fullName,
      username,
      password,
      gender,
      profilePic:
        profilePic ||
        (gender === "male"
          ? `https://avatar.iran.liara.run/public/boy?username=${username}`
          : `https://avatar.iran.liara.run/public/girl?username=${username}`),
    });

    const token = await newUser.generateAccessToken();
    await newUser.save();

    console.log("user data:", newUser);

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
  } catch (error) {
    console.error("Error in signup controller", error.message);
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
