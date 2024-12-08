import React from "react";
import styles from "./class.module.css";
import Tooltip from "../tooltip/tooltip";

import { MdOutlineSportsVolleyball } from "react-icons/md";
import { FaWifi } from "react-icons/fa";
import { MdOutlineFactory } from "react-icons/md";

const Class = ({ time, course, rooms, date }) => {
  // взять текущий день
  const currentDate = new Date();
  // взять текущее время
  const [currentTime, setCurrentTime] = React.useState(
    new Date().toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    })
  );

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleTimeString("ru-RU", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }, 5 * 60 * 1000); // 5 minutes in milliseconds

    return () => clearInterval(interval); // Clean up the interval when the component unmounts
  }, []);

  // сравнить текущую дату и дату переданую в пропсах
  const isSameDay = currentDate.toDateString() === date.toDateString();

  // если дата совпадает и время меньше чем текущее, то это текущая пара
  const isCurrentClass = isSameDay && time < currentTime;
  // если это не текущая пара и даты не совпадают и текущая дата больше чем переданая дата, то это прошедщие пары
  const isPastClass = !isCurrentClass && !isSameDay && currentDate > date;

  // устанавливаем цвет в зависимости от времени
  const color = isPastClass
    ? "var(--color-no-active)"
    : isCurrentClass
    ? "var(--color-no-active)"
    : "var(--text-color)";

  // Функция для безопасной обработки `rooms`
  const renderRooms = () => {
    return rooms
      .filter((room) => room && room.room) // Фильтруем валидные комнаты
      .filter(
        (room) =>
          room.place === "dormitory" ||
          !["distance", "sports-hall", "gym", "conf-hall", "workshop"].includes(
            room.place
          )
      ) // Исключаем ненужные place
      .map((room, index) => <span key={index}>{room.room}</span>);
  };

  return (
    <div key={date} style={{ color: color }} className={styles.class}>
      <div className={styles.info}>
        <span className={styles.time}>{time}</span>
        <span
          className={
            course.startsWith("классный час")
              ? `${styles.course} ${styles.hour}`
              : course === "Общеколледжная линейка"
              ? `${styles.course} ${styles.hour}`
              : styles.course
          }
        >
          {course}
        </span>
      </div>

      <div className={styles.rooms}>
        {rooms.map((room, index) => (
          <div key={index} className={styles.room}>
            {room.place === "distance" ? (
              <Tooltip title="дистант" position="left">
                <FaWifi size={24} style={{ color: color }} />
              </Tooltip>
            ) : null}
            {room.place === "sports-hall" ? (
              <Tooltip title="спортивный зал" position="left">
                <MdOutlineSportsVolleyball size={24} style={{ color: color }} />
              </Tooltip>
            ) : null}
            {room.place === "gym" ? (
              <Tooltip title="тренажерный зал" position="left">
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_237_300)">
                    <g clip-path="url(#clip1_237_300)">
                      <path
                        d="M13.4 22.4L12 21L15.55 17.45L7.05001 8.95001L3.50001 12.5L2.10001 11.1L3.50001 9.65001L2.10001 8.25001L4.20001 6.15001L2.80001 4.70001L4.20001 3.30001L5.65001 4.70001L7.75001 2.60001L9.15001 4.00001L10.6 2.60001L12 4.00001L8.45001 7.55001L16.95 16.05L20.5 12.5L21.9 13.9L20.5 15.35L21.9 16.75L19.8 18.85L21.2 20.3L19.8 21.7L18.35 20.3L16.25 22.4L14.85 21L13.4 22.4Z"
                        fill={color}
                      />
                    </g>
                  </g>
                  <defs>
                    <clipPath id="clip0_237_300">
                      <rect
                        width="24"
                        height="24"
                        fill="white"
                        transform="translate(0 0.5)"
                      />
                    </clipPath>
                    <clipPath id="clip1_237_300">
                      <rect
                        width="24"
                        height="24"
                        fill="white"
                        transform="translate(0 0.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </Tooltip>
            ) : null}
            {room.place === "conf-hall" ? (
              <Tooltip title="конференц зал" position="left">
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_237_285)">
                    <path
                      d="M12.5 5C12.5 5.55 12.3042 6.02083 11.9125 6.4125C11.5208 6.80417 11.05 7 10.5 7C10.2833 7 10.0833 6.97083 9.9 6.9125C9.71667 6.85417 9.53333 6.75833 9.35 6.625C8.95 6.75833 8.62917 7 8.3875 7.35C8.14583 7.7 8.025 8.08333 8.025 8.5H21L20 15.5H15.1V13.5H18.275C18.3583 13 18.4292 12.5 18.4875 12C18.5458 11.5 18.6167 11 18.7 10.5H5.3C5.38333 11 5.45417 11.5 5.5125 12C5.57083 12.5 5.64167 13 5.725 13.5H8.9V15.5H4L3 8.5H6C6 7.68333 6.225 6.94167 6.675 6.275C7.125 5.60833 7.73333 5.11667 8.5 4.8C8.55 4.28333 8.76667 3.85417 9.15 3.5125C9.53333 3.17083 9.98333 3 10.5 3C11.05 3 11.5208 3.19583 11.9125 3.5875C12.3042 3.97917 12.5 4.45 12.5 5ZM9.775 19.5H14.225L14.8 13.5H9.2L9.775 19.5ZM8 21.5L7.25 13.7C7.18333 13.1167 7.35 12.6042 7.75 12.1625C8.15 11.7208 8.64167 11.5 9.225 11.5H14.775C15.3583 11.5 15.85 11.7208 16.25 12.1625C16.65 12.6042 16.8167 13.1167 16.75 13.7L16 21.5H8Z"
                      fill={color}
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_237_285">
                      <rect
                        width="24"
                        height="24"
                        fill="white"
                        transform="translate(0 0.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </Tooltip>
            ) : null}
            {room.place === "workshop" ? (
              <Tooltip title="цех" position="left">
                <MdOutlineFactory size={24} style={{ color: color }} />
              </Tooltip>
            ) : null}
            {room.place === "dormitory" ? (
              <Tooltip title="общежитие" position="left">
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 10.5H19V4.5H20V2.5H4V4.5H5V10.5H3C2.73478 10.5 2.48043 10.6054 2.29289 10.7929C2.10536 10.9804 2 11.2348 2 11.5V20.5H22V11.5C22 11.2348 21.8946 10.9804 21.7071 10.7929C21.5196 10.6054 21.2652 10.5 21 10.5ZM14 18.5V14.5H10V18.5H7V4.5H17V18.5H14Z"
                    fill={color}
                  />
                  <path
                    d="M9 6.5H11V8.5H9V6.5ZM13 6.5H15V8.5H13V6.5ZM9 10.5H11V12.5H9V10.5ZM13 10.5H15V12.5H13V10.5Z"
                    fill={color}
                  />
                </svg>
              </Tooltip>
            ) : null}
          </div>
        ))}
        <span>{renderRooms()}</span>
      </div>
    </div>
  );
};

export default Class;
