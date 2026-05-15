import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { loginUser } from '../../services/UserService';

const inputClasses =
  'mt-2 w-full rounded-sm border border-[#480415] bg-[#140f17] px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-zinc-600 focus:border-[#730c1e] focus:shadow-[0_0_15px_rgba(115,12,30,0.3)] focus:bg-[#210207]/50';

const actionButtonClassName = 'w-full rounded-sm py-3 text-[11px] font-black uppercase tracking-[0.3em] transition-all duration-300';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await loginUser({ email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('firstName', data.firstName);
      localStorage.setItem('type', data.type);
      navigate('/dashboard', { state: { firstName: data.firstName, type: data.type } });
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed. Please try again.';
      setError(msg);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-extrabold tracking-wide text-white sm:text-4xl drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">LOG IN</h1>
      <p className="mt-3 text-sm leading-6 text-zinc-400">
        Welcome back to Camp Half-Blood OS.
      </p>

      {error && <p style={{ color: 'red' }} className="mt-3 text-sm">{error}</p>}

      <form className="mt-8 space-y-5" onSubmit={handleLogin}>
        <div>
          <label htmlFor="signin-email" className="text-[11px] font-bold uppercase tracking-widest text-zinc-300">
            Email Address
          </label>
          <input
            id="signin-email"
            type="email"
            placeholder="name@example.com"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClasses}
            required
          />
        </div>

        <div>
          <label htmlFor="signin-password" className="text-[11px] font-bold uppercase tracking-widest text-zinc-300">
            Password
          </label>
          <input
            id="signin-password"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClasses}
            required
          />
        </div>

        <Button type="submit" className={`${actionButtonClassName} border-2 border-[#730c1e] bg-[#730c1e] text-white shadow-[0_0_15px_rgba(115,12,30,0.4)] hover:bg-[#480415] hover:border-[#480415]`}>
          Log In
        </Button>
      </form>

      <div className="mt-8 border-t border-[#480415] pt-6 text-xs uppercase tracking-wider text-zinc-400">
        No account yet?{' '}
        <Link to="/auth/signup" className="font-bold text-[#b31430] transition hover:text-[#e6193b] hover:drop-shadow-[0_0_5px_rgba(230,25,59,0.5)]">
          Sign Up
        </Link>
      </div>
    </>
  );
};

export default SignInPage;
