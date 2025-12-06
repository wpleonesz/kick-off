const DEFAULT = {
  id: true,
  email: true,
  name: true,
  role: true,
  active: true,
  ownerApproved: true,
  createdAt: true,
};

const CREDENTIALS = {
  id: true,
  email: true,
  password: true,
  name: true,
  role: true,
  active: true,
};

const PUBLIC = {
  id: true,
  email: true,
  name: true,
  role: true,
};

const SEND_EMAIL = {
  email: true,
  name: true,
};

const schemas = {
  DEFAULT,
  PUBLIC,
  CREDENTIALS,
  SEND_EMAIL,
};

export default schemas;
