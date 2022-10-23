export interface PlaceDetail {
  id: number;
  isSite: true;
  name: string;
  type: string;
  rCode: string;
  x: number;
  y: number;
  posExact: true;
  address: string;
  fullAddress: string;
  addressAbbr: string;
  roadAddr: {
    text: string;
    abbrText: string;
    additionalText: string;
  };
  fullRoadAddress: string;
  phone: string;
  isCallLink: 0;
  description: string;
  way: string;
  keywords: string[];
  hasNaverTalktalkUrl: boolean;
  naverTalktalkUrl: string;
  adult: string;
  endPageUrl: string;
  mobileEndPageUrl: string;
  urlList: [
    {
      type: string;
      url: string;
    }
  ];
  ktCallMd: string;
  ppc: string;
  images: {
    type: string;
    groupName: string;
    number: number;
    url: string;
    source: unknown;
    desc: string;
    modDate: string;
  }[];
  imageURL: string;
  imageModDate: string;
  displayCategory: string;
  category: string;
  categories: string[];
  categoryPaths: string[][];
  bizHour: unknown;
  bizhourInfo: undefined;
  options: {
    id: number;
    name: string;
    isCheck: string;
    order: number;
    iconURL: string;
    desc: string;
  }[];
  menus: {
    name: string;
    price: string;
    isRecommended: boolean;
    change: boolean;
  }[];
  menuImages: {
    type: string;
    imageUrl: string;
  }[];
  previewImages: {
    type: string;
    groupName: string;
    number: number;
    url: string;
    source: unknown;
    desc: string;
    modDate: string;
  }[];
  streetPanorama: {
    id: string;
    escapedId: string;
    fov: number;
    latitude: number;
    longitude: number;
    pan: number;
    tilt: number;
  };
  skyPanorama: unknown;
  insidePanorama: unknown;
  interiorPanorama: unknown;
  indoorPanorama: unknown;
  entranceCoords: unknown;
  theme: Record<string, string>;
  hasNaverBooking: false;
  naverBookingUrl: string;
  naverbookingId: unknown;
  petrolInfo: unknown;
  michelinGuide: unknown;
  broadcastInfo: unknown;
  marker: string;
  markerSelected: string;
  datalab: unknown;
  reviewCount: number;
  dynamicData: unknown;
  markerLabel: {
    text: unknown;
    style: string;
  };
  isParkingSupported: boolean;
}
