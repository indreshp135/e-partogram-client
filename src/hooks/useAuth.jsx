import React, {
  createContext, useContext, useMemo
} from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { notifications } from '@mantine/notifications';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { userRequest } from '../utils/requests';
import { auth } from '../utils/firebase';
import { useLocalStorage } from './useLocalStorage';
import { useLoading } from './useLoading';
// import { navLinks } from '../routes/navLinks';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage('user', null);
  const navigate = useNavigate();
  const { request } = useLoading();

  const login = async (data) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const token = await userCredential.user.getIdToken();
      const response = await request(() => userRequest(token));
      if (response.status === 200) {
        setUser(response.data);
        notifications.show({
          title: 'Login successful'
        });
        // navigate(navLinks.filter((link) => link.label === response.data.tabs[0])[0].link);
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
