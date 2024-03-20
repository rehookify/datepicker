import '../styles/time.css';

import { useDatePicker } from '@rehookify/datepicker';
import React, { useEffect, useState } from 'react';

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

  const NOW = new Date();

  const [selectedDates, onDatesChange] = useState<Date[]>([]);
  const {
    data: { calendars, weekDays, months, years },
    propGetters: {
      dayButton,
      addOffset,
      subtractOffset,
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
      minDate: new Date(NOW.getFullYear() - 1, 0, 1),
      maxDate: NOW,
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
              {...subtractOffset({ months: 1 })}
              aria-label="previous month button"
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
          {calendars[1].days.map((d) => (
            <button
              className={getDayClassName(d)}
              key={`${1}/${d.$date.toString()}`}
              {...dayButton(d)}
            >
              {d.day}
            </button>
          ))}
        </Days>
      </Calendar>
      <Calendar>
        <CalendarHeader>
          <div />
          <CalendarHeaderTitle aria-label="current month and year">
            {calendars[0].month} {calendars[0].year}
          </CalendarHeaderTitle>
        </CalendarHeader>
        <Weekdays weekDays={weekDays} prefix={calendars[0].month} />
        <Days>
          {calendars[0].days.map((d) => (
            <button
              className={getDayClassName(d)}
              key={`${0}/${d.$date.toString()}`}
              {...dayButton(d)}
            >
              {d.day}
            </button>
          ))}
        </Days>
      </Calendar>
      <Calendar>
        <CalendarHeader
          rightButton={
            <HeaderButton
              {...addOffset({ months: 1 })}
              aria-label="next month button"
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
          {calendars[2].days.map((d) => (
            <button
              className={getDayClassName(d)}
              key={`${2}/${d.$date.toString()}`}
              {...dayButton(d)}
            >
              {d.day}
            </button>
          ))}
        </Days>
      </Calendar>
      <Calendar>
        <CalendarHeader
          leftButton={
            <HeaderButton {...subtractOffset({ months: 1 })}>
              <ChevronLeft />
            </HeaderButton>
          }
          rightButton={
            <HeaderButton {...addOffset({ months: 1 })}>
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
              key={month.month}
              {...monthButton(month)}
            >
              {month.month}
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
            {years[0].year}-{years[years.length - 1].year}
          </CalendarHeaderTitle>
        </CalendarHeader>
        <div className="years">
          {years.map((year) => (
            <button
              className={getYearsClassName(year)}
              key={year.year}
              {...yearButton(year)}
            >
              {year.year}
            </button>
          ))}
        </div>
      </Calendar>
    </Container>
  );
};
