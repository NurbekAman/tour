import { getDBInstance } from '../db/instance';
import { queryInsertProducts } from '../db/query';
import { QueryInsertProducts } from '../model';
import { handleDBResponse } from '../db/handleDBResponse';

export const insertProducts = async (data: QueryInsertProducts[]) => {
  const client = getDBInstance();
  await client.connect();

  try {
    console.log('product lise promises', data.map((product) => client.query(queryInsertProducts(product))));
    const productResult = await Promise.all(data.map((product) => client.query(queryInsertProducts(product))));
    console.log('next product list were inserted', productResult);
    return handleDBResponse(productResult);
  } catch (err) {
    console.log("Error during database request executing", err);
    throw err;
  } finally {
    client.end();
  }
};