import React from "react";
import styles from "./task.module.css";
import { TbTrash } from "react-icons/tb";
import { BsFillCheckCircleFill } from "react-icons/bs";
// import CheckIcon from '@mui/icons-material/Check';
// import VerifiedIcon from '@mui/icons-material/Verified';
// import DoneIcon from '@mui/icons-material/Done';

function Task({ id, task, onComplete, onDelete}) {
  return (
    <div className={styles.task}>
      <button
        className={styles.checkContainer}
        onClick={() => onComplete(task.id)}
      >
        {task.isCompleted ? <BsFillCheckCircleFill /> : <div />}
      </button>

      <p className={task.isCompleted ? styles.textCompleted : ""}>{task.text}</p>

      <button className={styles.deleteButton} onClick={()=> onDelete(task.id)}>
        <TbTrash size={20} />
      </button>
    </div>
  );
}

export default Task;
