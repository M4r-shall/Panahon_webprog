import { Outlet } from 'react-router-dom';
import codingImg from '../assets/icons/cat narly.jpg'; 

const AuthLayout = () => {
  return (
    <section className="min-h-screen bg-[#0a070b] text-white">
      <div className="grid min-h-screen w-full lg:grid-cols-[1fr_0.95fr]">
        
        {/* LEFT SIDE: Image replacing the dashed box */}
        <div className="flex items-center justify-center border-b-2 border-[#480415]/50 bg-[#140f17] p-8 sm:p-10 lg:border-b-0 lg:border-r-2 lg:p-16">
          <img 
            src={codingImg} 
            alt="Coding Theme Graphic" 
            className="w-full max-w-md rounded-2xl border border-[#480415] object-cover shadow-[0_0_40px_rgba(115,12,30,0.3)] transition-transform duration-500 hover:scale-[1.02]" 
          />
        </div>

        {/* RIGHT SIDE: Auth Forms (Outlet) */}
        <main className="flex items-center bg-[#0a070b] px-6 py-10 sm:px-10 lg:px-16 overflow-y-auto max-h-screen">
          <div className="mx-auto w-full max-w-md">
            <Outlet />
          </div>
        </main>
        
      </div>
    </section>
  );
};

export default AuthLayout;