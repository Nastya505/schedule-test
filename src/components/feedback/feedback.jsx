import React from "react";
import styles from "./feedback.module.css";

export const Feedback = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.text}>Связаться с разработчиками:</p>
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
    </footer>
  );
};
