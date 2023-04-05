import React from 'react';
import { SlInfo } from 'react-icons/sl';

import './InfoButton.css';

export const InfoButton = (props: { id: string }) => {
  const { id } = props;
  return (
    <a className="InfoButton__a" href={`/flower/${id}`}>
      <SlInfo />Szczegóły
    </a>
  );
};
