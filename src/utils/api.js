import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:5000/api', timeout: 15000 });

api.interceptors.response.use(
  r => r.data,
  err => Promise.reject(err.response?.data?.error || err.message || 'Request failed')
);

// Generic CRUD factory
const resource = (path) => ({
  list: (params) => api.get(path, { params }),
  get: (id) => api.get(`${path}/${id}`),
  create: (data) => api.post(path, data),
  update: (id, data) => api.put(`${path}/${id}`, data),
  delete: (id) => api.delete(`${path}/${id}`),
});

export const productsApi = resource('/products');
export const employeesApi = resource('/employees');
export const vendorsApi = resource('/vendors');
export const consultantsApi = resource('/consultants');
export const landApi = resource('/land');
export const ngosApi = resource('/ngos');
export const businessAssocApi = resource('/business-associates');
export const volunteersApi = resource('/volunteers');
export const hospitalityApi = resource('/hospitality');
export const nurseryVendorsApi = resource('/nursery-vendors');

export const treeSpeciesApi = {
  flowers: resource('/tree-species/flowers'),
  fruits: resource('/tree-species/fruits'),
  birds: resource('/tree-species/birds'),
  reptiles: resource('/tree-species/reptiles'),
};

export const projectsApi = {
  ...resource('/projects'),
  getUpdates: (id) => api.get(`/projects/${id}/updates`),
  addUpdate: (id, data) => api.post(`/projects/${id}/updates`, data),
  addCensus: (id, data) => api.post(`/projects/${id}/census`, data),
  addTransplant: (id, data) => api.post(`/projects/${id}/transplantation`, data),
  addPlantation: (id, data) => api.post(`/projects/${id}/plantation`, data),
  addMaintenance: (id, data) => api.post(`/projects/${id}/maintenance`, data),
  addVolunteer: (id, data) => api.post(`/projects/${id}/volunteers`, data),
  uploadFile: (id, formData) => api.post(`/projects/${id}/files`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
};

export const dashboardApi = {
  summary: () => api.get('/dashboard/summary'),
};

export default api;
