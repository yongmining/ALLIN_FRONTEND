
import '../css/common.css';
import Header from '../component/Header';
import Socialkakao from '../component/kakaologin'
import Unlogin from '../component/unlogin'
import Footer from '../component/footer'
import Home from '../component/home'

function Layout() {
  return (
    <>
      
      <Header />
      <Home />
      <Socialkakao />
      <Unlogin />
      <Footer />
    </>
  );
}

export default Layout;