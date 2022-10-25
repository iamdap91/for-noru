import { CSV_HEADERS } from './restaurant.constants';

const REQUIRED_FIELDS = {
  개방서비스명: 'type',
  관리번호: 'manageId',
  사업장명: 'name',
  소재지우편번호: 'postalCode',
  소재지전체주소: 'address',
  도로명전체주소: 'roadAddress',
  '좌표정보(x)': 'x',
  '좌표정보(y)': 'y',
  // 데이터갱신일자: 'lastUpdated',
  상세영업상태코드: 'active',
};

const ADDITIONAL_FIELDS = {
  petAllowed: false,
};

const arrangeFields = (object: Record<string, string>) => {
  const record: Record<string, string> = {};
  for (const [key, val] of Object.entries(REQUIRED_FIELDS)) {
    record[val] = object[key];
  }
  return record;
};

export const serialize = (items: string[]) => {
  const records: Record<string, string> = {};
  for (const [index, val] of Object.entries(items)) {
    records[CSV_HEADERS[index]] = val;
  }

  const { x, y, ...arrangedRecords } = arrangeFields(records);

  return {
    ...arrangedRecords,
    ...ADDITIONAL_FIELDS,
    coordinates: x && y ? [x, y] : null,
    active: +arrangedRecords.active === 1,
    postalCode: +arrangedRecords.postalCode,
  };
};
