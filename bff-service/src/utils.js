export const getServiceName = (url) => url.split('/')[1];

export const getServiceUrl = (url) => process.env[getServiceName(url)];