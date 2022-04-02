jest.mock('path', () => ({ resolve: jest.fn() }));

import { resolve } from 'path';

import { LoadEnvVariablesDotenvAdapter } from './LoadEnvVariablesDotenvAdapter';

describe(LoadEnvVariablesDotenvAdapter.name, () => {
  describe('.constructor()', () => {
    describe('when called and process.env.ENV is undefined', () => {
      beforeAll(() => {
        new LoadEnvVariablesDotenvAdapter();
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call path.join()', () => {
        expect(resolve).toHaveBeenCalledTimes(1);
        expect(resolve).toHaveBeenCalledWith(__dirname, '..', '..', '..', '..', '..', 'config', '.env');
      });
    });

    describe('when called and process.env.ENV is string', () => {
      let envFixture: string;

      beforeAll(() => {
        envFixture = 'env-sample';

        process.env['ENV'] = envFixture;

        new LoadEnvVariablesDotenvAdapter();
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call path.join()', () => {
        expect(resolve).toHaveBeenCalledTimes(1);
        expect(resolve).toHaveBeenCalledWith(__dirname, '..', '..', '..', '..', '..', 'config', `${envFixture}.env`);
      });
    });
  });
});
