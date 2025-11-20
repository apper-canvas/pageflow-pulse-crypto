import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen theme-transition">
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;