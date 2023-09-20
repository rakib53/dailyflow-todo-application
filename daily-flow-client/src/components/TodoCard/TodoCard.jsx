import React, { useEffect, useRef, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addInputValue } from "../../features/addInputSlice/addInputSlice";
import { editTaskValue } from "../../features/editTaskSlice/editTaskSlice";
import { openModal } from "../../features/openModalSlice/openModalSlice";
import {
  useDeleteSubTaskMutation,
  useDeleteTaskMutation,
  useUpdateSubTaskStatusMutation,
  useUpdateTaskStatusMutation,
} from "../../features/tasksSlice/tasksApi";
import styles from "../../pages/DailyRoutine/DailyRoutine.module.css";
import CompletedIcon from "../SVG/CompletedIcon";
import DeleteIcon from "../SVG/DeleteIcon";
import OngoingIcon from "../SVG/OngoingIcon";
import TodoIcon from "../SVG/TodoIcon";

const TodoCard = ({ taskInfo, todo, ongoing, completed }) => {
  const { name, tasks, status, time, userId, _id, date } = taskInfo;
  const [visibleMoreOption, setVisibleMoreOption] = useState(false);
  const viewOrHideMoreOptionRef = useRef(null);
  const navigate = useNavigate();
  const { isOpenModal, modalType } = useSelector((state) => state.modal);

  // Dispatch Hook
  const dispatch = useDispatch();
  // Deleting a task throw redux hook
  const [
    deleteTask,
    { data: deletedTask, isLoading, isError, error, refetch },
  ] = useDeleteTaskMutation();

  // Update task status throw redux hook
  const [updateTaskStatus, { data: updateTaskStatusResponse }] =
    useUpdateTaskStatusMutation();
  const [updateSubTaskStatus, { data: updateSubTaskResponse }] =
    useUpdateSubTaskStatusMutation();
  const [deleteSubTask, { data: deletedSubTaskResponse }] =
    useDeleteSubTaskMutation();

  // Delete a task
  const handleDeleteTask = ({ userId, taskId }) => {
    const deleteTaskObj = {
      userId,
      taskId,
    };
    deleteTask(deleteTaskObj);
  };

  // Update Task Status
  const handleUpdateTaskStatus = ({ userId, taskId, status }) => {
    const updateTaskStatusObj = {
      userId,
      taskId,
      status,
    };
    updateTaskStatus(updateTaskStatusObj);
  };

  // Delete a sub task function
  const handleDeleteSubTask = ({ userId, taskId, subTaskId }) => {
    const dltSubTaskInfo = {
      userId,
      taskId,
      subTaskId,
    };

    deleteSubTask(dltSubTaskInfo);
  };

  // click on the button to open a input based on the content
  const handleEditTask = (value) => {
    dispatch(openModal("editTask"));
    dispatch(addInputValue(value));
    dispatch(editTaskValue(taskInfo));
  };

  // updating sub task status function
  const handleUpdateSubTaskStatus = ({ subTaskId, subTaskStatus }) => {
    updateSubTaskStatus({ taskId: _id, subTaskId, subTaskStatus });
  };

  // checking if the user click outside of the
  // time popup the popup will disappear
  useEffect(() => {
    function handleClickOutSide(event) {
      if (
        viewOrHideMoreOptionRef.current &&
        !viewOrHideMoreOptionRef.current.contains(event.target)
      ) {
        setVisibleMoreOption(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, [viewOrHideMoreOptionRef, visibleMoreOption]);

  return (
    <div className={styles.todoCard}>
      <div className={styles.todoCardHeader}>
        <h3 className={styles.todoTitle}>{name}</h3>
        <div className={styles.todoMoreOptionWrapper}>
          <div onClick={() => setVisibleMoreOption(!visibleMoreOption)}>
            <svg
              className={styles.todoMoreOptionBtn}
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <g id="dots-vertical">
                <g id="Icon">
                  <path
                    d="M10.0013 10.833C10.4615 10.833 10.8346 10.4599 10.8346 9.99967C10.8346 9.53944 10.4615 9.16634 10.0013 9.16634C9.54106 9.16634 9.16797 9.53944 9.16797 9.99967C9.16797 10.4599 9.54106 10.833 10.0013 10.833Z"
                    stroke="#98A2B3"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.0013 4.99967C10.4615 4.99967 10.8346 4.62658 10.8346 4.16634C10.8346 3.7061 10.4615 3.33301 10.0013 3.33301C9.54106 3.33301 9.16797 3.7061 9.16797 4.16634C9.16797 4.62658 9.54106 4.99967 10.0013 4.99967Z"
                    stroke="#98A2B3"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.0013 16.6663C10.4615 16.6663 10.8346 16.2932 10.8346 15.833C10.8346 15.3728 10.4615 14.9997 10.0013 14.9997C9.54106 14.9997 9.16797 15.3728 9.16797 15.833C9.16797 16.2932 9.54106 16.6663 10.0013 16.6663Z"
                    stroke="#98A2B3"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </g>
            </svg>
          </div>

          <div
            className={`${styles.moreOption} ${
              visibleMoreOption && styles.moreOptionVisible
            }`}
            ref={viewOrHideMoreOptionRef}
          >
            {!todo && (
              <button
                className={styles.cardMoreOptionBtn}
                onClick={() =>
                  handleUpdateTaskStatus({
                    userId,
                    taskId: _id,
                    status: "todo",
                  })
                }
              >
                <TodoIcon />
                <span>to do</span>
              </button>
            )}

            {!ongoing && (
              <button
                className={styles.cardMoreOptionBtn}
                onClick={() =>
                  handleUpdateTaskStatus({
                    userId,
                    taskId: _id,
                    status: "ongoing",
                  })
                }
              >
                <OngoingIcon />
                <span>on Going</span>
              </button>
            )}
            {!completed && (
              <button
                className={styles.cardMoreOptionBtn}
                onClick={() =>
                  handleUpdateTaskStatus({
                    userId,
                    taskId: _id,
                    status: "completed",
                  })
                }
              >
                <CompletedIcon />
                <span>completed</span>
              </button>
            )}
            <button
              className={styles.cardMoreOptionBtn}
              onClick={() => handleEditTask("editTask")}
            >
              <CiEdit className={styles.todoEditIcon} />
              <span className={styles.cardMoreEditBtnText}>Edit</span>
            </button>
            <button
              className={styles.cardMoreOptionBtn}
              onClick={() => handleDeleteTask({ userId, taskId: _id })}
            >
              <DeleteIcon />
              <span className={styles.cardMoreDeleteBtnText}>delete</span>
            </button>
          </div>
        </div>
      </div>
      <div className={styles.todoCardBody}>
        {tasks?.map((subTask) => (
          <div className={styles.todoCardItem} key={subTask?._id}>
            <div
              onClick={() =>
                handleUpdateSubTaskStatus({
                  subTaskId: subTask?._id,
                  subTaskStatus: !subTask?.status,
                })
              }
            >
              <input
                className="secondary-custom-checkbox"
                type="checkbox"
                name="coldMessage"
                id={subTask?._id}
                defaultChecked={subTask?.status}
              />
              <label htmlFor={subTask?._id} className={styles.todoList}>
                {subTask?.content}
              </label>
            </div>
            <div
              className={styles.todoCardDeleteIconWrapper}
              onClick={() =>
                handleDeleteSubTask({
                  userId: userId,
                  taskId: _id,
                  subTaskId: subTask?._id,
                })
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <rect
                  x="0.5"
                  y="0.5"
                  width="19"
                  height="19"
                  rx="9.5"
                  fill="white"
                />
                <path
                  d="M12.5 7.5L7.5 12.5M7.5 7.5L12.5 12.5"
                  stroke="#48505E"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <rect
                  x="0.5"
                  y="0.5"
                  width="19"
                  height="19"
                  rx="9.5"
                  stroke="#F0F1F3"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.todoCardFooter}>
        {time?.form && (
          <p className={styles.time}>
            {time?.form &&
              time?.form?.hour +
                `:` +
                time?.form?.minute +
                ` ` +
                time?.form?.portion +
                `-` +
                time?.to?.hour +
                `:` +
                time?.to?.minute +
                ` ` +
                time?.to?.portion}
          </p>
        )}
      </div>
    </div>
  );
};

export default TodoCard;
