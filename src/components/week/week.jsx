import React from 'react';
import DayCard from '../day-card/day-card';
import styles from './week.module.css';

// компонент с расписанием на неделю
const Week = ({ week }) => {
  if (!week || !Array.isArray(week.days)) {
    return null;
  }

  return (
    <div className={styles.week}>
      {week.days.map((day) => {
        return <DayCard key={day.date} day={day}/>
      })}
    </div>
  );
};

export default Week;