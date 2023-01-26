import { describe, test, expect } from '@jest/globals';
import { createConfig } from '../utils/config';
import { createInitialState } from '../utils/create-initial-state';
import { INITIAL_STATE } from '../__mock__/initial-state';

describe('createInitialState', () => {
  test('createInitialState should create correct state', () => {
    const config = createConfig({});
    const state = createInitialState(config);

    expect(state).toEqual(INITIAL_STATE);
  });
});
