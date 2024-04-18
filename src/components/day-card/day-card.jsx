import React from "react";
import styles from "./day-card.module.css";
import Class from "../class/class";

import { IoIosArrowRoundForward } from "react-icons/io";
import { MdArrowOutward } from "react-icons/md";
import { IoMdStarOutline } from "react-icons/io";


const monthNames = {
  января: 0,
  февраля: 1,
  марта: 2,
  апреля: 3,
  мая: 4,
  июня: 5,
  июля: 6,
  августа: 7,
  сентября: 8,
  октября: 9,
  ноября: 10,
  декабря: 11,
};

// время начало занятий в понедельник
const allStartTimeMonday = [
  "08:00",
  "08:50",
  "10:20",
  "11:50",
  "13:10",
  "13:50",
  "14:40",
  "16:10",
  "17:40",
];
// время начало занятий со вторника по пятницу
const allStartTimeEveryDay = [
  "08:00",
  "09:45",
  "11:30",
  "13:05",
  "13:45",
  "15:30",
  "17:15",
];

// время начало занятий в субботу
const allStartTimeSaturday = [
  "08:00",
  "09:40",
  "11:20",
  "12:50",
  "13:20",
  "15:00",
  "16:40",
];

// компонент карточки в котором показывается расписание на день

const DayCard = ({ day }) => {
  // состояние карточки(открыта или нет)
  const [clicked, setClicked] = React.useState(false);

  // обработчик клика
  const handlerClick = () => {
    setClicked((clicked) => !clicked);
  };

  // находим последнее занятие
  const lastClass = day.classes[day.classes.length - 1];

  // определяем целый день занятия в дистанционом формате или нет
  const allClassDistance = day.classes.every((item) =>
    item.rooms.some((room) => room.place === "distance")
  );

  // текущая дата
  const [currentDate, setCurrentDate] = React.useState(new Date());
  // получаем текущий год
  const currentYear = new Date().getFullYear();
  // Разбиваем строку на день и месяц
  const [dayStr, monthStr] = day.date.split(" ");
  // Получаем числовое значение месяца из словаря
  const month = monthNames[monthStr];
  // Создаем новую дату с текущим годом, месяцем и днем в миллисекундах
  const date = new Date(currentYear, month, dayStr);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 5 * 60 * 1000);

    return () => clearInterval(interval); 
  }, []);

  // цвет текста в зависимости от даты
  const color =
    currentDate.getFullYear() === date.getFullYear() &&
    currentDate.getMonth() === date.getMonth() &&
    currentDate.getDate() === date.getDate()
      ? "var(--text-color)"
      : currentDate > date
      ? "var(--color-no-active)"
      : "var(--text-color)";


  // определяем время начала занятий в зависимости от дня недели
  const getStartTime = (day) => {
    if (day.day === "Понедельник") {
      return allStartTimeMonday;
    } else if (day.day === "Суббота") {
      return allStartTimeSaturday;
    } else {
      return allStartTimeEveryDay;
    }
  };

  // заполняем расписание на день
  let schedule = getStartTime(day)
    .map((time) => {
      let classInfo = day.classes.find((item) => item.time.start === time);
      if (time === "13:05" || time === "12:50" || time === "13:10") {
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
        if (item.time === "08:00" && item.course === "") {
          return false;
        }
        if (item.time === "13:50" && item.course === "") {
          return false;
        }
        return true;
      }
      return true;
    });

    
  return (
    <div
      style={{
        height: clicked
          ? day.day === "Понедельник"
            ? "610px"
            : "555px"
          : "74px",
        borderRadius: clicked ? "40px" : "25px",
        backgroundColor:
          !clicked && currentDate.getDate() === date.getDate()
            ? "var(--current-day)"
            : "",
        color: color,
      }}
      className={styles.card}
    >
      {day.classes.length === 0 ?
        <div className={styles.cardHeaderWeekend}>

          <div className={styles.blockIcon}>
            <IoMdStarOutline size={24} style={{color:color}} />
          </div>
          <span  className={styles.textWeekend}>{currentDate.getDate() === date.getDate() ? "Сегодня" : day.day}</span>
        </div>
        :  
        <>
      <div className={styles.cardHeader}>
        <div className={styles.right}>
          <button onClick={handlerClick} className={styles.button}>
            <MdArrowOutward
              color="var(--text-color)"
              size={24}
              style={{ transform: clicked ? "rotate(90deg)" : "rotate(0)" }}
            />
          </button>
          <span
            style={{
              ...(clicked ? { opacity: 0 } : { opacity: 1 }),
              ...(!allClassDistance && { maxWidth: "100%" }),
            }}
            className={styles.text}
          >
            {currentDate.getDate() === date.getDate() ? "Сегодня" : day.day}
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
            {lastClass ? lastClass.time.end : ""}
          </div>
        </div>
      </div>

      <div
        style={{
          ...(clicked
            ? day.day === "Понедельник"
              ? { opacity: 1, height: "660px" }
              : { opacity: 1, height: "555px" }
            : { opacity: 0, height: "0px" }),
          color: color,
        }}
        className={styles.cardWrapper}
      >
        <div key={day.day} className={styles.title}>
          {currentDate.getDate() === date.getDate() ? "Сегодня" : day.day}
        </div>
        <div key={day.date} className={styles.subtitle}>
          {currentDate.getDate() === date.getDate()
            ? `${day.day}, ${day.date}`
            : day.date}
        </div>
        <div className={styles.classes}>

          {schedule.map((item) => (
            <>
              {item.course === "обед" ? (
                <div className={styles.break}>
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
                </div>
              ) : (
                <Class
                  key={item.date}
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

    }
    </div>
  );
};

export default DayCard;
