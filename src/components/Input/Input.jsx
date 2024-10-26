import cn from "classnames";

import styles from "./Input.module.css";
import { forwardRef } from "react"; //почитать

const Input = forwardRef(function Input(
  { className, isValid = false, ...props },
  ref
) {
  return (
    <input
      ref={ref}
      {...props}
      className={cn(styles["input"], {
        [styles["invalid"]]: isValid, //true
      })}
    />
  );
});

export default Input;
