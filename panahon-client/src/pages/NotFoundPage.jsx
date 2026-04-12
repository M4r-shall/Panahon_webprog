import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="flex min-h-[70vh] w-full flex-col items-center justify-center gap-6 px-4">
      <section className="flex flex-col items-center text-center max-w-xl rounded-3xl border border-[#480415] bg-[#210207]/20 p-8 backdrop-blur-md sm:p-12">
        <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.4em] text-[#730c1e]">
          Error 404
        </p>
        <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl">
          Page Not Found
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-zinc-400 sm:text-base">
          The link you followed to get here must be broken, or the page has been removed.
        </p>
        <div className="mt-8">
          <Link 
            to="/" 
            className="inline-block rounded bg-[#730c1e] px-8 py-4 text-sm font-bold tracking-wide text-white transition-all hover:bg-[#480415] shadow-[0_0_20px_rgba(115,12,30,0.3)]"
          >
            Back to Home
          </Link>
        </div>
      </section>
    </div>
  );
}

export default NotFoundPage;