import mongoose, { Schema } from 'mongoose';
import {
  pre,
  prop,
  getModelForClass,
  DocumentType,
} from '@typegoose/typegoose';
import type { Ref } from '@typegoose/typegoose/lib/types';

import BaseModel from './BaseModel';
import User from './User';

class EmailParams {
  public _id: Schema.Types.ObjectId;

  @prop()
  public variable: string;

  @prop()
  public label: string;
}

@pre<EmailTemplate>('save', function (next) {
  this.updatedAt = Date.now();
  if (this.isNew) {
    this.createdAt = Date.now();
  }
  next();
})
export default class EmailTemplate extends BaseModel {
  @prop()
  public name: string;

  @prop()
  public content: string;

  @prop()
  public layout: string;

  @prop({ ref: () => User })
  public userId: Ref<User>;

  @prop({ type: () => EmailParams })
  public params: EmailParams;

  @prop()
  public createdAt: number;

  @prop()
  public updatedAt: number;

  @prop()
  public subject: string;

  @prop()
  public title: string;

  @prop()
  public description: string;
}