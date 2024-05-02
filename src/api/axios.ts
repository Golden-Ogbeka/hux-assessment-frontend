import { API_KEY, API_URL } from '@/functions/environmentVariables';
import { store } from '@/store';
import { signOut } from '@/store/features/user';
import axios from 'axios';
import { getUserSession } from './../functions/userSession';

const sessionDetails = getUserSession();

export const appAxios = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': API_KEY,
  },
  baseURL: API_URL,
});

appAxios.interceptors.request.use(
  (config) => {
    const appState = store.getState();
    const storeUserDetails = appState?.user?.user;
    // get state is called here to be current at the time of rendering

    const token = storeUserDetails?.token || sessionDetails?.token;

    if (token) {
      config.headers.Authorization = `${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

appAxios.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    // Current expired token setup
    const possibleErrors = ['Login to continue!', 'jwt expired'];
    // If user's token is invalid, this message would be received.
    if (
      err.response?.data?.errors &&
      err.response.data.errors[0].msg &&
      possibleErrors.includes(err.response.data.errors[0].msg) // if one of the possible errors is sent
    ) {
      // Once token is cleared, reload and app would be redirected to login
      store.dispatch(signOut());
      window.location.href = '/';
    }

    return Promise.reject(err);
  }
);
