import React, { useReducer, useState, useEffect } from "react";
import Todo from "./Todo";
import TodoInputAndSettingCSS from "./TodoInputAndSetting.module.css";
import notDoneIMG from "./assets/empty.png";
import doneIMG from "./assets/circle.png";
import HeaderIMG from "./assets/header.svg";

export const ACTIONS = {
  ADD_TODO: "add_todo",
  TOGGLE_TODO: "toggle_todo",
  DELETE_TODO: "delete_todo",
  ACTIVE_TODO: "active_todo",
};

interface actionTypes {
  names: string;
  type: string;
  payload: {
    names: todoTypes;
    id: Date;
    complete: boolean;
  };
}
function reducer(
  todos: Array<{ complete: boolean; id: Date }>,
  action: actionTypes
) {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return [...todos, newTodo(action.payload.names)];

    case ACTIONS.ACTIVE_TODO:
      return [...todos, doneTodo(action.payload.names)];

    case ACTIONS.TOGGLE_TODO:
      return todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, complete: !todo.complete };
        }
        return todo;
      });

    case ACTIONS.DELETE_TODO:
      return todos.filter((todo) => todo.id !== action.payload.id);
    default:
      return todos;
  }
}

interface todoTypes {
  id: Date;
  names: string;
  complete: boolean;
}

function newTodo(names: todoTypes) {
  return { id: Date.now(), names: names, complete: false };
}
function doneTodo(names: todoTypes) {
  return { id: Date.now(), names: names, complete: true };
}

const TodoInputAndSetting = () => {
  const [names, setNames] = useState("");
  const [todos, dispatch] = useReducer(reducer, []);
  const [active, setActive] = useState(false);
  const [dateState, setDateState] = useState(new Date());

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(active);
    if (active === true) {
      dispatch({ type: ACTIONS.ACTIVE_TODO, payload: { names: names } });
    } else {
      dispatch({ type: ACTIONS.ADD_TODO, payload: { names: names } });
    }

    setNames("");
  };

  const weekDay: Array<string> = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];

  useEffect(() => {
    setInterval(() => setDateState(new Date()), 60000);
  }, []);

  const date = new Date();
  const dd = date.getDay();
  const mm = date.getMinutes();
  const hr = date.getHours();
  const wd = date.getUTCDate();
  console.log(wd);
  return (
    <div className={TodoInputAndSettingCSS.todoAppDiv}>
      <form onSubmit={handleSubmit} className={TodoInputAndSettingCSS.form}>
        <div>
          <img src={HeaderIMG} />
          <div className={TodoInputAndSettingCSS.timeAndDateDiv}>
            <span className={TodoInputAndSettingCSS.date_dd}>
              {weekDay[dd] + " " + wd}
            </span>
            <h1 className={TodoInputAndSettingCSS.date_hr_mm}>
              {hr + ":" + mm}
            </h1>
          </div>
        </div>
        <div className={TodoInputAndSettingCSS.inputDiv}>
          <img
            src={active ? doneIMG : notDoneIMG}
            onClick={() => setActive(!active)}
          />
          <input
            type={"text"}
            value={names}
            onChange={(e) => setNames(e.target.value)}
            placeholder="Note"
            className={TodoInputAndSettingCSS.input}
            required
          />
        </div>
        <button type="submit" className={TodoInputAndSettingCSS.btn}>
          +
        </button>
      </form>
      {todos.map((todo) => {
        return (
          <Todo key={todo.id} date={date} todo={todo} dispatch={dispatch} />
        );
      })}
    </div>
  );
};

export default TodoInputAndSetting;
