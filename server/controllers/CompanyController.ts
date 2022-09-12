import session from 'server/middleware/session';
import { actions } from 'server/middleware/passport';
import { POST, GET, USE, run } from 'server/decorators';
import BaseController from './BaseController';
import Company from 'server/models/Company';

const m = async (req, res, next) => {
  console.log('M() call the class middleware!');
  await next();
};

const m2 = async (req, res, next) => {
  console.log('M2() call the method middleware!');
  await next();
};

@run([session, ...actions, m])
export default class CompanyController extends BaseController {
  protected getServerSideProps() {
    const { CompanyService } = this.di;
    return CompanyService.findCompanies();
  }

  @USE('/api/company')
  public getCompanyById() {
    console.log('call USE - 1 action !!!');
  }

  @USE('/api/company')
  public getCompanyById2() {
    console.log('call USE - 2 action !!!');
  }

  @GET('/api/company')
  public async getCompany() {
    console.log('call GET action !!!');
    const { CompanyService } = this.di;
    const data = await CompanyService.findCompanies();
    return this.json(data, Company);
  }

  @POST('/api/company')
  @run(m2)
  public async getCompany2({body, session, id}) {
    const { CompanyService } = this.di;
    const data = await CompanyService.findCompanies().lean();
    return this.json(data, Company);
  }

  @POST()
  public getSuperMethod() {}
}
/*  */