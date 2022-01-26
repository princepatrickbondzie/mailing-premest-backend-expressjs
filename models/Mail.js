const { model, Schema } = require("mongoose");

const mailSchema = Schema(
  {
    sender: {
      type: String,
      required: true,
    },
    recipient: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      required: [true, "enter a message title"],
    },
    body: {
      type: String,
      required: [true, "enter a message body"],
    },
  },
  { timestamps: true }
);

module.exports = model("Mail", mailSchema);
