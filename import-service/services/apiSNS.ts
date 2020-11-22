import * as aws from 'aws-sdk';
import { ProductNormalized } from '../model';

class ApiSNS {
  sns: aws.SNS;
  constructor() {
    this.sns = new aws.SNS({ region: 'eu-west-1' });
  }

  publish(product: ProductNormalized[]) {
    this.sns.publish({
      Subject: 'You are invited processed',
      Message: JSON.stringify(product),
      TopicArn: process.env.SNS_ARN
    }, (error, data) => {
      console.log('data was send', data);
      console.log('any error', error);
    });
  }
}

const apiSNS = new ApiSNS();

export default apiSNS;