import { catalogBatchProcess } from './catalogBatchProcess';

const publishMock = jest.fn();

function MockedSns() {}

MockedSns.prototype.publish = publishMock;

jest.mock('aws-sdk', () => ({
  'SNS': MockedSns
}));

describe('catalogBatchProcess', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should publish correctly after send products', async () => {
    fetch.mockResponseOnce(JSON.stringify({
      statusCode: 200
    }));
    await catalogBatchProcess({
      Records: [
        {
          body: JSON.stringify({
            product: 'test data'
          })
        }
      ]
    });

    expect(publishMock).toBeCalledTimes(1);
  });
  it('should not publish message if product fetch fail', async () => {
    fetch.mockRejectOnce();
    await catalogBatchProcess({
      Records: [
        {
          body: JSON.stringify({
            product: 'test data'
          })
        }
      ]
    });

    expect(publishMock).toBeCalledTimes(0);
  });
});