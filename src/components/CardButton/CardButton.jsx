import "./CardButton.css";

export default function CardButton({ children, className, ...props }) {
  const sl = `card-button ${className ? className : ""} ${props}`; //первый код

  return (
    <button className={sl} {...props}>
      {children}
    </button>
  );
}
