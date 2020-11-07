interface FormatResponse {
  status: number;
  body: any;
};

interface Response {
  statusCode: number;
  headers: object;
  body: string;
};

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PATCH, PUT'
};

export const formatResponse = (data: FormatResponse): Response => {
  const { status, body } = data;
  return {
    statusCode: status,
    headers,
    body: JSON.stringify(body)
  };
};