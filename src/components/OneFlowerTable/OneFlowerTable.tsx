import React from 'react';
import { FlowerEntity } from 'types';
import { OneFlowerTableRow } from './OneFlowerTableRow';
import './OneFlowerTable.css';

interface Props {
  flowerInfo: FlowerEntity;
}

export const OneFlowerTable = (props: Props) => {
  const {
    id, name, fertilizedAt, info, replantedAt, species, wateredAt, wateringInterval, nextWateringAt,
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
            variable={wateredAt}
          />
          <OneFlowerTableRow
            name="Interwał podlewania"
            variable={`${wateringInterval} dni`}
          />
          <OneFlowerTableRow
            name="Data następnego podlewania"
            variable={nextWateringAt}
            nextWateringAt={nextWateringAt}
            wateringInterval={wateringInterval}
            id={id}
          />
          {replantedAt && (
          <OneFlowerTableRow
            name="Data ostatniego przesadzania"
            variable={replantedAt}
          />
          )}
          {fertilizedAt && (
          <OneFlowerTableRow
            name="Data ostatniego nawożenia"
            variable={fertilizedAt}
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
