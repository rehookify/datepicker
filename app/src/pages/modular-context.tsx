import {
  useContextCalendars,
  useContextDaysPropGetters,
  useContextMonths,
  useContextMonthsPropGetters,
  useContextTime,
  useContextTimePropGetters,
  useContextYears,
  useContextYearsPropGetters,
} from '@rehookify/datepicker';
import React from 'react';

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
  getTimeClassName,
  getYearsClassName,
} from '../utils/class-names';

export const ModularContext = () => {
  const { calendars, weekDays } = useContextCalendars();
  const { dayButton } = useContextDaysPropGetters();
  const { months } = useContextMonths();
  const { previousMonthButton, nextMonthButton, monthButton } =
    useContextMonthsPropGetters();
  const { years } = useContextYears();
  const { previousYearsButton, nextYearsButton, yearButton } =
    useContextYearsPropGetters();
  const { time } = useContextTime();
  const { timeButton } = useContextTimePropGetters();

  return (
    <Container className="time-container">
      <Calendar>
        <CalendarHeader>
          <div />
          <CalendarHeaderTitle>
            {calendars[0].month} {calendars[0].year}
          </CalendarHeaderTitle>
          <div />
        </CalendarHeader>
        <Weekdays weekDays={weekDays} prefix={calendars[0].month} />
        <Days>
          {calendars[0].days.map((d) => (
            <button
              className={getDayClassName(d, 'visible')}
              key={d.$date.toString()}
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
          {months.map((m) => (
            <button
              className={getMonthClassName(m)}
              key={m.month}
              {...monthButton(m)}
            >
              {m.month}
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
          {years.map((y) => (
            <button
              className={getYearsClassName(y)}
              key={y.year}
              {...yearButton(y)}
            >
              {y.year}
            </button>
          ))}
        </div>
      </Calendar>
      <div className="time-block">
        <div>
          {time.map((t) => (
            <button
              className={getTimeClassName(t)}
              {...timeButton(t)}
              key={t.$date.toISOString()}
            >
              {t.time}
            </button>
          ))}
        </div>
      </div>
    </Container>
  );
};
