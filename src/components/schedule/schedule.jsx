import React, { useState, useEffect } from "react";
import styles from "./schedule.module.css";
import Week from "../week/week";

// компонент расписания, принимающий пропсом группу
function Schedule({ group, data }) {
  const [week, setWeek] = useState(null);

  // Проверяем, что данные загружены и что groups существует
  const currentGroup = data?.groups
    ? data.groups.find((item) => item.group === group)
    : null;

  // useEffect всегда будет вызываться, не зависит от того, была ли группа найдена
  useEffect(() => {
    if (currentGroup) {
      setWeek(currentGroup.currentWeek);
    }
  }, [currentGroup]); // добавляем зависимости

  // текущая неделя
  const currentWeek = currentGroup?.currentWeek;
  // предыдущая неделя
  const prevWeek = currentGroup?.prevWeek;
  // следующая неделя
  const nextWeek = currentGroup?.nextWeek;

  // обработчик клика
  const handleClick = (week) => {
    setWeek(week);
  };
  const availableWeeks = [prevWeek, currentWeek, nextWeek].filter(
    Boolean
  ).length;

  return (
    <div id="schedule" className={styles.wrapper}>
      <div className={styles.buttonsWrapper}>
        {week === currentWeek ? (
          <>
            {prevWeek && (
              <div className={styles.buttonWrapperPrev}>
                <button
                  onClick={() => handleClick(prevWeek)}
                  className={styles.button}
                >
                  <svg
                    className={styles.iconLeft}
                    viewBox="0 0 8 12"
                    preserveAspectRatio="none"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.83521 6.00001L7.33521 10.5L6.36361 11.4546L0.909069 6.00001L6.36362 0.545468L7.33521 1.50001L2.83521 6.00001Z"
                      fill="#5F666B"
                    />
                  </svg>
                </button>
                <hr className={styles.border} />
              </div>
            )}
            <span className={styles.text}>эта неделя</span>
            {nextWeek && (
              <div className={styles.buttonWrapperNext}>
                <hr className={styles.border} />
                <button
                  onClick={() => handleClick(nextWeek)}
                  className={styles.button}
                >
                  <svg
                    className={styles.iconRight}
                    viewBox="0 0 8 12"
                    fill="none"
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.83521 6.00001L7.33521 10.5L6.36361 11.4546L0.909069 6.00001L6.36362 0.545468L7.33521 1.50001L2.83521 6.00001Z"
                      fill="#5F666B"
                    />
                  </svg>
                </button>
              </div>
            )}
          </>
        ) : week === nextWeek ? (
          <>
            <span className={styles.text}>Следующая неделя</span>
            <div className={styles.buttonWrapperPrev}>
              <button
                onClick={() => handleClick(currentWeek)}
                className={styles.button}
              >
                <svg
                  className={styles.iconLeft}
                  viewBox="0 0 8 12"
                  fill="none"
                  preserveAspectRatio="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.83521 6.00001L7.33521 10.5L6.36361 11.4546L0.909069 6.00001L6.36362 0.545468L7.33521 1.50001L2.83521 6.00001Z"
                    fill="#5F666B"
                  />
                </svg>
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
                <button
                  onClick={() => handleClick(currentWeek)}
                  className={styles.button}
                >
                  <svg
                    className={styles.iconRight}
                    viewBox="0 0 8 12"
                    fill="none"
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.83521 6.00001L7.33521 10.5L6.36361 11.4546L0.909069 6.00001L6.36362 0.545468L7.33521 1.50001L2.83521 6.00001Z"
                      fill="#5F666B"
                    />
                  </svg>
                </button>
              </div>
            </>
          )
        )}
      </div>

      <div
        className={styles.sliderWeeksWrapper}
        style={{
          width: `${availableWeeks * 100}%`, // Устанавливаем ширину
        }}
      >
        <div
          className={styles.sliderWeeks}
          style={{
            transform: `translateX(${
              week === prevWeek
                ? availableWeeks === 3
                  ? "33.3%"
                  : "25%"
                : week === nextWeek
                ? availableWeeks === 3
                  ? "-33.3%"
                  : "-25%"
                : availableWeeks === 2
                ? "-25%"
                : "0%"
            })`, // Вычисляемое смещение
          }}
        >
          {availableWeeks >= 2 && <Week week={prevWeek} />}
          {availableWeeks >= 1 && <Week week={currentWeek} />}
          {availableWeeks >= 3 && <Week week={nextWeek} />}
        </div>
      </div>
    </div>
  );
}

export default Schedule;
