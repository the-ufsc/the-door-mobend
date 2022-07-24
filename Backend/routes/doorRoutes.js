const {
  getAllDoors,
  createDoor,
  getDoorById,
  updateDoorById,
  deleteDoorById,
  getDoorByCode,
} = require("../services/doorService");

const router = require("express").Router();

router.post("/", async (req, res) => {
  const doorInfo = ({
    distanceOpen,
    openDegree,
    closeDegree,
    initialPosition,
    isActivated,
    initialHourWorking,
    endHourWorking,
  } = req.body);
  const result = await createDoor({ doorInfo });
  res.status(result[0]).json(result[1]);
});

router.get("/", async ({ res }) => {
  const result = await getAllDoors();
  res.status(result[0]).json(result[1]);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const result = await getDoorById({ id });
  res.status(result[0]).json(result[1]);
});

router.get("/code/:id", async (req, res) => {
  const id = req.params.id;
  const result = await getDoorByCode({ id });
  res.status(result[0]).json(result[1]);
});

router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const newDoorInfo = ({
    distanceOpen,
    openDegree,
    closeDegree,
    initialPosition,
    isActivated,
    initialHourWorking,
    endHourWorking,
  } = req.body);
  const result = await updateDoorById({ id, newDoorInfo });
  res.status(result[0]).json(result[1]);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const result = await deleteDoorById({ id });
  res.status(result[0]).json(result[1]);
});

module.exports = router;
