# @rehookify/datepicker

The ultimate tiny tool for creating date, range and time pickers in your React applications.

<div align="center">

[![size](https://img.shields.io/bundlephobia/minzip/@rehookify/datepicker?label=MIN%20%2B%20GZIP&style=for-the-badge)](https://bundlephobia.com/package/@rehookify/datepicker)
[![npm](https://img.shields.io/npm/dw/@rehookify/datepicker?style=for-the-badge)](https://www.npmjs.com/package/@rehookify/datepicker)
[![twitter](https://img.shields.io/twitter/follow/rehookify?color=rgb%2829%2C%20155%2C%20240%29&label=Follow&logo=twitter&style=for-the-badge
)](https://twitter.com/rehookify)
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
- Available as a hook or context.
- Support localization with `.toLocaleString`, `.toLocalTimeString`

## Install

```bash
npm i -S @rehookify/datepicker
```

## 📚 Check the [Examples](https://github.com/rehookify/datepicker/blob/main/EXAMPLES.md)

## Quickstart: modular use

### With modular hooks

```tsx
import { useState } from 'react';
import { useDatePickerState, useCalendars } from '@rehookify/datepicker';

const DatePicker = () => {
  const [selectedDates, onDatesChange] = useState<Date[]>([]);
  const dpState = useDatePickerState({
    selectedDates,
    onDatesChange,
    dates: { toggle: true, mode: 'multiple' },
  });
  const { calendars, weekDays } = useCalendars(dpState);

  const { month, year, days } = calendars[0];

  return (
    <section>
      <header>
        <div>
          <p>{month} {year}</p>
        </div>
        <ul>
          {weekDays.map((day) => (
            <li key={`${month}-${day}`}>{day}</li>
          ))}
        </ul>
      </header>
      <ul>
        {days.map((dpDay) => (
          <li key={dpDay.$date.toDateString()}>
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
import { useState } from 'react';
import {
  DatePickerStateProvider,
  useContextCalendars,
  useContextDaysPropGetters,
  useContextTime,
  useContextTimePropGetters,
} from '@rehookify/datepicker';

const DatePicker = () => {
  const { calendars, weekDays } = useContextCalendars();
  const { dayButton } = useContextDaysPropGetters();

  const { year, month, days } = calendars[0];

  return (
    <main>
      <header>
        <div>
          <p>{month} {year}</p>
        </div>
        <ul>
          {weekDays.map((day) => (
            <li key={`${month}-${day}`}>{day}</li>
          ))}
        </ul>
      </header>
      <ul>
        {days.map((dpDay) => (
          <li key={dpDay.$date.toDateString()}>
            <button {...dayButton(dpDay)}>{dpDay.day}</button>
          </li>
        ))}
      </ul>
    </main>
  )
}

const TimePicker = () => {
  const { time } = useContextTime();
  const { timeButton } = useContextTimePropGetters();

  return (
    <ul>
      {time.map((t) => (
        <li key={t.$date.toString()}>
          <button {...timeButton(t)}>{t.time}</>
        </li>
      ))}
    </ul>
  )
}

const App = () => {
  const d = new Date();
  const [selectedDates, onDatesChange] = useState<Date[]>([d]);
  return (
    <DatePickerStateProvider
      config={{
        selectedDates,
        focusDate: d,
        onDatesChange,
        dates: { mode: 'multiple' },
      }}
    >
      <section>
        <DatePicker />
        <TimePicker />
      </section>
    </DatePickerStateProvider>
  );
}
```

## Quickstart: everything in one place

### With hook

```tsx
import { MouseEvent, useState } from 'react';
import { useDatePicker } from '@rehookify/datepicker';

const DatePicker = () => {
  const [selectedDates, onDatesChange] = useState<Date[]>([]);
  const [offsetDate, onOffsetChange] = useState<Date>(new Date());

  const {
    data: { weekDays, calendars },
    propGetters: {
      dayButton,
      addOffset,
      subtractOffset,
    },
  } = useDatePicker({
    selectedDates,
    onDatesChange,
    // we want to manipulate with offsetDate outside of the hook
    offsetDate,
    onOffsetChange,
  });

  // calendars[0] is always present, this is an initial calendar
  const { year, month, days } = calendars[0];

  const onDayClick = (evt: MouseEvent<HTMLElement>, date: Date) => {
    // In case you need any action with evt
    evt.stopPropagation();

    // In case you need any additional action with date
    console.log(date);
  }

  const moveOffsetToNewYear = () => {
    onOffsetChange(new Date(2024, 0, 1));
  }

  // selectedDates is an array of dates
  // formatted with date.toLocaleDateString(locale, options)
  return (
    <section>
      {selectedDates.length > 0 && <h1>{selectedDates[0]}</h1>}
      <header>
        <div>
          <button {...subtractOffset({ months: 1 })}>&lt;</button>
          <p>{month} {year}</p>
          <button {...addOffset({ months: 1 })}>&gt;</button>
        </div>
        <ul>
          {weekDays.map((day) => (
            <li key={`${month}-${day}`}>{day}</li>
          ))}
        </ul>
      </header>
      <ul>
        {days.map((dpDay) => (
          <li key={dpDay.$date.toDateString()}>
            <button
              {...dayButton(dpDay, { onClick: onDayClick })}
            >
              {dpDay.day}
            </button>
          </li>
        ))}
      </ul>
      <button onClick={moveOffsetToNewYear}>New Year</button>
    </section>
  )
}
```

### With context

```tsx
import { useState } from 'react';
import {
  DatePickerProvider,
  useDatePickerContext,
} from '@rehookify/datepicker';

const DatePicker = () => {
  const {
    data: { weekDays, calendars, years, months },
  } = useDatePickerContext();

  const { year, month, days } = calendars[0];

  return (
    <section>
      <header>{month} {year}</header>
      ...
    </section>
  )
}

const App = () => {
  const [selectedDates, onDatesChange] = useState<Date[]>([]);

  return (
    <DatePickerProvider
      config={{
        selectedDates,
        onDatesChange,
        dates: { mode: 'range' },
      }}
    >
      <DatePicker />
    </DatePickerProvider>
  );
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
    - [time](#time)
  - [propGetters](#prop-getters)
    - [dayButton](#daybutton)
    - [monthButton](#monthbutton)
    - [setOffset](#setoffset)
    - [addOffset](#addoffset)
    - [subtractOffset](#subtractoffset)
    - [timeButton](#timebutton)
    - [yearButton](#yearbutton)
    - [nextYearsButton](#nextyearsbutton)
    - [previousYearsButton](#previousyearsbutton)
- [Configuration](#configuration)
  - [Default configuration](#default-configuration)
  - [General configuration](#general-configuration)
  - [Calendar configuration](#calendar-configuration)
  - [Dates configuration](#dates-configuration)
  - [Exclude configuration](#exclude-configuration)
  - [Locale configuration](#locale-configuration)
  - [Time configuration](#time-configuration)
  - [Years configuration](#years-configuration)
- [Modular Hooks](#modular-hooks)
  - [useDatePickerState](#usedatepickerstate)
  - [useCalendars](#usecalendars)
  - [useDays](#usedays)
  - [useDaysPropGetters](#usedayspropgetters)
  - [useMonths](#usemonths)
  - [useMonthsPropGetters](#usemonthspropgetters)
  - [useDatePickerOffsetPropGetters](#usedatepickeroffsetpropgetters)
  - [useTime](#usetime)
  - [useTimePropGetters](#usetimepropgetters)
  - [useYears](#useyears)
  - [useYearsPropGetters](#useyearspropgetters)
  - [Context Hooks](#context-hooks)

### State

The state consists of two main parts: [data](#data) and [propGetters](#prop-getters).

### Data

The data represents all entities that you could use in your date picker. It consists of [calendars](#calendars), [weekDays](#weekdays), [months](#months), [years](#years), [selectedDates](#selecteddates) and [time](#time)

```ts
interface DPData {
  calendars: Calendar[];
  formattedDates: Date[];
  months: CalendarMonth[];
  selectedDates: Date[];
  time: Time[];
  weekDays: string[];
  years: CalendarYears[];
}
```

#### calendars

`calendars` are an array of objects with **year**, **month** and **days** properties. It always has at least one member - an initial calendar `calendars[0]`. For calendars configuration 👀 [Calendar config](#calendar-configuration)

```ts
export type DPDayRange =
  | 'in-range'
  | 'range-start'
  | 'range-end'
  | 'range-start range-end'
  | 'will-be-in-range'
  | 'will-be-range-start'
  | 'will-be-range-end'
  | '';

interface DPDay {
  $date: Date;
  day: string;
  disabled: boolean;
  inCurrentMonth: boolean;
  now: boolean;
  range: DPDayRange;
  selected: boolean;
}

interface DPCalendar {
  days: DPDay[];
  month: string;
  year: string;
}
```

#### weekDays

Weekdays are an array of day names [`Mon`, `Tue`, `Wed`, ...]. The name format can be changed by `locale.weekdays` property 👀 [Locale configuration](#locale-configuration)

```ts
type DPWeekdays = string[]
```

#### months

Months are an array of objects with **$date**, **active**, **disabled**, **month**, **now** and **selected** properties. The month name format could be changed by `locale.monthName` property 👀 [Locale configuration](#locale-configuration).

```ts
interface DPMonth {
  $date: Date;
  active: boolean;
  disabled: boolean;
  month: string;
  now: boolean;
  selected: boolean;
}
```

`active` - shows that a user sees this month as current.

`month` - month name e.g 'December'

`now` - shows that this month is current in real life

`selected` - shaws that we have a date selected for this month.

#### years

Years are an array of objects with **$date**, **active**, **disabled**, **now**, **selected** and **year** properties.

```ts
interface DPYear {
  $date: Date;
  active: boolean;
  disabled: boolean;
  now: boolean;
  selected: boolean;
  year: number;
}
```

`active` - shows that a user sees this year as current.

`now` - shows that this year is current in real life

`selected` - shows that we have a date selected for this year.

`year` - year value e.g 2023

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

#### time

Time is an array of objects with **$date**, **disabled**, **now**, **selected** and **value** properties. You can change **time** format with `hour12`, `hour` and `minute` options 👀 [Locale configuration](#locale-configuration)

```ts
export interface DPTime {
  $date: Date;
  disabled: boolean;
  selected: boolean;
  time: string;
}
```

`time` - time value e.g `15:30` or `3:30 pm`

### Prop-Getters

A [prop-getters](https://kentcdodds.com/blog/how-to-give-rendering-control-to-users-with-prop-getters) is a pattern that allows you to get all the necessary pops and logic for your components. It gives you the possibility to pass additional configuration. `@rehookify/datepicker` composes `onClick` and calls it with **event** and **date** - `onClick(event, date)`.

Each prop-getter accepts a configuration object to enhance the properties and functionality of the component.

```ts
export interface DPPropsGetterConfig extends Record<string, unknown> {
  onClick?(evt?: MouseEvent<HTMLElement>, date?: Date): void;
  disabled?: boolean;
}
```

Each prop-getter returns an object with properties:

```ts
export interface DPPropGetter extends Record<string, unknown> {
  role: 'button';
  tabIndex: number;
  disabled?: boolean;
  'aria-disabled'?: boolean;
  'aria-selected'?: boolean;
  onClick?(evt: MouseEvent<HTMLElement>): void;
}
```

#### dayButton

`dayButton` produces properties for calendar days and sets the `selectedDates` state when a user clicks on a day.

Params:

- `day: DPDay` - you could get it from the calendars 👆 [#Calendars](#calendars)
- `props?: DPPropsGetterConfig`

Returns:

```ts
type DayButton = (day: DPDay, config?: DPPropsGetterConfig) => DPPropGetter;
```

✏️ NOTE: `onMouseMove` - appears only if dates mode is `range`, it is not composable. 👀 [Dates configuration](#dates-configuration)

#### monthButton

`monthButton` produces properties for calendar months and changes month when a user clicks on a month.

Returns:

```ts
type MonthButton = (month: DPMonth, config?: DPPropsGetterConfig) => DPPropGetter;
```

Params:

- `month: DPMonth` - you could get it from the months 👆 [Months](#months)
- `props?: DPMonthsPropGettersConfig`

#### yearButton

`yearButton` produces properties for calendar years and changes the year when user clicks on a year.

Params:

- `year: DPYear` - you could get it from the years 👆 [Years](#years)
- `props?: DPPropsGetterConfig`

Returns:

```ts
type YearButton = (year: DPYear, config?: DPPropsGetterConfig) => DPPropGetter;
```

#### nextYearsButton

`nextYearsButton` moves years pagination one step forward.

Params:

- `props?: DPPropsGetterConfig`

✏️ NOTE: `onClick` - callback function doesn't get `date` as a second parameter.

#### previousYearsButton

`previousYearsButton` moves years pagination one step backward.

Params:

- `props?: DPPropsGetterConfig`

✏️ NOTE: `onClick` - callback function doesn't get `date` as a second parameter.

#### timeButton

`timeButton` produces properties for time button and changes corresponding `selectedDate` and `focusDate`.

Params:

- `time: DPTime` - you could get it from the years 👆 [Time](#time)
- `props?: DPPropsGetterConfig`

✏️ NOTE: `onClick` - callback function doesn't get `date` as a second parameter.

#### setOffset

```ts
type SetOffset = (date: Date, config?: DPPropsGetterConfig) => DPPropGetter;
```

`setOffset` moves offset to passed date if it is after than minDate and before maxDate.

Params:

- `date: Date` - JS date object
- `props?: DPPropsGetterConfig`

#### addOffset

```ts
interface DPOffsetValue {
  days?: number;
  months?: number;
  years?: number;
}

type AddOffset = (
    offsetValue: DPOffsetValue,
    config?: DPPropsGetterConfig,
  ) => DPPropGetter;
```

`addOffset` - moves current offsetDate forward on the number of days, months and years.

Params:

- `offsetValue: DPOffsetValue` - JS object with number of days, months and years
- `props?: DPPropsGetterConfig`

#### subtractOffset

```ts
type SubtractOffset = (
    offsetValue: DPOffsetValue,
    config?: DPPropsGetterConfig,
  ) => DPPropGetter;
```

`subtractOffset` - moves current offsetDate backward on the number of days, months and years.

Params:

- `offsetValue: DPOffsetValue` - JS object with number of days, months and years
- `props?: DPPropsGetterConfig`

### Configuration

`useDatePicker`, `DatePickerProvider`, `useDatePickerState` and `DatePickerStateProvider` accepts same configuration object that consists of [locale](#locale-configuration), [calendar](#calendar-configuration), [dates](#dates-configuration) and [years](#years-configuration)

#### Default configuration

```ts
{
  selectedDates: [],
  focusDate: undefined,
  onDatesChange: undefined,
  dates: {
    limit: undefined,
    mode: 'single',
    minDate: undefined,
    maxDate: undefined,
    selectedDates: [],
    selectSameDate: false,
    toggle: false,
  },
  calendar: {
    mode: 'static',
    offsets: [0],
  },
  exclude: {
    day: [],
    date: [],
  },
  locale: {
    locale: 'en-GB',
    day: '2-digit',
    year: 'numeric',
    weekday: 'short',
    monthName: 'long',
    hour: '2-digit',
    minute: '2-digit',
    hour12: undefined,
    second: undefined,
  },
  time: {
    interval: 30,
    minTime: undefined,
    maxTime: undefined,
  },
  years: {
    mode: 'decade',
    numberOfYears: 12;
    step: 10,
  },
}
```

#### General configuration

```ts
selectedDates: Date[];
onDatesChange(d: Date[]): void;
focusDate?: Date | undefined;
offsetDate?: Date
onOffsetChange?(d: Date): void;
```

The date-picker is a controlled component that utilizes the `selectedDates` property to create all entities and display the user's selection. If you don't provide a `selectedDates` value, it will default to an empty array, but the selection won't be visible. Every time a date is selected, it will be passed to the `onDatesChange` function.

A typical setup is to use the `useState` hook to handle updates.

```ts
const [selectedDates, onDatesChange] = useState<Date[]>([]);
const { data } = useDatePicker({
  selectedDates,
  onDatesChange,
})

```

`focusDate` is initial value for the time-picker, if it is **undefined** or not present in the `selectedDates` array all time buttons will be disabled.

You can also pass an offsetDate and onOffsetChange function to control the offsetDate. It is really useful when you want to use the date-picker with input, or save offset in the multiple mode, or pair date selection with offset management.

If you will not pass either offsetDate or onOffsetChange, the date-picker will manage offsetDate by itself.

#### Locale configuration

Locale configuration consists of values compatible with `date.toLocaleString()`.

For more information about locale you can reed at [MDN doc](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString).

```ts
interface DPLocaleConfig {
  locale?: Intl.LocalesArgument;
  options?: Intl.DateTimeFormatOptions;
  day?: Intl.DateTimeFormatOptions['day'];
  year?: Intl.DateTimeFormatOptions['year'];
  monthName?: Intl.DateTimeFormatOptions['month'];
  weekday?: Intl.DateTimeFormatOptions['weekday'];
  hour: Intl.DateTimeFormatOptions['hour'];
  minute: Intl.DateTimeFormatOptions['minute'];
  second?: Intl.DateTimeFormatOptions['second'];
  hour12?: Intl.DateTimeFormatOptions['hour12'];
}
```

- `locale: UnicodeBCP47LocaleIdentifier | Locale | (UnicodeBCP47LocaleIdentifier | Locale)[] | undefined` - used to format all instances, a string with a BCP 47 language tag.
- `options: Intl.DateTimeFormatOptions` it is left undefined to allow you to control how `selectedDates` will formatted.
- `day: "2-digit" | "numeric" | undefined` - defines the date's format in [Calendars](#calendars)
- `year: "numeric" | "2-digit" | undefined` - defines the year's format in [Years](#years)
- `monthName: "numeric" | "2-digit" | "long" | "short" | "narrow" | undefined` - defines the moths format in [Months](#months)
- `weekday: "long" | "short" | "narrow" | undefined` - defines weekday's format in [Weekdays](#weekdays)
- `hour: "numeric" | "2-digit" | undefined` - defines hours format in [Time](#time)
- `minute: "numeric" | "2-digit" | undefined` - defines minutes format in [Time](#time)
- `second: "numeric" | "2-digit" | undefined` - defines seconds format in [Time](#time)
- `hour12: boolean | undefined` - defines time format in general `12:12` or `12:12 pm`

#### Calendar configuration

```ts
interface DPCalendarConfig {
  mode?: 'static' | 'fluid';
  offsets?: number[];
  startDay: DPDayInteger;
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

`startDay` - The day of the week that will be the first in the calendar. It accepts a number in the range of 0-6, where 0 represents Sunday and 6 represents Saturday.

#### Exclude configuration

```ts
// The days in JS Date object has numbers from 0 - Sun to 6 - Sat
type DPDayInteger = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface DPExcludeConfig {
  day?: DPDayInteger[];
  date?: Date[];
}
```

- `day: DPDayInteger` - an array of days number from 0 to 6. If you will specify 0 and 6 all Sundays and Saturdays will be disabled.

- `date: Date[]` - an array of Dates that will be disabled

#### Dates configuration

```ts
interface DPDatesUserConfig {
  mode?: 'single' | 'multiple' | 'range';
  minDate?: Date;
  maxDate?: Date;
  selectSameDate?: boolean;
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

- `selectSameDate: boolean` - it allows to select same date in the `range` mode.

- `toggle: boolean` - allows a user to unselect dates.

- `limit: number` - number of dates that a user could select.

✏️ NOTE: works only with `mode: 'multiple'`

#### Time configuration

```ts
export interface DPTimeLimit {
  h: number;
  m: number;
}
export interface DPTimeConfig {
  interval: number;
  minTime: DPTimeLimit;
  maxTime: DPTimeLimit;
  useLocales: boolean;
}
```

- `interval` - time segments value in minutes for example, interval 30 is 48 segments 2 for each hour
- `minTime` - all times in prop-getters before the `minTime` will be marked as disabled
- `maxTime` - all times in prop-getters after the `maxTime` will be marked as disabled
- `useLocales` - if `true` it will use `getLocaleTimeString` to format time

✏️ NOTE:

- config will sort `minTime` and `maxTime` if both present.
- you can still get 12h time format by setting `hour12: true` in [Locale configuration](#locale-configuration)

#### Years configuration

```ts
type DPYearsMode = 'decade' | 'fluid';

interface DPYearsConfig {
  mode: DPYearsMode,
  numberOfYears: number;
  step: number;
},
```

- `numberOfYears: number` - the number of years you want to show to a user.
- `mode: 'decade' | 'fluid' | 'exact'` - it defines how current year will be centered;

✏️ NOTE: difference between `decade` and `fluid` mode

Years matrix for `decade` mode.

It will count current decade (for 2022 is 2020-2029) and adds end of the previous and start of the next decade

```text
2019 2020 2021
2022 2023 2024
2025 2026 2027
2028 2029 2030
```

Years matrix for `fluid` mode.

It will place current year in the middle of the list -1 (we want to look at the future more) 😉

```text
2017 2018 2019
2020 2021 2022
2023 2024 2025
2026 2027 2028
```

Years matrix for `exact` mode.

It will place current year at the end of the list

```text
2012 2013 2014
2015 2016 2017
2018 2019 2020
2021 2022 2023
```

- `step: number` - it defines step for previous/nextYearsButton

### Modular Hooks

The main aim of modular hooks is to safe bundle size of your app.

All entities are consists of 2 hooks: data, prop-getters and actions (for example `useDays` and `useDaysPropGetters`).

#### useDatePickerState

```ts
export interface DPReducerState {
  focusDate?: Date;
  rangeEnd: Date | null;
  offsetDate: Date;
  offsetYear: number;
}

export type DPReducerAction =
  | DPSetFocusDate
  | DPSetOffsetDate
  | DPSetYearAction
  | DPSetRangeEndAction;

export interface DPState {
  dispatch: Dispatch<DPReducerAction>;
  state: DPReducerState;
  selectedDates: Date[];
  offsetDate: Date;
  config: DPConfig;
}

type UseDatePickerState = (config: DPUserConfig): DPState
```

Under the hook, it uses `useReducer` to capture date-picker state and provides `dispatch` for state manipulation.

Modular hooks use state and dispatch to derive their entities and update the date-picker.

`DatePickerStateProvider` uses this hook and propagates state and dispatch through context.

```ts
type DatePickerStateProviderValue = DPState;
```

#### useCalendars

```ts
type DPUseCalendars = (state: DPState) => {
  calendars: DPCalendar[];
  weekDays: string[];
};
```

- `calendars` - 👀 [calendars](#calendars)
- `weekDays` - 👀 [weekDays](#weekdays)

Basic entities to build UI without interactivity.

#### useDays

```ts
export type DPUseDays = (state: DPState) => {
  selectedDates: Date[];
  formattedDates: string[];
};
```

Set of data with raw and formatted dates

- `selectedDates` - 👀 [selecteDates](#selecteddates)
- `formattedDates` - 👀 [formattedDates](#formatteddates)

#### useDaysPropGetters

```ts
export type DPUseDaysPropGetters = (state: DPState) => {
  dayButton: (day: DPDay, config?: DPPropsGetterConfig) => DPPropGetter;
};
```

Prop-getter for dates selection.

- `dayButton` - propGetter 👀 [dayButton](#daybutton)

#### useMonths

```ts
export type DPUseMonths = (state: DPState) => {
  months: DPMonth[];
};
```

Months data.

- `months` - 👀 [months](#months)

#### useMonthsPropGetters

```ts
export type DPUseMonthsPropGetters = (state: DPState) => {
  monthButton: (month: DPMonth, config?: DPPropsGetterConfig) => DPPropGetter;
};
```

Prop-getters for month manipulation.

- `monthButton` - propGetter 👀 [monthButton](#monthbutton)

#### useTime

```ts
export type DPUseTime = (state: DPState) => {
  time: DPTime[];
};
```

#### useDatePickerOffsetPropGetters

```ts
export type DPUseDatePickerOffsetPropGetters = (state: DPState) => {
  addOffset: (
    offsetValue: DPOffsetValue,
    config?: DPPropsGetterConfig,
  ) => DPPropGetter;
  setOffset: (date: Date) => DPPropGetter;
  subtractOffset: (
    offsetValue: DPOffsetValue,
    config?: DPPropsGetterConfig,
  ) => DPPropGetter;
};
```

Prop-getters for offset manipulation.

- `addOffset` - propGetter 👀 [addOffset](#addoffset)
- `setOffset` - propGetter 👀 [setOffset](#setoffset)
- `subtractOffset` - propGetter 👀 [subtractOffset](#subtractoffset)

Time data.

- `time` - 👀 [Time](#time)

#### useTimePropGetters

```ts
export type DPUseTimePropGetter = (state: DPState) => {
  timeButton: (time: DPTime, config?: DPPropsGetterConfig) => DPPropGetter;
};
```

Prop-getters for time manipulation.

- `timeButton` - propGetter 👀 [timeButton](#timebutton)

#### useYears

```ts
export type DPUseYears = (state: DPState) => {
  years: DPYear[];
};
```

Years data.

- `years` - 👀 [years](#years)

#### useYearsPropGetters

```ts
export type DPUseYearsPropGetters = (state: DPState) => {
  yearButton: (year: DPYear, config?: DPPropsGetterConfig) => DPPropGetter;
  nextYearsButton: (config?: DPPropsGetterConfig) => DPPropGetter;
  previousYearsButton: (config?: DPPropsGetterConfig) => DPPropGetter;
};
```

Prop-getters for years manipulation.

- `yearButton` - propGetter 👀 [yearButton](#yearbutton)
- `nextYearsButton` - propGetter 👀 [nextYearsButton](#nextyearsbutton)
- `previousYearsButton` - propGetter 👀 [previousYearsButton](#previousyearsbutton)

#### Context Hooks

We have set of context hooks that have similar API with regular one.

- `useContextCalendars` - 👀 [useCalendars](#usecalendars)
- `useContextDays` - 👀 [useDay](#usedays)
- `useContextDaysPropsGetters` - 👀 [useDayPropGetters](#usedayspropgetters)
- `useContextMonths` - 👀 [useMonths](#usemonths)
- `useContextMonthsPropGetters` - 👀 [useMonthsPropGetters](#usemonthspropgetters)
- `useContextTime` - 👀 [useTime](#usetime)
- `useContextTimePropGetters` - 👀 [useTimePropGetters](#usetimepropgetters)
- `useContextYears` - 👀 [useYears](#useyears)
- `useContextYearsPropGetters` - 👀 [useYearsPropGetters](#useyearspropgetters)
- `useContextDatePickerOffsetPropGetters` - 👀 [useDatePickerOffsetPropGetters](#usedatepickeroffsetpropgetters)

The main difference that they use context value from the `DatePickerStateProvider`. You don't need to pass any parameters to them.

✏️ NOTE: You can use them only inside `DatePickerStateProvider`! 👀 [With modular context](#with-modular-context)
