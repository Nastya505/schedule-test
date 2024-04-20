import React from "react";
import gsap from "gsap";
import Input from "../input/input";
import BurgerMenu from "../burger-menu/burger-menu";
import Menu from "../menu/menu";

import styles from "./header.module.css";

// компонент хедера принимающий пропсом функцию  изменения группы
const Header = ({ handleGroupChange }) => {
  const [isOpen, setIsOpen] = React.useState();

  // анимация для инпута
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
    ).fromTo(
      "#burger-menu",
      { display: "none", opacity: 0, duration: 0 },
      { display: "block", opacity: 1, duration: 0.5 }
    );
    document.getElementById("input").blur();
  }

  // анимация для header если выбрана группа
  const headerAnimation = (selectedOptionExists) => {
    const tl = gsap.timeline();
    if (selectedOptionExists) {
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
        duration: .1,
        boxShadow:"0px 4px 4px 0px #00000040"
      });

      tl.fromTo(
        "#input-wrapper",
        { opacity: 1, y: 0 },
        {
          maxWidth: "162px",
          y: 0,
          backgroundColor: "#3C444D",
          opacity: 1,
          color: "var(--text-color-d)",
          duration: 0.5,
        }
      );

      tl.add(inputAnimation);

      tl.fromTo(
        "#schedule",
        { opacity: 0, duration: 0.05 },
        { opacity: 1, duration: 0.2 }
      );
    }
  };

  return (
    <div className={styles.header} id="header">
      <BurgerMenu isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className={styles.title} id="title">
        <p>Привет 👋🏼</p>
        <p>Чтобы посмотреть расписание введи </p>
        <span className={styles.text}>группу</span>
      </div>
      <Input
        animation={headerAnimation}
        handleGroupChange={handleGroupChange}
      />
      <Menu isOpen={isOpen} />
    </div> 
  );
};

export default Header;
