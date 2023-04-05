import React, { useEffect, useState } from 'react';
import { FlowerEditForm, FlowerEntity, FlowerEntityRes } from 'types';
import { useNavigate, useParams } from 'react-router-dom';
import { AxiosError } from 'axios';

import './OneFlower.css';
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

  const flowerInfoForm = {
    name: '',
    wateredAt: '',
    info: '',
    species: '',
    replantedAt: '',
    fertilizedAt: '',
    wateringInterval: 0,
    nextWateringAt: '',
  };

  const [flowerInfo, setFlowerInfo] = useState<FlowerEntity | null>(null);
  const [flowerInfoToEditForm, setFlowerInfoToEditForm] = useState<FlowerEditForm>(flowerInfoForm);

  const refreshFlowerList = async () => {
    setFlowerInfo(null);
    setFlowerInfoToEditForm(flowerInfoForm);

    try {
      if (auth) {
        const { data } = (await axiosPrivate.get(`flower/${flowerId}?user=${auth.id}`)) as FlowerEntityRes;
        setFlowerInfo(data);
        setFlowerInfoToEditForm(data);
        setFlowerInfoToEditForm((prev) => {
          return (
            {
              ...prev,
              replantedAt:
                prev.replantedAt ? dateStringToFormDateInput(prev.replantedAt) : null,
              wateredAt:
                dateStringToFormDateInput(prev.wateredAt),
              fertilizedAt:
                prev.fertilizedAt !== null ? dateStringToFormDateInput(prev.fertilizedAt as string) : null,
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
      <div className="OneFlower__EditFlower-container">
        <EditFlowerForm flower={flowerInfoToEditForm as FlowerEntity} refreshFlowerList={refreshFlowerList} />
      </div>
    </>
  );
};
