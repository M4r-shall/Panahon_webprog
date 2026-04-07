import Button from '../components/Button';


import todagoImg from '../assets/icons/app.png'; 
import blenderImg from '../assets/icons/blender.png'; 
import newsfeedImg from '../assets/icons/newsfeed.png'; 
import tennisImg from '../assets/icons/tennis.png'; 

const ArticlePage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      
      {/* --- HEADER SECTION --- */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
          Projects & Explorations
        </p>
        <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
          A showcase of development, design, and discipline.
        </h1>
        <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
          From full-stack mobile applications at **National University**, 
          here is a look at the projects I’ve been building.
        </p>
        <div className="mt-6">
          <Button to="/">Back Home</Button>
        </div>
      </section>

      {/* --- PROJECT GRID --- */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Work Samples
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">Featured Portfolio Pieces</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          
          {/* Project 1: TodaGo */}
          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4 transition-all hover:shadow-[4px_4px_0px_0px_rgba(24,24,27,1)]">
            <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-zinc-200 overflow-hidden border border-zinc-300">
              <img src={todagoImg} alt="TodaGo App" className="w-full h-full object-cover" />
            </div>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Capstone
            </p>
            <h3 className="mt-2 text-lg font-semibold text-zinc-900">TodaGo: Ride-Hailing App</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Modernizing local transport using Flutter. A capstone project focused on real-time booking logic.
            </p>
            <Button className="mt-4" to="https://github.com">View Details</Button>
          </article>

          {/* Project 2: Blender */}
          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4 transition-all hover:shadow-[4px_4px_0px_0px_rgba(24,24,27,1)]">
            <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-zinc-200 overflow-hidden border border-zinc-300">
              <img src={blenderImg} alt="3D Footwear Render" className="w-full h-full object-cover" />
            </div>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              3D Modeling
            </p>
            <h3 className="mt-2 text-lg font-semibold text-zinc-900">Footwear Design in Blender</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Exploring 3D space by creating high-fidelity shoe models with custom textures and lighting.
            </p>
            <Button className="mt-4">See Renders</Button>
          </article>

          {/* Project 3: Mobile Assignment */}
          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4 transition-all hover:shadow-[4px_4px_0px_0px_rgba(24,24,27,1)]">
            <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-zinc-200 overflow-hidden border border-zinc-300">
              <img src={newsfeedImg} alt="Newsfeed UI" className="w-full h-full object-cover" />
            </div>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Flutter App
            </p>
            <h3 className="mt-2 text-lg font-semibold text-zinc-900">Social Newsfeed UI</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Developing interactive newsfeed features and notification systems for mobile programming.
            </p>
            <Button className="mt-4">View Source</Button>
          </article>

          {/* Project 4: Tennis/Discipline */}
          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4 transition-all hover:shadow-[4px_4px_0px_0px_rgba(24,24,27,1)]">
            <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-zinc-200 overflow-hidden border border-zinc-300">
              <img src={tennisImg} alt="Tennis Discipline" className="w-full h-full object-cover" />
            </div>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Discipline
            </p>
            <h3 className="mt-2 text-lg font-semibold text-zinc-900">17 Years on the Court</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              How a lifetime of competitive lawn tennis shaped my approach to software engineering.
            </p>
            <Button className="mt-4" to="/about">My Story</Button>
          </article>

        </div>
      </section>
    </div>
  );
};

export default ArticlePage;