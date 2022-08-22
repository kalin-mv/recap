import { asClass } from 'awilix';

import CompanyController from './CompanyController';
import AuthController from './AuthController';

export default {
  CompanyController: asClass(CompanyController).singleton(),
  AuthController: asClass(AuthController).singleton(),
};
