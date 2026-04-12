import { useNavigate } from 'react-router-dom';
import Button from './Button';

const ArticleList = ({ articles }) => {
  const navigate = useNavigate();

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article, index) => (
        <article 
          key={article.name} 
          onClick={() => {
            // Intentionally break the link for Blender to show off the NotFoundPage
            if (article.name === 'blender-footwear') {
              navigate('/intentionally-broken-link');
            } else {
              navigate(`/articles/${article.name}`);
            }
          }}
          className="rounded-2xl border border-[#480415] bg-[#210207]/40 p-5 backdrop-blur-md flex flex-col justify-between group hover:border-[#730c1e] transition-colors cursor-pointer"
        >
          
          <div>
            {/* Image Container */}
            <div className="flex aspect-4/3 items-center justify-center rounded-xl bg-[#140f17] border border-[#480415] overflow-hidden relative">
              <div className="absolute inset-0 bg-[#730c1e]/5 group-hover:bg-transparent transition-colors z-10"></div>
              {article.image ? (
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
              ) : (
                <div className="h-12 w-12 border border-[#480415] bg-[#210207]/40" />
              )}
            </div>
            
            {/* Category Label */}
            <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.3em] text-[#730c1e]">
              {article.category || `Project ${String(index + 1).padStart(2, '0')}`}
            </p>
            
            {/* Title */}
            <h3 className="mt-2 text-xl font-bold text-white tracking-tight">
              {article.title}
            </h3>
            
            {/* Description */}
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              {article.content[0].substring(0, 100)}...
            </p>
          </div>

          {/* Read More Button */}
          <Button className="mt-8 w-full py-3 text-[10px] border-[#730c1e] text-white hover:bg-[#730c1e]" variant="secondary">
            View Project Details
          </Button>
          
        </article>
      ))}
    </div>
  );
};

export default ArticleList;