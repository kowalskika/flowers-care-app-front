import React, { useEffect, useState } from 'react';
import { FlowerEntity } from 'types';
import { useParams } from 'react-router-dom';
import { Spinner } from '../components/common/Spinner/Spinner';
import { OneFlowerTable } from '../components/OneFlowerTable/OneFlowerTable';
import { Header } from '../components/common/Header/Header';
import { NotFoundView } from './NotFoundView';

export const SingleFlowerView = () => {
  const [flowerInfo, setFlowerInfo] = useState<FlowerEntity | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const { flowerId } = useParams();
  useEffect(() => {
    (async () => {
      setFlowerInfo(null);
      try {
        const res = await fetch(`http://localhost:3001/flower/${flowerId}`);
        const data = await res.json();
        setFlowerInfo(data);
      } catch (err: any) {
        setError(err);
      }
    })();
  }, []);

  if (error !== null) return <NotFoundView />;
  if (flowerInfo === null) return <Spinner />;

  return (
    <>
      <Header goBack />
      <OneFlowerTable flowerInfo={flowerInfo} />
      <br />
    </>
  );
};
