import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Button from '../../components/Button';
import staticArticles from '../../assets/article-content.js';
import { fetchArticleBySlug, fetchArticleById } from '../../services/ArticleService';

const ArticlePage = () => {
  const { name } = useParams();
  const staticArticle = staticArticles.find((a) => a.name === name);
  const [dbArticle, setDbArticle] = useState(null);
  const [loading, setLoading] = useState(!staticArticle);

  useEffect(() => {
    if (staticArticle) return;

    setLoading(true);
    fetchArticleBySlug(name)
      .then(({ data }) => {
        setDbArticle({ ...data.article, content: data.article.paragraphs });
        setLoading(false);
      })
      .catch(() => {
        fetchArticleById(name)
          .then(({ data }) => setDbArticle({ ...data.article, content: data.article.paragraphs }))
          .catch(() => setDbArticle(null))
          .finally(() => setLoading(false));
      });
  }, [name]);

  const article = staticArticle ?? dbArticle;

  if (loading) {
    return (
      <div className="flex w-full items-center justify-center py-20">
        <p className="text-zinc-400">Loading...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-6 px-4 py-20">
        <h1 className="text-3xl font-bold text-white">Project not found</h1>
        <p className="text-zinc-400">The project you are looking for doesn't exist.</p>
        <Button to="/articles" className="mt-6 bg-[#730c1e] text-white border-none hover:bg-[#480415]">
          Back to Portfolio
        </Button>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-6">

      {/* --- HEADER SECTION --- */}
      <section className="border-y border-[#480415] bg-transparent px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <Link to="/articles" className="text-sm font-semibold text-zinc-400 hover:text-[#730c1e] transition-colors">
              ← Back to Portfolio
            </Link>
          </div>

          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.4em] text-[#730c1e]">
            {article.category || 'Project Detail'}
          </p>

          <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl">
            {article.title}
          </h1>
        </div>
      </section>

      {/* --- CONTENT SECTION --- */}
      <section className="bg-transparent px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">

          {/* Hero Image for the Article */}
          <div className="mb-10 flex aspect-video w-full items-center justify-center rounded-2xl bg-[#140f17] border border-[#480415] overflow-hidden shadow-[0_0_30px_rgba(115,12,30,0.1)]">
            {article.image ? (
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextSibling.style.display = 'flex';
                }}
              />
            ) : null}
            <div
              className="w-full h-full flex items-center justify-center text-[#480415] text-xs tracking-widest uppercase"
              style={{ display: article.image ? 'none' : 'flex' }}
            >
              No image
            </div>
          </div>

          {/* The Written Content */}
          <div className="prose prose-invert max-w-none space-y-6 text-zinc-300">
            {article.content.map((paragraph, index) => (
              <p key={index} className="text-base leading-8 text-zinc-300">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Bottom Navigation */}
          <div className="mt-12 border-t border-[#480415] pt-8">
            <Button to="/articles" className="border-[#730c1e] text-white hover:bg-[#730c1e]/20">
              Back to Portfolio
            </Button>
          </div>

        </div>
      </section>

    </div>
  );
};

export default ArticlePage;
