const DEFAULT = {
  id: true,
  name: true,
  address: true,
  description: true,
  ownerId: true,
  active: true,
  createdAt: true,
};

const PUBLIC = {
  id: true,
  name: true,
  address: true,
  ownerId: true,
};

const FULL = {
  ...DEFAULT,
};

const schemas = {
  DEFAULT,
  PUBLIC,
  FULL,
};

export default schemas;
