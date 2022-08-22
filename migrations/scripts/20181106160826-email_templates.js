'use strict';

module.exports = {
  async up(db) {
    const docs = [
      {
        name: 'accountVerification',
        title: 'You`re Almost There! Just Confirm Your Email',
        description:
          'Hello, {{ name }}.<br />You`ve successfully created a Golden Team account.<br />To activate it, please click below to verify your email address.',
        content: null,
        params: [
          {
            variable: 'name',
            label: 'User full name',
          },
        ],
      },
      {
        name: 'resetPassword',
        title: 'Reset your password',
        description:
          'Hello, {{ name }}.<br />To reset the password for the Golden Team account associated with your email, click on the button below.<br />If you don`t want to reset your password, please disregard this email.',
        content: null,
        params: [
          {
            variable: 'name',
            label: 'User full name',
          },
        ],
      },
      {
        name: 'contactUs',
        title: 'Contact Us',
        description:
          'Hello.<br />You received a new notification from the Contact Us page from <b>{{ name }}</b>.<br />Email: <b>{{ userEmail }}</b><br /><br /><b>{{ message }}</b>.',
        content: null,
        params: [
          {
            variable: 'name',
            label: 'User full name',
          },
          {
            variable: 'userEmail',
            label: 'User email',
          },
          {
            variable: 'message',
            label: 'Message to administrator',
          },
        ],
      },
    ];
    await db.collection('emailTemplates').insertMany(docs);
  },
};
