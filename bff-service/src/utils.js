const getServiceName = (url) => url.split('/')[1];

const getServiceUrl = (url) => process.env[getServiceName(url)];

module.exports = {
  getServiceName,
  getServiceUrl
};