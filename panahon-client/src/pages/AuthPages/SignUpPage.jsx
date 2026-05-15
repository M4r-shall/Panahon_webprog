import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { createUser } from '../../services/UserService';

const inputClasses =
  'mt-2 w-full rounded-sm border border-[#480415] bg-[#140f17] px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-zinc-600 focus:border-[#730c1e] focus:shadow-[0_0_15px_rgba(115,12,30,0.3)] focus:bg-[#210207]/50';

const actionButtonClassName = 'w-full rounded-sm py-3 text-[11px] font-black uppercase tracking-[0.3em] transition-all duration-300';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    firstName: '', lastName: '', age: '', gender: 'male',
    contactNumber: '', email: '', username: '', password: '',
    address: '', type: 'editor',
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await createUser(form);
      navigate('/auth/signin');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <>
      <h1 className="text-3xl font-extrabold tracking-wide text-white sm:text-4xl drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">SIGN UP</h1>
      <p className="mt-3 text-sm leading-6 text-zinc-400">
        Create your Camp Half-Blood account.
      </p>

      {error && <p style={{ color: 'red' }} className="mt-3 text-sm">{error}</p>}

      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="first-name" className="text-[11px] font-bold uppercase tracking-widest text-zinc-300">First Name</label>
            <input id="first-name" name="firstName" type="text" placeholder="Juan" value={form.firstName} onChange={handleChange} className={inputClasses} required />
          </div>
          <div>
            <label htmlFor="last-name" className="text-[11px] font-bold uppercase tracking-widest text-zinc-300">Last Name</label>
            <input id="last-name" name="lastName" type="text" placeholder="Dela Cruz" value={form.lastName} onChange={handleChange} className={inputClasses} required />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="age" className="text-[11px] font-bold uppercase tracking-widest text-zinc-300">Age</label>
            <input id="age" name="age" type="text" placeholder="20" value={form.age} onChange={handleChange} className={inputClasses} required />
          </div>
          <div>
            <label htmlFor="gender" className="text-[11px] font-bold uppercase tracking-widest text-zinc-300">Gender</label>
            <select id="gender" name="gender" value={form.gender} onChange={handleChange} className={inputClasses} required>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="contactNumber" className="text-[11px] font-bold uppercase tracking-widest text-zinc-300">Contact Number</label>
          <input id="contactNumber" name="contactNumber" type="text" placeholder="09XXXXXXXXX" value={form.contactNumber} onChange={handleChange} className={inputClasses} required />
        </div>

        <div>
          <label htmlFor="signup-email" className="text-[11px] font-bold uppercase tracking-widest text-zinc-300">Email Address</label>
          <input id="signup-email" name="email" type="email" placeholder="name@example.com" value={form.email} onChange={handleChange} className={inputClasses} required />
        </div>

        <div>
          <label htmlFor="username" className="text-[11px] font-bold uppercase tracking-widest text-zinc-300">Username</label>
          <input id="username" name="username" type="text" placeholder="username" value={form.username} onChange={handleChange} className={inputClasses} required />
        </div>

        <div>
          <label htmlFor="signup-password" className="text-[11px] font-bold uppercase tracking-widest text-zinc-300">Password</label>
          <input id="signup-password" name="password" type="password" placeholder="••••••••" value={form.password} onChange={handleChange} className={inputClasses} required />
        </div>

        <div>
          <label htmlFor="address" className="text-[11px] font-bold uppercase tracking-widest text-zinc-300">Address</label>
          <input id="address" name="address" type="text" placeholder="Your address" value={form.address} onChange={handleChange} className={inputClasses} required />
        </div>

        <Button type="submit" className={`${actionButtonClassName} border-2 border-[#730c1e] bg-[#730c1e] text-white shadow-[0_0_15px_rgba(115,12,30,0.4)] hover:bg-[#480415] hover:border-[#480415]`}>
          Create Account
        </Button>
      </form>

      <div className="mt-8 border-t border-[#480415] pt-6 text-xs uppercase tracking-wider text-zinc-400">
        Already have an account?{' '}
        <Link to="/auth/signin" className="font-bold text-[#b31430] transition hover:text-[#e6193b] hover:drop-shadow-[0_0_5px_rgba(230,25,59,0.5)]">
          Log In
        </Link>
      </div>
    </>
  );
};

export default SignUpPage;
