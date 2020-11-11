import { TABLES } from './constants';
import { PRODUCTS_TABLE, QueryInsertProducts } from '../../model';

export const queryInsertProducts = ({ title, description, price }: QueryInsertProducts): string => `
  insert into ${TABLES.PRODUCTS} (${PRODUCTS_TABLE.TITLE}, ${PRODUCTS_TABLE.DESCRIPTION}, ${PRODUCTS_TABLE.PRICE}) values
  ('${title}', '${description}', '${price}')
`;