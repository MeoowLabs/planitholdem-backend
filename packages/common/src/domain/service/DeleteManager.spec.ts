import { DeleteAdapter } from './DeleteAdapter';
import { DeleteManager } from './DeleteManager';

interface CommandTest {
  fooValue: unknown;
}

describe(DeleteManager.name, () => {
  let deleteAdapterMock: jest.Mocked<DeleteAdapter<CommandTest>>;
  let deleteManager: DeleteManager<CommandTest>;

  beforeAll(() => {
    deleteAdapterMock = {
      delete: jest.fn(),
    } as Partial<jest.Mocked<DeleteAdapter<CommandTest>>> as jest.Mocked<DeleteAdapter<CommandTest>>;
    deleteManager = new DeleteManager(deleteAdapterMock);
  });

  describe('.manage()', () => {
    describe('when called', () => {
      let commandFixture: CommandTest;

      beforeAll(async () => {
        commandFixture = { fooValue: 'bar' };

        await deleteManager.manage(commandFixture);
      });
      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call deleteAdapter.delete()', () => {
        expect(deleteAdapterMock.delete).toHaveBeenCalledTimes(1);
        expect(deleteAdapterMock.delete).toHaveBeenCalledWith(commandFixture);
      });
    });
  });
});
