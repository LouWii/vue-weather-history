import Axios from 'axios'

// const meteostatApiUrl = 'https://api.meteostat.net';
const meteostatApiUrl = 'https://weather.louwii.com';

export const meteostatUrls = {
  stationSearch: () => '/v2/stations/search'
};

export function initMeteostatClient(apiKey) {
  return Axios.create({
    baseURL: meteostatApiUrl,
    headers: {
      'x-api-key': apiKey,
      // 'access-control-request-headers': 'x-api-key',
    },
    responseType: 'text',
  })
}