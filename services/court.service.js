import httpRequest from '@lib/http-request';

const getAll = (filters) => {
  return httpRequest.get('/api/court', filters);
};

const getById = (id) => {
  if (!id) return Promise.resolve({});
  return httpRequest.get(`/api/court/${id}`);
};

const create = (params) => {
  return httpRequest.post('/api/court', params);
};

const update = (id, params) => {
  return httpRequest.put(`/api/court/${id}`, params);
};

const deactivate = (id) => {
  return httpRequest.delete(`/api/court/${id}`);
};

const activate = (id) => {
  return httpRequest.put(`/api/court/${id}`, { active: true });
};

const courtService = {
  getAll,
  getById,
  create,
  update,
  deactivate,
  activate,
};

export default courtService;
