import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  rootDir: 'src',
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  clearMocks: true
};

export default config;
