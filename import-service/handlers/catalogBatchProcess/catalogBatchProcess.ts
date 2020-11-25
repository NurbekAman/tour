import fetch from 'node-fetch';

import apiSNS from 'services/apiSNS';

export const catalogBatchProcess = async (event) => {
  const { Records } = event;
  const products = [];
  Records.forEach(element => {
    const { body } = element;
    products.push(JSON.parse(body));
  });

  try {
    await fetch('https://zrz0p4i0zk.execute-api.eu-west-1.amazonaws.com/dev/products', {
      method: 'POST',
      body: JSON.stringify(products)
    });
    apiSNS.publish(products);

  } catch (err) {
    console.log('error in the way to save products into db', event);
  }
};
