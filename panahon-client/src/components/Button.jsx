import { Link } from 'react-router-dom';

const variantClasses = {
  /* Bold Crimson: Perfect for the dark background */
  primary: 'bg-[#730c1e] text-white border-[#730c1e] hover:bg-[#480415] hover:border-[#480415] shadow-[0_0_20px_rgba(115,12,30,0.3)]',
  
  /* Outline Crimson: Subtle, glass-like look */
  secondary: 'bg-transparent text-white border-[#730c1e]/40 hover:bg-[#730c1e] hover:border-[#730c1e]',
};

const Button = ({
  children,
  to,
  type = 'button',
  variant = 'primary', // Defaulting to primary ensures visibility
  className = '',
}) => {
  const classes = [
    /* Switched rounded-full to rounded-sm for a more "disciplined" professional feel */
    'inline-flex items-center justify-center rounded-sm border-2 px-8 py-3 text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-300 active:scale-95 whitespace-nowrap',
    variantClasses[variant] ?? variantClasses.primary,
    className,
  ]
    .join(' ')
    .trim();

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes}>
      {children}
    </button>
  );
};

export default Button;