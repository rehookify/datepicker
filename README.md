# @rehookify/datepicker
UI-independent date picker logic. The tiny library that helps you to use date-range picker logic with your UI library.

### Features

- Small size and zero dependencies.
- Easy customizable.
- You have full power to manipulate the state with actions.
- You can get accessible component props with prop-getters.
- Available as a hook or context.
- Support localization with `.toLocaleString`

### Install

```bash
npm i -S @rehookify/datepicker
```

### Quickstart

```tsx
import React, { MouseEvent } from 'react';
import { useDatePicker } from '@rehookify/datepicker';

const DatePicker = () => {
  const {
    data: { weekDays, calendars, selectedDates },
    propGetters: {
      dayButton,
      previousMonthButton,
      nextMonthButton,
    },
  } = useDatePicker();

  // calendars[0] is always present, this is an initial calendar
  const { year, month, days } = calendars[0];

  const onDayClick = (evt: MouseEvent<HTMLElement>, date: Date) => {
    // In case you need any action with evt
    evt.stopPropagation();

    // In case you need any additional action with date
    console.log(date);
  }

  // selectedDates is an array of dates
  // formatted with date.toLocaleDateString(locale, options)
  return (
    <section>
      {selectedDates.length > 0 && <h1>{selectedDates[0]}</h1>}
      <header>
        <div>
          <button {...previousMonthButton()}>&lt;</button>
          <p>{month} {year}</p>
          <button {...nextMonthButton()}>&gt;</button>
        </div>
        <ul>
          {weekDays.map((day) => (<li>{day}</li>))}
        </ul>
      </header>
      <ul>
        {days.map((dpDay) => (
          <li key={dpDay.date}>
            <button {...dayButton(dpDay)}>{dpDay.day}</button>
          </li>
        ))}
      </ul>
    </section>
  )
}
```
