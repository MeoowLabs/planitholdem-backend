import { UpdateAdapter } from '../adapter/UpdateAdapter';
import { UpdateManager } from './UpdateManager';

interface CommandTest {
  fooValue: unknown;
}

describe(UpdateManager.name, () => {
  let updateAdapterMock: jest.Mocked<UpdateAdapter<CommandTest>>;
  let updateManager: UpdateManager<CommandTest>;

  beforeAll(() => {
    updateAdapterMock = {
      update: jest.fn(),
    } as Partial<jest.Mocked<UpdateAdapter<CommandTest>>> as jest.Mocked<UpdateAdapter<CommandTest>>;

    updateManager = new UpdateManager(updateAdapterMock);
  });

  describe('.manage()', () => {
    describe('when called', () => {
      let commandFixture: CommandTest;

      beforeAll(async () => {
        commandFixture = { fooValue: 'bar' };

        await updateManager.manage(commandFixture);
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call updateAdapter.update()', () => {
        expect(updateAdapterMock.update).toHaveBeenCalledTimes(1);
        expect(updateAdapterMock.update).toHaveBeenCalledWith(commandFixture);
      });
    });
  });
});
