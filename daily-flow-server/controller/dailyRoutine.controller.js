const Task = require("../model/tasks.model");
const User = require("../model/users.model");

// Creating a new Task.
const addTask = async (req, res, next) => {
  try {
    const { email } = req?.decoded;
    const { userId, name, status, tasks, time } = req?.body;
    const date = `${new Date().toDateString().split(" ")[1]} ${
      new Date().toDateString().split(" ")[2]
    } ${new Date().toLocaleString().split(" ")[1].split(":")[0]}:${
      new Date().toLocaleString().split(" ")[1].split(":")[1]
    } ${new Date().toLocaleString().split(" ")[2]}, ${
      new Date().toDateString().split(" ")[3]
    }`;

    if (userId) {
      // User finding from the database
      const isUser = await User.findOne({ _id: userId });
      if (status === "completed") {
        tasks.map((t) => {
          t.status = true;
        });
      }

      if (isUser?._id) {
        // Creating a new tas for the user in database
        const newTask = await new Task({
          userId,
          name,
          status,
          time,
          tasks,
          date,
        });
        // Saving the user task information to database and gives front end response
        await newTask
          .save()
          .then(() => {
            res
              .status(201)
              .json({ status: 201, message: "Task created successfully" });
          })
          .catch((err) => {
            res.status(500).json({ message: "Failed to create new task" });
          });
      } else {
        res.status(500).json({ message: "User Data dosen't exist!" });
      }
    } else {
      res.status(500).json({ message: "User Data dosen't exist!" });
    }
  } catch (error) {
    next(error);
  }
};

// Editing a new Task.
const editTask = async (req, res, next) => {
  try {
    const { taskId, data } = req?.body;
    if (taskId) {
      const updatedTask = await Task.findOneAndUpdate({ _id: taskId }, data);
      if (updatedTask?._id) {
        res
          .status(200)
          .json({ status: 201, message: "Task updated successfully" });
      }
    }
  } catch (error) {
    next(error);
  }
};

// get all the user tasks
const getAllTheTask = async (req, res, next) => {
  try {
    // User id from the request parameter
    const userId = req?.params?.userId;
    // User finding from the database
    const isTask = await Task.find({ userId });
    // Checking if the user have task or none
    if (isTask?.length > 0) {
      return res.status(200).json({ tasks: isTask, message: "success" });
    } else {
      return res.status(200).json({ tasks: isTask, message: "No task found!" });
    }
  } catch (error) {
    next(error);
  }
};

// Delete a task
const deleteTask = async (req, res, next) => {
  try {
    const { userId, taskId } = req?.body;

    if (taskId) {
      // User finding from the database and Delete
      const isTask = await Task.findOneAndDelete({ _id: taskId });

      if (isTask?._id) {
        return res
          .status(200)
          .json({ tasks: isTask?._id, message: "Task Deleted!" });
      } else {
        return res
          .status(301)
          .json({ tasks: taskId, message: "Something went wrong!" });
      }
    } else {
      return res.status(301).json({ message: "Something went wrong!" });
    }
  } catch (error) {
    next(error);
  }
};

// Update a task status
const updateTaskStatus = async (req, res, next) => {
  try {
    const { userId, taskId, status } = req?.body;

    if (userId && taskId) {
      let updateData;
      if (status === "completed") {
        updateData = {
          $set: {
            status: "completed",
            "tasks.$[].status": true,
          },
        };
      } else if (status === "todo") {
        updateData = {
          $set: {
            status: "todo",
            "tasks.$[].status": false,
          },
        };
      } else {
        updateData = {
          $set: {
            status: "ongoing",
          },
        };
      }

      // User finding from the database and update
      const query = { _id: taskId, userId };
      const updatedTask = await Task.findOneAndUpdate(query, updateData);
      if (updatedTask?._id) {
        return res.status(200).json({ message: "Task updated!" });
      }
    } else {
      return res
        .status(200)
        .json({ message: "An Error occurd while updating the task status!" });
    }
  } catch (error) {
    next(error);
  }
};

// Update a sub task status
const updateSubTaskStatus = async (req, res, next) => {
  try {
    const { taskId, subTaskId, subTaskStatus } = req?.body;

    const tasks = await Task.findOneAndUpdate(
      { _id: taskId, "tasks._id": subTaskId },
      {
        $set: {
          "tasks.$.status": subTaskStatus,
        },
      }
    );

    let statusUpdate;

    if (tasks?._id) {
      const taskFiltering = tasks?.tasks.filter((t) => {
        return t.status === false;
      });
      const taskFilteringTrue = tasks?.tasks.filter((t) => {
        return t.status === true;
      });

      if (
        taskFilteringTrue?.length > 0 &&
        taskFilteringTrue?.length !== tasks?.tasks?.length
      ) {
        statusUpdate = await Task.findOneAndUpdate(
          { _id: taskId },
          { $set: { status: "ongoing" } }
        );
        res.status(200).json({ message: "success!" });
        return;
      } else if (taskFiltering?.length === tasks?.tasks?.length) {
        statusUpdate = await Task.findOneAndUpdate(
          { _id: taskId },
          { $set: { status: "todo" } }
        );
        res.status(200).json({ message: "success!" });
        return;
      } else if (
        taskFilteringTrue?.length === tasks?.tasks?.length &&
        subTaskStatus
      ) {
        statusUpdate = await Task.findOneAndUpdate(
          { _id: taskId },
          { $set: { status: "completed" } }
        );
        res.status(200).json({ message: "success!" });
        return;
      }
    }
  } catch (error) {
    next(error);
  }
};

// Delete a sub task
const deleteASubTask = async (req, res, next) => {
  try {
    const { userId, taskId, subTaskId } = req?.body;
    const result = await Task.findOneAndUpdate(
      { _id: taskId, userId: userId },
      { $pull: { tasks: { _id: subTaskId } } }
    );
    res.status(200).json({ message: "hello" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addTask,
  editTask,
  getAllTheTask,
  updateSubTaskStatus,
  updateTaskStatus,
  deleteTask,
  deleteASubTask,
};
