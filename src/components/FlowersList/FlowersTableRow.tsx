import React from 'react';
import { FlowerEntity } from 'types';
import { Link } from 'react-router-dom';
import { DeleteButton } from '../common/DeleteButton/DeleteButton';
import { WateringButton } from '../WateringButton/WateringButton';

interface Props {
  flower: FlowerEntity;
  onFlowerChange: () => void
}

export const FlowersTableRow = (props: Props) => {
  const { flower, onFlowerChange } = props;
  const {
    id, name, species, wateredAt, nextWateringAt, wateringInterval,
  } = flower;
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
        <p>{wateredAt as string}</p>
      </td>
      <td>
        <WateringButton id={id} nextWateringAt={nextWateringAt} wateringInterval={wateringInterval} />
      </td>

      <td>
        <a className="btn" href={`/flower/${id}`}><img className="btn-img" src="/assets/styles/icons/info.png" alt="szczegóły" />
          Szczegóły
        </a>
        <DeleteButton flower={{ id, name }} onFlowerChange={onFlowerChange} />
      </td>
    </tr>
  );
};
