import { useEffect, useReducer, useRef } from "react";
import Button from "../Button/Button";
import { formReducer, INITIAL_STATE } from "./JournalForm.state.js"; // принимаем dispatch
import Input from "../Input/Input.jsx";

import styles from "./JournalForm.module.css";
//import cn from "classnames"; применение классов
import cn from "classnames";

export default function JournalForm({ onSubmit }) {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE); // принимаем dispatch

  const { isValid, values, isFormReady } = formState; // принимаем dispatch

  const titleRef = useRef(); // для работы с dom
  const dateRef = useRef();
  const textRef = useRef();

  const focusError = (isValid) => {
    switch (true) {
      case !isValid.title:
        titleRef.current.focus();
        break;

      case !isValid.date:
        dateRef.current.focus();
        break;

      case !isValid.text:
        textRef.current.focus();
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    let timerId;
    if (!isValid.title || !isValid.text || !isValid.date) {
      focusError(isValid);
      timerId = setTimeout(() => {
        dispatchForm({ type: "RESET_VALIDITY" });
        // setFormValueState(initialState);
      }, 2000);
    }
  }, [isValid]);

  // =======================================
  useEffect(() => {
    if (isFormReady) {
      onSubmit(values);
      dispatchForm({ type: "CLEAR_FORM" });
    }
  }, [isFormReady, onSubmit, values]);

  // ========================================

  const onChange = (event) => {
    dispatchForm({
      type: "SET_VALUE",
      payload: {
        [event.target.name]: event.target.value,
      },
    });
  };

  const addJournalItem = (event) => {
    event.preventDefault();

    // принимаем dispatch
    dispatchForm({
      type: "SUBMIT",
    });
  };
  return (
    <form className={styles["journal-form"]} onSubmit={addJournalItem}>
      {/* 1 input*/}
      <div>
        <Input
          ref={titleRef}
          name="title"
          type="text"
          value={values.title}
          isValid={!isValid.title}
          onChange={onChange}
          placeholder="Введите название заметки"
        />
      </div>

      {/* 2 input  */}
      <label htmlFor="date" className={styles["form-lable"]}>
        <img src="./calendar.svg" alt="Иконка календаря" />
        <span>Дата</span>
      </label>
      <div className={styles["form-row"]}>
        <Input
          ref={dateRef}
          value={values.date}
          onChange={onChange}
          isValid={!isValid.date}
          type="date"
          name="date"
        />
      </div>

      {/* 3 input*/}
      <label htmlFor="tag" className={styles["form-lable"]}>
        <img src="./folder.svg" alt="Иконка метки" />
        <span>Метки</span>
      </label>
      <div className={styles["form-row"]}>
        <Input value={values.tag} onChange={onChange} type="text" name="tag" />
      </div>

      <div className={styles["form-row"]}>
        <textarea
          ref={textRef}
          value={values.text}
          onChange={onChange}
          name="text"
          className={cn(styles["input"], {
            [styles["invalid"]]: !isValid.text, //true
          })}
        ></textarea>
      </div>
      <Button type="submit">Save "Сохранить"</Button>
    </form>
  );
}
