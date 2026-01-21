import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] text-center mt-10 space-y-6 gap-10">
      <h1 className="text-4xl font-bold text-center">
        Bienvenue sur ce test de PWA et de next.js !
      </h1>
      <div>
        <h2 className="text-2xl sm:text-3xl font-semibold">
            Technologies utilisées :
        </h2>
                    
        <h3 className=""> - Javascript </h3>
        <h3 className=""> - React </h3>
        <h3 className=""> - Next.js </h3>
        <h3 className=""> - Claude </h3>
      </div>
    </div>
  );
}
