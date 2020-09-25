import Axios from 'axios'

const meteostatApiUrl = 'https://api.meteostat.net';
// const meteostatApiUrl = 'https://weather.louwii.com';

const climateNormalsUnits = {
  tavg: '°C',
  tmin: '°C',
  tmax: '°C',
  prcp: 'mm',
  pres: 'hPa',
  tsun: 'hours'
}

export const meteostatUrls = {
  stationSearch: () => '/v2/stations/search',
  climateNormals: () => '/v2/stations/climate',
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

export function getClimateNormalsUnitsFromDataType(dataType) {
  return climateNormalsUnits[dataType]
}