import React, { useState } from 'react';
import './OneFlowerTableRow.css';
import { FlowerEntity } from 'types';
import { WateringButton } from '../WateringButton/WateringButton';

interface Props {
  flower: FlowerEntity,
}
export function OneFlowerTableRow({ flower }: Props) {
  const {
    id, name, fertilizedAt, info, replantedAt, species, wateredAt, wateringInterval, nextWateringAt,
  } = flower;

  const [color, setColor] = useState('black');
  const [wateredAtNewDate, setWateredAtNewDate] = useState(wateredAt);

  const dateChange = () => {
    setWateredAtNewDate(new Date().toLocaleDateString('fr-CH'));
  };

  const changeColor = (fontColor: string) => {
    setColor(fontColor);
  };

  return (
    <>
      <tr>
        <th>Nazwa:</th>
        <td>{name} </td>
      </tr>
      <tr>
        <th>Gatunek:</th>
        <td>{species} </td>
      </tr>
      <tr>
        <th>Data ostatniego podlania:</th>
        <td>{wateredAtNewDate} </td>
      </tr>
      <tr>
        <th>Interwał podlewania:</th>
        <td>{wateringInterval} </td>
      </tr>
      <tr>
        <th><p style={{ color }}>Data następnego podlewania:</p></th>
        <td><WateringButton id={id} wateringInterval={wateringInterval as number} nextWateringAt={nextWateringAt} dateChange={dateChange} changeColor={changeColor} /></td>
      </tr>
      {wateredAt && (
      <tr>
        <th>Data ostatniego przesadzania:</th>
        <td>{replantedAt} </td>
      </tr>
      )}
      {fertilizedAt && (
      <tr>
        <th>Data ostatniego nawożenia:</th>
        <td>{fertilizedAt} </td>
      </tr>
      )}
      {info && (
      <tr>
        <th>Informacje dodatkowe:</th>
        <td>{info} </td>
      </tr>
      )}
    </>
  );
}
