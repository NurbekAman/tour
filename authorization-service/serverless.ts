import type { Serverless } from 'serverless/aws';

const serverlessConfiguration: Serverless = {
  service: {
    name: 'authorization-service',
    // app and org for use with dashboard.serverless.com
    // app: your-app-name,
    // org: your-org-name,
  },
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    }
  },
  // Add the serverless-webpack plugin
  plugins: ['serverless-webpack', 'serverless-dotenv-plugin'],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    region: 'eu-west-1',
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
  },
  resources: {
    Resources: {},
    Outputs: {
      BasicAuthorizationARN: {
        Value: {
          'Fn::GetAtt': ['BasicAuthorizationLambdaFunction', 'Arn']
        },
        Export: {
          Name: 'BasicAuthorizationArn',
        }
      }
    }
  },
  functions: {
    basicAuthorization: {
      handler: 'handler.basicAuthorization',
    }
  }
}

module.exports = serverlessConfiguration;
