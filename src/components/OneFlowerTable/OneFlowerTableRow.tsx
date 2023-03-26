import React, { useEffect, useState } from 'react';
import './OneFlowerTableRow.css';
import { WateringButton } from '../WateringButton/WateringButton';
import { checkWateringDate } from '../../utils/checkWateringDate';

interface Props {
  id?: string;
  name: string;
  variable: string | undefined;
  nextWateringAt?: string | undefined;
  wateringInterval?: number;
}
export function OneFlowerTableRow(props: Props) {
  const [color, setColor] = useState('black');
  const {
    id, name, variable, nextWateringAt, wateringInterval,
  } = props;
  useEffect(() => {
    const fontColor = checkWateringDate(nextWateringAt as string);
    setColor(fontColor);
  }, [nextWateringAt]);
  return (
    <tr>
      <th>{ name }:</th>
      <td><p style={{ color }}>{!nextWateringAt && variable }</p> {nextWateringAt && <WateringButton id={id} wateringInterval={wateringInterval as number} nextWateringAt={nextWateringAt} />} </td>
    </tr>
  );
}
