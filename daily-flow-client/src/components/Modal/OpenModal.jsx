import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../features/openModalSlice/openModalSlice";
import Input from "../Input/Input";
import styles from "./OpenModal.module.css";

const OpenModal = ({ modalTitle }) => {
  const { isOpenModal, modalType } = useSelector((state) => state.modal);
  const { task } = useSelector((state) => state.editTaskContent);
  const dispatch = useDispatch();
  let modalContent = null;

  if (isOpenModal && modalType === "addTask") {
    modalContent = <Input />;
  } else if (isOpenModal && modalType === "editTask") {
    modalContent = <Input editTaskContent={task} />;
  }

  return (
    <div className={styles.openModal}>
      <div className={`${styles.modalContent}`}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>{modalTitle}</h2>
          <svg
            onClick={() => dispatch(closeModal(""))}
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M15 5L5 15M5 5L15 15"
              stroke="#667085"
              strokeWidth="1.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        {modalContent}
      </div>
    </div>
  );
};

export default OpenModal;
