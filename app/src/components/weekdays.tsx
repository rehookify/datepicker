import React, { FC } from 'react';
import { Days } from './days';

interface WeekdaysProps {
  weekDays: string[];
  prefix: string;
}

export const Weekdays: FC<WeekdaysProps> = ({ weekDays, prefix }) => {
  return (
    <Days>
      {weekDays.map((day) => (
        <div className="day weekday" key={`${prefix}-${day}`}>
          {day}
        </div>
      ))}
    </Days>
  );
};
