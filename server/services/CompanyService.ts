import BaseContext from '../BaseContext';

export default class CompanyService extends BaseContext {
  public findCompanies() {
    const { CompanyModel } = this.di;
    return CompanyModel.find().populate('ownerId', [
      '-password',
      '-secret',
      '-token',
    ]);
  }
}
