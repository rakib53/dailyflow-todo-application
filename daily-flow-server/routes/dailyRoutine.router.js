const {
  addTask,
  getAllTheTask,
  deleteASubTask,
  deleteTask,
  updateTaskStatus,
  updateSubTask,
  updateSubTaskStatus,
  editTask,
} = require("../controller/dailyRoutine.controller");
const { verifyJsonWebToken } = require("../controller/users.controller");
const router = require("express").Router();

// All The Route for Daily Routine and Daly Task
router.get("/getTask/user/:userId", verifyJsonWebToken, getAllTheTask);
router.get(
  "/deleteTask/:userId/:taskId/:subTaskId",
  verifyJsonWebToken,
  deleteASubTask
);
router.post("/addTask", verifyJsonWebToken, addTask);
router.patch("/editTask", verifyJsonWebToken, editTask);
router.patch("/updateSubTaskStatus", verifyJsonWebToken, updateSubTaskStatus);
router.patch("/updateTaskStatus", verifyJsonWebToken, updateTaskStatus);
router.delete("/deleteTask", verifyJsonWebToken, deleteTask);
router.delete("/deleteSubTask", verifyJsonWebToken, deleteASubTask);
module.exports = router;
