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

export enum ROLE {
  GUEST = 'guest',
  USER = 'user',
  ADMIN = 'admin',
  ACCOUNTANT = 'accountant',
  CONTENT_MANAGER = 'content-manager',
  LEAD = 'lead',
}

export enum Sort { ASC = 1, DESC = -1, none = 0 }
