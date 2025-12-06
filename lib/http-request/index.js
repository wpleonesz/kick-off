import Logger from '../logger/index.js';

const logger = new Logger('http-request');

export const request = async (url, options = {}) => {
  try {
    logger.debug(`Fetching ${options.method || 'GET'} ${url}`);
    console.log(
      '[HTTP] Request:',
      options.method || 'GET',
      url,
      options.body ? JSON.parse(options.body) : ''
    );

    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    const data = await response.json();
    console.log('[HTTP] Response status:', response.status, 'data:', data);

    if (!response.ok) {
      logger.error(`Request failed: ${url}`, {
        status: response.status,
        error: data.error,
      });
      console.error('[HTTP] Error:', data);
      throw new Error(data.error || 'Request failed');
    }

    logger.debug(`Request successful: ${url}`);
    return data;
  } catch (err) {
    logger.error(`Request error: ${url}`, err.message);
    console.error('[HTTP] Exception:', err.message);
    throw err;
  }
};

const httpRequest = {
  get: (url, options) => request(url, { ...options, method: 'GET' }),
  post: (url, body, options) =>
    request(url, { ...options, method: 'POST', body: JSON.stringify(body) }),
  put: (url, body, options) =>
    request(url, { ...options, method: 'PUT', body: JSON.stringify(body) }),
  delete: (url, options) => request(url, { ...options, method: 'DELETE' }),
};

export default httpRequest;
