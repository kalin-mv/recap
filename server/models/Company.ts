import { Type } from 'class-transformer';
import { prop } from '@typegoose/typegoose/lib/prop';
import type { Ref } from '@typegoose/typegoose/lib/types';

import BaseModel from './BaseModel';
import UserSchema from './User';

export default class Company extends BaseModel {
  @prop({ required: true })
  public companyName?: string;

  @Type(() => UserSchema)
  @prop({ ref: () => UserSchema })
  public ownerId?: Ref<UserSchema>;

  @prop({ unique: true })
  public slug?: string;

  @prop()
  public email?: string;

  @prop()
  public phone?: string;

  @prop()
  public site?: string;

  @prop()
  public facebook?: string;

  @prop()
  public instagram?: string;

  @prop()
  public avatar?: string;

  @prop()
  public avatarOrigin?: string;

  @prop()
  public createdAt?: number;

  @prop()
  public updatedAt?: number;
}
