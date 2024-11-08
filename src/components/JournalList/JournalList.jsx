import CardButton from "../CardButton/CardButton";
import JournalItem from "../JournalItem/JournalItem";

import { UserContext } from "../../context/user.context";
import { useContext, useState } from "react";

import "./JournalList.css";

export default function JournalList({ data, setItem }) {
  const [selectedItem, setSelectedItem] = useState(null); //add className "selected"

  const { userId } = useContext(UserContext);

  const sortItems = (a, b) => {
    if (a.date < b.date) {
      return 1;
    }
    return -1;
  };

  if (data.length === 0) {
    return <p>Записи нет!!!</p>;
  }

  return (
    <div className="journal-list">
      {data
        .filter((item) => item.userId === userId)
        .sort(sortItems)
        .map((item, index) => (
          <CardButton
            key={item.id} //add ID
            onClick={() => {
              setSelectedItem(item);
              setItem(item);
            }}
            className={selectedItem?.id === item.id ? "selected" : ""} //home work
            // className={selectedItem ? "selected" : ""} //one
          >
            <JournalItem {...item} />
          </CardButton>
        ))}
    </div>
  );
}
