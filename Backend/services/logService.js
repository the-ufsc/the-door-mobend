const Log = require("../models/Log");

async function createLog({ logInfo }) {
  try {
    const result = await Log.create(logInfo);
    return [201, result];
  } catch (error) {
    return [500, { error: error.message }];
  }
}

async function getAllLogsByDoorID({ idDoor }) {
  try {
    const result = await Log.find({
      idDoor: { $eq: idDoor },
    }).sort({ datetime: -1 });
    if (result.length === 0) return [204];
    return [200, result];
  } catch (error) {
    return [500, { error: error.message }];
  }
}

async function getAllLogs() {
  try {
    const result = await Log.find().sort({ datetime: -1 });
    if (result.length === 0) return [204];
    return [200, result];
  } catch (error) {
    return [500, { error: error.message }];
  }
}

async function getLogById({ id }) {
  try {
    const result = await Log.findById(id);
    if (result === null)
      return [404, { message: "Nenhum Log encontrado por esse Id!" }];
    return [200, result];
  } catch (error) {
    return [500, { error: error.message }];
  }
}

async function updateLogById({ id, newLogInfo }) {
  try {
    const result = await Log.updateOne({ _id: id }, newLogInfo);
    if (result.matchedCount === 0) {
      return [422, { message: "Nenhum Log encontrado para esse ID!" }];
    }
    const newData = await Log.findById(id);
    return [200, newData];
  } catch (error) {
    return [500, { error: error.message }];
  }
}

async function deleteLogById({ id }) {
  try {
    const result = await Log.deleteOne({ id });
    if (result.deletedCount === 0) {
      return [422, { message: "Nenhum Log encontrado para esse ID!" }];
    }
    return [200, { message: "Log excluido do sistema!" }];
  } catch (error) {
    return [500, { error: error.message }];
  }
}

async function deleteAllLogByDoorId({ idDoor }) {
  try {
    const result = await Log.deleteMany({
      idDoor: { $eq: idDoor },
    });
    if (result.deletedCount === 0) {
      return [422, { message: "Nenhum Log encontrado para esse ID!" }];
    }
    return [200, { message: "Logs excluidos do sistema!" }];
  } catch (error) {
    return [500, { error: error.message }];
  }
}

var exports = {
  getAllLogs,
  createLog,
  getLogById,
  updateLogById,
  deleteLogById,
  getAllLogsByDoorID,
  deleteAllLogByDoorId,
};

module.exports = exports;
