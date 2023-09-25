import React from 'react';
import TakePicture from './page/takePicture';
import Home from './component/home';
import Contents from './component/contents/contents';
import Contentsdetails from './component/contents/contentsdetails';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout/layout';
import MainContents from './page/mainContents';
import YouTubeList from './page/youtubeList'; // YouTubeList 컴포넌트 임포트

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
          <Route path="MainContents" element={<MainContents />} />
          {/* <Route path="choiceYoutube" element={/>} /> */}
          {/* <Route path="choiceBook" element={<Contents />} /> */}

          <Route path="choiceContents">
            <Route index element={<MainContents />} />
          </Route>
          <Route path="/youtubeList" element={<YouTubeList videoId="6VEnTQ2rx_4" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
