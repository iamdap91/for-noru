export interface PlaceEsDoc {
  code: number;
  name: string;
  address: string;
  images: string[];
  categories: string[];
  petAllowed?: boolean;
  description: string;
  pin: {
    location: {
      lat: number;
      lon: number;
    };
  };
}
