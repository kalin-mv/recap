import { ConfirmRequestMethod } from 'server/constants';
import BaseContext from '../BaseContext';

export default class ConfirmService extends BaseContext {
  public async registration(userId: string, data: any) {
    const { ConfirmRequest, UserModel, MailService } = this.di;
    const user = await UserModel.findById(userId);
    if (user) {
      let request = new ConfirmRequest();
      request.user = userId;
      request.rType = ConfirmRequestMethod.REGISTRATION;
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
      request.rType = ConfirmRequestMethod.PASSWORD;
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

  public async verification(code: string) {
    const { ConfirmRequest, UserModel } = this.di;
    const confirm: any = await ConfirmRequest.findOne({
      type: ConfirmRequestMethod.REGISTRATION,
      code,
    });
    if (!confirm || !confirm.user) {
      throw new Error("Can't verify account or account already verified");
    }
    const id = confirm.user;
    await confirm.remove();
    const user: any = await UserModel.findById(id);
    if (user) {
      user.suspended = false;
      await user.save();
    } else {
      console.log('The handled confirmation code is', code);
      throw new Error('The confirmation code have been already handled');
    }
    return true;
  }
}
