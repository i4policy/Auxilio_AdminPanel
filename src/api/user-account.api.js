import { API_ROOT } from './index';
import Request from './request';

const PATH = '/UserAccounts';
const FEEDBACK_PATH = '/UserFeedbacks';

const UserAccountAPI = {
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
  logout() {
    return Request.post(`${API_ROOT}${PATH}/logout-user`);
  },
  login(email, password) {
    return Request.post(`${API_ROOT}${PATH}/login`, {
      email,
      password
    });
  },
  registerMember(data) {
    return Request.post(`${API_ROOT}${PATH}/register-member`, data);
  },
  updateMember(data) {
    return Request.patch(`${API_ROOT}${PATH}/update-member`, { body: data });
  },
  allFeedbacks(filter) {
    return Request.get(`${API_ROOT}${FEEDBACK_PATH}`, {
      params: filter
    });
  },
  allIssues(filter) {
    return Request.get(`${API_ROOT}${FEEDBACK_PATH}`, {
      params: filter
    });
  },
  removeFeedback(id) {
    return Request.delete(`${API_ROOT}${FEEDBACK_PATH}/${id}`);
  },
  approveUser(data) {
    console.log(data);
    return Request.post(`${API_ROOT}${PATH}/approve-user`, data);
  },
  disapproveUser(data) {
    return Request.post(`${API_ROOT}${PATH}/disapprove-user`, data);
  },
};

export default UserAccountAPI;
