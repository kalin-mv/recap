import shortid from 'shortid';
import { pre, prop } from '@typegoose/typegoose';
import type { Ref } from '@typegoose/typegoose/lib/types';

import BaseModel from './BaseModel';
import User from './User';
import { Is, ConfirmRequestMethod } from 'server/constants';

@pre<ConfirmRequest>('save', function (next) {
  this.wasNew = this.isNew;
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

  @prop()
  public type: ConfirmRequestMethod;

  @prop()
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
  public data: any;

  public eventSlug: string;

  public wasNew = false;
}
