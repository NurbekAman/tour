import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import get from 'lodash/get';

import { formatResponse } from 'services/formatResponse';
import apiS3 from 'services/apiS3';

export const importProductsFile: APIGatewayProxyHandler = async (event, _context) => {
  const filename = get(event, 'queryStringParameters.file');
  let signedUrl;

  try {
    signedUrl = await apiS3.getSignedUrlPromises(filename);
    return formatResponse.success(signedUrl);
  } catch (err) {
    return formatResponse.fatalError(err);
  }
}
