import React, { FormEvent, useState } from 'react';
import { CreateFlowerReq, FlowerUpdateForm } from 'types';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '../common/Spinner/Spinner';
import './AddFlowerForm.css';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';
import { useAuth } from '../../hooks/useAuth';
import { AddButton } from '../common/AddButton/AddButton';

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
  const [flowerId, setFlowerId] = useState<string | null>(null);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const todayInputValue = new Date().toISOString().split('T')[0];
  const updateForm = (key: FlowerUpdateForm, value: string) => {
    setForm((prevForm) => ({
      ...prevForm,
      [key]: value,
    }));
  };

  const sendForm = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFlowerId(null);
    try {
      const { data } = await axiosPrivate.post('flower', { ...form, userId: auth?.id });
      setLoading(false);
      setFlowerId(data.id);
    } finally {
      setLoading(false);
    }
  };

  if (loading) { return <Spinner />; }
  if (flowerId !== null) {
    navigate('/flower');
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
                  max={todayInputValue}
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
                  max={todayInputValue}
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
                  max={todayInputValue}
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
      <AddButton confirm />
    </form>
  );
};
