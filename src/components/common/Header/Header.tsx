import React from 'react';
import './Header.css';
import { GoBackButton } from '../GoBackButton/GoBackButton';

interface Props {
  goBack: boolean;
}

export function Header(props: Props) {
  const { goBack } = props;
  return (
    <div className="main-header-wrapper">
      <h1 className="main-header">Twoje kwiaty</h1>
      <GoBackButton goBack={goBack} />
    </div>
  );
}
