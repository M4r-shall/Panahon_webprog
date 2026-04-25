import { NavLink } from 'react-router-dom';
import logoImg from '../assets/icons/logo.png'; 

const navLinkClassName = ({ isActive }) =>
  [
    'px-5 py-2 text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 rounded-sm',
    isActive
      ? 'bg-[#730c1e] text-white shadow-[0_0_20px_rgba(115,12,30,0.4)] border-b-2 border-white/20'
      : 'text-zinc-500 hover:text-white hover:bg-[#480415]/30',
  ].join(' ');

const NavBar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#480415]/50 bg-[#140f17]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 lg:px-12">
        
        {/* LEFT: Brand / Logo */}
        <NavLink to="/" className="flex items-center gap-4 group">
          <div className="relative">
            <div className="absolute -inset-1 bg-[#730c1e] rounded-full blur opacity-25 group-hover:opacity-60 transition duration-500"></div>
            <img 
              src={logoImg} 
              alt="Logo" 
              className="relative h-10 w-10 rounded-full border border-[#730c1e] object-cover" 
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tighter text-white leading-none">
              PANAHON<span className="text-[#730c1e]">.</span>
            </span>
            <span className="text-[9px] uppercase tracking-[0.3em] text-[#730c1e] font-bold">
              Portfolio 2026
            </span>
          </div>
        </NavLink>

        {/* CENTER: Navigation Links */}
        <nav className="hidden items-center gap-1 md:flex">
          <NavLink to="/" end className={navLinkClassName}>Home</NavLink>
          <NavLink to="/about" className={navLinkClassName}>About</NavLink>
          <NavLink to="/articles" className={navLinkClassName}>Projects</NavLink>
        </nav>

        {/* RIGHT: Always Visible Auth Buttons */}
        <div className="flex items-center gap-3">
          <NavLink 
            to="/auth/signin" 
            className="rounded-sm px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 transition-all duration-300 hover:text-white hover:bg-[#480415]/30 whitespace-nowrap"
          >
            Log In
          </NavLink>
          <NavLink 
            to="/auth/signup" 
            className="rounded-sm border-2 border-[#730c1e] bg-[#730c1e] px-6 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-white shadow-[0_0_15px_rgba(115,12,30,0.4)] transition-all duration-300 hover:bg-[#480415] hover:border-[#480415] whitespace-nowrap"
          >
            Sign Up
          </NavLink>
        </div>

      </div>
    </header>
  );
};

export default NavBar;