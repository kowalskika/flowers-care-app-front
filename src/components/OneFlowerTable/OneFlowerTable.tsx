import React from 'react';
import { FlowerEntity } from 'types';
import { OneTableRow } from '../OneTableRow/OneTableRow';
import './OneFlowerTable.css';

interface Props {
  flowerInfo: FlowerEntity;
}

export const OneFlowerTable = (props: Props) => {
  function addDays(date: Date, days: number) {
    const copy = new Date(Number(date));
    copy.setDate(date.getDate() + days);
    return copy;
  }

  const {
    id, name, fertilizedAt, info, replantedAt, species, wateredAt, wateringInterval,
  } = props.flowerInfo;
  return (
    <>
      <h1>{`${name} - szczegóły`}</h1>
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
            name="Data ostatniego podlania"
            variable={wateredAt.slice(0, 10)}
          />
          <OneTableRow
            name="Interwał podlewania"
            variable={`${wateringInterval} dni`}
          />
          <OneTableRow
            name="Data następnego podlewania"
            variable={(addDays(new Date(wateredAt), Number(wateringInterval)).toJSON().slice(0, 10))}
          />
          {replantedAt && (
          <OneTableRow
            name="Data ostatniego przesadzania"
            variable={replantedAt.slice(0, 10)}
          />
          )}
          {fertilizedAt && (
          <OneTableRow
            name="Data ostatniego nawożenia"
            variable={fertilizedAt.slice(0, 10)}
          />
          )}
          {info && (
          <OneTableRow
            name="Informacje dodatkowe"
            variable={info}
          />
          )}
        </tbody>
      </table>
    </>
  );
};
