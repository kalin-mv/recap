import { Type, Exclude } from 'class-transformer';
import { prop } from '@typegoose/typegoose/lib/prop';
import type { Ref } from '@typegoose/typegoose/lib/types';
import isEmail from 'validator/lib/isEmail';

import BaseModel from './BaseModel';
import Company from './Company';
import Country from './Country';

// TODO add pre save (password hash and updateAt/createAt field logic )
export default class UserSchema extends BaseModel {
  @prop({
    unique: true,
    validate: {
      validator: (email: string) => isEmail(email),
      message: 'The email is not correct.',
    },
  })
  userEmail?: string;

  @prop({ unique: true })
  slug?: string;

  @Exclude()
  @prop({
    minlength: 8,
  })
  password?: string;

  @prop({ required: true, minlength: 2 })
  firstName?: string;

  @prop()
  lastName?: string;

  @Exclude()
  @prop()
  token?: string;

  //@prop({ required: true, enum: ROLE, default: ROLE.GUEST })
  @prop()
  public role?: string; //ROLE

  @prop()
  public locale?: string;

  @prop()
  public address?: string;

  @prop({ required: true, minlength: 2 })
  public timezone?: string;

  @Type(() => Company)
  @prop({ ref: () => Company })
  public companies?: Ref<Company>[];

  @prop()
  public banned?: boolean;

  @prop()
  public suspended?: boolean;

  @Type(() => Country)
  @prop({ ref: () => Country })
  public country?: Country;

  @prop({ required: true, default: Date.now() })
  lastAction?: number;

  @prop()
  public ip?: string;

  @prop()
  public phone?: string;

  @prop()
  public avatar?: string;

  @prop()
  public avatarOrigin?: string;

  @prop({ required: true, default: Date.now() })
  createdAt?: number;

  @prop({ required: true, default: Date.now() })
  updatedAt?: number;
}
