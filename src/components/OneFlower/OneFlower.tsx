import React, { useEffect, useState } from 'react';
import { FlowerEditForm, FlowerEntity, FlowerEntityRes } from 'types';
import { useNavigate, useParams } from 'react-router-dom';
import { AxiosError } from 'axios';

import './OneFlower.css';
import { SlTrash } from 'react-icons/sl';
import { Spinner } from '../common/Spinner/Spinner';
import { OneFlowerTable } from './OneFlowerTable';
import { EditFlowerForm } from '../EditFlowerForm/EditFlowerForm';
import { dateStringToFormDateInput } from '../../utils/dateStringToDateFormInput';
import { useAuth } from '../../hooks/useAuth';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';
import { UploadImage } from '../UploadImage/UploadImage/UploadImage';

export const OneFlower = () => {
  const { auth } = useAuth();
  const { flowerId } = useParams();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const [confirm, setConfirm] = useState(false);

  const flowerInfoForm = {
    name: '',
    wateredAt: '',
    info: '',
    species: '',
    replantedAt: '',
    fertilizedAt: '',
    wateringInterval: 0,
    nextWateringAt: '',
    photosUrl: '[]',
  };

  const [flowerInfo, setFlowerInfo] = useState<FlowerEntity | null>(null);
  const [flowerInfoToEditForm, setFlowerInfoToEditForm] = useState<FlowerEditForm>(flowerInfoForm);
  const [photos, setPhotos] = useState<string[]>(['']);
  const handleChildStateChange = (urls: string) => {
    setPhotos(urls[0] ? urls : flowerInfo?.photosUrl[0] ? JSON.parse(flowerInfo.photosUrl as string) : []);
  };

  const deleteImg = async (key: string) => {
    try {
      if (!confirm) {
        setConfirm(true);
        return;
      }
      if (auth) {
        const photoId = key.replace('https://res.cloudinary.com/dkcqqmbge/image/upload/', '').replace('/', '*');
        const { data } = await axiosPrivate.delete(`upload/${flowerId}/${photoId}?user=${auth.id}`);
        setPhotos(data);
        setConfirm(false);
      }
    } catch (err) {
      navigate('/error');
    }
  };

  const refreshFlowerList = async () => {
    setFlowerInfo(null);
    setFlowerInfoToEditForm(flowerInfoForm);

    try {
      if (auth) {
        const { data } = (await axiosPrivate.get(`flower/${flowerId}?user=${auth.id}`)) as FlowerEntityRes;
        setFlowerInfo(data);
        setFlowerInfoToEditForm(data);
        setPhotos(data.photosUrl[0] ? JSON.parse(data.photosUrl as string) : []);
        setFlowerInfoToEditForm((prev) => {
          return (
            {
              ...prev,
              replantedAt:
                prev.replantedAt ? dateStringToFormDateInput(prev.replantedAt) : null,
              wateredAt:
                dateStringToFormDateInput(prev.wateredAt),
              fertilizedAt:
                prev.fertilizedAt !== null ? dateStringToFormDateInput(prev.fertilizedAt as string) : null,
            });
        });
      }
    } catch (err) {
      console.log(err);
      const { response } = err as AxiosError;
      if (response !== undefined && response.status === 404) {
        navigate('/404');
      } else {
        navigate('/error');
      }
    }
  };

  useEffect(() => {
    (async () => refreshFlowerList())();
  }, [auth, setFlowerInfo, axiosPrivate, setPhotos]);

  if (flowerInfo === null) return <Spinner />;

  return (
    <>
      <OneFlowerTable flowerInfo={flowerInfo} />
      <br />
      <div className="OneFlower__EditFlower-container">
        <EditFlowerForm flower={flowerInfoToEditForm as FlowerEntity} refreshFlowerList={refreshFlowerList} />
      </div>
      {photos[0] && (
        <ul>
          {photos.map((el: string) => {
            return (
              <li key={el}>
                <div className="OneFlower__img">
                  <button className={`OneFlower__btn ${confirm ? 'OneFlower__btn--confirm' : ''}`} type="submit" onClick={() => deleteImg(el)}>
                    { !confirm
                      ? <><SlTrash />Usuń</>
                      : <><SlTrash />Potwierdź</>}
                  </button><img src={el} alt="zdjęcie" />
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <UploadImage flowerId={flowerId as string} onStateChange={handleChildStateChange} />
    </>
  );
};
