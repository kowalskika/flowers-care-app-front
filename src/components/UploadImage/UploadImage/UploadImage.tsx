import React, { useState } from 'react';
import { UploadInput } from './UploadInput';
import './UploadImage.css';
import { Spinner } from '../../common/Spinner/Spinner';
import { useAuth } from '../../../hooks/useAuth';
import { useAxiosPrivate } from '../../../hooks/useAxiosPrivate';

export const UploadImage = (props: { flowerId: string, onStateChange(urls: string): void }) => {
  const { onStateChange } = props;
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const { flowerId } = props;
  const [loading, setLoading] = useState(false);
  const [uploadResponse, setUploadResponse] = useState('');

  const convertBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  async function uploadSingleImage(base64: any) {
    setLoading(true);
    try {
      setUploadResponse('');
      if (auth) {
        const res = await axiosPrivate.post(`http://localhost:3001/upload/${flowerId}?user=${auth.id}`, { image: base64 });
        onStateChange(res.data);
        setUploadResponse('Zdjęcie zostało dodane.');
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setUploadResponse('Wystąpił błąd. Spróbuj ponownie.');
    }
  }

  async function uploadMultipleImages(images: any) {
    setLoading(true);
    try {
      setUploadResponse('');
      if (auth) {
        const res = await axiosPrivate.post(`http://localhost:3001/upload/many/${flowerId}?user=${auth.id}`, { images });
        onStateChange(res.data);
        setUploadResponse('Zdjęcia zostały dodane.');
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setUploadResponse('Wystąpił błąd. Spróbuj ponownie.');
    }
  }

  const uploadImage = async (event: any) => {
    const { files } = event.target;
    if (files.length === 1) {
      const base64 = await convertBase64(files[0]);
      await uploadSingleImage(base64);
      return;
    }

    const base64s = [];
    for (let i = 0; i < files.length; i++) {
      let base = await convertBase64(files[i]);
      base64s.push(base);
    }
    await uploadMultipleImages(base64s);
  };

  return (
    <div className="UploadImage__box">
      <div>
        <h2 className="UploadImage__h2">
          Dodaj zdjęcia swoich roślin.
        </h2>
      </div>
      <div className="UploadImage__upload-box">
        {uploadResponse && (
        <div>
          <h2>{uploadResponse}</h2>
        </div>
        )}

        <div>
          {loading ? (
            <Spinner />
          ) : (
            <div className="UploadImg">
              <UploadInput uploadImage={uploadImage} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
