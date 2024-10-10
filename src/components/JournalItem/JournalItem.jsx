import "./JournalItem.css";

export default function JournalItem({ date, text, title }) {
  const dateOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };

  const formattedDate = new Intl.DateTimeFormat("uk-UA", dateOptions).format(
    date
  );

  return (
    <>
      <h2 className="journal-item__header">{title}</h2>
      <div className="journal-item__body">
        <div className="journal-item__date">{formattedDate}</div>
        <div className="journal-item__text">{text}</div>
      </div>
    </>
  );
}
