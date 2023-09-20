import React from "react";
import styles from "../../pages/DailyRoutine/DailyRoutine.module.css";
import Chart from "./Chart";

const ProgressReport = ({ todoTask, ongoingTask, completedTasks }) => {
  const totalTask = todoTask + ongoingTask + completedTasks;
  const overAllProgress = (100 * completedTasks) / totalTask;

  return (
    <div className={styles.todoProgressReport}>
      <div className={styles.chartWrapper}>
        <Chart
          todo={todoTask}
          ongoing={ongoingTask}
          completed={completedTasks}
        />
      </div>
      <div className={styles.OverAllProgress}>
        <p className={styles.progressText}>Overall progress</p>
        <p className={styles.progressPercentage}>
          {overAllProgress.toFixed(2)}%
        </p>
      </div>
      <div className={styles.tasks}>
        <div className={styles.taskList}>
          <div className={styles.taskType}>
            <span className="todo"></span>
            <p className={styles.taskCount}>To do</p>
          </div>
          <p className={styles.taskCount}>
            {todoTask <= 9 ? `0` + todoTask : todoTask}{" "}
            {todoTask === 1 ? "task" : "tasks"}
          </p>
        </div>
        <div className={styles.taskList}>
          <div className={styles.taskType}>
            <span className="onGoing"></span>
            <p className={styles.taskCount}>On going</p>
          </div>
          <p className={styles.taskCount}>
            {ongoingTask <= 9 ? `0` + ongoingTask : ongoingTask}{" "}
            {ongoingTask === 1 ? "task" : "tasks"}
          </p>
        </div>
        <div className={styles.taskList}>
          <div className={styles.taskType}>
            <span className="completed"></span>
            <p className={styles.taskCount}>Completed</p>
          </div>
          <p className={styles.taskCount}>
            {completedTasks <= 9 ? `0` + completedTasks : completedTasks}{" "}
            {completedTasks === 1 ? "task" : "tasks"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProgressReport;
