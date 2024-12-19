import React from "react";
import styles from "./feedback.module.css";

export const Feedback = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.text}>Связаться с разработчиками:</div>
      <div className={styles.links}>
        <a
          href="https://t.me/ANASTAssssssssssss"
          className={styles.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          @ANASTAsss
        </a>
        <a
          href="https://t.me/arduinoespruino"
          className={styles.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          @arduinoespruino
        </a>
      </div>
    </div>
  );
};
