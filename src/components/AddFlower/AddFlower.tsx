import React, { FormEvent, useState } from 'react';
import { FlowerEntity, CreateFlowerReq } from 'types';
import { Spinner } from '../common/Spinner/Spinner';

export const AddFlower = () => {
  const [form, setForm] = useState<CreateFlowerReq>({
    name: '',
    wateredAt: '',
    info: '',
    species: '',
    isMailSent: false,
    replantedAt: '',
    fertilizedAt: '',
    wateringInterval: 0,
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
      const res = await fetch('http://localhost:3001/child', {
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
      <p>
        <label>Name: <br />
          <input
            type="text"
            value={form.name}
            onChange={(e) => updateForm('name', e.target.value)}
          />
        </label>
      </p>
      <button type="submit">Add</button>
    </form>
  );
};
