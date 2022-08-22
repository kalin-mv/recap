import { asValue } from 'awilix';
import { getModelForClass } from '@typegoose/typegoose';

import Company from './Company';
import User from './User';
import Country from './Country';
import EmailTemplate from './EmailTemplate';
import ConfirmRequest from './ConfirmRequest';

export default {
  CompanyModel: asValue(
    getModelForClass(Company, { schemaOptions: { collection: 'companies' } })
  ),
  UserModel: asValue(
    getModelForClass(User, { schemaOptions: { collection: 'users' } })
  ),
  CountryModel: asValue(
    getModelForClass(Country, { schemaOptions: { collection: 'countries' } })
  ),
  EmailTemplate: asValue(
    getModelForClass(EmailTemplate, { schemaOptions: { collection: 'emailTemplates' } })
  ),
  ConfirmRequest: asValue(
    getModelForClass(ConfirmRequest, { schemaOptions: { collection: 'confirmRequest' } })
  ),
};
