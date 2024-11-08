import SelectUser from "../SelectUser/SelectUser";
import ChangeLogo from "../ChangeLogo/ChangeLogo";

import styles from "./Header.module.css";

export default function Header() {
  return (
    <div>
      <ChangeLogo />
      <SelectUser />
    </div>
  );
}
