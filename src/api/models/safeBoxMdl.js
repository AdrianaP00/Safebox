const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const safeBoxSchema = new Schema(
  {
    name: { type: String, requires: true, trim: true },
    password: { type: String, required: true, trim: true },
    items: [{ type: Schema.ObjectId, required: false, ref: "items" }],
  },
  { collection: "safeBox" },
  {
    toJSON: {
      transform: (doc, ret) => {
        delete ret.password;
        delete ret.__v;
        return ret;
      },
    },
  }
);

const SafeBox = mongoose.model("safeBox", safeBoxSchema);
module.exports = SafeBox;
