import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 bottom-0 z-[-1] overflow-hidden">
        <div className="absolute top-[20%] left-[10%] w-96 h-96 bg-primary/20 dark:bg-primary/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute top-[40%] left-[50%] w-96 h-96 bg-primary/20 dark:bg-primary/10 rounded-full filter blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-[10%] right-[10%] w-96 h-96 bg-primary/20 dark:bg-primary/10 rounded-full filter blur-3xl animate-pulse delay-4000"></div>
      </div>

      <div
        className="
          flex flex-col items-center justify-center 
          bg-black/20 dark:bg-white/5 backdrop-blur-xl 
          p-8 sm:p-12 rounded-2xl shadow-2xl border border-white/10 
          text-center max-w-lg
          animate-in fade-in slide-in-from-bottom-5 zoom-in-95 duration-700 ease-out
        "
      >
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tighter mb-4">
          Joyul (조율)
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground mb-8">
          Welcome to Joyul UI with Tailwind v4
        </p>
        <Link
          href="/theme-colors"
          className="
            px-6 py-3 rounded-full 
            bg-primary text-primary-foreground 
            font-semibold shadow-lg 
            transition-all duration-300
            hover:bg-primary/80 hover:scale-105 
            active:scale-95
          "
        >
          Explore Theme Colors
        </Link>
        <Link
          href="/font"
          className="
              mt-4 px-6 py-3 rounded-full
              bg-primary text-primary-foreground
              font-semibold shadow-lg
              transition-all duration-300
              hover:bg-primary/80 hover:scale-105
              active:scale-95
            "
        >
          View Satoshi Font
        </Link>
      </div>
    </main>
  );
}
