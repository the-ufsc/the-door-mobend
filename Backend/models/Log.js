const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const moment = require("moment-timezone");
const dateBrasil = moment.tz(Date.now(), "American/Sao_Paulo");

const Log = new Schema({
  idDoor: {
    type: Schema.Types.ObjectId,
    ref: "Door",
    required: [true, "Id da Door é necessária!"],
  },
  datetime: {
    type: Date,
    default: dateBrasil,
  },
  action: {
    type: String,
    required: [true, "Ação é necessária"],
  },
});

module.exports = mongoose.model("Log", Log);
