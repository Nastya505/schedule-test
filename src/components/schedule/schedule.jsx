import React, { useState, useEffect } from "react";
import styles from "./schedule.module.css";
import dataJson from "../../utils/data.json";
import Week from "../week/week";

import { MdArrowBackIosNew } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";


// компонент расписания принимающий пропсом группу
function Schedule({ group }) {
  const [data, setData] = useState([]);
  // выбранная неделя
  const [week, setWeek] = useState(null);

  useEffect(() => {
    setData(dataJson);
  }, []);

  // находим переданую группу в данных
  const currentGroup = data.groups && data.groups.find((item) => item.group === group);

  // текущая неделя
  const currentWeek = currentGroup && currentGroup.currentWeek;
  // предыдущая неделя
  const prevWeek = currentGroup && currentGroup.prevWeek;
  // следующая неделя
  const nextWeek = currentGroup && currentGroup.nextWeek;


// обработчик клика
  const handleClick = (week) => {
    setWeek(week);
  };


  useEffect(() => {
    if (currentGroup) {
      setWeek(currentWeek);
    }
  }, [data, group]);

  return (
    <div id="schedule" className={styles.wrapper}>
      <div className={styles.buttonsWrapper}>
        {week === currentWeek ? (
          <>
            {prevWeek && (
              <div className={styles.buttonWrapperPrev}>
                <button onClick={() => handleClick(prevWeek)} className={styles.button}>
                  <MdArrowBackIosNew className={styles.iconLeft} color="#5F666B" size={15} />
                </button>
                <hr className={styles.border} />
              </div>
            )}
            <span className={styles.text}>эта неделя</span>
            {nextWeek && (
              <div className={styles.buttonWrapperNext}>
                <hr className={styles.border} />
                <button onClick={() => handleClick(nextWeek)} className={styles.button}>
                  <MdArrowForwardIos className={styles.iconRight} color="#5F666B" size={15} />
                </button>
              </div>
            )}
          </>
        ) : week === nextWeek ? (
          <>
            <span className={styles.text}>Следующая неделя</span>
            <div className={styles.buttonWrapperPrev}>
              <button onClick={() => handleClick(currentWeek)} className={styles.button}>
                <MdArrowBackIosNew className={styles.iconLeft} color="#5F666B" size={15} />
              </button>
              <hr className={styles.border} />
            </div>
          </>
        ) : (
          week === prevWeek && (
            <>
              <span className={styles.text}>Прошлая неделя</span>
              <div className={styles.buttonWrapperNext}>
                <hr className={styles.border} />
                <button onClick={() => handleClick(currentWeek)} className={styles.button}>
                  <MdArrowForwardIos className={styles.iconRight} color="#5F666B" size={15} />
                </button>
              </div>
            </>
          )
        )}
      </div>

      <div className={styles.sliderWeeksWrapper}>
        <div
          className={styles.sliderWeeks}
          style={{
            transform: `translateX(${
              week === prevWeek
                ? "0%"
                : week === nextWeek
                ? "-200%"
                : week === currentWeek
                ? "-100%"
                : "-100%"
            })`,
          }}
        >
          <Week week={prevWeek} />
          <Week week={currentWeek} />
          <Week week={nextWeek} />
        </div>
      </div>
    </div>
  );
}

export default Schedule;
