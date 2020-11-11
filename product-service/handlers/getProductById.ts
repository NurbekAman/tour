import { APIGatewayProxyHandler } from 'aws-lambda';
import get from 'lodash/get';
import 'source-map-support/register.js';

import { formatResponse } from '../services/formatResponse'
import { STATUS_CODE } from '../services/constant';
import { invokeProductById } from '../services/invokeProductById';


export const getProductById: APIGatewayProxyHandler = async (event) => {
  const productId = get(event, 'pathParameters.id', '');
  let response;
  try {
     const result = await invokeProductById(productId);

     response = result.length ?
      formatResponse({ status: STATUS_CODE.SUCCESS, body: result })
      : formatResponse({ status: STATUS_CODE.NOT_FOUND, body: { message: 'Not found' } });
  } catch (err) {
    response = formatResponse({ status: STATUS_CODE.FATAL_ERROR, body: err });
  };

  return response;
};