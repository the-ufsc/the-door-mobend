const {
  getAllLogs,
  createLog,
  getLogById,
  updateLogById,
  deleteLogById,
  getAllLogsByDoorID,
  deleteAllLogByDoorId,
} = require("../services/logService");

const router = require("express").Router();

router.post("/door/:id", async (req, res) => {
  const doorId = req.params.id;
  const logInfo = ({ idDoor, datetime, action } = req.body);
  logInfo.idDoor = doorId;
  const result = await createLog({ logInfo });
  res.status(result[0]).json(result[1]);
});

router.post("/", async (req, res) => {
  const logInfo = ({ idDoor, datetime, action } = req.body);
  const result = await createLog({ logInfo });
  res.status(result[0]).json(result[1]);
});

router.get("/", async ({ res }) => {
  const result = await getAllLogs();
  res.status(result[0]).json(result[1]);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const result = await getLogById({ id });
  res.status(result[0]).json(result[1]);
});

router.get("/door/:id", async (req, res) => {
  const idDoor = req.params.id;
  const result = await getAllLogsByDoorID({ idDoor });
  res.status(result[0]).json(result[1]);
});

router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const newLogInfo = ({ idDoor, datetime, action } = req.body);
  const result = await updateLogById({ id, newLogInfo });
  res.status(result[0]).json(result[1]);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const result = await deleteLogById({ id });
  res.status(result[0]).json(result[1]);
});

router.delete("/door/:id", async (req, res) => {
  const idDoor = req.params.id;
  const result = await deleteAllLogByDoorId({ idDoor });
  res.status(result[0]).json(result[1]);
});

module.exports = router;
