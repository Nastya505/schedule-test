import React from "react";
import Theme from "../theme/theme";

import styles from "./menu.module.css";
import { Footer } from "../footer/footer";

// компонент меню
const Menu = ({ isOpen }) => {
  return (
    <div id="menu" className={`${styles.menu} ${isOpen ? styles.open : ""}`}>
      <Theme />
      <p>
        <Footer />
      </p>
    </div>
  );
};

export default Menu;
