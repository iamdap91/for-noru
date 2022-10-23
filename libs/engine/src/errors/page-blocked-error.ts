export class PageBlockedError extends Error {
  constructor(message = '페이지에 접근이 차단되었습니다.') {
    super(message);
    this.name = PageBlockedError.name;
  }
}
