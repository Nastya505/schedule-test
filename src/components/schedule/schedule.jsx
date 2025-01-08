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
      if (currentGroup.currentWeek) {
        setWeek(currentGroup.currentWeek);
      } else if (currentGroup.nextWeek) {
        setWeek(currentGroup.nextWeek);
      } else if (currentGroup.prevWeek) {
        setWeek(currentGroup.prevWeek);
      }
    }
  }, [currentGroup]);

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

  const availableWeeks = [prevWeek, currentWeek, nextWeek].filter(Boolean);

  let transform = 0;
  let width = "100%";

  // Определяем смещение и ширину в зависимости от доступных недель
  switch (availableWeeks.length) {
    case 3:
      transform =
        week === prevWeek ? "33.3%" : week === nextWeek ? "-33.3%" : "0%";
      width = "300%"; // Все 3 недели
      break;
    case 2:
      // Проверяем, какие недели доступны
      if (
        availableWeeks.includes(prevWeek) &&
        availableWeeks.includes(currentWeek)
      ) {
        // Если доступны "предыдущая и текущая"
        transform =
          week === prevWeek ? "25%" : week === currentWeek ? "-25%" : "0%";
      } else if (
        availableWeeks.includes(currentWeek) &&
        availableWeeks.includes(nextWeek)
      ) {
        // Если доступны "текущая и следующая"
        transform =
          week === currentWeek ? "25%" : week === nextWeek ? "-25%" : "0%";
      }
      width = "200%"; // Текущая и следующая / текущая и предыдущая
      break;
    case 1:
      transform = "0%";
      width = "100%"; // Только одна неделя
      break;
    default:
      transform = "0%";
      width = "0%"; // Если нет доступных недель
      break;
  }

  return (
    <div id="schedule" className={styles.wrapper}>
      <div className={styles.buttonsWrapper}>
        {week === currentWeek && availableWeeks.includes(currentWeek) ? (
          <>
            {prevWeek && availableWeeks.includes(prevWeek) && (
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
            {nextWeek && availableWeeks.includes(nextWeek) && (
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
        ) : week === nextWeek && availableWeeks.includes(nextWeek) ? (
          <>
            <span className={styles.text}>следующая неделя</span>
            {currentWeek && availableWeeks.includes(currentWeek) && (
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
            )}
          </>
        ) : (
          week === prevWeek &&
          availableWeeks.includes(prevWeek) && (
            <>
              <span className={styles.text}>прошлая неделя</span>
              {currentWeek && availableWeeks.includes(currentWeek) && (
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
              )}
            </>
          )
        )}
      </div>

      <div
        className={styles.sliderWeeksWrapper}
        style={{
          width: width, // Устанавливаем ширину
        }}
      >
        <div
          className={styles.sliderWeeks}
          style={{
            transform: `translateX(${transform})`, // Вычисляемое смещение
          }}
        >
          {<Week week={prevWeek} />}
          {<Week week={currentWeek} />}
          {<Week week={nextWeek} />}
        </div>
      </div>
    </div>
  );
}

export default Schedule;
