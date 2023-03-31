import React, { FormEvent, useState } from 'react';
import { FlowerEntity, CreateFlowerReq } from 'types';
import { Spinner } from '../common/Spinner/Spinner';
import './AddFlowerForm.css';

enum FlowerUpdateForm {
  name = 'name',
  wateredAt = 'wateredAt',
  info = 'info',
  species = 'species',
  replantedAt = 'replantedAt',
  fertilizedAt = 'fertilizedAt',
  wateringInterval = 'wateringInterval',
}

export const AddFlowerForm = () => {
  const [form, setForm] = useState<CreateFlowerReq>({
    name: '',
    wateredAt: '',
    info: '',
    species: '',
    isMailSent: false,
    replantedAt: '',
    fertilizedAt: '',
    wateringInterval: 1,
    nextWateringAt: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [resultInfo, setResultInfo] = useState<string | null>(null);
  const [flowerId, setFlowerId] = useState<string>('');

  const updateForm = (key: FlowerUpdateForm, value: any) => {
    setForm((prevForm) => ({
      ...prevForm,
      [key]: value,
    }));
  };

  const sendForm = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('http://localhost:3001/flower', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      const data: FlowerEntity = await res.json();
      setLoading(false);
      setResultInfo(`Kwiat ${data.name} został dodany z id: ${data.id}.`);
      setFlowerId(data.id as string);
    } finally {
      setLoading(false);
    }
  };

  if (loading) { return <Spinner />; }
  if (resultInfo !== null) {
    return (
      <div className="added-flower-info">
        <p>
          <strong>{resultInfo}</strong>
          <a className="btn" href={`/flower/${flowerId}`}><img className="btn-img" src="/assets/styles/icons/info.png" alt="szczegóły" />
            Szczegóły
          </a>
        </p>

      </div>
    );
  }
  return (
    <form onSubmit={sendForm}>
      <h2>Add flower</h2>
      <table className="one-flower-table">
        <tbody>
          <tr>
            <th>
              <label>Nazwa: <br />
                <input
                  required
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
                  required
                  type="date"
                  value={form.wateredAt as string}
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
                  required
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
        </tbody>
      </table>
      <button className="btn" type="submit"><img className="btn-img" src="/assets/styles/icons/add.png" alt="usuń kwiat" />Dodaj</button>
    </form>
  );
};
