import React, { useState } from 'react';
import Header from '../header/header.jsx';
import Schedule from '../schedule/schedule.jsx';

import styles from "./app.module.css";


function App() {
  // какая группа выбрана
  const [selectedGroup, setSelectedGroup] = useState("");

  return (
    <div className={styles.app}>
      {/* <div className={styles.headerWrapper}> */}
        <Header handleGroupChange={setSelectedGroup} />   
      {/* </div> */}
      <Schedule group={selectedGroup} />
    </div>
  )
}

export default App;
