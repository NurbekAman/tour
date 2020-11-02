import { getProductById } from './getProductById';

describe('getProductById', () => {
  it('should fetch correctly', async () => {
    const event = {
      pathParameters: {
        id: '1'
      }
    };
    const data = await getProductById(event, null, null);
    expect(data.statusCode).toBe(200);
  });
  it('should fail correctly', async () => {
    const event = {
      pathParameters: {
        id: '12'
      }
    };
    const data = await getProductById(event, null, null);
    expect(data.statusCode).toBe(404);
  });
});