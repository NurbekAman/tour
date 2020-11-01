import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register.js';
import { mockedProductList } from '../mocks/products';

export const getProductList: APIGatewayProxyHandler = async () => {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PATCH, PUT',
    },
    body: JSON.stringify(mockedProductList),
  };
};