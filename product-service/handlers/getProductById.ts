import { APIGatewayProxyHandler } from 'aws-lambda';
import get from 'lodash/get';
import find from 'lodash/find';
import 'source-map-support/register.js';

import { mockedProductList } from '../mocks/products';

export const getProductById: APIGatewayProxyHandler = async (event) => {
  const productId = get(event, 'pathParameters.id', '');
  const product = find(mockedProductList, { id: productId });

  if (product) {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PATCH, PUT',
      },
      body: JSON.stringify(product),
    };
  }

  return {
    statusCode: 404,
    body: 'Product not found'
  };
};