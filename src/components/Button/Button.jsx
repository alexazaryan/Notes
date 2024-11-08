import styles from "./Button.module.css";

export default function Button({ children, onClick, className }) { //...props
  return (
    <button
      onClick={onClick}
      className={`${styles["btn"]} ${styles["btn-blue"]} ${styles[className]}`}
    >
      {children}
    </button>
  );
}
