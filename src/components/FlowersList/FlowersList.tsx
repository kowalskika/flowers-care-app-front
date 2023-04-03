import React, { useEffect, useState } from 'react';
import { FlowerEntity } from 'types';
import { useNavigate } from 'react-router-dom';
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
    if (auth) {
      const { data } = await axiosPrivate.get(`flower/?user=${auth.id}`);
      setUserData(data);
    }
  };

  useEffect(() => {
    (async () => {
      await refreshFlowerList();
    })();
  }, [auth, setUserData, axiosPrivate]);

  if (userData === null) return <Spinner />;

  return (
    <div>
      <FlowersTable
        flowersList={userData}
        onFlowerChange={refreshFlowerList}
      />
    </div>
  );
};
