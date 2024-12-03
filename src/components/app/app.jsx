import React, { useState, useEffect } from "react";
import Header from "../header/header.jsx";
import Schedule from "../schedule/schedule.jsx";
import useFetch from "../../hooks/useFetch.js"; // Ваш хук для данных

import styles from "./app.module.css";

function App() {
  const url = "http://109.172.114.134:8000"; // URL для вашего API
  const { data, loading, error } = useFetch(url); // Хук для получения данных

  // Загружаем выбранную группу из localStorage, если она есть
  const [selectedGroup, setSelectedGroup] = useState(() => {
    return localStorage.getItem("selectedGroup") || "";
  });

  // Сохраняем группу в localStorage при изменении
  useEffect(() => {
    if (selectedGroup) {
      localStorage.setItem("selectedGroup", selectedGroup);
    }
  }, [selectedGroup]);

  return (
    <div className={styles.app}>
      <Header
        handleGroupChange={setSelectedGroup}
        initialGroup={selectedGroup}
        data={data}
      />
      <Schedule group={selectedGroup} data={data} />
    </div>
  );
}

export default App;
