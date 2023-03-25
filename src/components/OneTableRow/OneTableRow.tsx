import React from 'react';

interface Props {
  name: string;
  variable: string | number | undefined;
}
export function OneTableRow(props: Props) {
  const { name, variable } = props;
  return (
    <tr>
      <th>{ name }:</th>
      <td>{ variable }</td>
    </tr>
  );
}
