import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

import "./burger-menu.css";

// компонент бургер меню
const BurgerMenu = ({ isOpen, setIsOpen }) => {
  const tlRef = useRef(null);

  // анимация бургер меню
  useLayoutEffect(() => {
    if (isOpen) {
      tlRef.current = gsap
        .timeline()
        .fromTo(
          "#header",
          { height: "80px", justifyContent: "flex-start", duration: 0.05 },
          { height: "130px", justifyContent: "flex-start", duration: 0.1 }
        )
        .fromTo(
          "#menu",
          { opacity: 0, duration: 0.05 },
          { opacity: 1, duration: 0.05 }
        )
        .fromTo(
          "#line3",
          { scaleX: "100%", duration: 0.05 },
          { scaleX: 0, duration: 0.05 }
        )
        .fromTo(
          "#line2",
          { scaleX: "100%", duration: 0.05 },
          { scaleX: 0, duration: 0.05 }
        )
        .fromTo(
          "#line1",
          { scaleX: "100%", duration: 0.05 },
          { scaleX: 0, duration: 0.05 }
        )
        .fromTo(
          "#line4",
          { scaleX: 0, duration: 0.05, display: "block" },
          { scaleX: "100%", duration: 0.05, display: "block" }
        )
        .fromTo(
          "#line5",
          { scaleX: 0, duration: 0.05, display: "block" },
          { scaleX: "100%", duration: 0.05, display: "block" }
        );
    } else if (isOpen === false && tlRef.current) {
      tlRef.current.reverse();
    } else {
      gsap
        .timeline()
        .set(["#line4", "#line5"], { scaleX: 0 })
        .fromTo(
          "#line1",
          { scaleX: 0, duration: 0.05 },
          { scaleX: "100%", duration: 0.05 }
        )
        .fromTo(
          "#line2",
          { scaleX: 0, duration: 0.05 },
          { scaleX: "100%", duration: 0.05 }
        )
        .fromTo(
          "#line3",
          { scaleX: 0, duration: 0.05 },
          { scaleX: "100%", duration: 0.05 }
        );
    }
  }, [isOpen]);

  return (
    <div className="wrapperBurgerMenu">
      <button
        id="burger-menu"
        className="burger-menu"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="burger-menu__line" id="line1"></span>
        <span className="burger-menu__line" id="line2"></span>
        <span className="burger-menu__line" id="line3"></span>
        <span className="burger-menu__line" id="line4"></span>
        <span className="burger-menu__line" id="line5"></span>
      </button>
    </div>
  );
};

export default BurgerMenu;
