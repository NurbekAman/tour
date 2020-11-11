const PRODUCTS_TABLE = {
  TITLE: 'title',
  DESCRIPTION: 'description',
  PRICE: 'price'
};

interface QueryInsertProducts {
  title: string;
  description: string;
  price: number;
};

export {
  PRODUCTS_TABLE,
  QueryInsertProducts
};