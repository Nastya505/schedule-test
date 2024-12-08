import React from "react";
import Theme from "../theme/theme";

import styles from "./menu.module.css";
import { Feedback } from "../feedback/feedback";

// компонент меню
const Menu = ({ isOpen }) => {
  return (
    <div id="menu" className={`${styles.menu} ${isOpen ? styles.open : ""}`}>
      <Theme />
      <p>
        <Feedback />
      </p>
    </div>
  );
};

export default Menu;
