import React, { useEffect } from 'react';
import clsx from 'clsx';
import { CalendarDay, useDatePicker } from '@rehookify/datepicker';

import { ChevronLeft } from './components/chevron-left';
import { HeaderButton } from './components/header-button';
import { ChevronRight } from './components/chevron-right';
import './styles/app.css';
import './styles/calendar.css';

const BODY = document.body;

const getDayClassName = ({
  isToday,
  isSelected,
  currentDisplayedMonth,
  range,
}: CalendarDay) =>
  clsx('day', {
    selected: isSelected,
    today: isToday,
    secondary: !currentDisplayedMonth,
    'will-be-in-range': range === 'will-be-in-range',
    'will-be-range-start': range === 'will-be-range-start',
    'will-be-range-end': range === 'will-be-range-end',
    'in-range': range === 'in-range',
    'range-start': range === 'range-start',
    'range-end': range === 'range-end',
  });

const getMonthClassName = (isActive: boolean) =>
  clsx('month', { active: isActive });

const getYearsClassName = (isActive: boolean) =>
  clsx('year', { active: isActive });

function App() {
  useEffect(() => {
    // Use matchMedia to check the user preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    const toggleDarkTheme = (matches: boolean) => {
      if (matches) {
        BODY.classList.add('dark');
      } else {
        BODY.classList.remove('dark');
      }
    };

    toggleDarkTheme(prefersDark.matches);

    prefersDark.addEventListener('change', (mQ) => toggleDarkTheme(mQ.matches));
  }, []);

  const {
    data: { calendars, weekDays, months, years },
    propGetters: {
      dayButton,
      previousMonthButton,
      nextMonthButton,
      monthButton,
      yearButton,
      nextYearsButton,
      previousYearsButton,
    },
  } = useDatePicker({
    dates: {
      mode: 'range',
      toggle: true,
      maxDate: new Date(),
    },
    calendar: {
      offsets: [-1, 1],
    },
  });

  return (
    <div className="container">
      <section className="calendar">
        <header className="calendar__header">
          <HeaderButton {...previousMonthButton()}>
            <ChevronLeft />
          </HeaderButton>
          <p>
            {calendars[1].month} {calendars[1].year}
          </p>
          <div className="dummy-button" />
        </header>
        <div className="days calendar__weekdays">
          {weekDays.map((day) => (
            <div className="day weekday" key={day}>
              {day}
            </div>
          ))}
        </div>
        <div className="days">
          {calendars[1].days.map((dpDay) => (
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
      <section className="calendar">
        <header className="calendar__header">
          <div className="dummy-button" />
          <p>
            {calendars[0].month} {calendars[0].year}
          </p>
          <div className="dummy-button" />
        </header>
        <div className="days calendar__weekdays">
          {weekDays.map((day) => (
            <div className="day weekday" key={day}>
              {day}
            </div>
          ))}
        </div>
        <div className="days">
          {calendars[0].days.map((dpDay) => (
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
      <section className="calendar">
        <header className="calendar__header">
          <div className="dummy-button" />
          <p>
            {calendars[2].month} {calendars[2].year}
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
          {calendars[2].days.map((dpDay) => (
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
      <section className="calendar">
        <header className="calendar__header">
          <HeaderButton {...previousMonthButton()}>
            <ChevronLeft />
          </HeaderButton>
          <p>{calendars[0].month}</p>
          <HeaderButton {...nextMonthButton()}>
            <ChevronRight />
          </HeaderButton>
        </header>
        <div className="months">
          {months.map((month) => (
            <button
              className={getMonthClassName(month.isActive)}
              key={month.name}
              {...monthButton(month)}
            >
              {month.name}
            </button>
          ))}
        </div>
      </section>
      <section className="calendar">
        <header className="calendar__header">
          <HeaderButton {...previousYearsButton()}>
            <ChevronLeft />
          </HeaderButton>
          <p>
            {years[0].value}-{years[years.length - 1].value}
          </p>
          <HeaderButton {...nextYearsButton()}>
            <ChevronRight />
          </HeaderButton>
        </header>
        <div className="years">
          {years.map((year) => (
            <button
              className={getYearsClassName(year.isActive)}
              key={year.value}
              {...yearButton(year)}
            >
              {year.value}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
