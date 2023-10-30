const itemSchema = new Schema(
  {
    items: [{ type: String, require: true, trim: true }],
    id_safeBox: [
      { type: Schema.Types.ObjectId, required: false, ref: "safeBox" },
    ],
  },
  {
    collection: "item",
    toJSON: {
      transform: (doc, ret) => {
        delete ret.id_safeBox;
        delete ret.__v;
        return ret;
      },
    },
  }
);

const Item = mongoose.model("item", itemSchema);
module.exports = Item;
