import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { FlowersView } from '../../views/FlowersView';
import { NotFoundView } from '../../views/NotFoundView';
import { SingleFlowerView } from '../../views/SingleFlowerView';
import { AddFlowerView } from '../../views/AddFlowerView';
import { Auth } from '../Auth/Auth';
import { AuthProvider } from '../../context/AuthProvider';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth />} />
        <Route path="/" element={<Navigate to="/flower" />} />
        <Route path="/flower/:flowerId" element={<SingleFlowerView />} />
        <Route path="/flower" element={<FlowersView />} />
        <Route path="/flower/form/add" element={<AddFlowerView />} />
        <Route path="*" element={<NotFoundView />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
