import React, { useState, useEffect } from "react";
import Header from "../header/header.jsx";
import Schedule from "../schedule/schedule.jsx";

import styles from "./app.module.css";

function App() {
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
      />
      <Schedule group={selectedGroup} />
    </div>
  );
}

export default App;
