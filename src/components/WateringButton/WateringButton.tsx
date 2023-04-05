import React, { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { SlDrop } from 'react-icons/sl';

import { checkWateringDate } from '../../utils/checkWateringDate';
import { addDays } from '../../utils/addDays';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';
import { useAuth } from '../../hooks/useAuth';
import './WateringButton.css';

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
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fontColor = checkWateringDate(nextWateringAt as string);
    setColor(fontColor);
    if (changeColor) {
      changeColor(fontColor);
    }
  }, [nextWateringAt]);

  const updatedWateringDate = async (e: FormEvent) => {
    e.preventDefault();
    dateChange();
    setColor('black');
    setNextWateringDate(
      addDays(new Date(), wateringInterval).toLocaleDateString('fr-CH'),
    );
    if (changeColor) {
      changeColor('black');
    }

    try {
      await axiosPrivate.patch(
        `flower/${id}`,
        {
          wateredAt: new Date().toISOString().slice(0, 19).replace('T', ' '), userId: auth?.id,
        },
      );
    } catch (err) {
      const { response } = err as AxiosError;
      navigate(response?.status === 404 ? '/404' : '/error');
    }
  };

  return (
    <>
      <p style={{ color }}>{nextWateringDate}</p>
      <button className="WateringButton__button" type="submit" onClick={updatedWateringDate}>
        <SlDrop />Podlej
      </button>
    </>

  );
};
