import React, { MouseEvent, useState } from 'react';
import { SlTrash } from 'react-icons/sl';

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
  const [confirm, setConfirm] = useState(false);

  const deleteFlower = async (e: MouseEvent) => {
    e.preventDefault();
    try {
      if (!confirm) {
        setConfirm(true);
        return;
      }
      if (auth) {
        const res = await axiosPrivate.delete(`flower/${props.flower.id}?user=${auth.id}`);
        if ([400, 404].includes(res.status)) {
          navigate('/404');
        }
        setConfirm(false);
      }
    } catch (err) {
      navigate('/error');
    }

    props.onFlowerChange();
  };
  return (
    <button type="submit" className={`DeleteButton__btn ${confirm ? 'DeleteButton__btn--confirm' : ''}`} onClick={deleteFlower}>
      { !confirm
        ? <><SlTrash />Usuń</>
        : <><SlTrash />Potwierdź</>}
    </button>
  );
};
