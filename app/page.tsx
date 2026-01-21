import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-16 px-6 text-center">
  <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-violet-300 to-fuchsia-400 bg-clip-text text-transparent mb-10">
    Bienvenue sur PWA Next.js !
  </h1>
  <h2 className="text-2xl font-semibold text-white mb-6">Technologies utilisées :</h2>
  <div className="flex flex-wrap justify-center gap-4">
    {["JavaScript", "React", "Next.js", "Claude"].map((tech) => (
      <span key={tech} className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 transition-all">
        {tech}
      </span>
    ))}
  </div>
</div>)
}
