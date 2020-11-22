import { getDBInstance } from '../db/instance';
import { queryGetProducts } from '../db/query';
import { handleDBResponse } from '../db/handleDBResponse';

export const invokeProducts = async () => {
  const client = getDBInstance();
  await client.connect();

  try {
    const productResult = await client.query(queryGetProducts());
    console.log('product from db', productResult);
    return handleDBResponse(productResult);
  } catch (err) {
    console.log("Error during database request executing", err);
    throw err;
  } finally {
    client.end();
  }
};