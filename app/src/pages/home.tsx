import React, { useEffect, useState } from 'react';
import { useDatePicker } from '@rehookify/datepicker';

import {
  Calendar,
  CalendarHeader,
  CalendarHeaderTitle,
  ChevronLeft,
  ChevronRight,
  Container,
  Days,
  HeaderButton,
  Weekdays,
} from '../components';
import {
  getDayClassName,
  getMonthClassName,
  getYearsClassName,
} from '../utils/class-names';

import '../styles/time.css';

const BODY = document.body;

export const HomePage = () => {
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

  const [selectedDates, onDatesChange] = useState<Date[]>([]);
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
    selectedDates,
    onDatesChange,
    dates: {
      mode: 'range',
      // toggle: true,
      // selectSameDate: true,
      minDate: new Date(2000, 0, 1),
      maxDate: new Date(),
    },
    time: {
      interval: 30,
      minTime: { h: 9, m: 0 },
      maxTime: { h: 18, m: 0 },
    },
    calendar: {
      offsets: [-1, 1],
    },
  });

  return (
    <Container>
      <Calendar>
        <CalendarHeader
          leftButton={
            <HeaderButton
              {...previousMonthButton()}
              data-testid="previous-month-button"
            >
              <ChevronLeft />
            </HeaderButton>
          }
        >
          <CalendarHeaderTitle>
            {calendars[1].month} {calendars[1].year}
          </CalendarHeaderTitle>
        </CalendarHeader>
        <Weekdays weekDays={weekDays} prefix={calendars[1].month} />
        <Days>
          {calendars[1].days.map((dpDay) => (
            <button
              className={getDayClassName(dpDay)}
              key={dpDay.date}
              {...dayButton(dpDay)}
            >
              {dpDay.day}
            </button>
          ))}
        </Days>
      </Calendar>
      <Calendar>
        <CalendarHeader>
          <div />
          <CalendarHeaderTitle data-testid="main-calendar-title">
            {calendars[0].month} {calendars[0].year}
          </CalendarHeaderTitle>
        </CalendarHeader>
        <Weekdays weekDays={weekDays} prefix={calendars[0].month} />
        <Days>
          {calendars[0].days.map((dpDay) => (
            <button
              className={getDayClassName(dpDay)}
              key={dpDay.date}
              {...dayButton(dpDay)}
            >
              {dpDay.day}
            </button>
          ))}
        </Days>
      </Calendar>
      <Calendar>
        <CalendarHeader
          rightButton={
            <HeaderButton
              {...nextMonthButton()}
              data-testid="next-month-button"
            >
              <ChevronRight />
            </HeaderButton>
          }
        >
          <div />
          <CalendarHeaderTitle>
            {calendars[2].month} {calendars[2].year}
          </CalendarHeaderTitle>
        </CalendarHeader>
        <Weekdays weekDays={weekDays} prefix={calendars[2].month} />
        <Days>
          {calendars[2].days.map((dpDay) => (
            <button
              className={getDayClassName(dpDay)}
              key={dpDay.date}
              {...dayButton(dpDay)}
            >
              {dpDay.day}
            </button>
          ))}
        </Days>
      </Calendar>
      <Calendar>
        <CalendarHeader
          leftButton={
            <HeaderButton {...previousMonthButton()}>
              <ChevronLeft />
            </HeaderButton>
          }
          rightButton={
            <HeaderButton {...nextMonthButton()}>
              <ChevronRight />
            </HeaderButton>
          }
        >
          <CalendarHeaderTitle>{calendars[0].month}</CalendarHeaderTitle>
        </CalendarHeader>
        <div className="months">
          {months.map((month) => (
            <button
              className={getMonthClassName(month)}
              key={month.name}
              {...monthButton(month)}
            >
              {month.name}
            </button>
          ))}
        </div>
      </Calendar>
      <Calendar>
        <CalendarHeader
          leftButton={
            <HeaderButton {...previousYearsButton()}>
              <ChevronLeft />
            </HeaderButton>
          }
          rightButton={
            <HeaderButton {...nextYearsButton()}>
              <ChevronRight />
            </HeaderButton>
          }
        >
          <CalendarHeaderTitle>
            {years[0].value}-{years[years.length - 1].value}
          </CalendarHeaderTitle>
        </CalendarHeader>
        <div className="years">
          {years.map((year) => (
            <button
              className={getYearsClassName(year)}
              key={year.value}
              {...yearButton(year)}
            >
              {year.value}
            </button>
          ))}
        </div>
      </Calendar>
    </Container>
  );
};
