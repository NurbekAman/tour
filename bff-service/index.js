import express from 'express';
import dotenv from 'dotenv';
import { Method } from 'axios';
import { StatusCodes } from 'http-status-codes';

import { getServiceName, getServiceUrl } from './src/utils';

dotenv.config({
  path: '.env'
});

const PORT = process.env.PORT || 3001;
const CACH_TIMER = 12000;
const app = express();

app.use(express.json());

app.use((req,res,next) => {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Credentials': 'true'
  });
  next();
});

app.all('/*', async(req, res) => {
  const { originUrl, method, body } = req;

  const serviceName = getServiceName(originUrl);
  const serviceUrl = getServiceUrl(originUrl);

  if (serviceUrl) {
    const axiousConfig = {
      method,
      url: `${serviceUrl}${originUrl}`,
      ...(Object.keys(body || {}).length > 0 && { data: body }),
    }

    axios(axiousConfig)
      .then((response) => {
          console.log('response from recipient', response.data);
          res.json(response.data);
      })
      .catch((error) => {
          console.log('some error: ', JSON.stringify(error));
          if (error.response) {
              const { status, data } = error.response;
              res.status(status).json(data);
          } else {
              res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
          }
      });
  } else {
    res.status(StatusCodes.BAD_GATEWAY).json({ error: "Cannot process request" });
  }
});

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`)
});