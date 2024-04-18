import React, { useState } from 'react';
import Header from '../header/header.jsx';
import Schedule from '../schedule/schedule.jsx';

import styles from "./app.module.css";


function App() {
  // какая группа выбрана
  const [selectedGroup, setSelectedGroup] = useState("");
  return (
    <div className={styles.app}>
      <Header handleGroupChange={setSelectedGroup} />   
      <Schedule group={selectedGroup} />
    </div>
  )
}

export default App;
