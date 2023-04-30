import express from "express";
const router = express.Router();
import authorizedUsers from "./authorizedUsers.js";
import home from "./home.js";

router.use("/autorized-users", authorizedUsers);
router.use("/", home);
router.get("*", (req, res) => {
  res.status(404).send("Page not found");
});

export default router;
