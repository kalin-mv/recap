import { ConfirmRequestMethod } from 'server/constants';
import BaseContext from '../BaseContext';

export default class ConfirmService extends BaseContext {
  public async registration(userId: string, data: any) {
    const { ConfirmRequest, UserModel, MailService } = this.di;
    const user = await UserModel.findById(userId);
    if (user) {
      let request = new ConfirmRequest();
      request.user = userId;
      request.type = ConfirmRequestMethod.REGISTRATION;
      request.data = data;
      request = await request.save();
      const res = await MailService.tmpl('accountVerification').send(
        user.userEmail,
        'Account verification',
        {
          name: user.firstName + ' ' + user.lastName,
          action: 'verification?code=' + request.code,
        }
      );
      if (!res.success) {
        throw new Error(res.error);
      }
    } else {
      throw new Error('Can not find user to send him the email');
    }
    return true;
  }

  public async resetPassword(userId: string) {
    const { ConfirmRequest, UserModel, MailService } = this.di;
    const user = await UserModel.findById(userId);
    if (user) {
      let request = new ConfirmRequest();
      request.user = userId;
      request.type = ConfirmRequestMethod.PASSWORD;
      request = await request.save();
      const res = await MailService.tmpl('resetPassword').send(
        user.userEmail,
        'Reset your password',
        {
          name: user.firstName + ' ' + user.lastName,
          action: 'reset-pass?code=' + request.code,
        }
      );
      if (!res.success) {
        throw new Error(res.error);
      }
    } else {
      throw new Error('Can not find user to reset his password');
    }
    return true;
  }
}
