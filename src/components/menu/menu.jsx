import React from 'react';
import Theme from '../theme/theme';

import styles from "./menu.module.css"

// компонент меню
const Menu = ({isOpen}) => {
  return (
    <div id="menu" className={`${styles.menu} ${isOpen ? styles.open : ''}`}>
        <Theme/>
      </div>
  )
}

export default Menu