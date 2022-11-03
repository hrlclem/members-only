const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    title: {
        type: String, 
        min: [3, "Title length is too small"],
        required: [true, "please add a title"]
        },
    content: {
        type: String, 
        min: [3, "Content length is too small"],
        required: [true, "please add a message content"]
        },
    date: {
        type: Date, 
        default: Date.now(),
        },
    user: { 
        type: Schema.Types.ObjectId, 
        ref: "User"
        },
});

MessageSchema.virtual("url").get(function () {
    return "/users/comments/" + this._id;
  });

module.exports = mongoose.model("Message", MessageSchema);