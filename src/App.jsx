
import TakePicture from './page/takePiceture';
import React from "react";
import Home from './component/home';
import Contents from './component/contents/contents';
import Contentsdetails from './component/contents/contentsdetails';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';


function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Layout />} >
            {/* <Route index element={<MainPage />} /> */}
 <Route path="takepicture" element={<TakePicture />} />
            <Route path="/" element={<Home />} />
            <Route path="contents" element={<Contents />} />
            <Route path="contents/:id" element={<Contentsdetails />} />
          </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
