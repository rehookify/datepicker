# @rehookify/datepicker
UI-independent date picker logic. The tiny library that helps you to use date-range picker logic with your UI library.

## Features

- Small size and zero dependencies.
- Easy customizable.
- You have full power to manipulate the state with actions.
- You can get accessible component props with prop-getters.
- Available as a hook or context.
- Support localization with `.toLocaleString`

## Install

```bash
npm i -S @rehookify/datepicker
```

## Quickstart

### With hook

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

### With context

```tsx
import { DatePickerProvider, useDatePickerContext } from '@rehookify/datepicker';

const DatePicker = () => {
  const { data: { weekdays, calendars, years, months } } = useDatePickerContext();

  const { year, month, days } = calendars[0];

  return (
    <section>
      <header>{month} {year}</header>
      ...
    </section>
  )
}

const App = () => {
  <DatePickerProvider config={{ dates: { mode: 'range' }}}>
    <DatePicker />
  </DatePickerProvider>
}
```

## API reference

- [State](#state)
  - [data](#data)
    - [calendars](#calendars)
    - [weekdays](#weekdays)
    - [months](#months)
    - [years](#years)
    - [selectedDates](#selecteddates)
  - [propGetters](#prop-getters)
    - [dayButton](#daybutton)
    - [monthButton](#monthbutton)
    - [nextMonthButton](#nextmonthbutton)
    - [previousMonthButton](#previousmonthbutton)
    - [yearButton](#yearbutton)
    - [nextYearsButton](#nextyearsbutton)
    - [previousYearsButton](#previousyearsbutton)
  - [actions](#actions)
    - [setDay](#setday)
    - [setMonth](#setmonth)
    - [setYear](#setyear)
    - [setNextYears](#setnextyears)
    - [setPreviousYears](#setpreviousyears)
    - [setNextMonth](#setnextmonth)
    - [setPreviousMonth](#setpreviousmonth)
    - [setRangeEnd](#setrangeend)

### State

The state consists of three parts: [data](#data), [propGetters](#prop-getters) and [actions](#actions).

### Data

The data represents all entities what you could use in your date picker. It consists of: [calendars](#calendars), [weekdays](#weekdays), [months](#months), [years](#years) and [selectedDates](#selecteddates)

```ts
interface Data {
  calendars: Calendar[];
  weekdays: string[],
  months: CalendarMonth[],
  years: CalendarYears[],
  selectedDates: Date[],
}

```

#### calendars

Calendars are an array of objects that includes: year, month and days array. It always has at least one member `calendars[0]` - an initial calendar. They could be `static` or `fluid`. We could set additional calendars by adding `offsets: [1, ...]` 👀 [Calendar config](#calendar-configuration)

```ts
interface CalendarDay {
  $date: Date;
  date: string;
  day: string;
  currentDisplayedMonth: boolean;
  isSelected: boolean;
  isToday: boolean;
  inRange: boolean;
  isRangeStart: boolean;
  isRangeEnd: boolean;
  willBeInRange: boolean;
}

interface Calendar {
  year: string;
  month: string;
  days: CalendarDay[];
}
```

#### weekdays

Weekdays are an array of day's names. Names will be in the short form - [`Mon`, `Tue`, `Wed`, ...] for the 'en-GB' locale. You can change weekdays appearance, 👀 [Locales configuration](#locales-configuration) `weekdays`

```ts
type Weekdays = string[]
```

#### months

Months are an array of objects that includes: `$date`, `name`, `isSelected`, `isActive`. Names formatted as a `long` version: ['January', 'February', ...].
You can change names appearance, 👀 [Locales configuration](#locales-configuration) `monthName`

```ts
interface CalendarMonth {
  $date: Date;
  name: string;
  isSelected: boolean;
  isActive: boolean;
}
```

`isSelected` - shows that we have a date selected for this month.

`isActive` - shows that the user currently sees this month on the screen.

#### years

Years are an array of objects that includes: $date, value, isSelected, isActive.

```ts
interface CalendarYear {
  $date: Date;
  value: number;
  isSelected: boolean;
  isActive: boolean;
}
```

`isSelected` - shows that we have a date selected for this year.
`isActive` - shows that the user currently sees this year on the screen.

#### selectedDates

An array of formatted dates `date.toLocaleDateString(locale, options)` 👀 [Locales configuration](#locales-configuration)

```ts
type SelectedDates = string[];
```

### Prop-Getters

[Prop-getters](https://kentcdodds.com/blog/how-to-give-rendering-control-to-users-with-prop-getters)  is a pattern that allows you to get all necessary pops and logic for you components. It gives you possibility to pass additional configuration. `@rehookify/datepicker` composes `onClick` logic and sends event and date - `onClick(event, date)`.

Each prop getters accepted configuration object. This object could expand properties and functionality of the component.

```ts
interface PropsGetterConfig extends Record<string, unknown> {
  onClick?(evt?: MouseEvent<HTMLElement>, date?: Date): void;
  disabled?: boolean;
}
```

All of them returns object of component props.

```ts
interface PropGetterReturnValue extends Omit<PropsGetterConfig, 'onClick' | 'disabled'>{
  role: 'button',
  tabIndex: 0,
  disabled: boolean,
  'area-disabled': boolean;
  onClick?(evt: MouseEvent<HTMLElement>),
}
```

#### dayButton

`dayButton` returns props for calendar days. It sets selectedDates when the user clicks on a day.

Params:

- `day: Calendar` - you could get it from the calendars 👆 [#Calendars](#calendars)
- `props?: PropsGetterConfig`

Returns:

```ts
interface DayButtonReturnValue extends PropGetterReturnValue {
  onMouseEnter?(): void;
}
```

✏️ NOTE:

`onMouseMove` - appears only if dates mode is `range`, it is not composable. 👀 [Dates configuration](#dates-configuration)

#### monthButton

`monthButton` returns props for calendar months. It changes month that the user sees.

Params:

- `month: CalendarMonth` - you could get it from the months 👆 [Months](#months)
- `props?: PropsGetterConfig`

#### nextMonthButton

`nextMonthButton` moves months pagination one step forward.

Params:

- `props?: PropsGetterConfig`


#### previousMonthButton

`previousMonthButton` moves months pagination one step backward.

Params:

- `props?: PropsGetterConfig`

#### yearButton

`yearButton` returns props for calendar years. It changes the year that the user sees.

Params:

- `year: CalendarYear` - you could get it from the years 👆 [Years](#years)
- `props?: PropsGetterConfig`

#### nextYearsButton

`nextYearsButton` moves years pagination one step forward.

Params:

- `props?: PropsGetterConfig`

✏️ NOTE: `onClick` - callback function doesn't get `date` as a second parameter.

#### previousYearsButton

`previousYearsButton` moves years pagination one step backward.

Params:

- `props?: PropsGetterConfig`

✏️ NOTE: `onClick` - callback function doesn't get `date` as a second parameter.

### Actions

Actions allows you to control date picker internal state. They doesn't have any additional logic. You need to check states that days, months and years has. Or disable months and years pagination buttons.

#### setDay

`setDay` - adds date to `selectedDates`.

Params:

- `date: Date` - javascript Date object, you could get it from the `day.$date` 👆 [Calendars](#calendars), or create `new Date(2022, 10, 18)`

#### setMonth

`setMonth` - set month that user sees

Params:

- `date: Date` - javascript Date object, you could get it from the `month.$date` 👆 [Months](#months), or create `new Date(2022, 10, 18)`

#### setNextMonth

`setNextMonth` - adds one month to current

#### setPreviousMonth

`setPreviousMonth` - subtracts one month from current

#### setYear

`setMonth` - set year that user sees

Params:

- `date: Date` - javascript Date object, you could get it from the `year.$date` 👆 [Years](#years), or create `new Date(2022, 10, 18)`

#### setNextYears

`setNextYears` - moves years pagination one step forward

#### setPreviousYears

`setPreviousYears` - moves years pagination one step backward

#### setRangeEnd

`setRangeEnd` - it will temporary set Date outside of `selectedDates`. `setRangeEnd` is used inside `dayButton` 👆 [dayButton](#daybutton) prop getter with `dates.mode === 'range'` 👀 [Dates configuration](#dates-configuration). It will set CalendarDate.willBeInRange prop to true if date between `selectedDate` and `rangeEndDate`
