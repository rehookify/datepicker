import React from 'react';
import {
  useContextCalendars,
  useContextDaysPropGetters,
  useContextMonths,
  useContextMonthsPropGetters,
  useContextYears,
  useContextYearsPropGetters,
} from '@rehookify/datepicker';
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

export const ModularContext = () => {
  const { calendars, weekDays } = useContextCalendars();
  const { dayButton } = useContextDaysPropGetters();
  const { months } = useContextMonths();
  const { previousMonthButton, nextMonthButton, monthButton } =
    useContextMonthsPropGetters();
  const { years } = useContextYears();
  const { previousYearsButton, nextYearsButton, yearButton } =
    useContextYearsPropGetters();

  return (
    <Container>
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
          {calendars[0].days.map((dpDay) => (
            <button
              className={getDayClassName(dpDay, 'visible')}
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
              className={getMonthClassName(month.active, month.selected)}
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
              className={getYearsClassName(year.active, year.selected)}
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
