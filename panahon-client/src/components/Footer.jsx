import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-auto border-t border-[#480415] bg-[#140f17] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-[#730c1e] rounded-md border border-[#480415]"></div>
          <span className="text-lg font-bold text-white">Marius Clarence Panahon</span>
        </div>
        <p className="text-sm text-zinc-500">
          © {new Date().getFullYear()} Marius Clarence Panahon. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;