import CardButton from "../CardButton/CardButton";
import JournalItem from "../JournalItem/JournalItem";

import "./JournalList.css";

export default function JournalList({ data }) {
  return (
    <div className="journal-list">
      {data.map((item, index) => (
        <CardButton key={index}>
          <JournalItem {...item} />
        </CardButton>
      ))}
    </div>
  );
}
