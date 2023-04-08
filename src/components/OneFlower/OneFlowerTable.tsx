import React from 'react';

import { FlowerEntity } from 'types';
import { OneFlowerTableRow } from './OneFlowerTableRow';
import './OneFlowerTable.css';

interface Props {
  flowerInfo: FlowerEntity;
}

export const OneFlowerTable = ({ flowerInfo }: Props) => {
  const { name } = flowerInfo;

  return (
    <>
      <h1 className="OneFlowerTable__h1">{`${name} - szczegóły`}</h1>
      <table className="OneFlowerTable__table">
        <tbody>
          <OneFlowerTableRow
            flower={flowerInfo}
          />
        </tbody>
      </table>
    </>
  );
};
