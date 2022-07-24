const Door = require("../models/Door");

async function createDoor({ doorInfo }) {
  try {
    const result = await Door.create(doorInfo);
    return [201, result];
  } catch (error) {
    return [500, { error: error.message }];
  }
}

async function getAllDoors() {
  try {
    const result = await Door.find();
    if (result.length === 0) return [204];
    return [200, result];
  } catch (error) {
    return [500, { error: error.message }];
  }
}

async function getDoorById({ id }) {
  try {
    const result = await Door.findById(id);
    if (result === null)
      return [404, { message: "Nenhuma Door encontrado por esse Id!" }];
    return [200, result];
  } catch (error) {
    return [500, { error: error.message }];
  }
}

async function updateDoorById({ id, newDoorInfo }) {
  try {
    const result = await Door.updateOne({ _id: id }, newDoorInfo);
    if (result.matchedCount === 0) {
      return [422, { message: "Nenhuma Door encontrada para esse ID!" }];
    }
    const newData = await Door.findById(id);
    return [200, newData];
  } catch (error) {
    return [500, { error: error.message }];
  }
}

async function deleteDoorById({ id }) {
  try {
    const result = await Door.deleteOne({ id });
    if (result.deletedCount === 0) {
      return [422, { message: "Nenhuma Door encontrada para esse ID!" }];
    }
    return [200, { message: "Door excluida do sistema!" }];
  } catch (error) {
    return [500, { error: error.message }];
  }
}

var exports = {
  getAllDoors,
  createDoor,
  getDoorById,
  updateDoorById,
  deleteDoorById,
};

module.exports = exports;
