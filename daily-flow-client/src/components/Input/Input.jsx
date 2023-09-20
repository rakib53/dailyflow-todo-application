import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addInputValue } from "../../features/addInputSlice/addInputSlice";
import { closeModal } from "../../features/openModalSlice/openModalSlice";
import {
  useAddTaskMutation,
  useEditTaskMutation,
} from "../../features/tasksSlice/tasksApi";
import styles from "../../pages/DailyRoutine/DailyRoutine.module.css";
import AddTaskIcon from "../SVG/AddTaskIcon";
import AddTimeIcon from "../SVG/AddTimeIcon";
import DeleteSubtaskIcon from "../SVG/DeleteSubtaskIcon";
import EditTaskNameIcon from "../SVG/EditTaskNameIcon";
import ThreeDot from "../SVG/ThreeDot";

const Input = ({ editTaskContent }) => {
  const [visibleTodoInputBox, setVisibleTodoInputBox] = useState(false);
  const [isInputLabel, setIsInputLabel] = useState(true);
  // Add a task name state
  const [taskName, setTaskName] = useState("");
  // Add sub task name state
  const [addSubTask, setAddSubTask] = useState("");
  const [subTasks, setSubTasks] = useState([]);
  // Hide or view time popup state
  const [viewTime, setViewTime] = useState(false);
  const [time, setTime] = useState("");
  const viewOrHideTimeRef = useRef(null);
  // After added time state
  const [afterAddedTime, setAfterAddedTime] = useState(false);
  // Form time state
  const [taskTime, setTaskTime] = useState({
    formTimeHour: "",
    formTimeMinute: "",
    formTimePortions: "",
    toTimeHour: "",
    toTimeMinute: "",
    toTimePortions: "",
  });
  // Redux Hooks
  const { inputValue } = useSelector((state) => state.addInputValue);

  // User logged data
  const { user } = useSelector((state) => state.authSlice);

  // add task redux api
  const [addTask, { data: addTaskResponse, isError, isLoading, error }] =
    useAddTaskMutation();
  const [editTask, { data: editTaskResponse }] = useEditTaskMutation();
  const dispatch = useDispatch();

  // Send data to server
  const handleTodoSubmit = (event) => {
    event.preventDefault();
    const newTask = {
      userId: user?._id,
      name: taskName,
      status: inputValue,
      time: time,
      tasks: subTasks,
    };
    addTask(newTask);
    dispatch(addInputValue(""));
    dispatch(closeModal(""));
  };

  // send data to server for editing a todo
  const handleEditTodoSubmit = (event) => {
    event.preventDefault();
    const editedTask = {
      taskId: editTaskContent?._id,
      data: {
        userId: user?._id,
        name: taskName,
        status: editTaskContent?.status,
        time: time,
        tasks: subTasks,
      },
    };
    console.log(editedTask);
    editTask(editedTask);
    dispatch(addInputValue(""));
    dispatch(closeModal(""));
  };

  // Added a new subtask
  const handleAddInputBox = () => {
    if (addSubTask.length <= 0) {
      alert("Field can't be empty!");
      return;
    }
    const newSubTask = [
      ...subTasks,
      {
        id:
          subTasks.length > 0
            ? parseInt(subTasks[subTasks?.length - 1].id) + 1
            : 1,
        content: addSubTask,
        status: false,
      },
    ];
    setSubTasks(newSubTask);
    setAddSubTask("");
  };

  // delete added subtask
  const handleDeleteSubTask = (id) => {
    const remainSubTasks = subTasks?.filter((sbtask) => sbtask?.id !== id);
    setSubTasks(remainSubTasks);
  };

  // update the isCompleted subtask
  const handleUpdateSubTask = (id, value) => {
    const updatedSubTasks = subTasks?.map((subTask) => {
      if (subTask?.id === id) {
        subTask.status = value;
        return subTask;
      }
      return subTask;
    });
    setSubTasks(updatedSubTasks);
  };

  // Added The time
  const handleAddedTime = () => {
    // set all the time in the form to send
    setTime({
      form: {
        hour: taskTime?.formTimeHour,
        minute: taskTime?.formTimeMinute,
        portion: taskTime?.formTimePortions,
      },
      to: {
        hour: taskTime?.toTimeHour,
        minute: taskTime?.toTimeMinute,
        portion: taskTime?.toTimePortions,
      },
    });

    // close the add time popup
    setViewTime(!viewTime);
    // added the time and set time
    setAfterAddedTime(true);
  };

  // Cancel the task modal
  const cancelTask = () => {
    dispatch(addInputValue(""));
    dispatch(closeModal(""));
  };

  useEffect(() => {
    if (inputValue.length > 0) {
      setVisibleTodoInputBox(!visibleTodoInputBox);
    }
  }, []);

  useEffect(() => {
    if (editTaskContent?._id) {
      setTaskName(editTaskContent?.name);
      setSubTasks(editTaskContent?.tasks);
      if (editTaskContent?.time) {
        const {
          to,
          form: { hour, minute, portion },
        } = editTaskContent?.time;
        setTaskTime({
          formTimeHour: hour,
          formTimeMinute: minute,
          formTimePortions: portion,
          toTimeHour: to?.hour,
          toTimeMinute: to?.minute,
          toTimePortions: to?.portion,
        });
      }
    }
  }, []);

  // checking if the user click outside of the time popup will disappear
  useEffect(() => {
    function handleClickOutSide(event) {
      if (
        viewOrHideTimeRef.current &&
        !viewOrHideTimeRef.current.contains(event.target)
      ) {
        setViewTime(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, [viewOrHideTimeRef, viewTime]);

  return (
    <div
      className={`${styles.todoInputWrapper} ${
        visibleTodoInputBox && styles.expandedTodoInputWrapper
      }`}
    >
      <div className={styles.todoInputHeader}>
        <div className={styles.taskNameInputWrapper}>
          {isInputLabel && taskName?.length === 0 && (
            <div className={styles.initialInputState}>
              <label htmlFor="taskName" className={styles.inputLabel}>
                Enter Task
              </label>
              <div className={styles.editTaskNameicon}>
                <EditTaskNameIcon />
              </div>
            </div>
          )}

          <input
            className={styles.todoInput}
            type="text"
            name="taskName"
            id="taskNamel"
            value={taskName}
            required
            onChange={(e) => setTaskName(e.target.value)}
            onFocus={() => setIsInputLabel(false)}
            onBlur={() => setIsInputLabel(true)}
            placeholder={isInputLabel ? "" : "Enter task..."}
          />
        </div>

        {/* Three DOT SVG  */}
        <div className={styles.ThreeDot}>
          <ThreeDot />
        </div>
      </div>

      {subTasks?.length > 0 && (
        <div className={styles.todoInputBody}>
          <div className={styles.allSubTaskWrapper}>
            {subTasks?.map((subTask) => (
              <div key={subTask?.id} className={styles.subTask}>
                <div>
                  <input
                    className="custom-checkbox"
                    type="checkbox"
                    name="coldMessage"
                    id={subTask?.id}
                    onChange={(e) =>
                      handleUpdateSubTask(subTask?.id, e.target.checked)
                    }
                  />
                  <label htmlFor={subTask?.id} className={styles.todoList}>
                    {subTask?.content}
                  </label>
                </div>
                {/*  Delete Sub task Icon */}
                <div
                  onClick={() => handleDeleteSubTask(subTask?.id)}
                  className={styles.deleteSubTaskIcon}
                >
                  <DeleteSubtaskIcon />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className={styles.todoInputBody}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <g id="plus">
            <path
              id="Icon"
              d="M7.99967 3.33301V12.6663M3.33301 7.99967H12.6663"
              stroke="#5D6679"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
        <input
          className={styles.subTaskInput}
          type="text"
          name=""
          placeholder="Add sub task..."
          id=""
          value={addSubTask}
          onChange={(e) => setAddSubTask(e.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleAddInputBox();
            }
          }}
        />
      </div>

      <div className={styles.todoCardFooter}>
        <div className={styles.addTimeWrapper}>
          {afterAddedTime ? (
            <div className={styles.time} onClick={() => setViewTime(true)}>
              {taskTime?.formTimeHour}:{taskTime?.formTimeMinute}{" "}
              {taskTime?.formTimePortions} - {taskTime?.toTimeHour}:
              {taskTime?.toTimeMinute} {taskTime?.toTimePortions}
            </div>
          ) : (
            <div className={styles.addTime} onClick={() => setViewTime(true)}>
              <AddTimeIcon />
              <span className={styles.addTimeText}>Add time</span>
            </div>
          )}

          {/*  Time popup  */}
          <div
            className={`${styles.setTimePopUp} ${viewTime && styles.absolute}`}
            ref={viewOrHideTimeRef}
          >
            <div className={styles.timeSet}>
              <p className={styles.form}>form</p>
              <div className={styles.times}>
                <div className={styles.hourAndMinWrapper}>
                  <div className={styles.timeWrapper}>
                    <input
                      className={styles.hourNumber}
                      type="number"
                      value={taskTime?.formTimeHour}
                      onChange={(e) =>
                        setTaskTime({
                          ...taskTime,
                          formTimeHour: e.target.value,
                        })
                      }
                    />
                    <label className={styles.timeType}>hour</label>
                  </div>
                  <div className={styles.dotWrapper}>
                    <span></span>
                    <span></span>
                  </div>
                  <div className={styles.timeWrapper}>
                    <input
                      className={styles.hourNumber}
                      type="number"
                      value={taskTime?.formTimeMinute}
                      onChange={(e) =>
                        setTaskTime({
                          ...taskTime,
                          formTimeMinute: e.target.value,
                        })
                      }
                    />
                    <label className={styles.timeType}>minute</label>
                  </div>
                </div>
                <div className={styles.timeStampWrapper}>
                  <p
                    className={`${styles.timeStamp} ${
                      taskTime?.formTimePortions === "AM" &&
                      styles.selectedTimePortion
                    }`}
                    onClick={(e) =>
                      setTaskTime({
                        ...taskTime,
                        formTimePortions: "AM",
                      })
                    }
                  >
                    AM
                  </p>
                  <p
                    className={`${styles.timeStamp} ${
                      taskTime?.formTimePortions === "PM" &&
                      styles.selectedTimePortion
                    }`}
                    onClick={(e) =>
                      setTaskTime({
                        ...taskTime,
                        formTimePortions: "PM",
                      })
                    }
                  >
                    PM
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.timeSet}>
              <p className={styles.to}>to</p>
              <div className={styles.times}>
                <div className={styles.hourAndMinWrapper}>
                  <div className={styles.timeWrapper}>
                    <input
                      className={styles.hourNumber}
                      type="number"
                      value={taskTime.toTimeHour}
                      onChange={(e) =>
                        setTaskTime({
                          ...taskTime,
                          toTimeHour: e.target.value,
                        })
                      }
                    />
                    <label className={styles.timeType}>hour</label>
                  </div>
                  <div className={styles.dotWrapper}>
                    <span></span>
                    <span></span>
                  </div>
                  <div className={styles.timeWrapper}>
                    <input
                      className={styles.hourNumber}
                      type="number"
                      value={taskTime.toTimeMinute}
                      onChange={(e) =>
                        setTaskTime({
                          ...taskTime,
                          toTimeMinute: e.target.value,
                        })
                      }
                    />
                    <label className={styles.timeType}>minute</label>
                  </div>
                </div>
                <div className={styles.timeStampWrapper}>
                  <p
                    className={`${styles.timeStamp} ${
                      taskTime?.toTimePortions === "AM" &&
                      styles.selectedTimePortion
                    }`}
                    onClick={(e) =>
                      setTaskTime({
                        ...taskTime,
                        toTimePortions: "AM",
                      })
                    }
                  >
                    AM
                  </p>
                  <p
                    className={`${styles.timeStamp} ${
                      taskTime?.toTimePortions === "PM" &&
                      styles.selectedTimePortion
                    }`}
                    onClick={(e) =>
                      setTaskTime({
                        ...taskTime,
                        toTimePortions: "PM",
                      })
                    }
                  >
                    PM
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.timeBtnWrapper}>
              <button
                className={styles.cancelTime}
                onClick={() => setViewTime(false)}
              >
                close
              </button>
              <button className={styles.setTimeBtn} onClick={handleAddedTime}>
                Set time
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.todoCardFooter}>
        <div className={styles.addInputBtnWrapper}>
          <button className={styles.cancelTaskBtn} onClick={cancelTask}>
            cancel
          </button>

          {editTaskContent?._id ? (
            <button
              className={styles.addTaskBtn}
              onClick={handleEditTodoSubmit}
            >
              <AddTaskIcon />
              <span>Edit task</span>
            </button>
          ) : (
            <button className={styles.addTaskBtn} onClick={handleTodoSubmit}>
              <AddTaskIcon />
              <span>Add task</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Input;
