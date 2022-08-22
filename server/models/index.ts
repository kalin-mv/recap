import { asValue } from 'awilix';
import { getModelForClass, Severity } from '@typegoose/typegoose';

import Company from './Company';
import User from './User';
import Country from './Country';
import EmailTemplate from './EmailTemplate';
import ConfirmRequest from './ConfirmRequest';

// eslint-disable-next-line import/no-anonymous-default-export
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
    getModelForClass(EmailTemplate, {
      schemaOptions: { collection: 'emailTemplates' },
    })
  ),
  ConfirmRequest: asValue(
    getModelForClass(ConfirmRequest, {
      schemaOptions: { collection: 'confirmRequest' },
      options: {
        allowMixed: Severity.ALLOW,
      },
    })
  ),
};
