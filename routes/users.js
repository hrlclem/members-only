const express = require("express");
const router = express.Router();

const user_controller = require("../controllers/userController")
const comment_controller = require("../controllers/commentController")

// ----.com/users/----
router.get("/", user_controller.users_list); // List of users
router.get("/add", user_controller.user_add_get); // Form add user
router.post("/add", user_controller.user_add_post); // POST add user
router.get("/log-in", user_controller.user_login_get); // Form log-in
router.post("/log-in", user_controller.user_login_post); // POST log-in
router.get("/sign-up", user_controller.user_signup_get); // Form sign-up
router.post("/sign-up", user_controller.user_signup_post); // POST sign-up
router.get("/:id", user_controller.user_detail); // User detail

router.get("/commentList", comment_controller.comment_list); // Form add comment
router.get("/comment", comment_controller.comment_add_get); // Form add comment    // MEMBER ONLY
router.post("/comment", comment_controller.comment_add_post); // POST add comment
router.get("/comment/:id", comment_controller.comment_detail); // POST add comment

module.exports = router;
