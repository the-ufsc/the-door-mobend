const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Door = new Schema({
  code: {
    type: Number,
    required: [true, "Código identificador é necessário!"],
    unique: true,
  },
  distanceOpen: {
    type: Number,
    required: [true, "Distancia de abertura é obrigatória!"],
  },
  openDegree: {
    type: Number,
    required: [true, "Grau de abertura é obrigatória!"],
  },
  closeDegree: {
    type: Number,
    required: [true, "Grau de fechamento é obrigatório!"],
  },
  initialPosition: {
    type: String,
    required: [true, "Necessário uma posição inicial (open/close)."],
  },
  isActivated: {
    type: Boolean,
    required: [true, "On/Off é obrigatório!"],
  },
});

module.exports = mongoose.model("Door", Door);
