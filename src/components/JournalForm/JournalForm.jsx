import { useContext, useEffect, useReducer, useRef } from "react";
import Button from "../Button/Button";
import { formReducer, INITIAL_STATE } from "./JournalForm.state.js"; // принимаем dispatch
import Input from "../Input/Input.jsx";

import { UserContext } from "../../context/user.context.jsx";

//import cn from "classnames"; применение классов
import cn from "classnames";
import styles from "./JournalForm.module.css";

export default function JournalForm({ onSubmit, data, onDelete }) {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE); // принимаем dispatch
  const { isValid, values, isFormReady } = formState; // принимаем dispatch

  const { userId } = useContext(UserContext); // id каждого user

  const titleRef = useRef(); // для работы с dom
  const dateRef = useRef();
  const textRef = useRef();

  function deleteNotice() {
    onDelete(data.id);
    dispatchForm({ type: "CLEAR_FORM" });
    dispatchForm({
      type: "SET_VALUE",
      payload: { userId }, //замена
    });
  }

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
    dispatchForm({
      type: "SET_VALUE",
      payload: {
        ...data,
      },
    });

    if (!data) {
      dispatchForm({ type: "CLEAR_FORM" });
      dispatchForm({
        type: "SET_VALUE",
        payload: { userId }, //замена
      });
    }
  }, [data]);

  //Следим за состоянием userId (id каждого users)
  useEffect(() => {
    dispatchForm({
      type: "SET_VALUE",
      payload: {
        userId,
      },
    });
  }, [userId]);

  useEffect(() => {
    let timerId;
    if (!isValid.title || !isValid.text || !isValid.date) {
      focusError(isValid);
      timerId = setTimeout(() => {
        dispatchForm({ type: "RESET_VALIDITY" });
      }, 2000);
    }
  }, [isValid]);

  useEffect(() => {
    if (isFormReady) {
      onSubmit(values);
      dispatchForm({ type: "CLEAR_FORM" });
      dispatchForm({
        type: "SET_VALUE",
        payload: {
          userId,
        },
      });
    }
  }, [isFormReady, onSubmit, values, userId]);

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

    // SUBMIT
    dispatchForm({
      type: "SUBMIT",
    });
  };

  return (
    <form className={styles["journal-form"]} onSubmit={addJournalItem}>
      {/* {userId} */}

      {/* 1 input*/}
      <div>
        <div className={styles["inp-one"]}>
          <h1 className={styles["inp-one-title__delete"]}>
            {data?.id && // title
              data.title.charAt(0).toUpperCase() +
                data.title.slice(1, 30) +
                "..."}
          </h1>

          {data?.id && ( // true
            <button className={styles["delete-img"]}>
              <img src="./delete.svg" alt="#" onClick={deleteNotice} />
            </button>
          )}
        </div>
        <Input
          ref={titleRef}
          name="title"
          type="text"
          value={values.title}
          isValid={!isValid.title}
          onChange={onChange}
          placeholder="Введите название заметки"
          className="myCustomClass"
        />
      </div>

      {/* 2 input  */}
      <label htmlFor="date" className={styles["form-lable"]}>
        <img src="./calendar.svg" alt="Иконка календаря" />
        <span>Дата</span>
      </label>

      <div
        className={`${styles["form-row"]} ${styles["form-row_data"]}`}
        // ref={dateRef}
        // isValid={!isValid.date}
      >
        <Input
          className="form-row_data_input"
          ref={dateRef}
          value={
            values.date ? new Date(values.date).toISOString().slice(0, 10) : ""
          }
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
