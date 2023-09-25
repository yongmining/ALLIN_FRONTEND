import React from 'react';
import TakePicture from './page/takePiceture';
import React from "react";
import Home from './component/home';
import Contents from './component/contents/contents';
import Contentsdetails from './component/contents/contentsdetails';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TakePicture from './page/TakePiceture';
import Layout from './layout/Layout';
import YouTubeList from './page/YouTubeList'; // YouTubeList 컴포넌트 임포트

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route index element={<MainPage />} /> */}
          <Route path="takepicture" element={<TakePicture />} />
          <Route path="/" element={<Home />} />
          <Route path="contents" element={<Contents />} />
          <Route path="contents/:id" element={<Contentsdetails />} />
          <Route path="/YouTubeList" element={<YouTubeList videoId="6VEnTQ2rx_4" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
