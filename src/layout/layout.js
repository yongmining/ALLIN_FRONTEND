import { Outlet } from "react-router-dom";
import "../css/common.css";
import Header from "../component/header";
import Footer from "../component/footer";

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
