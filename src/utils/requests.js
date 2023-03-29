import axios from 'axios';
import { getToken } from 'firebase/app-check';
import {
  LOGIN_URL,
  REGISTER_URL,
  LOGOUT_URL,
  USER_URL,
  GET_ROLES_URL
} from './urls';
import { appCheck } from './firebase';

// requestConfig
const requestConfig = {
  withCredentials: true
};

// auth requests
export const loginRequest = ({ email, password }) => axios.post(
  LOGIN_URL,
  {
    email,
    password
  },
  requestConfig
);

export const registerRequest = ({
  email, name, password, role
}) => getToken(appCheck).then((tokenResult) => axios.post(
  REGISTER_URL,
  {
    email,
    password,
    name,
    role
  },
  {
    ...requestConfig,
    headers: {
      'X-Firebase-AppCheck': tokenResult.token
    }
  }
));

export const logoutRequest = () => axios.get(LOGOUT_URL, requestConfig);

export const userRequest = ({
  token
}) => axios.get(USER_URL, { token }, requestConfig);

// roles
export const getRolesRequest = () => axios.get(`${GET_ROLES_URL}`, requestConfig);
