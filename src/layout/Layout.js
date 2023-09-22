import { Outlet } from 'react-router-dom';
import Header from '../component/Header';
import '../css/common.css';

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default Layout;
