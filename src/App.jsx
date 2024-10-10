import JournalList from "./components/JournalList/JournalList";
import JournalAddButton from "./components/JournalAddButton/JournalAddButton";

import LeftPanel from "./components/LeftPanel/LeftPanel";
import Body from "./components/Body/Body";

import "./App.css";

function App() {
  const data = [
    {
      title: "Подготовка к обновлению курсов",
      date: new Date(),
      text: "Горные походы открывают удивительные природные ландшафты, испытывают туристов физически и морально, дают возможность почувствовать себя первопроходцем",
    },
    {
      title: "Подготовка к обновлению курсов",
      date: new Date(),
      text: "Горные походы открывают удивительные природные ландшафты, испытывают туристов физически и морально, дают возможность почувствовать себя первопроходцем",
    },
    {
      title: "Подготовка к обновлению курсов",
      date: new Date(),
      text: "Горные походы открывают удивительные природные ландшафты, испытывают туристов физически и морально, дают возможность почувствовать себя первопроходцем",
    },
  ];

  return (
    <div className="app">
      <LeftPanel>
        <JournalAddButton />
        <JournalList data={data} />
      </LeftPanel>
      <Body>text</Body>
    </div>
  );
}

export default App;
