import Button from '../components/Button';

// STEP 1: Import your images
import profileImg from '../assets/icons/cat narly.jpg'; 
import tennisImg from '../assets/icons/cat narly.jpg'; 
import blenderImg from '../assets/icons/cat santa.jpg'; 
import codingImg from '../assets/icons/cat narly.jpg'; 
import esportsImg from '../assets/icons/cat santa.jpg'; 

const AboutPage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      
      {/* --- HERO SECTION: IDENTITY --- */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          
          {/* Profile Photo Container */}
          <div className="rounded-3xl border-2 border-dashed border-zinc-300 bg-zinc-100 p-6">
            <div className="flex min-h-72 items-center justify-center rounded-[1.25rem] bg-zinc-200 border-2 border-zinc-300 overflow-hidden">
                <img 
                    src={profileImg} 
                    alt="Marius Clarence Panahon" 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" 
                />
            </div>
          </div>

          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Personal Profile
            </p>
            <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
              From the tennis court <br/> to the terminal.
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
              I’m a 21-year-old student at **National University** from San Jose, Occidental Mindoro. 
              Seventeen years of competitive lawn tennis taught me the discipline I now use to master complex code.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/" variant="primary">Back Home</Button>
              <Button to="/articles">View Projects</Button>
            </div>
          </div>
        </div>
      </section>

      {/* --- PROFILE OVERVIEW --- */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Profile Overview
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">Marius by the numbers</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { val: '21', label: 'Years Old' },
            { val: '17', label: 'Years of Tennis' },
            { val: '03', label: 'Tech Stacks' },
            { val: 'NU', label: 'Education' },
          ].map((stat, i) => (
            <div key={i} className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)]">
              <p className="text-2xl font-bold text-zinc-900">{stat.val}</p>
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- THE STORY & GALLERY --- */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">My Journey</p>
            <h2 className="mt-2 text-2xl font-semibold text-zinc-900">Logic meets Athleticism</h2>

            <div className="mt-6 space-y-4">
              {[
                { title: 'The Early Years', content: 'I started playing competitive lawn tennis at age 4. Growing up on the court taught me focus and resilience—skills that now help me master Flutter and React.' },
                { title: 'Current Mission', content: 'As a student at National University, I’m building TodaGo, a mobile app designed to revolutionize local transport through real-time booking logic.' },
                { title: 'Hobbies & Hype', content: 'Beyond code, I dive into 3D modeling in Blender, follow eSports tournaments, read manhwas, and enjoy deep works of fiction.' }
              ].map((story, i) => (
                <article key={i} className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                  <h3 className="text-lg font-semibold text-zinc-900 italic underline">{story.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-600">{story.content}</p>
                </article>
              ))}
            </div>
          </div>

          {/* Visual Gallery with Actual Images */}
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">Visual Gallery</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {[
                { img: tennisImg, tag: 'Tennis' },
                { img: blenderImg, tag: 'Blender' },
                { img: codingImg, tag: 'Coding' },
                { img: esportsImg, tag: 'Esports' }
              ].map((item, i) => (
                <div key={i} className="group relative aspect-square overflow-hidden rounded-[1.25rem] border-2 border-zinc-300 bg-zinc-200">
                  <img src={item.img} alt={item.tag} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white">{item.tag}</span>
                  </div>
                </div>
              ))}
            </div>
            <Button className="mt-5 w-full" to="/articles">View Full Portfolio</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;