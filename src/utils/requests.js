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
  FCM_TOKEN_URL,
  STAFF,
  CAPACITY,
  ON_DUTY,
  HOSPITAL,
  LIST_STAFFS
} from './urls';
import { appCheck, auth } from './firebase';

const getIDToken = async () => {
  const user = await auth.currentUser;
  if (user) {
    return user.getIdToken(true);
  }
  return null;
};

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
export const addPatientRequest = async ({
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
    'X-Token-Firebase': await getIDToken()
  }
});

// get patient list - done
export const listPatientsRequest = async () => axios.get(`${LIST_PATIENTS_URL}`, {
  ...requestConfig,
  headers: {
    'X-Token-Firebase': await getIDToken()
  }
});

export const getNearbyHospitalsRequest = (token) => axios.get(`${LIST_NEARBY_HOSPITALS_URL}`, {
  ...requestConfig,
  headers: {
    'X-Token-Firebase': token
  }
});

// get patient
export const getPatientRequest = async (id) => axios.get(`${GET_PATIENT_URL}/${id}`, {
  ...requestConfig,
  headers: {
    'X-Token-Firebase': await getIDToken()
  }
});

// add measurement - done
export const addMeasurementRequest = async (
  patientId,
  measurement
) => axios.post(`${ADD_MEASUREMENT_URL}`, {
  patientId,
  ...measurement
}, {
  ...requestConfig,
  headers: {
    'X-Token-Firebase': await getIDToken()
  }
});

// list on onduty staff - done
export const listOnDutyStaffRequest = async () => {
  const token = await getIDToken();
  return axios.get(`${LIST_ONDUTY_STAFF_URL}`, {
    ...requestConfig,
    headers: {
      'X-Token-Firebase': token
    }
  });
};

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

export const addHospital = async ({
  name,
  tier,
  lat,
  lon,
  capacity
}) => {
  const token = await getIDToken();
  return axios.post(`${HOSPITAL}`, {
    name,
    tier,
    lat,
    lon,
    capacity
  }, {
    ...requestConfig,
    headers: {
      'X-Token-Firebase': token
    }
  });
};

export const addStaff = async ({
  staffId,
  isActive
}) => {
  const token = await getIDToken();
  return axios.post(`${STAFF}`, {
    staffId,
    isActive
  }, {
    ...requestConfig,
    headers: {
      'X-Token-Firebase': token
    }
  });
};

export const updateStaff = async (
  staffId,
  isActive
) => {
  const token = await getIDToken();
  return axios.put(`${STAFF}`, {
    staffId,
    isActive
  }, {
    ...requestConfig,
    headers: {
      'X-Token-Firebase': token
    }
  });
};

export const updateCapacity = async (
  capacity
) => {
  const token = await getIDToken();
  return axios.put(`${CAPACITY}`, {
    capacity
  }, {
    ...requestConfig,
    headers: {
      'X-Token-Firebase': token
    }
  });
};

export const getOnDutyStaff = async () => {
  const token = await getIDToken();
  return axios.get(`${ON_DUTY}`, {
    ...requestConfig,
    headers: {
      'X-Token-Firebase': token
    }
  });
};

export const transferPatient = async (
  patient,
  toHospital
) => {
  const token = await getIDToken();
  return axios.post(`${LIST_PATIENTS_URL}`, {
    patient, toHospital
  }, {
    ...requestConfig,
    headers: {
      'X-Token-Firebase': token
    }
  });
};

export const listUnAssignedStaffs = async () => {
  const token = await getIDToken();
  return axios.get(`${LIST_STAFFS}`, {
    ...requestConfig,
    headers: {
      'X-Token-Firebase': token
    }
  });
};

// discharge patient
export const dischargePatientRequest = async (id, comments) => axios.post(
  `${GET_PATIENT_URL}/${id}/discharge`,
  {
    comments
  },
  {
    ...requestConfig,
    headers: {
      'X-Token-Firebase': await getIDToken()
    }
  }
);
