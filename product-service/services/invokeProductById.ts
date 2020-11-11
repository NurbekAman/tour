import { getDBInstance } from '../db/instance';
import { queryGetProductById } from '../db/query';
import { handleDBResponse } from '../db/handleDBResponse';

export const invokeProductById = async (id: string) => {
  const client = getDBInstance();
  await client.connect();

  try {
    const productResult = await client.query(queryGetProductById(id));
    console.log(productResult, 'productById');
    return handleDBResponse(productResult);
  } catch (err) {
    console.log("Error during database request executing", err);
    throw err;
  } finally {
    client.end();
  }
};