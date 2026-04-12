import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-auto border-t border-[#480415] bg-[#140f17] px-4 py-8 sm:px-6 lg:px-8">
      {/* Changed justify-between to justify-center and removed sm:flex-row */}
      <div className="mx-auto max-w-7xl flex flex-col items-center justify-center gap-4">
        {/* Fixed the comma typo in the className and added text-center */}
        <p className="text-sm text-zinc-500 text-center">
          © {new Date().getFullYear()} Marius Clarence Panahon. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;