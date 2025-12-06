import ObjectData from '@lib/database';
import schemas from '@database/base/court/schemas';

export const ESCAPE = ['name', 'address', 'description'];

class CourtData extends ObjectData {
  constructor() {
    const name = 'court';
    const table = 'court';
    super(name, table, schemas);
  }

  findByOwner = async (ownerId, options = {}) => {
    return this.where({ ownerId }).getAll(options);
  };

  findActive = async (options = {}) => {
    return this.where({ active: true, ...this._where }).getAll(options);
  };
}

export default CourtData;
