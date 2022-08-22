import { Exclude, Expose, Transform } from 'class-transformer';

import BaseContext from '../BaseContext';

abstract class BaseModel extends BaseContext {
  @Expose({ name: 'id' })
  @Transform((value) => {
    if ('value' in value) {
      return value.obj[value.key].toString();
    }
    return 'unknown value';
  })
  public _id?: string;

  @Exclude()
  public __v?: number;
}

export default BaseModel;
