import CardButton from "../CardButton/CardButton";
import JournalItem from "../JournalItem/JournalItem";

import "./JournalList.css";

export default function JournalList({ data }) {
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
      {data.sort(sortItems).map((item, index) => (
        <CardButton key={index}>
          <JournalItem {...item} />
        </CardButton>
      ))}
    </div>
  );
}
