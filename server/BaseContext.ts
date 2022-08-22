import { Exclude } from 'class-transformer';

export interface IContextContainer {
  [key: string]: any;
}

export default class BaseContext {
  @Exclude()
  protected di: IContextContainer;

  constructor(opts: IContextContainer) {
    this.di = opts;
  }
}
