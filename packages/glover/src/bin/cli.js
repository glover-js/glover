import gloverJest from 'glover-jest';
import gloverLogger from 'glover-logger';
import gloverResolver from 'glover-resolver';
import glover from '../index';

const modules = [
  glover(),
  gloverJest(),
  gloverLogger(),
  gloverResolver(),
  '+ glover-mock (non dependency)',
];

console.log(modules);
