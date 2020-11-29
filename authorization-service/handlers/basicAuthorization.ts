import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { createBrotliCompress } from 'zlib';

import { formatResponse } from '../services/formatResponse';

export const basicAuthorization: APIGatewayProxyHandler = async (event, _context, callback) => {
  console.log(event);

  if(event['type'] != 'TOKEN') {
    callback('Unauthorized');
  }

  try {
    var authorizationToken = event.authorizationToken;
    const encodedCreds = authorizationToken.split(' ')[1];
    const buff = Buffer.from(encodedCreds, 'base64');
    const plainCreds = buff.toString('utf-8').split(':')[0].split('=');
    const username = plainCreds[0];
    const password = plainCreds[1];
    console.log('creads', plainCreds);
    const storedUserPassword = process.env[username];
    const { nurbektest } = process.env;
    console.log('username in env', nurbektest)
    console.log(storedUserPassword, 'storedUserPassword', username);
    const effect = !storedUserPassword || storedUserPassword !== password ? 'Deny' : 'Allow';

    const policy = generatePolicy(encodedCreds, event.methodArn, effect);

    callback(null, policy);
  } catch (e) {

  }

  return formatResponse.success({
    message: 'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!',
    input: event
  });
}

const generatePolicy = (princinpalId, resource, effect = 'Allow') => {
  return {
    princinpalId: princinpalId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'ecexute-api:Invoke',
          Effect: effect,
          Resource: resource
        }
      ]
    }
  }
};
