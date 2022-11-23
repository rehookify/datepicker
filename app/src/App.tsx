import React, { useEffect } from 'react';
import { CalendarDay, useDatePicker } from '@rehookify/datepicker';
import './styles/app.css';
import './styles/calendar.css';
import { ChevronLeft } from './components/chevron-left';
import { HeaderButton } from './components/header-button';
import { ChevronRight } from './components/chevron-right';

const BODY = document.body;

const getDayClassName = ({
  isToday,
  isSelected,
  currentDisplayedMonth,
  willBeInRange,
  isRangeEnd,
  isRangeStart,
  inRange,
}: CalendarDay) => {
  return `day ${isSelected ? 'day--selected' : ''} ${
    isToday ? 'day--today' : ''
  } ${currentDisplayedMonth ? '' : 'day--secondary'} ${
    willBeInRange ? 'day--will-be-in-range' : ''
  } ${inRange ? 'day--in-range' : ''} ${
    isRangeStart ? 'day--range-start' : ''
  } ${isRangeEnd ? 'day--range-end' : ''}`;
};

function App() {
  useEffect(() => {
    // Use matchMedia to check the user preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    if (prefersDark.matches) {
      BODY.classList.add('dark');
    }
    const toggleDarkTheme = () => {
      BODY.classList.toggle('dark');
    };

    prefersDark.addEventListener('change', () => toggleDarkTheme());
  }, []);

  const {
    data: { calendars, weekDays },
    propGetters: { dayButton, previousMonthButton, nextMonthButton },
  } = useDatePicker({
    dates: {
      mode: 'range',
    },
  });

  const { month, year, days } = calendars[0];

  return (
    <section className="calendar">
      <header className="calendar__header">
        <HeaderButton {...previousMonthButton()}>
          <ChevronLeft />
        </HeaderButton>
        <p>
          {month} {year}
        </p>
        <HeaderButton {...nextMonthButton()}>
          <ChevronRight />
        </HeaderButton>
      </header>
      <div className="days calendar__weekdays">
        {weekDays.map((day) => (
          <div className="day weekday" key={day}>
            {day}
          </div>
        ))}
      </div>
      <div className="days">
        {days.map((dpDay) => (
          <button
            className={getDayClassName(dpDay)}
            key={dpDay.date}
            {...dayButton(dpDay)}
          >
            {dpDay.day}
          </button>
        ))}
      </div>
    </section>
  );
}

export default App;
