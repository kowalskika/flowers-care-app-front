import React, { useEffect, useState } from 'react';
import { FlowerEntity } from 'types';
import { useNavigate, useParams } from 'react-router-dom';
import { AxiosError } from 'axios';

import { Spinner } from '../common/Spinner/Spinner';
import { OneFlowerTable } from './OneFlowerTable';
import { EditFlowerForm } from '../EditFlowerForm/EditFlowerForm';
import { dateStringToFormDateInput } from '../../utils/dateStringToDateFormInput';
import { useAuth } from '../../hooks/useAuth';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';

export const OneFlower = () => {
  const { auth } = useAuth();
  const { flowerId } = useParams();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const [flowerInfo, setFlowerInfo] = useState<FlowerEntity | null>(null);
  const [flowerInfoToEditForm, setFlowerInfoToEditForm] = useState<any | null>(null);

  const refreshFlowerList = async () => {
    setFlowerInfo(null);
    setFlowerInfoToEditForm(null);

    try {
      if (auth) {
        const { data } = await axiosPrivate.get(`flower/${flowerId}?user=${auth.id}`);
        setFlowerInfo(data);
        setFlowerInfoToEditForm(data);
        setFlowerInfoToEditForm((prev: any) => {
          return (
            {
              ...prev,
              replantedAt:
                prev.replantedAt ? dateStringToFormDateInput(prev.replantedAt) : null,
              wateredAt:
                dateStringToFormDateInput(prev.wateredAt),
              fertilizedAt:
                prev.fertilizedAt !== null ? dateStringToFormDateInput(prev.fertilizedAt) : null,
            });
        });
      }
    } catch (err) {
      const { response } = err as AxiosError;
      if (response !== undefined && response.status === 404) {
        navigate('/404');
      } else {
        navigate('/error');
      }
    }
  };

  useEffect(() => {
    (async () => refreshFlowerList())();
  }, [auth, setFlowerInfo, axiosPrivate]);

  if (flowerInfo === null) return <Spinner />;

  return (
    <>
      <OneFlowerTable flowerInfo={flowerInfo} />
      <br />
      <EditFlowerForm flower={flowerInfoToEditForm as FlowerEntity} refreshFlowerList={refreshFlowerList} />
    </>
  );
};
