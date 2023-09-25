import { Outlet } from 'react-router-dom';
import '../css/common.css';
import Header from '../component/header';
import Socialkakao from '../component/kakaologin';
import Unlogin from '../component/unlogin';
import Footer from '../component/footer';
import Home from '../component/home';

function layout() {
  return (
    <>
      <Header />
      <Home />
      <Outlet />
      <Socialkakao />
      <Unlogin />
      <Footer />
    </>
  );
}

export default layout;
