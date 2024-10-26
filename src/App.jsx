import { useState, useEffect } from "react";

import JournalList from "./components/JournalList/JournalList";
import LeftPanel from "./components/LeftPanel/LeftPanel";
import JournalAddButton from "./components/JournalAddButton/JournalAddButton";
import Body from "./components/Body/Body";
import JournalForm from "./components/JournalForm/JournalForm";

import "./App.css";

// сохранять данные после кнопи отправить веденный инпут проверять сосояние изменения и как только изменяется сосояние добавлять в локалсторж

function App() {
  const [items, setItems] = useState([]);

  // uselocalStorage - 

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("data"));

    if (data) {
      let dataNew = data.map((item) => ({
        ...item,
        date: new Date(item.date),
      }));
      setItems(dataNew);
    }
  }, []);

  useEffect(() => {
    if (items.length) {
      localStorage.setItem("data", JSON.stringify(items)); // save in localStorage
    }
  }, [items]);

  const addItem = (item) => {
    setItems((oldItems) => [
      ...oldItems,

      {
        title: item.title,
        text: item.text,
        date: new Date(item.date),
        id: Math.max(...oldItems.map((item) => item.id)) + 1,
      },
    ]);
  };

  return (
    <div className="app">
      <LeftPanel>
        <JournalAddButton />
        <JournalList data={items} />
      </LeftPanel>
      <Body>
        <JournalForm onSubmit={addItem} />
      </Body>
    </div>
  );
}

export default App;
