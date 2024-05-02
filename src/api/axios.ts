import { API_URL } from '@/functions/environmentVariables';
import { API_KEY } from './../functions/environmentVariables';
import { getTokenDetails } from './../functions/userSession';
// import { getSessionDetails } from '@/functions/userSession';
import { store } from '@/store';
import { signOut } from '@/store/features/user';
import axios from 'axios';

const sessionToken = getTokenDetails();

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
    const storeToken = appState?.user.token;
    // get state is called here to be current at the time of rendering

    const token = storeToken || sessionToken;

    if (token) {
      config.headers.Authorization = 'Bearer ' + token;
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
      if (
        err.response.status === 401 &&
        sessionToken // logout only when a user has session
      ) {
        // Log user out
        store.dispatch(signOut());

        // Reload window so user is redirected to login
        window.location.reload();
      }
    }
    return Promise.reject(err);
  }
);
