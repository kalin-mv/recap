import shortid from 'shortid';
import { pre, prop } from '@typegoose/typegoose';
import type { Ref } from '@typegoose/typegoose/lib/types';

import BaseModel from './BaseModel';
import User from './User';
import { Is, ConfirmRequestMethod } from 'server/constants';

@pre<ConfirmRequest>('validate', function (next) {
  if (this.isNew) {
    this.createdAt = new Date().getTime();
    this.reset = Is.NO;
    this.code = shortid.generate();
  }
  if (this.isModified()) {
    this.updatedAt = new Date().getTime();
  }
  return next();
})
export default class ConfirmRequest extends BaseModel {
  @prop({ ref: User, required: true })
  public user: Ref<User>;

  @prop({ unique: true, required: true })
  public code: string;

  //@prop({ type: () => ConfirmRequestMethod })
  @prop({ type: String, enum: ConfirmRequestMethod })
  public rType: ConfirmRequestMethod;

  @prop({ type: Number, enum: Is, default: Is.NO })
  public reset: Is;

  @prop()
  public template: string;

  @prop()
  public from: string;

  @prop()
  public createdAt: number;

  @prop()
  public updatedAt: number;

  @prop()
  public data: Object;

  public eventSlug: string;

  public wasNew = false;
}
