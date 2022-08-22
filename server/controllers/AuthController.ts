import session from 'server/middleware/session';
import { passportAuth, actions } from 'server/middleware/passport';
import { POST, middleware, run } from 'server/decorators';
import BaseController from './BaseController';
import validate from 'server/middleware/validate';
import props from 'server/props';

@middleware(session)
@middleware(actions)
export default class AuthController extends BaseController {
  protected getServerSideProps() {}

  @POST('/api/login')
  @run(
    validate({
      type: 'object',
      properties: {
        password: props.user.password,
        email: props.user.email,
      },
      required: ['password', 'email'],
      additionalProperties: false,
    })
  )
  @run(passportAuth)
  public async login({ identity }) {
    console.log('/api/login')
    return { identity };
  }

  @POST('/api/signUp')
  @run(
    validate({
      type: 'object',
      properties: {
        firstName: props.user.firstName,
        lastName: props.user.lastName,
        password: props.user.password,
        email: props.user.email,
        timezone: props.user.timezone,
      },
      required: ['firstName', 'lastName', 'password', 'email'],
      additionalProperties: false,
    })
  )
  public signUp({ body }) {
    const { UserService } = this.di;
    return UserService.registerUser(body);
  }
}
