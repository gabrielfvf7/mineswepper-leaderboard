import { DIFFICULTY } from 'constants';

declare global {
  type Difficulty = (typeof DIFFICULTY)[keyof typeof DIFFICULTY];
}

export {};
