import React from 'react';
import { FlowerEntity } from 'types';
import { Link } from 'react-router-dom';
import { DeleteButton } from '../common/DeleteButton/DeleteButton';

interface Props {
  flower: FlowerEntity;
  onFlowerChange: () => void
}

export const FlowersTableRow = (props: Props) => {
  const { flower, onFlowerChange } = props;
  const {
    id, name, species, wateredAt, nextWateringAt,
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
        <p>{wateredAt.slice(0, 10)}</p>
      </td>
      <td>
        <p>{nextWateringAt}</p>
        <button type="submit">
          Podlano
        </button>
      </td>

      <td>
        <DeleteButton flower={{ id, name }} onFlowerChange={onFlowerChange} />
      </td>
    </tr>
  );
};
