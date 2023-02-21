import { ACTIONS } from "./TodoInputAndSetting";
import notDoneIMG from "./assets/empty.png";
import doneIMG from "./assets/circle.png";
import trashIMG from "./assets/trash.png";
import TodoCSS from "./todo.module.css";
import { useState } from "react";

const Todo = ({ todo, dispatch, date }) => {
  const [hour, setHour] = useState(date.getHours());
  const [minutes, setMinutes] = useState(date.getMinutes());

  const weekDay: Array<string> = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <div className={TodoCSS.todo}>
      <div className={TodoCSS.todoSpanDiv}>
        <h1
          style={{ color: todo.complete ? "#aaa" : "#000" }}
          className={TodoCSS.span}
        >
          {todo.names}
        </h1>
        <p className={TodoCSS.addTimeAndDate}>
          {weekDay[date.getDay()] + " at " + hour + ":" + minutes}
        </p>
      </div>
      <div className={TodoCSS.completeAndDeleteDiv}>
        <img
          src={todo.complete ? doneIMG : notDoneIMG}
          onClick={() =>
            dispatch({ type: ACTIONS.TOGGLE_TODO, payload: { id: todo.id } })
          }
        />
        <img
          src={trashIMG}
          onClick={() =>
            dispatch({ type: ACTIONS.DELETE_TODO, payload: { id: todo.id } })
          }
        />
      </div>
    </div>
  );
};

export default Todo;
