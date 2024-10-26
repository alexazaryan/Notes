import { useState } from "react";
import Button from "../Button/Button";

import styles from "./JournalForm.module.css";

//export default 
function JournalFormOld({ onAddNewItem }) {
  const initialState = { title: true, text: true, date: true };
  const [formValueState, setFormValueState] = useState(initialState);
  console.log(formValueState);

  const addJournalItem = (event) => {
    event.preventDefault();

    const formDate = new FormData(event.target);
    const formProps = Object.fromEntries(formDate); //.entries()

    let isFormValue = true;

    if (!formProps.title.trim().length) {
      setFormValueState((state) => ({ ...state, title: false }));
      isFormValue = false;
    }

    if (!formProps.text.trim().length) {
      setFormValueState((state) => ({ ...state, text: false }));
      isFormValue = false;
    }

    if (!formProps.date) {
      setFormValueState((state) => ({ ...state, date: false }));
      isFormValue = false;
    }

    if (!isFormValue) {
      return;
    }

    onAddNewItem(formProps);
  };

  const now = new Date();
  const nextWeek = new Date(now);

  return (
    <form className={styles["journal-form"]} onSubmit={addJournalItem}>
      {/* 1 input*/}
      <div>
        <input
          placeholder="Введите название заметки"
          type="text"
          name="title"
          className={`${styles["input"]} ${
            formValueState.title ? "" : styles["invalid"]
          }`}
        />
      </div>

      {/* 2 input  */}
      <label htmlFor="date" className={styles["form-lable"]}>
        <img src="./calendar.svg" alt="Иконка календаря" />
        <span>Дата</span>
      </label>
      <div className={styles["form-row"]}>
        <input
          type="date"
          name="date"
          className={`${styles["input"]} ${
            formValueState.date ? "" : styles["invalid"]
          }`}
        />
      </div>

      {/* 3 input*/}
      <label htmlFor="tag" className={styles["form-lable"]}>
        <img src="./folder.svg" alt="Иконка метки" />
        <span>Метки</span>
      </label>
      <div className={styles["form-row"]}>
        <input type="text" name="tag" className={`${styles["input"]}`} />
      </div>
      <div className={styles["form-row"]}>
        <textarea
          name="text"
          className={`${styles["input"]} ${
            formValueState.text ? "" : styles["invalid"]
          }`}
        ></textarea>
      </div>
      <Button type="submit">Save "Сохранить"</Button>
    </form>
  );
}
