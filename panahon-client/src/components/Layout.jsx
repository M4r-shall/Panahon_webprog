import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

const Layout = () => {
  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white">
      <NavBar />
      {/* Reduced pt-24 to pt-16 to pull the content up closer to the Nav */}
      <main className="flex-1 pb-16 pt-16"> 
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;