"use client";

import React, { useState } from "react";
import Link from "next/link";
import ThemeSwitchButton from "@/components/themeSwitchButton";
import { IconArrowLeft } from "@tabler/icons-react";

const normalVariants = [
  { label: "Regular", className: "font-normal" },
  { label: "Medium", className: "font-medium" },
  { label: "Semibold", className: "font-semibold" },
  { label: "Bold", className: "font-bold" },
  { label: "Black", className: "font-black" },
];

const italicVariants = [
  { label: "Italic", className: "font-normal italic" },
  { label: "Medium Italic", className: "font-medium italic" },
  { label: "Semibold Italic", className: "font-semibold italic" },
  { label: "Bold Italic", className: "font-bold italic" },
  { label: "Black Italic", className: "font-black italic" },
];

const animationBase =
  "animate-in fade-in slide-in-from-bottom-5 duration-700 ease-out";

interface FontVariantCardProps {
  label: string;
  className: string;
  value: string;
  onInput: (value: string) => void;
}

const FontVariantCard: React.FC<FontVariantCardProps> = ({
  label,
  className,
  value,
  onInput,
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={`group bg-surface border border-border rounded-xl p-4 flex flex-col gap-3 shadow-lg transition-all duration-200 
                 hover:border-primary/80 hover:shadow-xl hover:-translate-y-1
                 focus-within:border-primary/80 focus-within:shadow-xl focus-within:-translate-y-1`}
      onClick={() => inputRef.current?.focus()}
      style={{ cursor: "text" }}
    >
      <span className="text-sm font-semibold text-muted-foreground px-1">
        {label}
      </span>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onInput(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`flex-grow w-full rounded-md p-2 text-center text-[2rem] font-satoshi ${className} bg-transparent outline-none transition-all duration-200`}
        style={{
          letterSpacing: "-0.01em",
          pointerEvents: isFocused ? "auto" : "none",
        }}
      />
    </div>
  );
};

export default function FontPage() {
  const [text, setText] = useState(
    "The quick brown fox jumps over the lazy dog."
  );

  return (
    <main className="min-h-screen bg-background text-foreground p-4 sm:p-8 md:p-12 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[20%] left-[10%] w-96 h-96 bg-primary/20 dark:bg-primary/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute top-[40%] left-[50%] w-96 h-96 bg-primary/20 dark:bg-primary/10 rounded-full filter blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-[10%] right-[10%] w-96 h-96 bg-primary/20 dark:bg-primary/10 rounded-full filter blur-3xl animate-pulse delay-4000"></div>
      </div>

      <div className="w-full max-w-4xl mx-auto flex flex-col gap-12">
        <header className="flex flex-col sm:flex-row items-start justify-between gap-4 pb-6 animate-in fade-in slide-in-from-top-5 duration-700 ease-out">
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tighter">
              Satoshi Font Viewer
            </h1>
            <p className="text-muted-foreground mt-2 max-w-2xl">
              Preview all Satoshi font weights and styles. Edit the text below
              to see live updates.
            </p>
          </div>
          <div className="flex-shrink-0 flex items-center gap-2">
            <ThemeSwitchButton />
            <Link
              href="./"
              className="flex items-center gap-2 text-primary-foreground bg-primary px-4 py-2 rounded-full shadow-lg hover:bg-primary/80 transition-all font-semibold whitespace-nowrap hover:scale-105 active:scale-95"
            >
              <IconArrowLeft />
              Back
            </Link>
          </div>
        </header>

        <section
          className={`bg-black/15 dark:bg-white/5 backdrop-blur-xl p-4 sm:p-6 rounded-2xl shadow-2xl border border-white/10 ${animationBase}`}
        >
          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-col gap-10 w-full">
              <div>
                <h2 className="text-xl font-bold tracking-tight mb-4 text-foreground text-left">
                  Normal
                </h2>
                <div className="flex flex-col gap-6 w-full">
                  {normalVariants.map((variant) => (
                    <FontVariantCard
                      key={variant.label}
                      label={variant.label}
                      className={variant.className}
                      value={text}
                      onInput={setText}
                    />
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-tight mb-4 text-foreground text-left">
                  Italic
                </h2>
                <div className="flex flex-col gap-6 w-full">
                  {italicVariants.map((variant) => (
                    <FontVariantCard
                      key={variant.label}
                      label={variant.label}
                      className={variant.className}
                      value={text}
                      onInput={setText}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
