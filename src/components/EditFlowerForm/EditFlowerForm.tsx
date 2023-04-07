import React, { FormEvent, useState, useEffect } from 'react';
import { SlRocket, SlPencil, SlClose } from 'react-icons/sl';
import { FlowerEditForm, FlowerEntity } from 'types';
import { Spinner } from '../common/Spinner/Spinner';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';
import { useAuth } from '../../hooks/useAuth';
import './EditFlowerForm.css';
import { useFlowerValidation } from '../../hooks/useFormValidation';

enum FlowerUpdateForm {
  name = 'name',
  wateredAt = 'wateredAt',
  info = 'info',
  species = 'species',
  replantedAt = 'replantedAt',
  fertilizedAt = 'fertilizedAt',
  wateringInterval = 'wateringInterval',
}

type EditFlowerFormProps = {
  flower: FlowerEntity;
  refreshFlowerList: () => void;
};

export const EditFlowerForm = ({ flower, refreshFlowerList }: EditFlowerFormProps) => {
  const todayInputValue = new Date().toISOString().split('T')[0];
  const [form, setForm] = useState<FlowerEditForm>({
    name: flower.name,
    wateredAt: flower.wateredAt,
    info: flower.info,
    species: flower.species,
    replantedAt: flower.replantedAt,
    fertilizedAt: flower.fertilizedAt,
    wateringInterval: flower.wateringInterval,
    nextWateringAt: flower.nextWateringAt,
    photosUrl: flower.photosUrl,
  });
  const { nameError } = useFlowerValidation({ name: form.name });

  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [isUpdated, setIsUpdated] = useState<boolean>(true);

  useEffect(() => {
    setForm({
      name: flower.name,
      wateredAt: flower.wateredAt,
      info: flower.info ? flower.info : '',
      species: flower.species ? flower.species : '',
      replantedAt: flower.replantedAt ? flower.replantedAt : '',
      fertilizedAt: flower.fertilizedAt ? flower.fertilizedAt : '',
      wateringInterval: flower.wateringInterval,
      nextWateringAt: flower.nextWateringAt,
      photosUrl: flower.photosUrl ? flower.photosUrl : '[]',
    });
  }, [flower]);

  const updateForm = (key: FlowerUpdateForm, value: string | number | Date) => {
    setForm((prevForm) => {
      return {
        ...prevForm,
        [key]:
        value,
      };
    });
  };

  const sendForm = async (e: FormEvent) => {
    e.preventDefault();
    if (nameError) {
      return;
    }
    setLoading(true);

    try {
      await axiosPrivate.put(
        `flower/${flower.id}`,
        {
          ...form, userId: auth?.id,
        },
      );
      setLoading(false);
      setIsUpdated(true);
    } finally {
      setLoading(false);
      refreshFlowerList();
    }
  };

  if (loading) {
    return <Spinner />;
  }
  if (!isUpdated) {
    return (
      <form onSubmit={sendForm}>
        <h1>Edytuj dane:</h1>
        <table className="one-flower-table">
          <tbody className="EditFlowerForm__tbody">
            <tr>
              <th>
                <label>Nazwa: <br />
                  <input
                    className="EditFlowerForm__big-input"
                    type="text"
                    value={form.name}
                    onChange={(e) => updateForm(FlowerUpdateForm.name, e.target.value)}
                  />
                  { (nameError || !form.name) && (
                    <>
                      <span><SlClose /></span>
                      <p>Nazwa powinna zawierać od 3 do 100 znaków.</p>
                    </>
                  ) }
                </label>
              </th>
            </tr>
            <tr>
              <th>
                <label>Gatunek: <br />
                  <input
                    className="EditFlowerForm__big-input"
                    type="text"
                    value={form.species}
                    onChange={(e) => updateForm(FlowerUpdateForm.species, e.target.value)}
                  />
                </label>
              </th>
            </tr>
            <tr>
              <th>
                <label>Data ostatniego podlania: <br />
                  <input
                    required
                    max={todayInputValue}
                    type="date"
                    value={form.wateredAt}
                    onChange={(e) => updateForm(FlowerUpdateForm.wateredAt, e.target.value)}
                  />
                  { (!form.wateredAt) && (
                    <>
                      <span><SlClose /></span>
                      <p>Proszę uzupełnić datę ostatniego podalnia.</p>
                    </>
                  ) }
                </label>
              </th>
            </tr>
            <tr>
              <th>
                <label>Interwał podlewania: <br />
                  <input
                    min={1}
                    type="number"
                    value={form.wateringInterval}
                    onChange={(e) => updateForm(FlowerUpdateForm.wateringInterval, e.target.value)}
                  />
                </label>
              </th>
            </tr>
            <tr>
              <th>
                <label>Data ostatniego przesadzania: <br />
                  <input
                    max={todayInputValue}
                    type="date"
                    value={form.replantedAt as string}
                    onChange={(e) => updateForm(FlowerUpdateForm.replantedAt, e.target.value)}
                  />
                </label>
              </th>
            </tr>
            <tr>
              <th>
                <label>Data ostatniego nawożenia: <br />
                  <input
                    max={todayInputValue}
                    type="date"
                    value={form.fertilizedAt as string}
                    onChange={(e) => updateForm(FlowerUpdateForm.fertilizedAt, e.target.value)}
                  />
                </label>
              </th>
            </tr>

            <tr>
              <th>
                <label>Dodatkowe informacje: <br />
                  <textarea
                    value={form.info}
                    onChange={(e) => updateForm(FlowerUpdateForm.info, e.target.value)}
                  />
                </label>
              </th>
            </tr>
            <tr>
              <th>
                <div className="EditFlowerForm__container">
                  <button
                    className="EditButton__a"
                    type="submit"
                    disabled={nameError || !form.name || !form.wateredAt}
                  >
                    <SlRocket />Zapisz
                  </button>
                </div>
              </th>
            </tr>
          </tbody>
        </table>
      </form>
    );
  }
  return (
    <button
      id="button1"
      className="EditButton__a"
      type="submit"
      onClick={() => setIsUpdated(false)}
    ><SlPencil />Edytuj
    </button>
  );
};
