import { STATUS } from './constan';

interface FormatResponse {
  status: number;
  body: any;
};

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PATCH, PUT'
};

class FormatResponse {
  headers: { 'Content-Type': string; 'Access-Control-Allow-Origin': string; 'Access-Control-Allow-Headers': string; 'Access-Control-Allow-Methods': string; };
  constructor() {
    this.headers = headers;
  }

  format(data: any, status: number) {
    return {
      headers: this.headers,
      body: JSON.stringify(data),
      statusCode: status
    };
  }

  success(body: any) {
    return this.format(body, STATUS.SUCCESS);
  }

  fatalError(err: any) {
    return this.format(err, STATUS.FATAL_ERROR);
  }
}

const formatResponse = new FormatResponse();

export {
  formatResponse
};