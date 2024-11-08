import { forwardRef } from "react"; //почитать

import styles from "./Input.module.css";
import cn from "classnames";

const Input = forwardRef(function Input(
  { className, isValid = false, ...props },
  ref
) {
  return (
    <input
      ref={ref}
      {...props}
      // className={cn(className, styles["input"], { было
      className={cn(styles[className], styles["input"], {
        [styles["invalid"]]: isValid, //true
      })}
    />
  );
});

export default Input;
