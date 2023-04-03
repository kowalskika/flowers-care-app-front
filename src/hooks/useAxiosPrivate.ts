import { useEffect } from 'react';
import { useRefresh } from './useRefresh';
import { axiosPrivate } from '../api/axios';
import { useAuth } from './useAuth';

export const useAxiosPrivate = () => {
  const { auth } = useAuth();
  const refresh = useRefresh();

  useEffect(() => {
    const axiosReqIntercept = axiosPrivate.interceptors.request.use(
      (config: any) => {
        if (!config?.headers.authorization) {
          config.headers.authorization = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (err: any) => Promise.reject(err),
    );
    const axiosResIntercept = axiosPrivate.interceptors.response.use(
      (res: any) => res,
      async (err: any) => {
        const prevReq = err?.config;
        if (err.response.status === 403 && !prevReq.sent) {
          prevReq.sent = true;
          const accessToken = await refresh();
          prevReq.headers.authorization = `Bearer ${accessToken}`;
          return axiosPrivate(prevReq);
        }
        return Promise.reject(err);
      },
    );

    return () => {
      axiosPrivate.interceptors.request.eject(axiosReqIntercept);
      axiosPrivate.interceptors.response.eject(axiosResIntercept);
    };
  }, [auth, refresh]);

  return axiosPrivate;
};
