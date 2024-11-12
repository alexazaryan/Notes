import { UserContext } from "../../context/user.context";
import { useContext } from "react";

import "./SelectUser.module.css";

export default function SelectUser() {
  const { userId, setUserId } = useContext(UserContext); //деструктаризация { читать}

  function changeUser(event) {
    setUserId(Number(event.target.value));
  }

  return (
    <div>
      {/* {userId} */}
      <select name="user" id="user" value={userId} onChange={changeUser}>
        <option value="1">Alex</option>
        <option value="2">Macs</option>
      </select>
    </div>
  );
}
