import * as AWS from 'aws-sdk';
import { bucketName } from './constant';
import { ProductFromParsedFile, ProductNormalized } from '../model';

class ApiSQS {
  sqs: AWS.SQS;
  bucket: string;
  constructor() {
    this.sqs = new AWS.SQS();
    this.bucket = bucketName;
  }
  normalizeProductData(data: ProductFromParsedFile):ProductNormalized {
    return {
      title: data['title'].trim(),
      description: data['description'].trim(),
      price: +data['price'].trim()
    }
  }
  // TODO declare type of data correctly
  sendProducts (products:ProductFromParsedFile[]) {
    console.log('products to send:', products);
    products.forEach((product) => {
      this.sqs.sendMessage({
        QueueUrl: process.env.SQS_URL,
        MessageBody: JSON.stringify(this.normalizeProductData(product))
      }, (error, data) => {
        console.log('Send message for:', data);
        console.log('error in send', error);
      });
    });
  }
}

const apiSQS = new ApiSQS();

export default apiSQS;