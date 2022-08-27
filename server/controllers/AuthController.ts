import session from 'server/middleware/session';
import { passportAuth, actions } from 'server/middleware/passport';
import { POST, run } from 'server/decorators';
import BaseController from './BaseController';
import validate from 'server/middleware/validate';
import props from 'server/props';

@run([session, ...actions])
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
    console.log('/api/login');
    return this.json({ identity });
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
    return UserService.registerUser(body).then((data) =>
      this.json(data).message('User was registered successfully')
    );
  }

  @POST('/api/verify')
  @run(
    validate({
      type: 'object',
      properties: {
        code: props.confirm.code,
      },
      required: ['code'],
      additionalProperties: false,
      errorMessage: {
        properties: {
          code: 'Unauthorized data format, please try again',
        },
      },
    })
  )
  public verification({ body }) {
    const code = body.code;
    const { ConfirmService } = this.di;
    return ConfirmService.verification(code).then((r) =>
      this.json(r).message('Your account was verified successfully')
    );
  }
}
