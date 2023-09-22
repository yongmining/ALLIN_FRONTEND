import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import TakePicture from './page/TakePiceture';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route index element={<TakePicture />} /> */}
          <Route path="takepicture" element={<TakePicture />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
