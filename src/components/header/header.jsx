import React, { useEffect, useState } from "react";
import gsap from "gsap";
import Input from "../input/input";
import BurgerMenu from "../burger-menu/burger-menu";
import Menu from "../menu/menu";

import styles from "./header.module.css";

// компонент хедера, принимающий пропсом функцию изменения группы
const Header = ({ handleGroupChange, initialGroup, data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [skipAnimation, setSkipAnimation] = useState(false); // Состояние для пропуска анимации

  useEffect(() => {
    // Проверка на наличие сохраненной группы при загрузке компонента
    const savedGroup = localStorage.getItem("selectedGroup");
    if (savedGroup) {
      setSkipAnimation(true); // Если группа сохранена, пропускаем анимацию
      setHeaderStylesAfterAnimation(); // Устанавливаем конечные стили сразу
    }
  }, []);

  // Функция для установки конечных стилей хедера, если анимация пропускается
  const setHeaderStylesAfterAnimation = () => {
    gsap.set("#title", { display: "none", opacity: 0 });
    gsap.set("#header", {
      opacity: 1,
      backgroundColor: "#292F34",
      color: "var(--text-color-d)",
      border: "1px solid #444C56",
      height: "80px",
      padding: "15px",
      alignItems: "end",
      justifyContent: "flex-end",
      boxShadow: "0px 4px 4px 0px #00000040",
    });
    gsap.set("#input-wrapper", {
      maxWidth: "180px",
      backgroundColor: "#3C444D",
      color: "var(--text-color-d)",
    });
    gsap.set("#burger-menu", { display: "flex", opacity: 1 });
    gsap.set("#schedule", { display: "flex", opacity: 1 });
  };

  // Анимация для инпута
  function inputAnimation() {
    const tl = gsap.timeline();
    tl.fromTo(
      "#icon_input",
      { fill: "var(--text-color)" },
      { fill: "var(--text-color-d)", opacity: 1, duration: 0.1 }
    );
    tl.fromTo(
      "#input",
      { color: "var(--text-color)" },
      { color: "var(--text-color-d)", opacity: 1, duration: 0.1 }
    );
    tl.fromTo(
      "#list",
      { backgroundColor: "var(--input-background)" },
      { backgroundColor: "#3C444D", duration: 0.1 }
    );
    document.getElementById("input").blur();
  }

  // Анимация для header, если выбрана группа
  const headerAnimation = (selectedOptionExists) => {
    const tl = gsap.timeline();
    if (selectedOptionExists && !skipAnimation) {
      tl.to("#title", { display: "none", opacity: 0 });
      tl.to("#header", {
        opacity: 1,
        backgroundColor: "#292F34",
        color: "var(--text-color-d)",
        border: "1px solid #444C56",
        height: "80px",
        padding: "15px",
        alignItems: "end",
        justifyContent: "flex-end",
        duration: 0.1,
        boxShadow: "0px 4px 4px 0px #00000040",
      });
      tl.fromTo(
        "#input-wrapper",
        { opacity: 1, y: 0 },
        {
          maxWidth: "180px",
          y: 0,
          backgroundColor: "#3C444D",
          opacity: 1,
          color: "var(--text-color-d)",
          duration: 0.5,
        }
      );
      tl.add(inputAnimation);
      tl.to("#schedule", { display: "flex", opacity: 1 });
      tl.to("#burger-menu", { display: "flex", opacity: 1, duration: 1 });
    }
  };

  return (
    <div className={styles.headerWrapper}>
      <div className={styles.header} id="header">
        <BurgerMenu isOpen={isOpen} setIsOpen={setIsOpen} />
        {/* Приветствие показывается, только если анимация не была пропущена */}
        {!skipAnimation && (
          <div className={styles.title} id="title">
            <p>Привет 👋🏼</p>
            <p>Чтобы посмотреть расписание введи </p>
            <span className={styles.text}>группу</span>
          </div>
        )}
        <Input
          animation={headerAnimation}
          handleGroupChange={(group) => {
            handleGroupChange(group);
            headerAnimation(true);
          }}
          initialValue={initialGroup}
          data={data}
        />
        <Menu isOpen={isOpen} />
      </div>
    </div>
  );
};

export default Header;
