export class PlaceNotFoundError extends Error {
  constructor(message = '장소 정보를 찾지 못했습니다.') {
    super(message);
    this.name = PlaceNotFoundError.name;
  }
}
