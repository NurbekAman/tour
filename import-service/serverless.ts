import type { Serverless } from 'serverless/aws';

const S3BUCKET = 'tour-upload';
// const SQSQueue =
const serverlessConfiguration: Serverless = {
  service: {
    name: S3BUCKET,
    // app and org for use with dashboard.serverless.com
    // app: your-app-name,
    // org: your-org-name,
  },
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    },
    BasicAuthorizationArn: {
      'Fn::ImportValue': 'BasicAuthorizationArn',
    }
  },
  // Add the serverless-webpack plugin
  plugins: ['serverless-webpack'],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    region: 'eu-west-1',
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      SQS_URL: {
        Ref: 'SQSQueue'
      },
      SNS_ARN: {
        Ref: 'SNSTopic'
      }
    },
    iamRoleStatements: [
      { Effect: 'Allow', Action: 's3:ListBucket', Resource: 'arn:aws:s3:::tour-upload' },
      { Effect: 'Allow', Action: 's3:*', Resource: 'arn:aws:s3:::tour-upload/*' },
      { Effect: 'Allow', Action: 'sqs:*', Resource: { 'Fn::GetAtt': ['SQSQueue', 'Arn'] } },
      { Effect: 'Allow', Action: 'sns:*', Resource: { Ref: 'SNSTopic' } }
    ]
  },
  functions: {
    importProductsFile: {
      handler: 'handler.importProductsFile',
      events: [
        {
          http: {
            method: 'get',
            path: 'import',
            request: {
              parameters: {
                paths: {
                  file: true
                }
              }
            },
            authorizer: {
              name: 'basicAuthorization',
              arn: '${self:custom.BasicAuthorizationArn}',
              resultTtlInSeconds: 0,
              identitySource: 'method.request.header.Authorization',
              type: 'token'
            }
          }
        }
      ]
    },
    importFileParser: {
      handler: 'handler.importFileParser',
      events: [
        {
          s3: {
            bucket: S3BUCKET,
            event: 's3:ObjectCreated:*',
            rules: [
              {
                prefix: 'uploaded/',
                suffix: 'csv'
              },
            ],
            existing: true
          }
        }
      ]

    },
    catalogBatchProcess: {
      handler: 'handler.catalogBatchProcess',
      events: [
        {
          sqs: {
            batchSize: 5,
            arn: {
              'Fn::GetAtt': ['SQSQueue', 'Arn']
            }
          }
        }
      ]
    }
  },
  resources: {
    Resources: {
      SQSQueue: {
        Type: 'AWS::SQS::Queue',
        Properties: {
          QueueName: 'catalogItemsQueue'
        }
      },
      SNSTopic: {
        Type: 'AWS::SNS::Topic',
        Properties: {
          TopicName: 'catalogItemsQueueTopic'
        }
      },
      SNSSubscription: {
        Type: 'AWS::SNS::Subscription',
        Properties: {
          Endpoint: 'nurbek.it@gmail.com',
          Protocol: 'email',
          TopicArn: {
            Ref: 'SNSTopic'
          }
        }
      },
      GatewayResponseAccessDenied: {
        Type: 'AWS::ApiGateway::GatewayResponse',
        Properties: {
          RestApiId: {
            Ref: 'ApiGatewayRestApi'
          },
          ResponseType: 'ACCESS_DENIED',
          ResponseParameters: {
            'gatewayresponse.header.Access-Control-Allow-Origin': "'*'",
            'gatewayresponse.header.Access-Control-Allow-Headers': "'*'",
          },
        }
      },
      GatewayResponseUnauthorized: {
        Type: 'AWS::ApiGateway::GatewayResponse',
        Properties: {
          RestApiId: {
            Ref: 'ApiGatewayRestApi'
          },
          ResponseType: 'UNAUTHORIZED',
          ResponseParameters: {
            'gatewayresponse.header.Access-Control-Allow-Origin': "'*'",
            'gatewayresponse.header.Access-Control-Allow-Headers': "'*'",
          },
        }
      }
    },
  }
}

module.exports = serverlessConfiguration;
