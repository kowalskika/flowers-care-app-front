import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

import { FlowerEntity } from 'types';
import { Spinner } from '../common/Spinner/Spinner';
import { FlowersTable } from './FlowersTable';
import './FlowersList.css';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';
import { useAuth } from '../../hooks/useAuth';

export const FlowersList = () => {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const [userData, setUserData] = useState<FlowerEntity[] | null>(null);

  const refreshFlowerList = async () => {
    setUserData(null);
    try {
      if (auth) {
        const { data } = await axiosPrivate.get(`flower/?user=${auth.id}`);
        setUserData(data);
      }
    } catch (err) {
      localStorage.removeItem('user');
      window.location.reload();
      const { response } = err as AxiosError;
      if (response !== undefined && response.status === 404) {
        navigate('/404');
      } else {
        navigate('/error');
      }
    }
  };

  useEffect(() => {
    (async () => {
      await refreshFlowerList();
    })();
  }, [auth, setUserData, axiosPrivate]);

  if (userData === null) return <Spinner />;

  return (
    <>
      <h1 className="FlowersList__h1"> Twoje kwiaty</h1>
      <FlowersTable
        flowersList={userData}
        onFlowerChange={refreshFlowerList}
      />
    </>
  );
};
