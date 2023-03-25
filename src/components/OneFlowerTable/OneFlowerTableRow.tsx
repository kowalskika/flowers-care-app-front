import React from 'react';
import './OneFlowerTableRow.css';

interface Props {
  name: string;
  variable: string | number | undefined;
}
export function OneFlowerTableRow(props: Props) {
  const { name, variable } = props;
  return (
    <tr>
      <th>{ name }:</th>
      <td>{ variable }</td>
    </tr>
  );
}
