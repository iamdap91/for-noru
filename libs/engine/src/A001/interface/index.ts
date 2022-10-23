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
    id: 'p0mregBycguUU5AZQWBzyw==';
    escapedId: 'p0mregBycguUU5AZQWBzyw';
    fov: 65;
    latitude: 33.4690188;
    longitude: 126.4167381;
    pan: -84.29;
    tilt: 8.38;
  };
  skyPanorama: null;
  insidePanorama: null;
  interiorPanorama: null;
  indoorPanorama: null;
  entranceCoords: null;
  theme: {};
  hasNaverBooking: false;
  naverBookingUrl: '';
  naverbookingId: null;
  petrolInfo: null;
  michelinGuide: null;
  broadcastInfo: null;
  marker: 'nres://marker/00079-00037';
  markerSelected: 'nres://marker/00079-00200';
  datalab: null;
  reviewCount: 78;
  dynamicData: null;
  markerLabel: {
    text: null;
    style: 'default';
  };
  isParkingSupported: false;
}
