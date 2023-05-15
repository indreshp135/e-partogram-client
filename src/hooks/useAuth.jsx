import React, { createContext, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { notifications } from '@mantine/notifications';
import {
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { getToken } from 'firebase/messaging';
import { fcmTokenRequest, userRequest } from '../utils/requests';
import { auth, messaging } from '../utils/firebase';
import { useLocalStorage } from './useLocalStorage';
import { useLoading } from './useLoading';
import { navLinks } from '../routes/navLinks';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage('user', null);
  const navigate = useNavigate();
  const { request } = useLoading();

  const getFCMToken = async () => {
    try {
      return await getToken(messaging, {
        vapidKey:
          'BCjqRpUZEvFIJaZFoYqp9vRdOfV0PTx5LSnGCf7uApfSfZ5ONVkmMxdaBrUlKaPjcnPRE4etLoyTA8mY_N0OA5A'
      });
    } catch (error) {
      notifications.show({
        color: 'red',
        title: 'Error while enabling notifications',
        message: error.message
      });
      return null;
    }
  };

  const setupFCM = async (token) => {
    const fcmToken = await getFCMToken();
    if (fcmToken) {
      try {
        const response = await request(() => fcmTokenRequest({ token, fcmToken }));
        if (response.status === 200) {
          notifications.show({
            title: 'Notifications enabled',
            color: 'green'
          });
        } else {
          notifications.show({
            color: 'red',
            title: 'Error while enabling notifications'
          });
        }
      } catch (error) {
        notifications.show({
          color: 'red',
          title: 'Error while enabling notifications'
        });
      }
    } else {
      notifications.show({
        color: 'red',
        title: 'Could not enable notifications',
        message: 'Please enable notifications to receive updates'
      });
    }
  };

  const checkPermissionsAndSetupFCM = async (token) => {
    try {
      if (Notification.permission === 'granted') {
        await setupFCM(token);
        return;
      }
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        await setupFCM(token);
      } else {
        notifications.show({
          color: 'red',
          title: 'Could not enable notifications',
          message: 'Please enable notifications to receive updates'
        });
      }
    } catch (error) {
      notifications.show({
        color: 'red',
        title: 'Could not enable notifications',
        message: 'Please enable notifications to receive updates'
      });
    }
  };

  const login = async (data) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const token = await userCredential.user.getIdToken();

      localStorage.setItem('firebase-id-token', token);
      const response = await request(() => userRequest({ token }));
      if (response.status === 200) {
        setUser({ ...response.data, token });
        notifications.show({
          color: 'green',
          title: 'Login successful'
        });
        await checkPermissionsAndSetupFCM(token);
        navigate('/home');
        navigate(
          navLinks.filter((link) => link.label === response.data.tabs[0])[0]
            .link
        );
      } else {
        notifications.show({
          color: 'red',
          title: 'Login failed',
          message: response.data.message
        });
      }
    } catch (error) {
      notifications.show({
        color: 'red',
        title: 'Login failed',
        message: error.message
      });
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      navigate('/auth');
      notifications.show({
        color: 'green',
        title: 'Logout successful'
      });
      setUser(null);
    } catch (error) {
      notifications.show({
        color: 'red',
        title: 'Logout failed',
        message: error.message
      });
    }
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const useAuth = () => useContext(AuthContext);
