const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, requires: true, trim: true, 
    minLength: [3, "Your name have to have minimum 3 chararters"], 
    maxLength: [30,"Your name is too large, can't be larger then 30 chararters"]},
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true, trim: true },
    phoneNumber: { type: String, required: false },
    address: { type: String, required: false },
    role: { type: String, enum: ["isAuth, isAdmin"] },
    confirmed: { type: Boolean, default: false },
    items: [{ type: Schema.ObjectId, required: true , ref: "items" }]
  },
);

const User = mongoose.model("user", userSchema);
module.exports = User;
