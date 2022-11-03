const express = require("express");
const router = express.Router();

const user_controller = require("../controllers/userController")
const comment_controller = require("../controllers/commentController")

// ----.com/users/----
router.get("/profile", user_controller.user_detail); // User detail
router.get("/premium", user_controller.add_premium_get) // Form Become a premium member
router.post("/premium", user_controller.add_premium_post) // POST Become a premium member

router.get("/comment/add", comment_controller.comment_add_get); // Form add comment    // MEMBER ONLY
router.post("/comment/add", comment_controller.comment_add_post); // POST add comment

module.exports = router;
