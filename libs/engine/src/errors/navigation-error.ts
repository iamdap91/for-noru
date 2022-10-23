export class NavigationError extends Error {
  constructor(message = '내이게이션에 실패하였습니다.') {
    super(message);
    this.name = NavigationError.name;
  }
}
