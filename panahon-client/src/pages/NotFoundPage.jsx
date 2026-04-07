// src/pages/NotFoundPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="flex min-h-[70vh] w-full flex-col items-center justify-center gap-6 px-4">
      <section className="flex flex-col items-center text-center max-w-xl border-y-2 border-zinc-900 bg-zinc-50 px-4 py-12 sm:px-6 sm:py-16">
        <p className="mb-3 text-[13px] font-bold uppercase tracking-[0.28em] text-zinc-500">
          Error 404
        </p>
        <h1 className="text-4xl font-bold leading-tight text-zinc-900 sm:text-5xl">
          Page Not Found
        </h1>
        <p className="mt-4 text-sm leading-7 text-zinc-600 sm:text-base">
          The link you followed to get here must be broken, or the page has been removed.
        </p>
        <div className="mt-8">
          <Link 
            to="/" 
            className="rounded-full border-2 border-zinc-900 bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-700"
          >
            Back to Home
          </Link>
        </div>
      </section>
    </div>
  );
}

export default NotFoundPage;