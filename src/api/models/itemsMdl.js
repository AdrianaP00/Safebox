const { randomUUID } = require("crypto");

const itemSchema = new Schema(
  {
    UUID: { type: randomUUID, requires: true },
    items: [{ type: String, require: true, trim: true }],
    safeBox: [{ type: Schema.Types.ObjectId, required: false, ref: "safeBox" }],
  },
  {
    collection: "item",
    toJSON: {
      transform: (doc, ret) => {
        delete ret.safeBox;
        delete ret.__v;
        return ret;
      },
    },
  }
);

const Item = mongoose.model("item", itemSchema);
module.exports = Item;
