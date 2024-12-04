import React, { useState, useEffect } from "react";
import Header from "../header/header.jsx";
import Schedule from "../schedule/schedule.jsx";
import useFetch from "../../hooks/useFetch.js";
import styles from "./app.module.css"; // Ваш хук для данных

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

  // Обработка состояния загрузки и ошибок
  if (loading) {
    return (
      <div className={styles.app}>
        <p className={styles.text}>Загрузка данных...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.app}>
        <p className={styles.text}>
          Ошибка при загрузке данных: {error.message}
        </p>
      </div>
    );
  }

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
