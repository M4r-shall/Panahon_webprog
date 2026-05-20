import { useEffect, useState } from 'react';
import Button from '../../components/Button';
import ArticleList from '../../components/ArticleList';
import staticArticles from '../../assets/article-content.js';
import { fetchArticles } from '../../services/ArticleService';

const ArticleListPage = () => {
  const [dbArticles, setDbArticles] = useState([]);

  useEffect(() => {
    fetchArticles()
      .then(({ data }) => setDbArticles(data.articles.filter((a) => a.isActive)))
      .catch(() => setDbArticles([]));
  }, []);

  return (
    <div className="flex w-full flex-col gap-6">

      {/* --- HEADER SECTION --- */}
      <section className="border-y border-[#480415] bg-transparent px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.4em] text-[#730c1e]">
          Projects & Explorations
        </p>
        <h1 className="max-w-xl text-3xl font-extrabold leading-tight text-white sm:text-5xl">
          A showcase of development, design, and discipline.
        </h1>
        <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-400 sm:text-base">
          From full-stack mobile applications at **National University**,
          here is a look at the projects I've been building.
        </p>
        <div className="mt-8">
          <Button to="/" className="bg-[#730c1e] text-white border-none hover:bg-[#480415]">Back Home</Button>
        </div>
      </section>

      {/* --- STATIC PORTFOLIO PROJECTS --- */}
      <section className="border-b border-[#480415] bg-transparent px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#730c1e]">Work Samples</p>
          <h2 className="mt-2 text-3xl font-bold text-white">Featured Portfolio Pieces</h2>
        </div>
        <ArticleList articles={staticArticles} />
      </section>

      {/* --- DYNAMIC ARTICLES FROM DATABASE --- */}
      {dbArticles.length > 0 && (
        <section className="border-b border-[#480415] bg-transparent px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <div className="mb-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#730c1e]">Latest Articles</p>
            <h2 className="mt-2 text-3xl font-bold text-white">From the Dashboard</h2>
          </div>
          <ArticleList articles={dbArticles.map((a) => ({
            name: a.slug || a._id,
            title: a.title,
            category: a.category,
            image: a.image,
            content: [a.paragraphs?.[0] || ''],
          }))} />
        </section>
      )}

    </div>
  );
};

export default ArticleListPage;
