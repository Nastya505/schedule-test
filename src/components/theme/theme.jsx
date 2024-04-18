import React, { useState, useEffect } from 'react';
import styles from './theme.module.css';

// компонент смены темы
const Theme = () => {
  // получаем сохраненную тему
  const savedDarkMode = localStorage.getItem('darkMode');
  const [darkMode, setDarkMode] = useState(savedDarkMode ? JSON.parse(savedDarkMode) : false);

  // меняем тему
  const handleChange = (event) => {
    const newDarkMode = event.target.checked;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <p className={styles.text}>
      Темная тема
      <input className={styles.checkbox} type="checkbox" checked={darkMode} onChange={handleChange} />
    </p>
  );
};

export default Theme;