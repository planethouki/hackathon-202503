import React from "react";
import { Outlet } from "react-router";
import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";

const Layout: React.FC = () => {
  return (
    <>
      <Header />

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default Layout;
