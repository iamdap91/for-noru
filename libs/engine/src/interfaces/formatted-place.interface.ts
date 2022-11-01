export interface FormattedPlace {
  code: number;
  name?: string;
  images: string[];
  categories?: string[];
  petAllowed: boolean;
  address?: string;
  description: string;

  lat: number;
  lon: number;
}
