export enum ConfirmRequestMethod {
  PASSWORD = 'password',
  REGISTRATION = 'registration',
}

export enum Is {
  YES = 1,
  NO = 0,
}

export interface IRequestResult {
  data: any;
  message?: any;
}
