import React, { useEffect, useState } from 'react';
import { FlowerEntity } from 'types';
import { useParams } from 'react-router-dom';
import { Spinner } from '../components/common/Spinner/Spinner';
import { OneFlowerTable } from '../components/OneFlowerTable/OneFlowerTable';
import { Header } from '../components/common/Header/Header';
import { NotFoundView } from './NotFoundView';
import { EditFlowerForm } from '../components/EditFlowerForm/EditFlowerForm';
import { dateStringToFormDateInput } from '../utils/dateStringToDateFormInput';

export const SingleFlowerView = () => {
  const [flowerInfo, setFlowerInfo] = useState<FlowerEntity | null>(null);
  const [flowerInfoToEditForm, setFlowerInfoToEditForm] = useState<any | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const { flowerId } = useParams();

  const refreshFlowerList = async () => {
    setFlowerInfo(null);
    setFlowerInfoToEditForm(null);
    try {
      const res = await fetch(`http://localhost:3001/flower/${flowerId}`);
      const data = await res.json();
      setFlowerInfo(data);
      setFlowerInfoToEditForm(data);
      setFlowerInfoToEditForm((prev: any) => ({
        ...prev,
        replantedAt: dateStringToFormDateInput(prev.replantedAt),
        wateredAt: dateStringToFormDateInput(prev.wateredAt),
        fertilizedAt: dateStringToFormDateInput(prev.fertilizedAt),
      }));
    } catch (err: any) {
      setError(err);
    }
  };

  useEffect(() => {
    (async () => refreshFlowerList())();
  }, []);

  if (error !== null) return <NotFoundView />;
  if (flowerInfo === null) return <Spinner />;

  return (
    <>
      <Header goBack />
      <OneFlowerTable flowerInfo={flowerInfo} />
      <br />
      <EditFlowerForm flower={flowerInfoToEditForm as FlowerEntity} refreshFlowerList={refreshFlowerList} />
    </>
  );
};
