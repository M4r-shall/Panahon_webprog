import { Link } from 'react-router-dom';
import Button from '../../components/Button';

const inputClasses =
  'mt-2 w-full rounded-sm border border-[#480415] bg-[#140f17] px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-zinc-600 focus:border-[#730c1e] focus:shadow-[0_0_15px_rgba(115,12,30,0.3)] focus:bg-[#210207]/50';

const actionButtonClassName = 'w-full rounded-sm py-3 text-[11px] font-black uppercase tracking-[0.3em] transition-all duration-300';

const SignUpPage = () => {
  return (
    <>
      <h1 className="text-3xl font-extrabold tracking-wide text-white sm:text-4xl drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">SIGN UP</h1>
      <p className="mt-3 text-sm leading-6 text-zinc-400">
        Create your BulldogEx account.
      </p>

      <form className="mt-8 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="first-name" className="text-[11px] font-bold uppercase tracking-widest text-zinc-300">
              First Name
            </label>
            <input id="first-name" type="text" placeholder="Juan" className={inputClasses} />
          </div>
          <div>
            <label htmlFor="last-name" className="text-[11px] font-bold uppercase tracking-widest text-zinc-300">
              Last Name
            </label>
            <input id="last-name" type="text" placeholder="Dela Cruz" className={inputClasses} />
          </div>
        </div>

        <div>
          <label htmlFor="signup-email" className="text-[11px] font-bold uppercase tracking-widest text-zinc-300">
            Email Address
          </label>
          <input id="signup-email" type="email" placeholder="name@example.com" className={inputClasses} />
        </div>

        <div>
          <label htmlFor="signup-password" className="text-[11px] font-bold uppercase tracking-widest text-zinc-300">
            Password
          </label>
          <input id="signup-password" type="password" placeholder="••••••••" className={inputClasses} />
        </div>

        <Button type="submit" className={`${actionButtonClassName} border-2 border-[#730c1e] bg-[#730c1e] text-white shadow-[0_0_15px_rgba(115,12,30,0.4)] hover:bg-[#480415] hover:border-[#480415]`}>
          Create Account
        </Button>

        <div className="grid gap-3 pt-2 sm:grid-cols-2">
          <Button type="button" className={`${actionButtonClassName} border-2 border-[#480415] bg-transparent text-white hover:bg-[#480415]/50`}>
            Google
          </Button>
          <Button type="button" className={`${actionButtonClassName} border-2 border-[#480415] bg-transparent text-white hover:bg-[#480415]/50`}>
            Apple
          </Button>
        </div>
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