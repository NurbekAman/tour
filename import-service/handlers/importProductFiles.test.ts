import aws from 'aws-sdk-mock';
import { importProductsFile } from './importProductsFile';

describe('importProductFile', () => {
  it('should import file correctly', async () => {
    aws.mock('S3','getSignedUrlPromise', { data: 'test' });
    const response = await importProductsFile({
      body: undefined,
      headers: {},
      httpMethod: "",
      isBase64Encoded: false,
      multiValueHeaders: {},
      multiValueQueryStringParameters: undefined,
      path: "",
      pathParameters: undefined,
      requestContext: undefined,
      resource: "",
      stageVariables: undefined,
      queryStringParameters: { file: 'test' } }, null, null);
    expect(response.statusCode).toBe(200);
  });
  it('should imported file incorrectly', async () => {
    aws.mock('S3','getSignedUrlPromise', { data: 'test' });
    const response = await importProductsFile(null, null, null);
    expect(response.statusCode).toBe(500);
  });
});