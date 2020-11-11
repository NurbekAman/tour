import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register.js';
import get from 'lodash/get';

import { formatResponse } from '../services/formatResponse'
import { STATUS_CODE } from '../services/constant';
import { insertProducts } from '../services/insertProducts';

export const addProduct: APIGatewayProxyHandler = async (event) => {
  const body = get(event, 'body');

  let response;
  try {
    console.log(body, 'body');
    const result = await insertProducts(JSON.parse(body));

    response = formatResponse({ status: STATUS_CODE.SUCCESS, body: result });
  } catch (err) {
    response = formatResponse({ status: STATUS_CODE.FATAL_ERROR, body: err })
  }

  return response;
};