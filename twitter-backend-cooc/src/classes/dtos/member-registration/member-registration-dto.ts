export class MemberRegistrationDto {
  private readonly _responseData: string | undefined; // レスポンスデータ
  private readonly _errorMessages: string[]; // エラーメッセージ

  constructor(responseData: string | undefined, errorMessages: string[]) {
    this._responseData = responseData;
    this._errorMessages = errorMessages;
  }

  get responseData(): string | undefined {
    return this._responseData;
  }
  get errorMessages(): string[] {
    return this._errorMessages;
  }
}
