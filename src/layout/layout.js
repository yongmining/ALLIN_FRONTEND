import { Outlet } from 'react-router-dom';
import '../css/common.css';
import Header from '../component/header';
import Footer from '../component/footer';
import Socialkakao from '../component/login/kakaologin';
import Unlogin from '../component/login/unlogin';

function Layout() {
  return (
    <>
      <Header />
      {/* <div className="content main-width"> */}
      <Outlet />
      <Socialkakao />
      <Unlogin />
      {/* </div> */}
      <Footer />
    </>
  );
}

export default Layout;
