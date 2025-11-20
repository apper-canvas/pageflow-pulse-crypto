import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
<div className="min-h-screen theme-transition bg-gradient-to-br from-stone-50 via-gray-50 to-slate-100">
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;