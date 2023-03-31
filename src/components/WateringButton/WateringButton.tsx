import React, { FormEvent, useEffect, useState } from 'react';
import './WateringButton.css';
import { checkWateringDate } from '../../utils/checkWateringDate';
import { addDays } from '../../utils/addDays';

interface Props {
  id: string | undefined;
  nextWateringAt: string;
  wateringInterval: number;
  dateChange: () => string,
  changeColor?: (fontColor: string) => void,
}

export const WateringButton = (props: Props) => {
  const {
    nextWateringAt, id, wateringInterval, dateChange, changeColor,
  } = props;
  const [color, setColor] = useState('black');
  const [nextWateringDate, setNextWateringDate] = useState(nextWateringAt);

  useEffect(() => {
    const fontColor = checkWateringDate(nextWateringAt as string);
    setColor(fontColor);
    if (changeColor) {
      changeColor(fontColor);
    }
  }, [nextWateringAt]);

  const updatedWateringDate = async (e: FormEvent) => {
    dateChange();
    setNextWateringDate(addDays(new Date(), wateringInterval).toLocaleDateString('fr-CH'));
    setColor('black');
    if (changeColor) {
      changeColor('black');
    }

    e.preventDefault();
    await fetch(`http://localhost:3001/flower/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        wateredAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
      }),
    });
  };

  return (
    <>
      <p style={{ color }}>{nextWateringDate}</p>
      <button className="btn" type="submit" onClick={updatedWateringDate}>
        <img
          className="btn-img"
          src="/assets/styles/icons/watering-plants.png"
          alt="Podlej"
        />Podlano
      </button>
    </>

  );
};
