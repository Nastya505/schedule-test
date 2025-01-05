import React from "react";
import styles from "./day-card.module.css";
import Class from "../class/class";

import { IoIosArrowRoundForward } from "react-icons/io";
import { MdArrowOutward } from "react-icons/md";
import { IoMdStarOutline } from "react-icons/io";
import Tooltip from "../tooltip/tooltip";

// время начало занятий в понедельник
const allStartTimeMonday = [
  "08:20",
  "08:30",
  "10:10",
  "11:05",
  "12:45",
  "14:15",
  "14:55",
  "16:35",
  "18:15",
];
// время начало занятий в сокращенный понедельник
const allStartTimeShortenedMonday = [
  "08:20",
  "08:30",
  "09:40",
  "10:20",
  "11:30",
  "12:30",
  "13:00",
  "14:10",
  "15:20",
];
// время начало занятий со вторника по cубботу
const allStartTimeEveryDay = [
  "08:30",
  "10:15",
  "12:00",
  "13:35",
  "14:15",
  "16:00",
  "17:45",
];

// компонент карточки в котором показывается расписание на день

const DayCard = ({ day }) => {
  // состояние карточки(открыта или нет)
  const [clicked, setClicked] = React.useState(false);

  // Обработчик клика на карточку для разворачивания
  const handleCardClick = () => {
    if (!clicked) {
      setClicked(true);
    }
  };

  // Обработчик клика на кнопку для сворачивания
  const handleButtonClick = (e) => {
    e.stopPropagation(); // Предотвращаем обработку клика карточки
    setClicked((clicked) => !clicked);
  };

  const subtractMinutes = (timeString, minutes) => {
    const [hours, mins] = timeString.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, mins - minutes, 0, 0); // Установить часы и минуты
    const adjustedHours = date.getHours().toString().padStart(2, "0");
    const adjustedMinutes = date.getMinutes().toString().padStart(2, "0");
    return `${adjustedHours}:${adjustedMinutes}`;
  };

  const isShortenedDay = (day) => {
    // Пример: проверка на конкретные даты
    const shortenedDates = ["16.12.2024"]; // Даты сокращенных дней
    return shortenedDates.includes(day.date);
  };
  // находим последнее занятие
  const lastClass = day.classes[day.classes.length - 1];

  // определяем целый день занятия в дистанционом формате или нет
  const allClassDistance = day.classes.every((item) =>
    item.rooms.some((room) => room.place === "distance")
  );
  // текущая дата
  const [currentDate, setCurrentDate] = React.useState(new Date());

  // получаем дату из строки "DD.MM.YYYY"
  const [dayStr, monthStr, yearStr] = day.date.split(".");
  const date = new Date(yearStr, monthStr - 1, dayStr);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 5 * 60 * 1000); // обновление каждые 5 минут

    return () => clearInterval(interval);
  }, []);

  // цвет текста в зависимости от даты
  const color =
    currentDate.toDateString() === date.toDateString()
      ? "var(--text-color)"
      : currentDate > date
      ? "var(--color-no-active)"
      : "var(--text-color)";

  // определяем время начала занятий в зависимости от дня недели
  const getStartTime = (day) => {
    if (day.day === "Понедельник") {
      return isShortenedDay(day)
        ? allStartTimeShortenedMonday
        : allStartTimeMonday;
    } else {
      return allStartTimeEveryDay;
    }
  };

  let hasLunchBeenAdded = false;

  // заполняем расписание на день
  let schedule = getStartTime(day)
    .map((time) => {
      if (day.day === "Понедельник" && time === "08:20") {
        return {
          time: time,
          course: "Общеколледжная линейка",
          rooms: [],
        };
      }
      let classInfo = day.classes.find((item) => item.time.start === time);
      if (
        time === "13:35" ||
        time === "12:30" ||
        (time === "14:15" && !hasLunchBeenAdded)
      ) {
        hasLunchBeenAdded = true;
        return {
          time: time,
          course: "обед",
          rooms: [],
        };
      }

      if (classInfo) {
        return {
          time: time,
          course: classInfo.course,
          rooms: classInfo.rooms,
        };
      } else {
        return {
          time: time,
          course: "",
          rooms: [],
        };
      }
    })
    .filter((item) => {
      if (day.day === "Понедельник") {
        if (item.time === "10:00" && item.course === "") {
          return false;
        }
      }
      return true;
    });

  return (
    <div
      style={{
        height: clicked ? "fit-content" : "74px",
        borderRadius: clicked ? "40px" : "25px",
        backgroundColor:
          !clicked && currentDate.toDateString() === date.toDateString()
            ? "var(--current-day)"
            : "",
        color: color,
      }}
      className={styles.card}
      onClick={handleCardClick}
    >
      {day.classes.length === 0 ? (
        <div className={styles.cardHeaderWeekend}>
          <div className={styles.blockIcon}>
            <Tooltip title="выходной день" position="right">
              <IoMdStarOutline size={24} style={{ color: color }} />
            </Tooltip>
          </div>
          <span className={styles.textWeekend}>
            {currentDate.toDateString() === date.toDateString()
              ? "Сегодня"
              : day.day}
          </span>
        </div>
      ) : (
        <>
          <div className={styles.cardHeader}>
            <div className={styles.right}>
              <button onClick={handleButtonClick} className={styles.button}>
                <MdArrowOutward
                  color="var(--text-color)"
                  size={24}
                  style={{ transform: clicked ? "rotate(90deg)" : "rotate(0)" }}
                />
              </button>
              <span
                style={{
                  ...(clicked ? { opacity: 0 } : { opacity: 1 }),
                  ...!allClassDistance,
                }}
                className={
                  day.day === "Понедельник" && allClassDistance
                    ? styles.textMonday
                    : styles.text
                }
              >
                {currentDate.toDateString() === date.toDateString()
                  ? "Сегодня"
                  : day.day}
              </span>
            </div>

            <div
              style={
                clicked
                  ? { opacity: 0, maxWidth: "0px" }
                  : { opacity: 1, maxWidth: "199px" }
              }
              className={styles.left}
            >
              {allClassDistance && (
                <span style={{ borderColor: color }} className={styles.tag}>
                  дист
                </span>
              )}

              <div className={styles.time}>
                {day.classes.length > 0 && day.classes[0].time.start}
                <IoIosArrowRoundForward color={color} />
                {lastClass
                  ? isShortenedDay(day)
                    ? subtractMinutes(lastClass.time.end, 30) // Сокращенное время
                    : lastClass.time.end // Обычное время
                  : ""}
              </div>
            </div>
          </div>

          <div
            style={{
              ...(clicked
                ? { opacity: 1, height: "fit-content", minHeight: "200px" }
                : { opacity: 0, height: "0px" }),
              color: color,
            }}
            className={styles.cardWrapper}
          >
            <div key={day.day} className={styles.title}>
              {currentDate.toDateString() === date.toDateString()
                ? "Сегодня"
                : day.day}
            </div>
            <div key={`${day.day}-${day.data}`} className={styles.subtitle}>
              {currentDate.toDateString() === date.toDateString()
                ? `${day.day}, ${day.date}`
                : day.date}
            </div>
            <div className={styles.classes}>
              {schedule.map((item, index) => (
                <>
                  {item.course === "обед" ? (
                    <div className={styles.break}>
                      <Tooltip title="обед" position="right">
                        <svg
                          width="40"
                          height="40"
                          viewBox="0 0 40 40"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.6667 36.6667V21.4167C10.25 21.0278 9.06251 20.25 8.10417 19.0833C7.14584 17.9167 6.66667 16.5556 6.66667 15V3.33334H10V15H11.6667V3.33334H15V15H16.6667V3.33334H20V15C20 16.5556 19.5208 17.9167 18.5625 19.0833C17.6042 20.25 16.4167 21.0278 15 21.4167V36.6667H11.6667ZM28.3333 36.6667V23.3333H23.3333V11.6667C23.3333 9.36111 24.1458 7.39584 25.7708 5.77084C27.3958 4.14584 29.3611 3.33334 31.6667 3.33334V36.6667H28.3333Z"
                            fill="var(--text-color)"
                          />
                        </svg>
                      </Tooltip>
                    </div>
                  ) : (
                    <Class
                      key={index}
                      time={item.time}
                      course={item.course}
                      rooms={item.rooms}
                      date={date}
                    />
                  )}
                </>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DayCard;
