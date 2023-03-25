import React from 'react';
import { FlowerEntity } from 'types';
import { OneTableRow } from '../OneTableRow/OneTableRow';

interface Props {
  flowerInfo: FlowerEntity;
}

export const OneFlowerTable = (props: Props) => {
  const {
    id, name, fertilizedAt, info, replantedAt, species, wateredAt, wateringInterval,
  } = props.flowerInfo;
  return (
    <>
      <h1>{name}</h1>
      <table className="one-flower-table">
        <tbody>
          <OneTableRow
            name="Nazwa"
            variable={name}
          />
          <OneTableRow
            name="Gatunek"
            variable={species}
          />
          <OneTableRow
            name="Data ostatniego podlania:"
            variable={wateredAt}
          />
          <OneTableRow
            name="Interwał podlewania:"
            variable={wateringInterval}
          />
          <OneTableRow
            name="Data następnego podlewania:"
            variable="tu musisz dać funkcje"
          />
          {replantedAt && (
          <OneTableRow
            name="Data ostatniego przesadzania:"
            variable={replantedAt}
          />
          )}
          {fertilizedAt && (
          <OneTableRow
            name="Data ostatniego nawożenia:"
            variable={fertilizedAt}
          />
          )}
          {info && (
          <OneTableRow
            name="Informacje dodatkowe:"
            variable={info}
          />
          )}
        </tbody>
      </table>)
    </>
  );
};
