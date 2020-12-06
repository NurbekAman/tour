const generatePolicy = (principalId, resource, effect = 'Allow') => {
  return {
    principalId: principalId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: effect,
          Resource: resource
        }
      ]
    }
  };
}

export const basicAuthorizer = async (event, _context, callback) => {
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
    const storedUserPassword = process.env[username];
    console.log(password, storedUserPassword);
    const effect = !password || storedUserPassword !== password ? 'Deny' : 'Allow';
    const policy = generatePolicy(encodedCreds, event.methodArn, effect);
    callback(null, policy);
  } catch (e) {
    callback(`Unnauthorized: ${e.message}`)
  }
}
