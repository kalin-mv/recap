import { asClass } from 'awilix';

import CompanyService from './CompanyService';
import UserService from './UserService';
import ConfirmService from './ConfirmService';
import MailService from './MailService';

export default {
  CompanyService: asClass(CompanyService).singleton(),
  UserService: asClass(UserService).singleton(),
  ConfirmService: asClass(ConfirmService).singleton(),
  MailService: asClass(MailService).singleton(),
};
