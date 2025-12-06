import ObjectData from '@lib/database';
import schemas from '@database/base/user/schemas';

export const ESCAPE = ['name', 'email'];

class UserData extends ObjectData {
  constructor() {
    const name = 'user';
    const table = 'user';
    super(name, table, schemas);
  }

  hasRole = async ({ id, role }) => {
    let where = { ...this._where };
    if (id) where.id = id;
    if (role) where.role = role;

    const response = await this.where(where).getFirst();
    return !!response;
  };

  findByEmail = async (email) => {
    return this.where({ email }).select('CREDENTIALS').getFirst();
  };

  findActive = async (options = {}) => {
    return this.where({ active: true, ...this._where }).getAll(options);
  };
}

export default UserData;
