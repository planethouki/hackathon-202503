import React from "react";
import { Outlet } from "react-router";

const Layout: React.FC = () => {
  return (
    <div>
      <header>
        <nav>
          <h1>共通のナビゲーションバー</h1>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <p>共通のフッター</p>
      </footer>
    </div>
  );
};

export default Layout;
