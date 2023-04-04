import React, { FormEvent, useState, useEffect } from 'react';
import { FlowerEntity } from 'types';
import { Spinner } from '../common/Spinner/Spinner';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';
import { useAuth } from '../../hooks/useAuth';

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
  const [form, setForm] = useState<any>({
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

  const updateForm = (key: FlowerUpdateForm, value: any) => {
    setForm((prevForm: any) => {
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
        <h2>Edytuj dane:</h2>
        <table className="one-flower-table">
          <tbody>
            <tr>
              <th>
                <label>Nazwa: <br />
                  <input
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
                    type="date"
                    value={form.replantedAt}
                    onChange={(e) => updateForm(FlowerUpdateForm.replantedAt, e.target.value)}
                  />
                </label>
              </th>
            </tr>
            <tr>
              <th>
                <label>Data ostatniego nawożenia: <br />
                  <input
                    type="date"
                    value={form.fertilizedAt}
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
          </tbody>
        </table>
        <button className="btn" type="submit"><img className="btn-img" src="/assets/styles/icons/diskette.png" alt="Zapisz" />Zapisz</button>
      </form>
    );
  }
  return <button className="btn" type="submit" onClick={() => setIsUpdated(false)}><img className="btn-img" src="/assets/styles/icons/edit.png" alt="Edytuj" />Edytuj</button>;
};
