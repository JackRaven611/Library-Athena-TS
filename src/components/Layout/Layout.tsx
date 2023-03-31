import { Outlet } from "react-router";
import Footer from "./Footer/Footer";
import Navigation from "./Navigation/Navigation";

const Layout = () => {
  return (
    <>
      <Navigation />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
