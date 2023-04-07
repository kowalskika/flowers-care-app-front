import React from 'react';
import { FlowerEntity } from 'types';
import { FlowersTableRow } from './FlowersTableRow';

interface Props {
  flowersList: FlowerEntity[];
  onFlowerChange: () => void
}

export const FlowersTable = (props: Props) => {
  const { flowersList, onFlowerChange } = props;
  return (
    <div className="FlowersTable-border-div">
      <table>
        <thead>
          <tr>
            <th>Nazwa</th>
            <th>Gatunek</th>
            <th>Data ostatniego podlewania</th>
            <th>Data następnego podlewania</th>
            <th className="FlowersTable__last-th">Opcje</th>
          </tr>
        </thead>
        <tbody>
          {
         flowersList.map((flower) => (
           <FlowersTableRow
             flower={flower}
             key={flower.id}
             onFlowerChange={onFlowerChange}
           />
         ))
       }
        </tbody>
      </table>
    </div>
  );
};
