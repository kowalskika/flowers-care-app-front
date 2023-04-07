import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { FlowersView } from '../../views/FlowersView';
import { NotFoundErrorView } from '../../views/ErrorViews/NotFoundErrorView';
import { SingleFlowerView } from '../../views/SingleFlowerView';
import { AddFlowerView } from '../../views/AddFlowerView';
import { Auth } from '../Auth/Auth';
import { AuthProvider } from '../../context/AuthProvider';
import { ErrorView } from '../../views/ErrorViews/ErrorView';
import { RequireAuth } from '../RequireAuth/RequireAuth';
import { SettingsView } from '../../views/SettingsView/SettingsView';
import { EmailEditor } from '../EmailEditor/EmailEditor';
import { PasswordEditor } from '../PasswordEditor/PasswordEditor';
import { AllowMailEditor } from '../AllowMailEditor/AllowMailEditor';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="error" element={<ErrorView />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth />} />
        <Route path="*" element={<NotFoundErrorView />} />
        <Route path="404" element={<NotFoundErrorView />} />
        <Route path="/" element={<RequireAuth />}>
          <Route path="settings" element={<SettingsView />}>
            <Route path="email" element={<EmailEditor />} />
            <Route path="allowMail" element={<AllowMailEditor />} />
            <Route path="password" element={<PasswordEditor />} />
          </Route>
          <Route path="/" element={<Navigate to="/flower" />} />
          <Route path="/flower/:flowerId" element={<SingleFlowerView />} />
          <Route path="/flower" element={<FlowersView />} />
          <Route path="/flower/form/add" element={<AddFlowerView />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
