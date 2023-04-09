import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SlClose } from 'react-icons/sl';

import { CreateFlowerReq, FlowerUpdateForm } from 'types';
import { Spinner } from '../common/Spinner/Spinner';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';
import { useAuth } from '../../hooks/useAuth';
import { AddButton } from '../common/AddButton/AddButton';
import { useFlowerValidation } from '../../hooks/useFormValidation';
import './AddFlowerForm.css';

export const AddFlowerForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [flowerId, setFlowerId] = useState<string | null>(null);
  const [form, setForm] = useState<CreateFlowerReq>({
    name: '',
    wateredAt: '',
    info: '',
    species: '',
    replantedAt: '',
    fertilizedAt: '',
    wateringInterval: 1,
    nextWateringAt: '',
  });

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const todayInputValue = new Date().toISOString().split('T')[0];
  const nameError = useFlowerValidation(form.name);

  const updateForm = (key: FlowerUpdateForm, value: string) => {
    setForm((prevForm) => ({
      ...prevForm,
      [key]: value,
    }));
  };

  const sendForm = async (e: FormEvent) => {
    e.preventDefault();
    if (nameError) {
      return;
    }
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

  if (loading) return <Spinner />;

  if (flowerId !== null) {
    navigate('/flower');
  }
  return (
    <form onSubmit={sendForm}>
      <h1 className="AddFlowerForm__h1">Dodaj nowy kwiat</h1>
      <table className="AddFlowerForm__table">
        <tbody className="AddFlowerForm__tbody">
          <tr>
            <th>
              <label>Nazwa: <br />
                <input
                  className="AddFlowerForm__big-input"
                  required
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
                  className="AddFlowerForm__big-input"
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
                { (!form.wateredAt) && (
                  <>
                    <span className="AddFlowerForm_date_span"><SlClose /></span>
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
          <tr>
            <th>
              <div className="EditFlowerForm__container">
                <AddButton nameError={nameError} name={form.name} wateredAt={form.wateredAt} confirm />
              </div>
            </th>
          </tr>
        </tbody>
      </table>
    </form>
  );
};
