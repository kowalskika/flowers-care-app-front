import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { FlowersView } from '../../views/FlowersView';
import { NotFoundErrorView } from '../../views/ErrorViews/NotFoundErrorView';
import { SingleFlowerView } from '../../views/SingleFlowerView';
import { AddFlowerView } from '../../views/AddFlowerView';
import { ErrorView } from '../../views/ErrorViews/ErrorView';
import { SettingsView } from '../../views/SettingsView/SettingsView';
import { RequireAuth } from '../RequireAuth/RequireAuth';
import { Auth } from '../Auth/Auth';
import { EmailEditor } from '../EmailEditor/EmailEditor';
import { PasswordEditor } from '../PasswordEditor/PasswordEditor';
import { AllowMailEditor } from '../AllowMailEditor/AllowMailEditor';
import { AuthProvider } from '../../context/AuthProvider';

export const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="error" element={<ErrorView />} />
        <Route path="login" element={<Auth />} />
        <Route path="register" element={<Auth />} />
        <Route path="*" element={<NotFoundErrorView />} />
        <Route path="404" element={<NotFoundErrorView />} />
        <Route path="/" element={<RequireAuth />}>
          <Route path="settings" element={<SettingsView />}>
            <Route path="email" element={<EmailEditor />} />
            <Route path="allowMail" element={<AllowMailEditor />} />
            <Route path="password" element={<PasswordEditor />} />
          </Route>
          <Route path="/" element={<Navigate to="flower" />} />
          <Route path="flower/:flowerId" element={<SingleFlowerView />} />
          <Route path="flower" element={<FlowersView />} />
          <Route path="flower/form/add" element={<AddFlowerView />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};
