import * as AWS from 'aws-sdk';
import * as csv from 'csv-parser';

class ApiS3 {
  s3: AWS.S3;
  bucket: string;
  constructor() {
    this.s3 = new AWS.S3({ region: 'eu-west-1' });
    this.bucket = 'tour-upload';
  }

  async getSignedUrlPromises(filename: string) {
    try {
      const signedUrl = await this.s3.getSignedUrlPromise('putObject', { Bucket: this.bucket, Key: `uploaded/${filename}`, ContentType: 'text/csv' });
      return signedUrl;
    } catch (err) {
      throw err;
    }
  }

  async parseImportedFile(path: string) {
    try {
      const params = {
        Bucket: this.bucket,
        Key: path
      };
      const s3Stream = await this.s3.getObject(params).createReadStream();

      const results = [];
      const data = await new Promise((resolve, reject) => {
        s3Stream.pipe(csv())
        .on('data', (data: any) => { results.push(data) })
        .on('error', (err) => { reject(err); } )
        .on('end', () => {
          resolve(results)
        });
      });
      await this.s3
        .copyObject({
          Bucket: this.bucket,
          CopySource: this.bucket + '/' + path,
          Key: `parsed/${path.replace(
            'uploaded/',
            ''
          )}`,
        })
        .promise();

      await this.s3
        .deleteObject({
          Bucket: this.bucket,
          Key: path,
        })
        .promise();
      return data;
    } catch (err) {
      console.log(err, 'error');
      throw err;
    }
  }
}

const apiS3 = new ApiS3();

export default apiS3;