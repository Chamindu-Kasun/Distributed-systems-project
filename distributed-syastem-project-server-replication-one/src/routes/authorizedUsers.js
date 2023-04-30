import express from "express";
import User from "../modals/User.js";
const router = express.Router();
import bcrypt from "bcrypt";

router.post("/register", async (req, res) => {
  try {
    const data = req.body.data;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);
    const newUser = new User({
      username: data.username,
      email: data.email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const data = req.body.data;

    const user = await User.findOne({ email: data.email });
    const validated = await bcrypt.compare(data.password, user.password);
    if (!user) {
      res.status(400).json("Wrong credentials!");
    } else if (!validated) {
      res.status(400).json("Wrong credentials!");
    } else {
      const { password, ...others } = user._doc;
      res.status(200).json(others);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
