import React, {
  createContext, useContext, useMemo
} from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { notifications } from '@mantine/notifications';
import { loginRequest, logoutRequest, userRequest } from '../utils/requests';
import { useLocalStorage } from './useLocalStorage';
import { useLoading } from './useLoading';
import { navLinks } from '../routes/navLinks';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage('user', null);
  const navigate = useNavigate();
  const { request } = useLoading();

  const login = async (data) => {
    try {
      const response = await request(() => loginRequest(data));
      if (response.status === 200) {
        const res = await request(userRequest);
        setUser(res.data);
        notifications.show({
          title: 'Login successful'
        });
        navigate(navLinks.filter((link) => link.label === res.data.tabs[0])[0].link);
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
        message: error.response.data
            && error.response.data.message ? error.response.data.message : error.message
      });
    }
  };

  const logout = async () => {
    try {
      const response = await request(logoutRequest);
      if (response.status === 200) {
        navigate('/auth');
        notifications.show({
          title: 'Logout successful'
        });
        setUser(null);
      } else {
        notifications.show({
          color: 'red',
          title: 'Logout failed',
          message: response.data.message
        });
      }
    } catch (error) {
      notifications.show({
        color: 'red',
        title: 'Logout failed',
        message: error.response.data
        && error.response.data.message ? error.response.data.message : error.message
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
