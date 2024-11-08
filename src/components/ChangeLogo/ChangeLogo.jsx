import { useState } from "react";
import Button from "../Button/Button";

import styles from "./ChangeLogo.module.css";

export default function ChangeLogo() {
  const logos = ["./logo.svg", "./vite.svg"];
  const [logoIndex, setLogoIndex] = useState(0);

  function chengLogo() {
    setLogoIndex((prevIndex) => Number(!prevIndex));
    // setLogoIndex((prevIndex) => (prevIndex + 1) % logos.length);
  }
  return (
    <>
      <img src={logos[logoIndex]} alt="#" className={styles["logo"]} />
      <Button onClick={chengLogo} className="my-style-button">
        Change Logo
      </Button>
    </>
  );
}
