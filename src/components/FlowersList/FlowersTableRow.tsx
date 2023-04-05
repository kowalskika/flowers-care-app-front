import React, { useState } from 'react';
import { FlowerEntity } from 'types';
import { Link } from 'react-router-dom';
import { DeleteButton } from '../common/DeleteButton/DeleteButton';
import { WateringButton } from '../WateringButton/WateringButton';
import { InfoButton } from '../common/InfoButton/InfoButton';

interface Props {
  flower: FlowerEntity;
  onFlowerChange: () => void
}

export const FlowersTableRow = (props: Props) => {
  const { flower, onFlowerChange } = props;
  const {
    id, name, species, wateredAt, nextWateringAt, wateringInterval,
  } = flower;
  const [wateredAtNewDate, setWateredAtNewDate] = useState(wateredAt);

  const dateChange = () => {
    const newDate = new Date().toLocaleDateString('fr-CH');
    setWateredAtNewDate(newDate);
    return newDate;
  };

  return (
    <tr>
      <th>
        <Link to={`/flower/${id}`}>
          {name}
        </Link>
      </th>
      <td>
        <p>{species}</p>
      </td>
      <td>
        <p>{wateredAtNewDate as string}</p>
      </td>
      <td>
        <WateringButton id={id} nextWateringAt={nextWateringAt} wateringInterval={wateringInterval} dateChange={dateChange} />
      </td>

      <td>
        <InfoButton id={id as string} />
        <DeleteButton flower={{ id, name }} onFlowerChange={onFlowerChange} />
      </td>
    </tr>
  );
};
