import React, { FormEvent, useState } from 'react';
import { FlowerEntity, CreateFlowerReq, FlowerUpdateForm } from 'types';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '../common/Spinner/Spinner';
import './AddFlowerForm.css';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';
import { useAuth } from '../../hooks/useAuth';

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
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { auth } = useAuth();

  const updateForm = (key: FlowerUpdateForm, value: string) => {
    setForm((prevForm) => ({
      ...prevForm,
      [key]: value,
    }));
  };

  const sendForm = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log(auth?.id);
    try {
      const { data } = await axiosPrivate.post('flower', { ...form, userId: auth?.id });
      console.log(data);
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
