import { UserAccountAPI } from '@/api';
import Router from '../router';

export const ACCESS_TOKEN_KEY = 'token';
export const PROFILE_KEY = 'profile';

const AuthService = {
  async login(email, password) {
    const res = await UserAccountAPI.login(email, password);
    if (res && res.token) {
      localStorage.setItem(ACCESS_TOKEN_KEY, res.token);
      const profile = JSON.stringify({
        profilePicture: res.profilePicture,
        title: res.title,
        givenName: res.givenName,
        familyName: res.familyName,
        organization: res.organization,
        position: res.position,
        email: res.email,
        role: res.role
      });
      localStorage.setItem(PROFILE_KEY, profile);
      return true;
    }
    return false;
  },
  async logout() {
    await UserAccountAPI.logout();
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(PROFILE_KEY);
    Router.push({ name: 'login' });
  },
  updateToken(token) {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  },
  getAccessToken: () => localStorage.getItem(ACCESS_TOKEN_KEY),

  getProfile: () => JSON.parse(localStorage.getItem(PROFILE_KEY)),
  isAuthenticated: () => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    return token !== null && token !== 'undefined';
  }
};

export default AuthService;
