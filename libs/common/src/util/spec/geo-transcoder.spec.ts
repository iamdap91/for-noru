import proj4 from 'proj4';
import { eps2097, epsg3857, wgs84 } from '../geo-transcoder';

describe('geo-coder', () => {
  it('EPS2097 to WGS84', () => {
    const coordinates = [145699.0402, -2893.616804];
    const position = proj4(eps2097, wgs84, coordinates);

    expect(position).toEqual([126.41377770368372, 33.468957314695494]);
  });

  it('EPS2097 to EPSG3857', () => {
    const coordinates = [145699.0402, -2893.616804];
    const position = proj4(eps2097, epsg3857, coordinates);

    expect(position).toEqual([14072317.363228152, 3957716.9204448047]);
  });
});
