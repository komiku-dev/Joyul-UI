import { ControlsProvider } from "@/components/controls";
import ThemeSwitcher from "@/components/theme-switcher";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-8 md:p-12 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[20%] left-[10%] w-96 h-96 bg-primary/20 dark:bg-primary/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute top-[40%] left-[50%] w-96 h-96 bg-primary/20 dark:bg-primary/10 rounded-full filter blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-[10%] right-[10%] w-96 h-96 bg-primary/20 dark:bg-primary/10 rounded-full filter blur-3xl animate-pulse delay-4000"></div>
      </div>

      <div className="w-full max-w-7xl mx-auto flex flex-col gap-4">
        <header className="flex flex-col sm:flex-row items-start justify-between gap-4 pb-6 animate-in fade-in slide-in-from-top-5 duration-700 ease-out">
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tighter">
              Component Testing Page
            </h1>
            <p className="text-muted-foreground mt-2 max-w-2xl">
              I mainly made this page for myself to test components. Feel free
              to use it to try out UI elements in isolation.
            </p>
          </div>
          <div className="flex-shrink-0 flex items-center gap-2">
            <ThemeSwitcher />
            <Link
              href="/"
              className="flex items-center gap-2 text-primary-foreground bg-primary px-4 py-2 rounded-full shadow-lg hover:bg-primary/80 transition-all font-semibold whitespace-nowrap hover:scale-105 active:scale-95"
            >
              <IconArrowLeft />
              Back
            </Link>
          </div>
        </header>

        <main className="bg-muted relative rounded-2xl aspect-video shadow-2xl flex justify-center items-center border animate-in fade-in slide-in-from-bottom-5 duration-700 ease-out">
          <ControlsProvider>{children}</ControlsProvider>
        </main>
      </div>
    </div>
  );
}
