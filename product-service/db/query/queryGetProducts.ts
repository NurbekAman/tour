import { TABLES } from './constants';

export const queryGetProducts = (): string => `
  select * from ${TABLES.PRODUCTS};
`;