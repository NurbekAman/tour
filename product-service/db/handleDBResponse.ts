import get from 'lodash/get';

export const handleDBResponse = (response): any => {
  let result = [];

  try {
     result = get(response, 'rows', []);
  } catch (err) {
    return result;
  }

  return result;
};