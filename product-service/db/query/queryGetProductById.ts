import { TABLES } from './constants';

export const queryGetProductById = (id: string): string => `
  select * from ${TABLES.STOCKS} s2
  inner join ${TABLES.PRODUCTS} p2
  on s2.product_id = p2.id
  where s2.product_id = '${id}';
`;