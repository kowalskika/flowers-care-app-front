import React, { useEffect, useState } from 'react';
import { FlowerEntity } from 'types';
import { Link, useParams } from 'react-router-dom';
import { Spinner } from '../components/common/Spinner/Spinner';

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
  const {
    id, name, fertilizedAt, info, replantedAt, species, wateredAt, wateringInterval,
  } = flowerInfo;

  return (
    <>
      <h1>{name}</h1>
      <p>ID kwiatka: <strong>{id}</strong></p>
      {species && <p>Gatunek: <strong>{species}</strong></p>}
      {info && <p>Informacje dodatkowe: <strong>{info}</strong></p>}
      {fertilizedAt && <p>Ostatnie nawożenie: <strong>{fertilizedAt}</strong></p>}
      {wateredAt && <p>Ostatnie podlanie: <strong>{wateredAt}</strong></p>}
      {replantedAt && <p>Ostatnie przesadzanie: <strong>{replantedAt}</strong></p>}
      {wateringInterval && <p>Interwał podlewania: <strong>{wateringInterval}</strong></p>}
      <br />
      <p>
        <Link to="/flower">Go back to list</Link>
      </p>
    </>
  );
};
