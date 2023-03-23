import React from 'react';
import { FlowerEntity } from 'types';
import { Link } from 'react-router-dom';
import { DeleteButton } from '../DeleteButton/DeleteButton';

interface Props {
  flower: FlowerEntity;
  onFlowerChange: () => void
}

export const FlowersTableRow = (props: Props) => {
  const { flower, onFlowerChange } = props;
  return (
    <tr>
      <th>
        <Link to={`/flowers/${flower.id}`}>
          {flower.name}
        </Link>
      </th>
      <td>
        <p>{flower.species}</p>
      </td>
      <td>
        <button type="submit">
          Podlej
        </button>
      </td>
      <td>
        <DeleteButton flower={flower} onFlowerChange={onFlowerChange} />
      </td>
    </tr>
  );
};
