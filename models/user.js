const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String, 
        min: [3, "Name length is too small"],
        required: [true, "please add a name"]
        },
    surname: {
        type: String, 
        min: [3, "Surname length is too small"],
        required: [true, "please add a surname"]
        },
    username: {
        type: String, 
        min: [3, "Email length is too small"],
        required: [true, "please add an email"],
        },
    password: {
        type: String, 
        min: [3, "Password length is too small"],
        required: [true, "please add a password"]
        },
    memberStatus: {
        type: Boolean, 
        default: false,
        },
    message: [{ 
        type: Schema.Types.ObjectId, 
        ref: "Message"
        }],
});

UserSchema.virtual("url").get(function () {
    return "/users/" + this._id;
  });

module.exports = mongoose.model("User", UserSchema);