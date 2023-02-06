import { describe, test, expect } from '@jest/globals';
import { createConfig } from '../utils/config';
import { createTime } from '../utils/create-time';
import { newDate } from '../utils/date';

describe('createTime', () => {
  test('should generate times correctly', () => {
    const config = createConfig();
    const time = createTime(null, config);

    // If we will not provide date all buttons should be disabled
    expect(time.filter(({ disabled }) => disabled).length).toBe(time.length);
    // The default interval is 30 so we have 2 segments for 1 hour
    expect(time.length).toBe(48);

    const config2 = createConfig({ time: { interval: 60 } });
    const time2 = createTime(newDate(), config2);

    expect(time2.filter(({ disabled }) => disabled).length).toBe(0);
    // We have 1 segment for each hour
    expect(time2.length).toBe(24);
  });

  test('should create times correctly with min and max dates', () => {
    const d = newDate();
    const config = createConfig({
      time: { minTime: { h: 9, m: 0 }, maxTime: { h: 18, m: 0 } },
    });
    const time = createTime(d, config);

    const [eightThirty] = time.filter(({ time }) => time === '08:30');
    const [nine] = time.filter(({ time }) => time === '09:00');
    const [eighteen] = time.filter(({ time }) => time === '18:00');
    const [eighteenThirty] = time.filter(({ time }) => time === '18:30');

    // disabled segment 00:00 - 8:30 and 18:30 - 23:30
    // enabled segment 9:00 - 18:00
    expect(eightThirty.disabled).toBe(true);
    expect(nine.disabled).toBe(false);
    expect(eighteen.disabled).toBe(false);
    expect(eighteenThirty.disabled).toBe(true);
  });
});
