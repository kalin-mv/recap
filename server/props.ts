const props = {
  user: {
    firstName: { type: 'string', minLength: 2, maxLength: 40 },
    lastName: { type: 'string', minLength: 2, maxLength: 40 },
    password: { type: 'string', format: 'password', minLength: 8 },
    email: { type: 'string', format: 'email', minLength: 5 },
    timezone: { type: 'string', minLength: 3, maxLength: 160 },
  },
  confirm: {
    code: {
      type: 'string',
      pattern: '[A-Za-z0-9_-]{7,14}',
      minLength: 7,
      maxLength: 14,
    },
  },
  post: {
    content: { type: 'string', minLength: 1, maxLength: 280 },
  },
  comment: {
    content: { type: 'string', minLength: 1, maxLength: 280 },
  },
};

export default props;
