import 'source-map-support/register';

import { formatResponse } from 'services/formatResponse';
import apiS3 from 'services/apiS3';
import apiSQS from 'services/apiSQS';

export const importFileParser = async (event, _context, callback) => {
  try {
    const record = event.Records[0];
    const filePath = record.s3.object.key;
    const data = await apiS3.parseImportedFile(filePath);
    apiSQS.sendProducts(data);
    callback(null, {
      ...formatResponse.success(null)
    })
  } catch (err) {
    return formatResponse.fatalError(err);
  }
}
