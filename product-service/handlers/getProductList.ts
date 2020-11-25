import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register.js';

import { formatResponse } from '../services/formatResponse'
import { STATUS_CODE } from '../services/constant';
import { invokeProducts } from '../services/invokeProducts';

export const getProductList: APIGatewayProxyHandler = async () => {
  let response;
  try {
    const result = await invokeProducts();
    console.log('response result', result);
    response = formatResponse({ status: STATUS_CODE.SUCCESS, body: result });
  } catch (err) {
    response = formatResponse({ status: STATUS_CODE.FATAL_ERROR, body: err })
  }

  return response;
};