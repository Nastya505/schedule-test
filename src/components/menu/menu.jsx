import React from "react";
import Theme from "../theme/theme";

import styles from "./menu.module.css";
import { Feedback } from "../feedback/feedback";

// компонент меню
const Menu = ({ isOpen }) => {
  return (
    <div id="menu" className={`${styles.menu} ${isOpen ? styles.open : ""}`}>
      <Theme />
      <div>
        <Feedback />
      </div>
    </div>
  );
};

export default Menu;
