import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  rootDir: '.',
  moduleFileExtensions: ['ts', 'tsx'],
  clearMocks: true
};

export default config;
