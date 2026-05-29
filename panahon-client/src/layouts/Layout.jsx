import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-[#0e0e0e] text-white">
      <NavBar />
      
      <main className="flex-1 pb-16 pt-16"> 
        <Outlet />
      </main>
      
      <Footer /> 
    </div>
  );
};

export default Layout;