# @rehookify/datepicker

The tiny tool to create a date and range picker in your React applications.

<div align="center">

[![size](https://img.shields.io/bundlephobia/minzip/@rehookify/datepicker?label=MIN%20%2B%20GZIP&style=for-the-badge)](https://bundlephobia.com/package/@rehookify/datepicker)
[![npm](https://img.shields.io/npm/dw/@rehookify/datepicker?style=for-the-badge)](https://www.npmjs.com/package/@rehookify/datepicker)
[![twitter](https://img.shields.io/twitter/follow/rehookify?color=%231D9BF0&label=Follow&logo=twitter&style=for-the-badge
)](https://twitter.com/intent/follow&user_id=1591019504389210114)
[![discord](https://img.shields.io/discord/1052153401712062474?color=%237289da&logo=discord&style=for-the-badge)](https://discord.gg/vyM2jhYa33)
</div>

## #StandWithUkraine 💙💛

We have war at our home 🇺🇦

Help us in our struggle, 💰  [United24](https://u24.gov.ua/), [KOLO](https://www.koloua.com/en), [Come Back Alive](https://savelife.in.ua/en/)

## Features

- Small size.
- Zero dependencies.
- [Modular Hooks](#modular-hooks) will help you to use only what you need.
- You can get accessible component props with prop-getters.
- You have full power to manipulate the state with actions.
- Available as a hook or context.
- Support localization with `.toLocaleString`.

## Install

```bash
npm i -S @rehookify/datepicker
```

## Quickstart: modular use

### With modular hooks

```tsx
import { useDatePickerState } from '@rehookify/datepicker';

const DatePicker = () => {
  const config = { dates: { toggle: true, mode: 'multiple' }}
  const [state, dispatch] = useDatePickerState(config);
  const { calendars, weekDays } = useCalendars(state);

  const { month, year, days } = calendars[0];

  return (
    <section>
      <header>
        <div>
          <p>{month} {year}</p>
        </div>
        <ul>
          {weekDays.map((day) => (<li key={`${month}-${day}`}>{day}</li>))}
        </ul>
      </header>
      <ul>
        {days.map((dpDay) => (
          <li key={`${month}-${dpDay.date}`}>
            <button>{dpDay.day}</button>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

### With modular context

```tsx
import {
  DatePickerStateProvider,
  useContextCalendars
} from '@rehookify/datepicker';

const DatePicker = () => {
  const { calendars, weekDays } = useContextCalendars();

  const { year, month, days } = calendars[0];

  return (
    <section>
      <header>
        <div>
          <p>{month} {year}</p>
        </div>
        <ul>
          {weekDays.map((day) => (<li key={`${month}-${day}`}>{day}</li>))}
        </ul>
      </header>
      <ul>
        {days.map((dpDay) => (
          <li key={`${month}-${dpDay.date}`}>
            <button>{dpDay.day}</button>
          </li>
        ))}
      </ul>
    </section>
  )
}

const App = () => {
  <DatePickerStateProvider config={{ dates: { mode: 'multiple' }}}>
    <DatePicker />
  </DatePickerStateProvider>
}
```

## Quickstart: everything in one place

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
          {weekDays.map((day) => (<li key={`${month}-${day}`}>{day}</li>))}
        </ul>
      </header>
      <ul>
        {days.map((dpDay) => (
          <li key={`${month}-${dpDay.date}`}>
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
import {
  DatePickerProvider,
  useDatePickerContext,
} from '@rehookify/datepicker';

const DatePicker = () => {
  const { data: { weekDays, calendars, years, months } } = useDatePickerContext();

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
    - [weekDays](#weekdays)
    - [months](#months)
    - [years](#years)
    - [selectedDates](#selecteddates)
    - [formattedDates](#formatteddates)
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
- [Modular Hooks](#modular-hooks)
  - [useDatePickerState](#usedatepickerstate)
  - [useCalendars](#usecalendars)
  - [useDays](#usedays)
  - [useDaysPropGetters](#usedayspropgetters)
  - [useDaysActions](#usedaysactions)
  - [useMonths](#usemonths)
  - [useMonthsPropGetters](#usemonthspropgetters)
  - [useMonthsActions](#usemonthsactions)
  - [useYears](#useyears)
  - [useYearsPropGetters](#useyearspropgetters)
  - [useYearsActions](#useyearsactions)
  - [Context Hooks](#context-hooks)

### State

The state consists of three parts: [data](#data), [propGetters](#prop-getters) and [actions](#actions).

### Data

The data represents all entities that you could use in your date picker. It consists of [calendars](#calendars), [weekDays](#weekdays), [months](#months), [years](#years) and [selectedDates](#selecteddates)

```ts
interface Data {
  calendars: Calendar[];
  weekDays: string[],
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
  isToday: boolean;
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

#### weekDays

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
  disabled: boolean;
  active: boolean;
  selected: boolean;
}
```

`selected` - shaws that we have a date selected for this month.

`active` - shows that a user sees this month as current.

#### years

Years are an array of objects with **$date**, **value**, **isSelected**, and **isActive** properties.

```ts
interface CalendarYear {
  $date: Date;
  value: number;
  disabled: boolean;
  active: boolean;
  selected: boolean;
}
```

`selected` - shows that we have a date selected for this year.

`active` - shows that a user sees this year as current.

#### selectedDates

An array of raw dates

```ts
type SelectedDates = Date[];
```

#### formattedDates

An array of formatted dates `date.toLocaleDateString(locale, options)` 👀 [Locale configuration](#locale-configuration)

```ts
type FormattedDates = string[];
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

`useDatePicker`, `DatePickerProvider`, `useDatePickerState` and `DatePickerStateProvider` accepts same configuration object that consists of [locale](#locale-configuration), [calendar](#calendar-configuration), [dates](#dates-configuration) and [years](#years-configuration)

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
    mode: 'decade',
    numberOfYears: 12;
    step: 10,
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
type YearsMode = 'decade' | 'fluid';

interface YearsConfig {
  mode: YearsMode,
  numberOfYears: number;
  step: number;
},
```

- `numberOfYears: number` - the number of years you want to show to a user.
- `mode: 'decade' | 'fluid'` - it defines how current year will be centered;

✏️ NOTE: difference between `decade` and `fluid` mode

Years matrix for `decade` mode;

It will count current decade (for 2022 is 2020-2029) and adds end of the previous and start of the next decade

```text
2019 2020 2021
2022 2023 2024
2025 2026 2027
2028 2029 2030
```

Years matrix for `fluid` mode;

It will place current year in the middle of the list -1 (we want to look at the future more) 😉

```text
2017 2018 2019
2020 2021 2022
2023 2024 2025
2026 2027 2028
```

- `step: number` - it defines step for previous/nextYearsButton

### Modular Hooks

The main aim of modular hooks is to safe bundle size of your app.

All entities are consists of 3 hooks: data, prop-getters and actions (for example `useDays`, `useDaysPropGetters` and `useDaysActions`).

#### useDatePickerState

```ts
export interface State {
  rangeEnd: Date | null;
  selectedDates: Date[];
  offsetDate: Date;
  offsetYear: number;
  config: DatePickerConfig;
}

export type Action =
  | SelectDateAction
  | SetOffsetDate
  | SetYearAction
  | SetRangeEndAction;

type UseDatePickerState = (config: DatePickerConfig) =>
  [State, Dispatch<Action>]
```

Under the hook, it uses `useReducer` to capture the entire date-picker state and provides `dispatch` for state manipulation.

Modular hooks use state and dispatch to derive their entities and update the date-picker.

`DatePickerStateProvider` uses this hook and propagates state and dispatch through context.

```ts
type DatePickerStateProviderValue = {
  s: State;
  d: Dispatch<Action>
}
```

#### useCalendars

```ts
type UseCalendars = (state: State) => {
  calendars: Calendar[];
  weekDays: string[];
}
```

- `calendars` - 👀 [calendars](#calendars)
- `weekDays` - 👀 [weekDays](#weekdays)

Basic entities to build UI without interactivity.

#### useDays

```ts
type UseDays = (state: State) => {
  selectedDates: Date[];
  formattedDates: string[];
};
```

Set of data with raw and formatted dates

- `selectedDates` - 👀 [selecteDates](#selecteddates)
- `formattedDates` - 👀 [formattedDates](#formatteddates)

#### useDaysPropGetters

```ts
type UseDaysPropGetters = (state: State, dispatch: Dispatch<Action>) => {
  dayButton(day: CalendarDay, config: PropsGetterConfig): void;
};
```

Prop-getter for dates selection.

- `dayButton` - propGetter 👀 [dayButton](#daybutton)

#### useDaysActions

```ts
type UseDaysActions = (dispatch: Dispatch<Action>) => {
  setDay(Date): void;
  setRangeEnd(Date | null): void;
};
```

Set of actions for dates manipulation.

- `setDay` - action 👀 [setDay](#setday)
- `setRangeEnd` - action 👀 [setRangeEnd](#setrangeend)

#### useMonths

```ts
type UseMonths = (state: State, dispatch: Dispatch<Action>) => {
  months: CalendarMonth[],
};
```

Months data.

- `months` - 👀 [months](#months)

#### useMonthsPropGetters

```ts
type UseMonthsPropGetters = (state: State, dispatch: Dispatch<Action>) => {
  monthButton(month: CalendarMonth, config: PropsGetterConfig): void,
  nextMonthButton(config: PropsGetterConfig): void,
  previousMonthButton(config: PropsGetterConfig): void,
};
```

Prop-getters for month manipulation.

- `monthButton` - propGetter 👀 [monthButton](#monthbutton)
- `nextMonthButton` - propGetter 👀 [nextMonthButton](#nextmonthbutton)
- `previousMonthButton` - propGetter 👀 [previousMonthButton](#previousmonthbutton)

#### useMonthsActions

```ts
type UseMonthsActions = (state: State, dispatch: Dispatch<Action>) => {
  setMonth(date: Date): void,
  setNextMonth(): void,
  setPreviousMonth(): void,
};
```

Actions for month manipulation.

- `setMonth` - action 👀 [setMonth](#setmonth)
- `setNextMonth` - action 👀 [setNextMonth](#setnextmonth)
- `setPreviousMonth` - action 👀 [setPreviousMonth](#setpreviousmonth)

#### useYears

```ts
type UseYears = (state: State, dispatch: Dispatch<Action>) => {
  years: CalendarYear[]
};
```

Years data.

- `years` - 👀 [years](#years)

#### useYearsPropGetters

```ts
type UseYearsPropGetters = (state: State, dispatch: Dispatch<Action>) => {
  yearButton(year: CalendarYear, config: PropsGetterConfig): void;
  nextYearsButton(config: PropsGetterConfig): void;
  previousYearsButton(config: PropsGetterConfig): void;
};
```

Prop-getters for years manipulation.

- `yearButton` - propGetter 👀 [yearButton](#yearbutton)
- `nextYearsButton` - propGetter 👀 [nextYearsButton](#nextyearsbutton)
- `previousYearsButton` - propGetter 👀 [previousYearsButton](#previousyearsbutton)

#### useYearsActions

```ts
type UseYearsActions = (state: State, dispatch: Dispatch<Action>) => {
  setYear(date: Date): void;
  setNextYears(): void;
  setPreviousYears(): void;
};
```

Actions for years manipulation.

- `setYear` - action 👀 [setYear](#setyear)
- `setNextYears` - action 👀 [setNextYears](#setnextyears)
- `setPreviousYears` - action 👀 [setPreviousYears](#setpreviousyears)

#### Context Hooks

We have set of context hooks that have similar API with regular one.

- `useContextCalendars` - 👀 [useColendars](#usecalendars)
- `useContextDays` - 👀 [useDay](#usedays)
- `useContextDaysPropsGetters` - 👀 [useDayPropGetters](#usedayspropgetters)
- `useContextDaysActions` - 👀 [useDayActions](#usedaysactions)
- `useContextMonths` - 👀 [useMonths](#usemonths)
- `useContextMonthsPropGetters` - 👀 [useMonthsPropGetters](#usemonthspropgetters)
- `useContextMonthsActions` - 👀 [useMonthsActions](#usemonthsactions)
- `useContextYears` - 👀 [useYears](#useyears)
- `useContextYearsPropGetters` - 👀 [useYearsPropGetters](#useyearspropgetters)
- `useContextYearsActions` - 👀 [useYearsActions](#useyearsactions)

The main difference that they use context value from the `DatePickerStateProvider`. You don't need to pass any parameters to them.

✏️ NOTE: You can use them only inside `DatePickerStateProvider`! 👀 [With modular context](#with-modular-context)
