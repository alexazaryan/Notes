import { useId } from "react";

export const INITIAL_STATE = {
  isValid: { title: true, text: true, date: true },
  values: { title: "", date: "", text: "", tag: "" },
  isFormReady: false,
};
// initialState
export function formReducer(state, action) {
  // state — это текущее состояние
  // action — это действие, которое изменяет состояние
  // payload  — данные, которые нужно использовать для изменения состояния (например, новые значения формы).
  // type — тип действия, который определяет, что именно нужно сделать (например, "SUBMIT", "RESET")
  //action это case "SUBMIT": ..... payload это все значения  title text, date

  switch (action.type) {
    case "SUBMIT": {
      const titleValidity = state.values.title.trim().length;
      const textValidity = state.values.text.trim().length;
      const dateValidity = state.values.date;

      return {
        ...state,
        isValid: {
          title: titleValidity,
          text: textValidity,
          date: dateValidity,
        },

        isFormReady: titleValidity && textValidity && dateValidity,
      };
    }

    case "RESET_VALIDITY":
      return { ...state, isValid: INITIAL_STATE.isValid };

    case "SET_VALUE": {
      return {
        ...state,
        values: {
          ...state.values,
          ...action.payload,
        },
      };
    }

    case "CLEAR_FORM": {
      return INITIAL_STATE ; // Сброс состояния до начального
    }

    default:
      return state; // Возвращаем текущее состояние
  }
}
