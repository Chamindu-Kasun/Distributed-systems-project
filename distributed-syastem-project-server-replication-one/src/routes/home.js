import express from "express";
const router = express.Router();
import dotenv from "dotenv";
dotenv.config();

router.get("/", (req, res) => {
  const data = `App running at PORT ${process.env.PORT}`;
  return res.send(data);
});

export default router;
