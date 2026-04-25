import Button from '../../components/Button';

import profileImg from '../../assets/icons/Me.png'; 
import tennisImg from '../../assets/icons/tennis.png'; 
import blenderImg from '../../assets/icons/cat santa.jpg'; 
import codingImg from '../../assets/icons/coding.png'; 
import esportsImg from '../../assets/icons/esports.png'; 

const AboutPage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      
      {/* --- HERO SECTION: IDENTITY --- */}
      <section className="border-y border-[#480415] bg-transparent px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-7xl grid gap-8 lg:grid-cols-2 lg:items-center">
          
          {/* Profile Photo Container */}
          <div className="rounded-3xl border border-[#480415] bg-[#210207]/20 backdrop-blur-md p-6">
            <div className="flex min-h-72 items-center justify-center rounded-[1.25rem] bg-[#140f17] border border-[#480415] overflow-hidden">
                <img 
                    src={profileImg} 
                    alt="Marius Clarence Panahon" 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" 
                />
            </div>
          </div>

          <div>
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.4em] text-[#730c1e]">
              Personal Profile
            </p>
            <h1 className="max-w-xl text-3xl font-extrabold leading-tight text-white sm:text-5xl">
              From the tennis court <br/> to the terminal.
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-400 sm:text-base">
              I’m a 21-year-old student at National University from San Jose, Occidental Mindoro. 
              Seventeen years of competitive lawn tennis taught me the discipline I now use to master complex code.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button to="/" className="bg-[#730c1e] hover:bg-[#480415] border-none text-white shadow-[0_0_15px_rgba(115,12,30,0.3)]">Back Home</Button>
              <Button to="/articles" className="border-[#730c1e] text-white hover:bg-[#730c1e]/20">View Projects</Button>
            </div>
          </div>
        </div>
      </section>

      {/* --- PROFILE OVERVIEW --- */}
      <section className="border-b border-[#480415] bg-transparent px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-7xl">
            <div className="mb-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#730c1e]">
                Profile Overview
            </p>
            <h2 className="mt-2 text-3xl font-bold text-white">Marius by the numbers</h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
                { val: '21', label: 'Years Old' },
                { val: '17', label: 'Years of Tennis' },
                { val: '03', label: 'Tech Stacks' },
                { val: 'NU', label: 'Education' },
            ].map((stat, i) => (
                <div key={i} className="rounded-2xl border border-[#480415] bg-[#210207]/40 p-6 backdrop-blur-sm transition-all hover:border-[#730c1e] hover:-translate-y-1">
                <p className="text-3xl font-black text-white">{stat.val}</p>
                <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#730c1e]">{stat.label}</p>
                </div>
            ))}
            </div>
        </div>
      </section>

      {/* --- THE STORY & GALLERY --- */}
      <section className="bg-transparent px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#730c1e]">My Journey</p>
            <h2 className="mt-2 text-3xl font-bold text-white">Logic meets Athleticism</h2>

            <div className="mt-8 space-y-6">
              {[
                { title: 'The Early Years', content: 'I started playing competitive lawn tennis at age 4. Growing up on the court taught me focus and resilience—skills that now help me master Flutter and React.' },
                { title: 'Current Mission', content: 'As a student at National University, I’m building TodaGo, a mobile app designed to revolutionize local transport through real-time booking logic.' },
                { title: 'Hobbies & Hype', content: 'Beyond code, I dive into 3D modeling in Blender, follow eSports tournaments, read manhwas, and enjoy deep works of fiction.' }
              ].map((story, i) => (
                <article key={i} className="rounded-2xl border border-[#480415] bg-[#210207]/40 p-6 backdrop-blur-sm">
                  <h3 className="text-lg font-semibold text-white tracking-wide">{story.title}</h3>
                  <div className="mt-3 h-[1px] w-12 bg-[#730c1e]"></div>
                  <p className="mt-4 text-sm leading-relaxed text-zinc-400">{story.content}</p>
                </article>
              ))}
            </div>
          </div>

          {/* Visual Gallery with Actual Images */}
          <div className="rounded-3xl border border-[#480415] bg-[#210207]/20 p-6 backdrop-blur-md h-fit">
            <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#730c1e]">Visual Gallery</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                { img: tennisImg, tag: 'Tennis' },
                { img: blenderImg, tag: 'Blender' },
                { img: codingImg, tag: 'Coding' },
                { img: esportsImg, tag: 'Esports' }
              ].map((item, i) => (
                <div key={i} className="group relative aspect-square overflow-hidden rounded-xl border border-[#480415] bg-[#140f17]">
                  <img src={item.img} alt={item.tag} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 flex items-center justify-center bg-[#140f17]/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#730c1e]">{item.tag}</span>
                  </div>
                </div>
              ))}
            </div>
            <Button className="mt-6 w-full py-4 border-[#730c1e] text-white hover:bg-[#730c1e]" to="/articles">View Full Portfolio</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;