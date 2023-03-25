import React from 'react';
import { FlowerEntity } from 'types';
import { OneFlowerTableRow } from './OneFlowerTableRow';
import './OneFlowerTable.css';

interface Props {
  flowerInfo: FlowerEntity;
}

export const OneFlowerTable = (props: Props) => {
  const {
    name, fertilizedAt, info, replantedAt, species, wateredAt, wateringInterval, nextWateringAt,
  } = props.flowerInfo;

  return (
    <>
      <h1>{`${name} - szczegóły`}</h1>
      <table className="one-flower-table">
        <tbody>
          <OneFlowerTableRow
            name="Nazwa"
            variable={name}
          />
          <OneFlowerTableRow
            name="Gatunek"
            variable={species}
          />
          <OneFlowerTableRow
            name="Data ostatniego podlania"
            variable={wateredAt.slice(0, 10)}
          />
          <OneFlowerTableRow
            name="Interwał podlewania"
            variable={`${wateringInterval} dni`}
          />
          <OneFlowerTableRow
            name="Data następnego podlewania"
            variable={nextWateringAt}
          />
          {replantedAt && (
          <OneFlowerTableRow
            name="Data ostatniego przesadzania"
            variable={replantedAt.slice(0, 10)}
          />
          )}
          {fertilizedAt && (
          <OneFlowerTableRow
            name="Data ostatniego nawożenia"
            variable={fertilizedAt.slice(0, 10)}
          />
          )}
          {info && (
          <OneFlowerTableRow
            name="Informacje dodatkowe"
            variable={info}
          />
          )}
        </tbody>
      </table>
    </>
  );
};
