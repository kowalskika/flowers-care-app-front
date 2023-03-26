import React, { FormEvent, useState } from 'react';
import { FlowerEntity, CreateFlowerReq } from 'types';
import { Spinner } from '../common/Spinner/Spinner';

export const AddFlowerForm = () => {
  const [form, setForm] = useState<CreateFlowerReq>({
    name: '',
    wateredAt: '',
    info: '',
    species: '',
    isMailSent: false,
    replantedAt: '',
    fertilizedAt: '',
    wateringInterval: 0,
    nextWateringAt: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [resultInfo, setResultInfo] = useState<string | null>(null);

  const updateForm = (key: string, value: any) => {
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
      setResultInfo(`${data.name} added with ${data.id}.`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) { return <Spinner />; }
  if (resultInfo !== null) {
    return (
      <div>
        <p><strong>{resultInfo}</strong></p>
        <button type="submit" onClick={() => setResultInfo(null)}>Add another child</button>
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
                  type="text"
                  value={form.name}
                  onChange={(e) => updateForm('name', e.target.value)}
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
                  onChange={(e) => updateForm('species', e.target.value)}
                />
              </label>
            </th>
          </tr>
          <tr>
            <th>
              <label>Data ostatniego podlania: <br />
                <input
                  type="date"
                  value={form.wateredAt as string}
                  onChange={(e) => updateForm('wateredAt', e.target.value)}
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
                  onChange={(e) => updateForm('wateringInterval', e.target.value)}
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
                  onChange={(e) => updateForm('replantedAt', e.target.value)}
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
                  onChange={(e) => updateForm('fertilizedAt', e.target.value)}
                />
              </label>
            </th>
          </tr>
          <tr>
            <th>
              <label>Dodatkowe informacje: <br />
                <textarea
                  value={form.info}
                  onChange={(e) => updateForm('info', e.target.value)}
                />
              </label>
            </th>
          </tr>
        </tbody>
      </table>
      <button type="submit">Add</button>
    </form>
  );
};
