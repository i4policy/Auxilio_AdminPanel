import { API_ROOT } from './index';
import Request from './request';

const PATH = '/PostCategories';

const PostCategoryAPI = {
  get(id) {
    return Request.get(`${API_ROOT}${PATH}/${id}`);
  },
  all(filter) {
    return Request.get(`${API_ROOT}${PATH}`, {
      params: filter
    });
  },
  remove(id) {
    return Request.delete(`${API_ROOT}${PATH}/${id}`);
  },
  create(data) {
    return Request.post(`${API_ROOT}${PATH}`, data);
  },
  update(data) {
    return Request.patch(`${API_ROOT}${PATH}/update-category`, { body: data });
  }
};

export default PostCategoryAPI;
