import Button from '../components/Button';
import heroImg from '../assets/icons/mobileweb.png'; 
import todagoImg from '../assets/icons/app.png'; 
import blenderImg from '../assets/icons/blender.png'; 
import socialImg from '../assets/icons/newsfeed.png';  

const HomePage = () => {
  return (
    <div className="flex w-full flex-col">
      <section className="px-6 py-8 lg:px-12 bg-transparent overflow-hidden">
        <div className="mx-auto max-w-7xl grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.4em] text-[#730c1e]">
              Student Developer @ National University
            </p>
            <h1 className="max-w-xl text-4xl font-extrabold leading-tight text-white sm:text-6xl">
              Building Modern <br/> Mobile & Web
            </h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-zinc-400">
              I’m a 21-year-old developer specializing in Flutter and React. 
              Currently focused on revolutionizing local transport with <span className="font-bold text-white underline decoration-[#730c1e]">TodaGo</span>.
            </p>
            <div className="mt-10">
              <Button to="/about" variant="primary" className="bg-[#730c1e] hover:bg-[#480415] border-none px-10 py-4 rounded-sm shadow-[0_0_20px_rgba(115,12,30,0.3)]">
                View My Story
              </Button>
            </div>
          </div>

          <div className="rounded-3xl border border-[#730c1e]/30 bg-[#210207]/20 backdrop-blur-md p-6">
            <div className="flex aspect-square items-center justify-center rounded-[1.25rem] bg-[#140f17] border border-[#480415] overflow-hidden">
                <img 
                    src={heroImg} 
                    alt="Hero Portrait or Screenshot" 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                />
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8 bg-transparent">
        <div className="mx-auto max-w-7xl">
            <div className="mb-10 text-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#730c1e]">
                Professional & Personal Stats
              </p>
              <h2 className="mt-2 text-3xl font-bold text-white">Quick overview of my journey</h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { val: '03+', label: 'Years Coding' },
                { val: '17', label: 'Years Playing Tennis' },
                { val: '05+', label: 'Projects Completed' },
                { val: '02', label: 'Core Tech Stacks' },
              ].map((stat, i) => (
                <div key={i} className="rounded-2xl border border-[#480415] bg-[#210207]/40 p-6 backdrop-blur-sm transition-all hover:border-[#730c1e] hover:-translate-y-1 flex items-center gap-4">
                    <div>
                    <p className="text-3xl font-black text-white">{stat.val}</p>
                    <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.3em] text-[#730c1e]">
                        {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
        </div>
      </section>

      {/* --- FEATURE CARDS --- */}
      <section className="px-4 py-12 sm:px-6 lg:px-8 bg-transparent">
        <div className="mx-auto max-w-7xl">
            <div className="mb-10 text-center lg:text-left">
              <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#730c1e]">
                Portfolio
              </p>
              <h2 className="mt-2 text-3xl font-bold text-white">Featured Work</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                { title: 'TodaGo App', tag: 'TodaGo UI', desc: 'A Flutter-based ride-hailing solution designed to modernize transport.', img: todagoImg },
                { title: 'Blender Designs', tag: '3D Render', desc: 'High-fidelity 3D footwear modeling focusing on realistic textures.', img: blenderImg },
                { title: 'Newsfeed System', tag: 'Social UI', desc: 'A Flutter-built social media interface featuring real-time logic.', img: socialImg },
              ].map((project, i) => (
                <article key={i} className="rounded-2xl border border-[#480415] bg-[#210207]/40 p-5 backdrop-blur-md flex flex-col justify-between group hover:border-[#730c1e] transition-colors">
                  <div>
                    {/* Project Image Container */}
                    <div className="flex aspect-4/3 items-center justify-center rounded-xl bg-[#140f17] border border-[#480415] overflow-hidden relative">
                      {/* Dark overlay that disappears on hover */}
                      <div className="absolute inset-0 bg-[#730c1e]/5 group-hover:bg-transparent transition-colors z-10"></div>
                      
                      {/* Actual Image */}
                      <img 
                        src={project.img} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      />
                    </div>

                    <h3 className="mt-6 text-xl font-bold text-white tracking-tight">{project.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                      {project.desc}
                    </p>
                  </div>
                  <Button className="mt-8 w-full py-3 text-[10px] border-[#730c1e] text-white hover:bg-[#730c1e]" variant="secondary" to="/articles">
                    View Project Details
                  </Button>
                </article>
              ))}
            </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;