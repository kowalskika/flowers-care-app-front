import React, { MouseEvent } from 'react';
import './DeleteButton.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { useAxiosPrivate } from '../../../hooks/useAxiosPrivate';

interface Props {
  flower: {
    name: string,
    id: string | undefined,
  };
  onFlowerChange: () => void
}

export const DeleteButton = (props: Props) => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const deleteFlower = async (e: MouseEvent) => {
    e.preventDefault();
    if (!window.confirm(`Czy napewno chcesz usunąć ${props.flower.name}?`)) {
      return null;
    }
    try {
      if (auth) {
        const res = await axiosPrivate.delete(`flower/${props.flower.id}?user=${auth.id}`);
        if ([400, 500].includes(res.status)) {
          alert(`Wystąpił błąd: ${res}.`);
        }
      }
    } catch (err) {
      navigate('/error');
    }

    props.onFlowerChange();
  };
  return (
    <button type="submit" className="btn" onClick={deleteFlower}>
      <img className="btn-img" src="/assets/styles/icons/delete.png" alt="usuń kwiat" />Usuń
    </button>
  );
};
