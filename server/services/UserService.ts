import bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';
import isEmail from 'validator/lib/isEmail';
import normalizeEmail from 'validator/lib/normalizeEmail';

import BaseContext from 'server/BaseContext';

export default class UserService extends BaseContext {
  public async findUserWithEmailAndPassword(email, password) {
    const { UserModel } = this.di;
    const userEmail = normalizeEmail(email);
    const user = await UserModel.findOne({ userEmail })
      .populate('companies')
      .lean();
    if (user && (await bcrypt.compare(password, user.password))) {
      return user; // filtered out password
    }
    return null;
  }

  public findUserForAuth(userId: string) {
    const { UserModel } = this.di;
    return UserModel.findOne(
      { _id: new ObjectId(userId) },
      { projection: { password: 0 } }
    ).lean();
  }

  public findUserByEmail(email: string) {
    const { UserModel } = this.di;
    return UserModel.findOne({ userEmail: normalizeEmail(email) });
  }

  public async registerUser(data: any) {
    let { firstName, lastName, email, password, timezone } = data;
    email = normalizeEmail(email);
    if (!isEmail(email)) {
      throw new Error('The email you entered is invalid.');
    }

    const { UserService, ConfirmService, CountryModel } = this.di;
    let user = await UserService.findUserByEmail(email);
    if (user) {
      throw new Error('The email has already been taken.');
    }

    const defaultTimezone = 'America/Edmonton';
    const userData = {
      userEmail: email,
      password: password && password.trim(),
      firstName,
      lastName,
      timezone: timezone ? timezone.trim() : defaultTimezone,
    };
    const { UserModel } = this.di;
    const newUser = new UserModel(userData);
    user = await newUser.save();
    await ConfirmService.registration(user._id, userData);
    const ipapi = require('ipapi.co');
    ipapi.location((res: any) => {
      let c = 'US';
      if (res && res.country) {
        c = res.country;
      }
      CountryModel.findOne({ cca2: c }, (err, data) => {
        if (data) {
          user.country = data;
          user.save();
          data.isActive = 1;
          data.save();
        }
      });
    });
    return userData;
  }
}
