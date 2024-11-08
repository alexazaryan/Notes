import JournalList from "./components/JournalList/JournalList";
import LeftPanel from "./components/LeftPanel/LeftPanel";
import JournalAddButton from "./components/JournalAddButton/JournalAddButton";
import Body from "./components/Body/Body";
import JournalForm from "./components/JournalForm/JournalForm";
import useLocalStorage from "./hooks/use-localstorage.hooks";
import Header from "./components/Header/Header";

import { UserContextProvider } from "./context/user.context";
import { useState } from "react";

import "./App.css";

function mapItems(items) {
  if (!items) {
    return [];
  }
  return items.map((item) => ({
    ...item,
    date: new Date(item.date),
  }));
}

function App() {
  const [items, setItems] = useLocalStorage(["data"]); // массив всех нотайсов
  const [selectedItem, setSelectedItem] = useState(null); //информация о выбранном нотайсе

  function deleteItem(id) {
    setItems([...items.filter((item) => item.id !== id)]);
    setSelectedItem({});
  }

  const addItem = (item) => {
    if (!item.id) {
      setItems([
        ...mapItems(items),
        {
          ...item,
          date: new Date(item.date),
          id: items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1,
        },
      ]);
    } else {
      setItems([
        ...mapItems(items).map((element) => {
          if (element.id === item.id) {
            return { ...item };
          }
          return element;
        }),
      ]);
    }
  };

  return (
    <UserContextProvider>
      <div className="app">
        <LeftPanel>
          <Header />
          <JournalAddButton clearForm={() => setSelectedItem(null)} />
          <JournalList setItem={setSelectedItem} data={mapItems(items)} />
        </LeftPanel>
        <Body>
          <JournalForm
            onSubmit={addItem}
            data={selectedItem}
            onDelete={deleteItem}
          />
        </Body>
      </div>
    </UserContextProvider>
  );
}

export default App;
