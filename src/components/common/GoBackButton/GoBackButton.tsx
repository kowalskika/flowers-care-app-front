import React from 'react';
import './GoBackButton.css';

interface Props {
  goBack: boolean;
}

export const GoBackButton = (props: Props) => {
  if (!props.goBack) {
    return null;
  }
  return (
    <div className="go-back">
      <a href="/flower">
        <img src="/assets/styles/icons/redo.png" alt="Powrót" />
      </a>
    </div>
  );
};
