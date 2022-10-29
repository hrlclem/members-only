const express = require("express");
const router = express.Router();

const user_controller = require("../controllers/userController")
const comment_controller = require("../controllers/commentController")

// ----.com/users/----
router.get("/", user_controller.users_list); // List of users
router.get("/add", user_controller.user_add_get); // Form add user
router.post("/add", user_controller.user_add_post); // POST add user
router.get("/profile", user_controller.user_detail); // User detail

router.get("/comments", comment_controller.comment_list); // Form add comment
router.get("/comment/add", comment_controller.comment_add_get); // Form add comment    // MEMBER ONLY
router.post("/comment/add", comment_controller.comment_add_post); // POST add comment
router.get("/comment/:id", comment_controller.comment_detail); // POST add comment

module.exports = router;
