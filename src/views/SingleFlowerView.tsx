import React, { useEffect, useState } from 'react';
import { FlowerEntity } from 'types';
import { useParams } from 'react-router-dom';
import { Spinner } from '../components/common/Spinner/Spinner';
import { OneFlowerTable } from '../components/OneFlowerTable/OneFlowerTable';
import { Header } from '../components/common/Header/Header';

export const SingleFlowerView = () => {
  const [flowerInfo, setFlowerInfo] = useState<FlowerEntity | null>(null);
  const { flowerId } = useParams();

  useEffect(() => {
    (async () => {
      setFlowerInfo(null);
      const res = await fetch(`http://localhost:3001/flower/${flowerId}`);
      const data = await res.json();
      setFlowerInfo(data);
    })();
  }, []);

  if (flowerInfo === null) return <Spinner />;

  return (
    <>
      <Header goBack />
      <OneFlowerTable flowerInfo={flowerInfo} />
      <br />
    </>
  );
};
