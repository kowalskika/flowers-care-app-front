import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { FlowersView } from '../../views/FlowersView';
import { NotFoundErrorView } from '../../views/ErrorViews/NotFoundErrorView';
import { SingleFlowerView } from '../../views/SingleFlowerView';
import { AddFlowerView } from '../../views/AddFlowerView';
import { Auth } from '../Auth/Auth';
import { AuthProvider } from '../../context/AuthProvider';
import { ErrorView } from '../../views/ErrorViews/ErrorView';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="error" element={<ErrorView />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth />} />
        <Route path="/" element={<Navigate to="/flower" />} />
        <Route path="/flower/:flowerId" element={<SingleFlowerView />} />
        <Route path="/flower" element={<FlowersView />} />
        <Route path="/flower/form/add" element={<AddFlowerView />} />
        <Route path="*" element={<NotFoundErrorView />} />
        <Route path="404" element={<NotFoundErrorView />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
