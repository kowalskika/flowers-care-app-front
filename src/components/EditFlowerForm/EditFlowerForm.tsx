import React, { FormEvent, useState, useEffect } from 'react';
import { SlRocket, SlPencil } from 'react-icons/sl';
import { FlowerEditForm, FlowerEntity } from 'types';
import { Spinner } from '../common/Spinner/Spinner';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';
import { useAuth } from '../../hooks/useAuth';
import './EditFlowerForm.css';

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
  });

  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [isUpdated, setIsUpdated] = useState<boolean>(true);

  useEffect(() => {
    setForm({
      name: flower.name,
      wateredAt: flower.wateredAt,
      info: flower.info,
      species: flower.species,
      replantedAt: flower.replantedAt,
      fertilizedAt: flower.fertilizedAt,
      wateringInterval: flower.wateringInterval,
      nextWateringAt: flower.nextWateringAt,
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
                    max={todayInputValue}
                    type="date"
                    value={form.wateredAt}
                    onChange={(e) => updateForm(FlowerUpdateForm.wateredAt, e.target.value)}
                  />
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
                  <button className="EditButton__a" type="submit">
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
  return <button className="EditButton__a" type="submit" onClick={() => setIsUpdated(false)}><SlPencil />Edytuj</button>;
};
