import React from "react";
import { useDispatch, useSelector } from "react-redux";
import NOTASkImage from "../../assets/images/no_task.png";
import ProgressReport from "../../components/DailyRoutineProgressReport/ProgressReport";
import Loading from "../../components/Loading/Loading";
import OpenModal from "../../components/Modal/OpenModal";
import AddTaskPlusIcon from "../../components/SVG/AddTaskPlusIcon";
import NoTaskPlusIcon from "../../components/SVG/NoTaskPlusIcon";
import TodoCard from "../../components/TodoCard/TodoCard";
import { addInputValue } from "../../features/addInputSlice/addInputSlice";
import { openModal } from "../../features/openModalSlice/openModalSlice";
import { useGetTaskQuery } from "../../features/tasksSlice/tasksApi";
import styles from "./DailyRoutine.module.css";

const DailyRoutine = () => {
  // getting the userInfomation
  const { user } = useSelector((state) => state.authSlice);
  const { isOpenModal, modalType } = useSelector((state) => state.modal);
  // Dispatch Hook
  const dispatch = useDispatch();

  // Getting the user all task
  const {
    data: userTasks,
    isLoading,
    isError,
    error,
  } = useGetTaskQuery({
    userId: user?._id,
  });

  // click on the button to open a input based on the content
  const handleClickInputType = (value) => {
    dispatch(openModal("addTask"));
    dispatch(addInputValue(value));
    // setIsContent(!isContent);
  };

  // Separate objects based on their status
  const todoTasks = userTasks?.tasks?.filter((task) => task?.status === "todo");
  const ongoingTasks = userTasks?.tasks?.filter(
    (task) => task?.status === "ongoing"
  );
  const completedTasks = userTasks?.tasks?.filter(
    (task) => task?.status === "completed"
  );

  let content = null;

  if (isLoading) {
    content = <Loading />;
  }

  if (!isLoading && !isError && userTasks?.tasks?.length === 0) {
    content = (
      <div className={styles.NoTaskMsgContainer}>
        <div className={styles.NoTaskMsg}>
          <img src={NOTASkImage} className={styles.noTaskImage} />

          <div>
            <h3 className={styles.NoTaskText}>No tasks created yet</h3>
            <p className={styles.noTaskDesc}>
              Start to add your to do list clicking on “Plus” Icon or press the
              “Add task” Button
            </p>
          </div>

          <button
            className={styles.noAddTaskBtn}
            onClick={() => handleClickInputType("todo")}
          >
            <NoTaskPlusIcon />
            <span>Add task</span>
          </button>
        </div>
      </div>
    );
  }

  if (!isLoading && !isError && userTasks?.tasks?.length > 0) {
    content = (
      <>
        <div className={styles.todoSingleContentWrapper}>
          {/* todo content wrapper */}
          <div className={styles.todoCardWrapper}>
            {todoTasks?.map((tTask) => {
              return (
                <TodoCard
                  taskInfo={tTask}
                  todo={true}
                  ongoing={false}
                  completed={false}
                  key={tTask?._id}
                />
              );
            })}
          </div>
        </div>
        <div className={styles.todoSingleContentWrapper}>
          {/* Ongoing todo content wrapper */}
          <div className={styles.todoCardWrapper}>
            {ongoingTasks?.map((tTask) => {
              return (
                <TodoCard
                  taskInfo={tTask}
                  todo={false}
                  ongoing
                  completed={false}
                  key={tTask?._id}
                />
              );
            })}
          </div>
        </div>
        <div className={styles.todoSingleContentWrapper}>
          {/* complete todo content wrapper */}
          <div className={styles.todoCardWrapper}>
            {completedTasks?.map((tTask) => {
              return (
                <TodoCard
                  taskInfo={tTask}
                  todo={false}
                  ongoing={false}
                  completed
                  key={tTask?._id}
                />
              );
            })}
          </div>
        </div>
        <div className={styles.todoSingleContentWrapper}>
          <ProgressReport
            todoTask={todoTasks?.length}
            ongoingTask={ongoingTasks?.length}
            completedTasks={completedTasks?.length}
          />
        </div>
      </>
    );
  }

  if (!isLoading && isError) {
    content = (
      <div className={styles.somethingWentWrong}>Something went wrong!</div>
    );
  }

  return (
    <div className={styles.todoContentWrapper}>
      {isOpenModal && modalType === "addTask" && (
        <OpenModal modalTitle={"Add a task"} />
      )}
      {isOpenModal && modalType === "editTask" && (
        <OpenModal modalTitle={"Edit a task"} />
      )}
      <div className={styles.todoHeaderContentWrapper}>
        <div className={styles.todoSingleContentWrapper}>
          {/* todo button */}
          <button
            className="pageBtn todoBtn"
            onClick={() => handleClickInputType("todo")}
          >
            <div className={styles.insideBtn}>
              <p className={styles.btnText}>To Do</p>
              <p className={styles.todosItem}>{todoTasks?.length}</p>
            </div>
            <div>
              <AddTaskPlusIcon />
            </div>
          </button>
        </div>

        <div className={styles.todoSingleContentWrapper}>
          {/* ongoin todo button */}
          <button
            className="pageBtn onGoingBtn"
            onClick={() => handleClickInputType("ongoing")}
          >
            <div className={styles.insideBtn}>
              <p className={styles.btnText}>On going</p>
              <p className={styles.todosItem}>{ongoingTasks?.length}</p>
            </div>
            <div>
              <AddTaskPlusIcon />
            </div>
          </button>
        </div>

        <div className={styles.todoSingleContentWrapper}>
          {/* complete Button */}
          <button
            className="pageBtn completeBtn"
            onClick={() => handleClickInputType("completed")}
          >
            <div className={styles.insideBtn}>
              <p className={styles.btnText}>Completed</p>
              <p className={styles.todosItem}>{completedTasks?.length}</p>
            </div>
            <div>
              <AddTaskPlusIcon />
            </div>
          </button>
        </div>

        <div className={styles.todoSingleContentWrapper}>
          {/* Progress Button */}
          <button className="pageBtn progressReportBtn">
            <span className={styles.btnText}>Progress report</span>
          </button>
        </div>
      </div>

      <div className={styles.todoBodyContentWrapper}>{content}</div>
    </div>
  );
};

export default DailyRoutine;
