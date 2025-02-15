export const REGIX = {
  email: {
    pattern:
      /^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/,
    msg: 'Invalid email provided',
  },
  organization_email: {
    pattern:
      /^[\w-]+(\.[\w-]+)*@(?!gmail\.|yahoo\.|outlook\.|hotmail\.)[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/,
    msg: 'Invalid organization email provided',
  },
  number: { pattern: /^[0-9]\d*$/, msg: 'Invalid' },
  phone: { pattern: /^\+?[1-9]\d{1,14}$/, msg: 'Invalid phone number provided' },
  password: {
    pattern:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    msg: 'Invalid password provided',
  },
  username: {
    pattern: /^(?=[a-zA-Z0-9_-]{1,15}$)[a-zA-Z][a-zA-Z0-9_-]{2,15}$/,
    msg: 'Username should be alphanumeric',
  },
  url: {
    pattern: /^([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/[^\s]*)?$/,
    msg: 'Enter Valid Url'
  }
};
