import Link from "next/link";
import {
  IconPalette,
  IconTypography,
  IconComponents,
} from "@tabler/icons-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 bottom-0 z-[-1] overflow-hidden">
        <div className="absolute top-[20%] left-[10%] w-96 h-96 bg-primary/20 dark:bg-primary/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute top-[40%] left-[50%] w-96 h-96 bg-primary/20 dark:bg-primary/10 rounded-full filter blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-[10%] right-[10%] w-96 h-96 bg-primary/20 dark:bg-primary/10 rounded-full filter blur-3xl animate-pulse delay-4000"></div>
      </div>

      <div className="flex flex-col items-center justify-center bg-accent/30 backdrop-blur-xl p-8 sm:p-12 rounded-2xl shadow-2xl border text-center max-w-lg animate-in fade-in slide-in-from-bottom-5 zoom-in-95 duration-700 ease-out">
        <div className="flex items-center justify-center gap-2 mb-2">
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tighter">
            Joyul <span className="text-primary">(조율)</span>
          </h1>
        </div>
        <p className="text-lg sm:text-xl text-muted-foreground mb-8">
          Welcome to Joyul UI with Tailwind v4
        </p>
        <div className="flex flex-col gap-4 w-full">
          <Link
            href="/#"
            className="flex items-center gap-3 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold shadow-lg transition-all duration-300 hover:bg-primary/80 hover:scale-105 active:scale-95 justify-center"
          >
            <IconPalette className="w-5 h-5" />
            <span>N/A</span>
          </Link>

          <Link
            href="/#"
            className="flex items-center gap-3 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold shadow-lg transition-all duration-300 hover:bg-primary/80 hover:scale-105 active:scale-95 justify-center"
          >
            <IconTypography className="w-5 h-5" />
            <span>N/A</span>
          </Link>

          <Link
            href="/#"
            className="flex items-center gap-3 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold shadow-lg transition-all duration-300 hover:bg-primary/80 hover:scale-105 active:scale-95 justify-center"
          >
            <IconComponents className="w-5 h-5" />
            <span>N/A</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
