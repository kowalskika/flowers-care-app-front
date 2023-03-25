import React, { MouseEvent } from 'react';
import './DeleteButton.css';

interface Props {
  flower: {
    name: string,
    id: string | undefined,
  };
  onFlowerChange: () => void
}

export const DeleteButton = (props: Props) => {
  const deleteFlower = async (e: MouseEvent) => {
    e.preventDefault();
    if (!window.confirm(`Czy napewno chcesz usunąć ${props.flower.name}?`)) {
      return null;
    }
    const res = await fetch(`http://localhost:3001/flower/${props.flower.id}`, {
      method: 'DELETE',
    });
    if ([400, 500].includes(res.status)) {
      const err = await res.json();
      alert(`Wystąpił błąd: ${err.message}.`);
    }

    props.onFlowerChange();
  };
  return (
    <button type="submit" onClick={deleteFlower}>
      <img className="btn delete" src="/assets/styles/icons/delete.png" alt="usuń kwiat" />
      Usuń
    </button>
  );
};
