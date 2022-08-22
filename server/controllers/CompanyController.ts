import session from 'server/middleware/session';
import { actions } from 'server/middleware/passport';
import { POST, GET, USE, middleware, run } from 'server/decorators';
import BaseController from './BaseController';
import Company from 'server/models/Company';

// const m = async (req, res, next) => {
//   console.log('M() call the class middleware!');
//   await next();
// };

// const m2 = async (req, res, next) => {
//   console.log('M2() call the method middleware!');
//   await next();
// };

@middleware(session)
@middleware(actions)
export default class CompanyController extends BaseController {
  protected getServerSideProps() {
    const { CompanyService } = this.di;
    return CompanyService.findCompanies();
  }

  // @USE('/api/company')
  // public getCompanyById() {
  //   console.log('call USE - 1 action !!!');
  // }

  // @USE('/api/company')
  // public getCompanyById2() {
  //   console.log('call USE - 2 action !!!');
  // }

  // @GET('/api/company')
  // public getCompany() {
  //   console.log('call GET action !!!');
  //   const { CompanyService } = this.di;
  //   return CompanyService.findCompanies();
  // }

  @POST('/api/company')
  // @run(m2)
  public getCompany2({ body, params, identity, session }) {
    console.log('call /api/company', body, identity, session);
    const { CompanyService, toJS } = this.di;
    return CompanyService.findCompanies()
      .lean()
      .then((o) => toJS(Company, o));
  }

  @POST()
  public getSuperMethod() {}
}
