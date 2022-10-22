import proj4 from 'proj4';

// eslint-disable-next-line no-irregular-whitespace
export const eps2097 = `+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs +towgs84=-115.80,474.99,674.11,1.16,-2.31,-1.63,6.43`;
export const wgs84 = `+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs`;
export const epsg3857 = `+title=Google Mercator +proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs`;

export const EPS2097 = {
  toWGS84: (coordinates: [number, number]): [number, number] => {
    return proj4(eps2097, wgs84, coordinates);
  },
  toEPSG3857: (coordinates: [number, number]): [number, number] => {
    return proj4(eps2097, epsg3857, coordinates);
  },
};
