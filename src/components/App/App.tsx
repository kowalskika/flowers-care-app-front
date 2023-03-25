import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { FlowersView } from '../../views/FlowersView';
import { NotFoundView } from '../../views/NotFoundView';
import { SingleFlowerView } from '../../views/SingleFlowerView';
import { AddFlowerView } from '../../views/AddFlowerView';

function App() {
  return (
    <Routes>
      <Route path="/flower/:flowerId" element={<SingleFlowerView />} />
      <Route path="/flower" element={<FlowersView />} />
      <Route path="/flower/form/add" element={<AddFlowerView />} />
      <Route path="*" element={<NotFoundView />} />
    </Routes>
  );
}

export default App;
