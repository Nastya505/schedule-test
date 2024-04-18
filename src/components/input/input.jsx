import React, { useState, useEffect} from 'react';
import styles from './input.module.css';
import dataJson from '../../utils/data.json';


// данный компонент отвечает за ввод группы в поисковой строке и выбор группы из списка
const Input = ({ animation, handleGroupChange }) => {
  const [options, setOptions] = useState(null);

  useEffect(() => {
    setOptions(dataJson.groups)
  }, []);

  const [value, setValue] = useState("");
  // Добавляем состояние для хранения предыдущего значения
  const [previousValue, setPreviousValue] = useState(""); 
  const [active, setActive] = useState(false);

  //  проверяет, что значение не пустое и что хотя бы один из вариантов
  //  начинается с введенного значения (без учета регистра).
  const showList = value !== "" &&
    options
      .some(d => d.group.toLowerCase()
      .startsWith(value.toLowerCase()));

  // функция для изменения состояния поисковой строки
  const handleInputChange = (e) => {
    setValue(e.target.value);
    setActive(true);
  };

 // функция для выбора группы
  const handleOptionClick = (selectedOption) => {
    const selectedOptionExists = options.some(option =>option.group.toLowerCase() === selectedOption.toLowerCase());
    if (selectedOptionExists) {
      // Сравниваем текущее значение с предыдущим значением
      if (value !== previousValue) {
        setValue(selectedOption);
        setActive(false);
        animation(selectedOptionExists);
        handleGroupChange(selectedOption);
      }
    }
     // Сохраняем текущее значение в качестве предыдущего значения
    setPreviousValue(selectedOption);
  };

  return (
    <div id='input-wrapper' className={styles.inputWrapper}>
      <svg  width="27" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path id='icon_input' d="M1 20V17.2C1 16.6333 1.14583 16.1125 1.4375 15.6375C1.72917 15.1625 2.11667 14.8 2.6 14.55C3.63333 14.0333 4.68333 13.6458 5.75 13.3875C6.81667 13.1292 7.9 13 9 13C10.1 13 11.1833 13.1292 12.25 13.3875C13.3167 13.6458 14.3667 14.0333 15.4 14.55C15.8833 14.8 16.2708 15.1625 16.5625 15.6375C16.8542 16.1125 17 16.6333 17 17.2V20H1ZM19 20V17C19 16.2667 18.7958 15.5625 18.3875 14.8875C17.9792 14.2125 17.4 13.6333 16.65 13.15C17.5 13.25 18.3 13.4208 19.05 13.6625C19.8 13.9042 20.5 14.2 21.15 14.55C21.75 14.8833 22.2083 15.2542 22.525 15.6625C22.8417 16.0708 23 16.5167 23 17V20H19ZM9 12C7.9 12 6.95833 11.6083 6.175 10.825C5.39167 10.0417 5 9.1 5 8C5 6.9 5.39167 5.95833 6.175 5.175C6.95833 4.39167 7.9 4 9 4C10.1 4 11.0417 4.39167 11.825 5.175C12.6083 5.95833 13 6.9 13 8C13 9.1 12.6083 10.0417 11.825 10.825C11.0417 11.6083 10.1 12 9 12ZM19 8C19 9.1 18.6083 10.0417 17.825 10.825C17.0417 11.6083 16.1 12 15 12C14.8167 12 14.5833 11.9792 14.3 11.9375C14.0167 11.8958 13.7833 11.85 13.6 11.8C14.05 11.2667 14.3958 10.675 14.6375 10.025C14.8792 9.375 15 8.7 15 8C15 7.3 14.8792 6.625 14.6375 5.975C14.3958 5.325 14.05 4.73333 13.6 4.2C13.8333 4.11667 14.0667 4.0625 14.3 4.0375C14.5333 4.0125 14.7667 4 15 4C16.1 4 17.0417 4.39167 17.825 5.175C18.6083 5.95833 19 6.9 19 8ZM3 18H15V17.2C15 17.0167 14.9542 16.85 14.8625 16.7C14.7708 16.55 14.65 16.4333 14.5 16.35C13.6 15.9 12.6917 15.5625 11.775 15.3375C10.8583 15.1125 9.93333 15 9 15C8.06667 15 7.14167 15.1125 6.225 15.3375C5.30833 15.5625 4.4 15.9 3.5 16.35C3.35 16.4333 3.22917 16.55 3.1375 16.7C3.04583 16.85 3 17.0167 3 17.2V18ZM9 10C9.55 10 10.0208 9.80417 10.4125 9.4125C10.8042 9.02083 11 8.55 11 8C11 7.45 10.8042 6.97917 10.4125 6.5875C10.0208 6.19583 9.55 6 9 6C8.45 6 7.97917 6.19583 7.5875 6.5875C7.19583 6.97917 7 7.45 7 8C7 8.55 7.19583 9.02083 7.5875 9.4125C7.97917 9.80417 8.45 10 9 10Z" fill="var(--text-color)"/>
      </svg>
      <input
        id="input"
        className={styles.input}
        type="text"
        value={value}
        onChange={handleInputChange}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
      />
      {value && value.length > 0 && (
        <ul id="list" className={`${styles.list} ${active ? styles.show : ""}`} >
          {showList  &&
            options
              .filter(d => value === "" || (d.group && d.group.toLowerCase().includes(value.toLowerCase())))
              .map((option) => (
                <li key={option.group} onClick={() => handleOptionClick(option.group)}>
                  {option.group}
                </li>

              ))
          }
        </ul>
      )}
    </div>
  );
};

export default Input;
