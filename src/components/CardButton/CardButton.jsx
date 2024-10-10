import "./CardButton.css";

export default function CardButton({ children, className, ...props }) {
  const sl = `card-button ${className ? className : ""}`;

  return (
    <button className={sl} {...props}>
      {children}
      {console.log("**")}
    </button>
  );
}
