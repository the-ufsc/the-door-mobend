const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Log = new Schema({
  idDoor: {
    type: Schema.Types.ObjectId,
    ref: "Door",
    required: [true, "Id da Door é necessária!"],
  },
  datetime: {
    type: Date,
    default: Date.now,
  },
  action: {
    type: String,
    required: [true, "Ação é necessária"],
  },
});

module.exports = mongoose.model("Log", Log);
