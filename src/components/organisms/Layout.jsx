import { Outlet } from "react-router-dom";
import TopNavigation from '@/components/organisms/TopNavigation';
const Layout = () => {
  return (
<div className="min-h-screen theme-transition bg-gray-100">
      <TopNavigation />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;