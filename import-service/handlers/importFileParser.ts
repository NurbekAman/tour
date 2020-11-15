import 'source-map-support/register';

import { formatResponse } from '../services/formatResponse';
import apiS3 from '../services/api';

export const importFileParser = async (event, _context) => {
  try {
    const record = event.Records[0];
    const filePath = record.s3.object.key;
    const data = await apiS3.parseImportedFile(filePath);
    console.log('final data', data);
    return formatResponse.success(data);
  } catch (err) {
    console.log(err, 'importFileParser')
    return formatResponse.fatalError(err);
  }
}
