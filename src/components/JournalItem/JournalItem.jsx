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

  function firstBigLetter(text) {
    if (text.length > 40) {
      return [...text][0].toUpperCase() + text.slice(1, 40) + "..."; //charAt(0) or [...title] первый символ
    } else {
      return [...text][0].toUpperCase() + text.slice(1);
    }
  }
  return (
    <>
      <h2 className="journal-item__header">
        {/* {title.length > 40
          ? [...title][0].toUpperCase() + title.slice(1, 40) + "..." //charAt(0) or [...title] первый символ
          : [...title][0].toUpperCase() + title.slice(1)} */}
        {firstBigLetter(title)}
      </h2>
      <div className="journal-item__body">
        <div className="journal-item__date">{formattedDate}</div>

        <div className="journal-item__text">
          {/* {text.length > 40
            ? [...text][0].toUpperCase() + text.slice(1, 40) + "..."
            : [...text][0].toUpperCase() + text.slice(1)} */}
          {firstBigLetter(text)}
        </div>
      </div>
    </>
  );
}
