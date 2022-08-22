import { Type } from 'class-transformer';
import { prop } from '@typegoose/typegoose';
import BaseModel from './BaseModel';

export default class CountryNameSchema {
  @prop()
  public common: string;

  @prop()
  public official: string;
}

export class Country extends BaseModel {
  @prop()
  public cca2: string;

  @prop()
  public cca3: string;

  @prop()
  public region: string;

  @prop()
  public demonym: string;

  @Type(() => CountryNameSchema)
  @prop({ type: () => CountryNameSchema })
  public name?: CountryNameSchema;

  @prop()
  public currency: string[];

  @prop()
  public tax: number;

  @prop()
  public isActive: number;
}
