# @rehookify/datepicker

The tiny tool to create a date and range picker in your React applications.

<div align="center">

[![size](https://img.shields.io/bundlephobia/minzip/@rehookify/datepicker?label=MIN%20%2B%20GZIP&style=for-the-badge)](https://bundlephobia.com/package/@rehookify/datepicker)
[![npm](https://img.shields.io/npm/dw/@rehookify/datepicker?style=for-the-badge)](https://www.npmjs.com/package/@rehookify/datepicker)

</div>

## #StandWithUkraine 💙💛

We have war at our home 🇺🇦

Help us in our struggle, 💰  [United24](https://u24.gov.ua/), [KOLO](https://www.koloua.com/en), [Come Back Alive](https://savelife.in.ua/en/)

## Features

- Small size and zero dependencies.
- Easy customizable.
- You have full power to manipulate the state with actions.
- You can get accessible component props with prop-getters.
- Available as a hook or context.
- Support localization with `.toLocaleString`.

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
- [Configuration](#configuration)
  - [Default configuration](#default-configuration)
  - [Locale configuration](#locale-configuration)
  - [Calendar configuration](#calendar-configuration)
  - [Dates configuration](#dates-configuration)
  - [Years configuration](#years-configuration)

### State

The state consists of three parts: [data](#data), [propGetters](#prop-getters) and [actions](#actions).

### Data

The data represents all entities that you could use in your date picker. It consists of [calendars](#calendars), [weekdays](#weekdays), [months](#months), [years](#years) and [selectedDates](#selecteddates)

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

`calendars` are an array of objects with **year**, **month** and **days** properties. The `calendars` array always has at least one member.It always has at least one member - an initial calendar `calendars[0]`. For calendars configuration 👀 [Calendar config](#calendar-configuration)

```ts
export type DayRange =
  | 'in-range'
  | 'range-start'
  | 'range-end'
  | 'will-be-in-range'
  | 'will-be-range-start'
  | 'will-be-range-end'
  | '';

interface CalendarDay {
  $date: Date;
  date: string;
  day: string;
  currentDisplayedMonth: boolean; // deprecated use inCurrentMonth
  isSelected: boolean; // deprecated use selected
  isToday: boolean;
  inRange: boolean; // deprecated use range
  isRangeStart: boolean; // deprecated use range
  isRangeEnd: boolean; // deprecated use range
  willBeInRange: boolean; // deprecated use range
  range: DayRange;
  disabled: boolean;
  selected: boolean;
  inCurrentMonth: boolean;
}

interface Calendar {
  year: string;
  month: string;
  days: CalendarDay[];
}
```

#### weekdays

Weekdays are an array of names [`Mon`, `Tue`, `Wed`, ...]. The name format can be changed by `locale.weekdays` property 👀 [Locale configuration](#locale-configuration)

```ts
type Weekdays = string[]
```

#### months

Months are an array of objects with **$date**, **name**, **isSelected** and **isActive** properties. The name format could be changed by `locale.monthName` property 👀 [Locale configuration](#locale-configuration).

```ts
interface CalendarMonth {
  $date: Date;
  name: string;
  isSelected: boolean; // deprecated use selected
  isActive: boolean; // deprecated use active
  disabled: boolean;
  active: boolean;
  selected: boolean;
}
```

`isSelected` - shaws that we have a date selected for this month.

`isActive` - shows that a user sees this month as current.

#### years

Years are an array of objects with **$date**, **value**, **isSelected**, and **isActive** properties.

```ts
interface CalendarYear {
  $date: Date;
  value: number;
  isSelected: boolean; // deprecated use selected
  isActive: boolean; // deprecated use active
  disabled: boolean;
  active: boolean;
  selected: boolean;
}
```

`isSelected` - shows that we have a date selected for this year.

`isActive` - shows that a user sees this year as current.

#### selectedDates

An array of formatted dates `date.toLocaleDateString(locale, options)` 👀 [Locale configuration](#locale-configuration)

```ts
type SelectedDates = string[];
```

### Prop-Getters

A [prop-getters](https://kentcdodds.com/blog/how-to-give-rendering-control-to-users-with-prop-getters) is a pattern that allows you to get all the necessary pops and logic for your components. It gives you the possibility to pass additional configuration. `@rehookify/datepicker` composes `onClick` and calls it with **event** and **date** - `onClick(event, date)`.

Each prop-getter accepts a configuration object to enhance the properties and functionality of the component.

```ts
interface PropsGetterConfig extends Record<string, unknown> {
  onClick?(evt?: MouseEvent<HTMLElement>, date?: Date): void;
  disabled?: boolean;
}
```

Each prop-getter returns an object with properties:

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

`dayButton` produces properties for calendar days and sets the `selectedDates` state when a user clicks on a day.

Params:

- `day: Calendar` - you could get it from the calendars 👆 [#Calendars](#calendars)
- `props?: PropsGetterConfig`

Returns:

```ts
interface DayButtonReturnValue extends PropGetterReturnValue {
  onMouseEnter?(): void;
}
```

✏️ NOTE: `onMouseMove` - appears only if dates mode is `range`, it is not composable. 👀 [Dates configuration](#dates-configuration)

#### monthButton

`monthButton` produces properties for calendar months and changes month when a user clicks on a month.

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

`yearButton` produces properties for calendar years and changes the year when user clicks on a year.

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

Actions allow you to control the date picker's state. They don't have any additional logic. You need to check the state of days, months and years or disable the months and years pagination buttons.

#### setDay

`setDay` - adds date to `selectedDates`.

Params:

- `date: Date` - javascript Date object, you could get it from the `day.$date` 👆 [Calendars](#calendars), or create `new Date(2022, 10, 18)`

#### setMonth

`setMonth` - set the month that a user sees.

Params:

- `date: Date` - javascript Date object, you could get it from the `month.$date` 👆 [Months](#months), or create `new Date(2022, 10, 18)`

#### setNextMonth

`setNextMonth` adds one month to current

#### setPreviousMonth

`setPreviousMonth` subtracts one month from current

#### setYear

`setYear` set the year that user sees

Params:

- `date: Date` - javascript Date object, you could get it from the `year.$date` 👆 [Years](#years), or create `new Date(2022, 10, 18)`

#### setNextYears

`setNextYears` moves years pagination one step forward

#### setPreviousYears

`setPreviousYears` moves years pagination one step backward

#### setRangeEnd

`setRangeEnd` - it will temporary set Date outside of `selectedDates`.

`setRangeEnd` is used inside `dayButton` 👆 [dayButton](#daybutton) prop-getter with `dates.mode === 'range'` 👀 [Dates configuration](#dates-configuration).

It sets `CalendarDate.willBeInRange` property to true if date is between `selectedDate` and `rangeEndDate`

### Configuration

`useDatePicker` and `DatePickerProvider` accepts same configuration object that consists of [locale](#locale-configuration), [calendar](#calendar-configuration), [dates](#dates-configuration) and [years](#years-configuration)

#### Default configuration

```ts
{
  locale: {
    locale: 'en-GB',
    day: '2-digit',
    year: 'numeric',
    weekday: 'short',
    monthName: 'long',
  },
  calendar: {
    mode: 'static',
    offsets: [0],
  },
  dates: {
    mode: 'single',
    selectedDates: [],
    minDate: null,
    maxDate: null,
    toggle: false,
    limit: undefined,
  },
  years: {
    numberOfYearsDisplayed: 12;
  },
}
```

#### Locale configuration

Locale configuration consists of values compatible with `date.toLocaleString()`.

For more information about locale you can reed at [MDN doc](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString).

```ts
interface LocaleConfig {
  locale?: Intl.LocalesArgument;
  options?: Intl.DateTimeFormatOptions;
  day?: Intl.DateTimeFormatOptions['day'];
  year?: Intl.DateTimeFormatOptions['year'];
  monthName?: Intl.DateTimeFormatOptions['month'];
  weekday?: Intl.DateTimeFormatOptions['weekday'];
}
```

- `locale: UnicodeBCP47LocaleIdentifier | Locale | (UnicodeBCP47LocaleIdentifier | Locale)[] | undefined` - used to format all instances, a string with a BCP 47 language tag.
- `options: Intl.DateTimeFormatOptions` it is left undefined to allow you to control how `selectedDates` will formatted.
- `day: "2-digit" | "numeric" | undefined` - defines the date's format in [Calendars](#calendars)
- `year: "numeric" | "2-digit" | undefined` - defines the year's format in [Years](#years)
- `monthName: "numeric" | "2-digit" | "long" | "short" | "narrow" | undefined` - defines the moths format in [Months](#months)
- `weekday: "long" | "short" | "narrow" | undefined` - defines weekday's format in [Weekdays](#weekdays)

#### Calendar configuration

```ts
interface CalendarConfig {
  mode?: 'static' | 'fluid';
  offsets?: number[];
}
```

- `mode: 'static' | 'fluid'` controls how calendar will look like

Calendars in `static` mode have 6 rows by 7 days. This prevents UI from jumping while switching between months and years.

🗓 February 2022 in `static` mode:

``` text
30 31 01 02 03 04 05
06 07 08 09 10 11 12
13 14 15 16 17 18 19
20 21 22 23 24 25 26
27 28 01 02 03 04 05
06 07 08 09 10 11 12
```

Calendars in `fluid` mode counts start and end offsets.

🗓 February 2022 in `fluid` mode:

``` text
30 31 01 02 03 04 05
06 07 08 09 10 11 12
13 14 15 16 17 18 19
20 21 22 23 24 25 26
27 28 01 02 03 04 05
```

- `offsets: number[]` - adds additional calendars to the [Calendars](#calendars);

The first calendar is always `[0]` - offsets comes next.

The values of offsets could be negative, `-1`, this will add month before current.

`offsets: [-1, 1]` gives you 3 calendars `November, October, December` (today is November 2022).

#### Dates configuration

```ts
interface DatesUserConfig {
  mode?: 'single' | 'multiple' | 'range';
  minDate?: Date;
  maxDate?: Date;
  selectedDates?: Date | Date[];
  toggle?: boolean;
  limit?: number;
}
```

- `mode: 'single' | 'multiple' | 'range'` - defines how date picker behaves with days

`single` - a user can pick only 1 date

`multiple` - a user can pick unlimited number of dates until `limit` is set

`range` - a user can pick one dates range. `selectedDates` will have 2 dates

- `minDate: Date` - all dates in prop-getters before the `minDate` will be marked as disabled.

✏️ NOTE: if `minDate > NOW` - initial calendar will show the month with `minDate`

- `maxDate: Date` - all dates in prop-getters after the `maxDate` will be marked as disabled.

✏️ NOTE: if `maxDate < NOW` - initial calendar will show the month with `maxDate`

- `selectedDates: Date | Date[]` - dates that will be added to `selectedDates` state.

✏️ NOTE: If `mode: 'single'` - after the first click `selectedDates` will be reset to 1 date.

- `toggle: boolean` - allows a user to unselect dates.
- `limit: number` - number of dates that a user could select.

✏️ NOTE: works only with `mode: 'multiple'`

#### Years configuration

```ts
interface YearsConfig {
  numberOfYearsDisplayed: number;
},
```

- `numberOfYearsDisplayed: number` - the number of years you want to show to a user.
