import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route index element={<MainPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
