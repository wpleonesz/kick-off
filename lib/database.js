import prisma from '@database/client';

class ObjectData {
  constructor(name, table, schemas) {
    this.name = name;
    this.table = table;
    this.schemas = schemas;
    this._where = {};
    this._select = schemas.DEFAULT || {};
  }

  where(conditions) {
    this._where = conditions;
    return this;
  }

  select(schema) {
    this._select = this.schemas[schema] || schema;
    return this;
  }

  getFirst() {
    return prisma[this.table].findFirst({
      where: this._where,
      select: this._select,
    });
  }

  getUnique(id) {
    return prisma[this.table].findUnique({
      where: { id },
      select: this._select,
    });
  }

  getAll(options = {}) {
    return prisma[this.table].findMany({
      where: this._where,
      select: this._select,
      ...options,
    });
  }

  create(data) {
    return prisma[this.table].create({
      data,
      select: this._select,
    });
  }

  update(id, data) {
    return prisma[this.table].update({
      where: { id },
      data,
      select: this._select,
    });
  }

  delete(id) {
    return prisma[this.table].delete({
      where: { id },
    });
  }

  record(id) {
    return {
      getUnique: () =>
        prisma[this.table].findUnique({
          where: { id: parseInt(id) },
          select: this._select,
        }),
      update: (data) =>
        prisma[this.table].update({
          where: { id: parseInt(id) },
          data,
          select: this._select,
        }),
      delete: () =>
        prisma[this.table].delete({
          where: { id: parseInt(id) },
        }),
    };
  }
}

export default ObjectData;
