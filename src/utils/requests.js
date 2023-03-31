import axios from 'axios';
import { getToken } from 'firebase/app-check';
import {
  LOGIN_URL,
  REGISTER_URL,
  LOGOUT_URL,
  USER_URL,
  GET_ROLES_URL,
  ADD_PATIENT_URL,
  LIST_PATIENTS_URL,
  GET_PATIENT_URL,
  ADD_MEASUREMENT_URL,
  LIST_ONDUTY_STAFF_URL,
  LIST_NEARBY_HOSPITALS_URL,
  FCM_TOKEN_URL
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
}) => axios.get(USER_URL, {
  ...requestConfig,
  headers: {
    'X-Token-Firebase': token
  }
});

// roles
export const getRolesRequest = () => axios.get(`${GET_ROLES_URL}`, requestConfig);

// add patient
export const addPatientRequest = (token, {
  name,
  age,
  parity,
  alive,
  edd,
  sb,
  nnd,
  riskFactors,
  contractionStartTime,
  membraneRuptureTime,
  height,
  doctor,
  nurse
}) => axios.post(`${ADD_PATIENT_URL}`, {
  name,
  age,
  parity,
  alive,
  edd,
  sb,
  nnd,
  riskFactors,
  contractionStartTime,
  membraneRuptureTime,
  height,
  doctor,
  nurse
}, {
  ...requestConfig,
  headers: {
    'X-Token-Firebase': token
  }
});

// get patient list
export const listPatientsRequest = (token) => axios.get(`${LIST_PATIENTS_URL}`, {
  ...requestConfig,
  headers: {
    'X-Token-Firebase': token
  }
});

export const getNearbyHospitalsRequest = (token) => axios.get(`${LIST_NEARBY_HOSPITALS_URL}`, {
  ...requestConfig,
  headers: {
    'X-Token-Firebase': token
  }
});

// get patient
export const getPatientRequest = (token, id) => axios.get(`${GET_PATIENT_URL}/${id}`, {
  ...requestConfig,
  headers: {
    'X-Token-Firebase': token
  }
});

// add measurement
export const addMeasurementRequest = (token, {
  patientId,
  measurementType,
  measurementValue
}) => axios.post(`${ADD_MEASUREMENT_URL}`, {
  patientId,
  measurementType,
  measurementValue
}, {
  ...requestConfig,
  headers: {
    'X-Token-Firebase': token
  }
});

// list on onduty staff
export const listOnDutyStaffRequest = (token) => axios.get(`${LIST_ONDUTY_STAFF_URL}`, {
  ...requestConfig,
  headers: {
    'X-Token-Firebase': token
  }
});

// fcm token
export const fcmTokenRequest = ({
  token, fcmToken
}) => axios.post(
  FCM_TOKEN_URL,
  { token, fcmToken },
  {
    ...requestConfig,
    headers: {
      'X-Token-Firebase': token
    }
  }
);
