const express = require("express");
const router = express.Router();

const auth_controller = require("../controllers/authController")

// ----.com/auth/----
router.get("/log-in", auth_controller.user_login_get); // Form log-in
router.get("/sign-up", auth_controller.user_signup_get); // Form sign-up
router.post("/sign-up", auth_controller.user_signup_post); // POST sign-up

module.exports = router;
