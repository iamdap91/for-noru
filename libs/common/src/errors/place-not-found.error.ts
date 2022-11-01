export class PlaceNotFoundError extends Error {
  constructor() {
    super('상품 상세 페이지를 찾지 못했습니다.');
    this.name = PlaceNotFoundError.name;
  }
}
