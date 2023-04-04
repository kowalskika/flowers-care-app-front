import { axios } from '../api/axios';
import { useAuth } from './useAuth';

export const useRefresh = () => {
  const { setAuth } = useAuth();

  return async function () {
    try {
      const { data } = await axios.patch('session', {}, { withCredentials: true }) as { data: string };
      setAuth((prev) => {
        if (!prev) return prev;
        return { ...prev, accessToken: data };
      });
      return data;
    } catch (e) {
      await axios.delete('sessions', { withCredentials: true });
      localStorage.removeItem('user');
      setAuth(null);
      return null;
    }
  };
};
