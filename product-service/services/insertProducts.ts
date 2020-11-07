import { getDBInstance } from '../db/instance';
import { queryInsertProducts } from '../db/query';
import { QueryInsertProducts } from '../model';
import { handleDBResponse } from '../db/handleDBResponse';

export const insertProducts = async (data: QueryInsertProducts) => {
  const client = getDBInstance();
  await client.connect();

  try {
    const productResult = await client.query(queryInsertProducts(data));

    return handleDBResponse(productResult);
  } catch (err) {
    console.log("Error during database request executing", err);
    throw err;
  } finally {
    client.end();
  }
};