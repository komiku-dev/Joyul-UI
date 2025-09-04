"use client";

import React, { JSX, useCallback } from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import ThemeSwitchButton from "@/components/themeSwitchButton";

const oklchColorMap: Record<string, string> = {
  "base-50": "oklch(0.9847 0.0007 105.41)",
  "base-100": "oklch(0.9699 0.0013 106.42)",
  "base-200": "oklch(0.9246 0.0018 106.79)",
  "base-300": "oklch(0.869 0.0021 107.63)",
  "base-400": "oklch(0.7077 0.0023 108.31)",
  "base-500": "oklch(0.5533 0.0025 109.81)",
  "base-600": "oklch(0.4445 0.0025 110.94)",
  "base-700": "oklch(0.3735 0.0023 110.14)",
  "base-800": "oklch(0.2709 0.0019 108.92)",
  "base-900": "oklch(0.2139 0.0018 109.18)",
  "base-950": "oklch(0.1423 0.0017 108.09)",
  "primary-50": "oklch(0.9625 0 343.42)",
  "primary-100": "oklch(0.9404 0 342.49)",
  "primary-200": "oklch(0.8926 0 343.44)",
  "primary-300": "oklch(0.8179 0 346.21)",
  "primary-400": "oklch(0.7142 0 348.95)",
  "primary-500": "oklch(0.653 0 350.51)",
  "primary-600": "oklch(0.5899 0 354.76)",
  "primary-700": "oklch(0.5235 0 357.11)",
  "primary-800": "oklch(0.4582 0 357.94)",
  "primary-900": "oklch(0.4076 0 358.52)",
  "primary-950": "oklch(0.3211 0 0)",
  "secondary-50": "oklch(0.9823 0.0045 220.78)",
  "secondary-100": "oklch(0.955 0.01 221.14)",
  "secondary-200": "oklch(0.9103 0.0194 220.55)",
  "secondary-300": "oklch(0.8478 0.0334 220.8)",
  "secondary-400": "oklch(0.7687 0.044 224.23)",
  "secondary-500": "oklch(0.7007 0.0437 225.93)",
  "secondary-600": "oklch(0.5724 0.0397 229.02)",
  "secondary-700": "oklch(0.5104 0.0334 230.12)",
  "secondary-800": "oklch(0.4469 0.0272 231.22)",
  "secondary-900": "oklch(0.3949 0.0224 232.84)",
  "secondary-950": "oklch(0.2979 0.0171 233.64)",
  "destructive-50": "oklch(0.97 0.04 25)",
  "destructive-100": "oklch(0.95 0.08 25)",
  "destructive-200": "oklch(0.9 0.12 25)",
  "destructive-300": "oklch(0.85 0.16 25)",
  "destructive-400": "oklch(0.78 0.2 25)",
  "destructive-500": "oklch(0.704 0.191 22.216)",
  "destructive-600": "oklch(0.577 0.245 27.325)",
  "destructive-700": "oklch(0.5 0.22 28)",
  "destructive-800": "oklch(0.42 0.19 28)",
  "destructive-900": "oklch(0.35 0.16 28)",
  "destructive-950": "oklch(0.28 0.13 28)",
  "success-50": "oklch(0.97 0.03 150)",
  "success-100": "oklch(0.94 0.06 150)",
  "success-200": "oklch(0.89 0.09 150)",
  "success-300": "oklch(0.83 0.12 150)",
  "success-400": "oklch(0.76 0.15 150)",
  "success-500": "oklch(0.7 0.18 150)",
  "success-600": "oklch(0.6 0.15 150)",
  "success-700": "oklch(0.53 0.13 150)",
  "success-800": "oklch(0.45 0.11 150)",
  "success-900": "oklch(0.38 0.09 150)",
  "success-950": "oklch(0.3 0.07 150)",
  "warning-50": "oklch(0.98 0.04 95)",
  "warning-100": "oklch(0.96 0.07 95)",
  "warning-200": "oklch(0.92 0.1 95)",
  "warning-300": "oklch(0.88 0.13 95)",
  "warning-400": "oklch(0.82 0.16 95)",
  "warning-500": "oklch(0.75 0.18 95)",
  "warning-600": "oklch(0.68 0.15 95)",
  "warning-700": "oklch(0.6 0.13 95)",
  "warning-800": "oklch(0.52 0.11 95)",
  "warning-900": "oklch(0.45 0.09 95)",
  "warning-950": "oklch(0.38 0.07 95)",
};

const colorData = {
  palettes: {
    Base: [
      "base-50",
      "base-100",
      "base-200",
      "base-300",
      "base-400",
      "base-500",
      "base-600",
      "base-700",
      "base-800",
      "base-900",
      "base-950",
    ],
    Primary: [
      "primary-50",
      "primary-100",
      "primary-200",
      "primary-300",
      "primary-400",
      "primary-500",
      "primary-600",
      "primary-700",
      "primary-800",
      "primary-900",
      "primary-950",
    ],
    Secondary: [
      "secondary-50",
      "secondary-100",
      "secondary-200",
      "secondary-300",
      "secondary-400",
      "secondary-500",
      "secondary-600",
      "secondary-700",
      "secondary-800",
      "secondary-900",
      "secondary-950",
    ],
  },
  status: {
    Destructive: [
      "destructive-50",
      "destructive-100",
      "destructive-200",
      "destructive-300",
      "destructive-400",
      "destructive-500",
      "destructive-600",
      "destructive-700",
      "destructive-800",
      "destructive-900",
      "destructive-950",
    ],
    Success: [
      "success-50",
      "success-100",
      "success-200",
      "success-300",
      "success-400",
      "success-500",
      "success-600",
      "success-700",
      "success-800",
      "success-900",
      "success-950",
    ],
    Warning: [
      "warning-50",
      "warning-100",
      "warning-200",
      "warning-300",
      "warning-400",
      "warning-500",
      "warning-600",
      "warning-700",
      "warning-800",
      "warning-900",
      "warning-950",
    ],
  },
  semantic: [
    { name: "Background", bg: "background", fg: "foreground" },
    { name: "Surface", bg: "surface", fg: "surface-foreground" },
    { name: "Primary", bg: "primary", fg: "primary-foreground" },
    { name: "Accent", bg: "accent", fg: "accent-foreground" },
    { name: "Destructive", bg: "destructive", fg: "destructive-foreground" },
    { name: "Success", bg: "success", fg: "success-foreground" },
    { name: "Warning", bg: "warning", fg: "warning-foreground" },
    { name: "Muted", bg: "muted", fg: "muted-foreground" },
    { name: "Border", bg: "border" },
    { name: "Ring", bg: "ring" },
  ],
};

function useCopyToClipboard(): (text: string) => void {
  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`Copied "${text}" to clipboard!`);
    } catch (err) {
      toast.error("Failed to copy.");
      console.error("Failed to copy: ", err);
    }
  }, []);

  return copy;
}

const ArrowLeftIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    {...props}
  >
    <path
      d="M19 12H5m7 7-7-7 7-7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Section: React.FC<{
  title: string;
  children: React.ReactNode;
  className?: string;
  animationClasses: string;
}> = ({ title, children, className = "", animationClasses }) => (
  <section
    className={`bg-black/20 dark:bg-white/5 backdrop-blur-xl p-4 sm:p-6 rounded-2xl shadow-2xl border border-white/10 ${animationClasses} ${className}`}
  >
    <h2 className="text-2xl font-bold tracking-tight mb-6 text-foreground">
      {title}
    </h2>
    {children}
  </section>
);

const Tooltip: React.FC<{ text: string; children: React.ReactNode }> = ({
  text,
  children,
}) => (
  <div className="group relative flex justify-center">
    {children}
    <span className="absolute bottom-full mb-2 w-max px-2 py-1 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
      {text}
    </span>
  </div>
);

interface SemanticTokenCardProps {
  token: { name: string; bg: string; fg?: string };
  onCopy: (text: string) => void;
}
const SemanticTokenCard: React.FC<SemanticTokenCardProps> = ({
  token,
  onCopy,
}) => {
  const { name, bg, fg } = token;
  const bgVar = `var(--${bg})`;
  const fgVar = fg ? `var(--${fg})` : "inherit";

  return (
    <div
      className="group bg-surface border border-border rounded-xl p-3 flex flex-col gap-3 h-36 transition-all duration-200 hover:border-primary/80 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
      onClick={() => onCopy(bgVar)}
    >
      <span className="text-sm font-semibold text-muted-foreground px-1">
        {name}
      </span>

      <div
        className="flex-grow w-full rounded-md flex items-center justify-center p-2 text-center"
        style={{ backgroundColor: bgVar, color: fgVar }}
      >
        {fg ? (
          <span className="font-bold text-2xl tracking-tight">Aa</span>
        ) : null}
      </div>
    </div>
  );
};

interface ColorRampSectionProps {
  title: string;
  data: Record<string, string[]>;
  onCopy: (colorVar: string) => void;
  animationClasses: string;
}
const ColorRampSection: React.FC<ColorRampSectionProps> = ({
  title,
  data,
  onCopy,
  animationClasses,
}) => {
  const shadeLabels = colorData.palettes.Base.map((c) => c.split("-").pop());

  return (
    <Section title={title} animationClasses={animationClasses}>
      <div className="flex flex-col gap-4">
        <div className="hidden md:grid grid-cols-[100px_1fr] items-center pr-1.5">
          <div></div>
          <div className="grid grid-cols-11 gap-3">
            {shadeLabels.map((label) => (
              <div
                key={label}
                className="text-center font-mono text-xs text-muted-foreground"
              >
                {label}
              </div>
            ))}
          </div>
        </div>
        {Object.entries(data).map(([name, colors]) => (
          <div
            key={name}
            className="grid grid-cols-1 md:grid-cols-[100px_1fr] items-center gap-x-4 gap-y-2"
          >
            <div className="font-semibold text-sm text-muted-foreground md:text-right pr-4">
              {name}
            </div>
            <div className="grid grid-cols-6 sm:grid-cols-11 gap-1.5 sm:gap-3">
              {colors.map((color) => {
                const cssVar = `var(--${color})`;
                const oklchValueToCopy = oklchColorMap[color] || cssVar;

                return (
                  <Tooltip key={color} text={color}>
                    <div
                      className="h-10 w-full rounded-lg cursor-pointer transition-transform duration-200 hover:scale-110 active:scale-95"
                      style={{ backgroundColor: cssVar }}
                      onClick={() => onCopy(oklchValueToCopy)}
                    />
                  </Tooltip>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default function ThemeColorsPage(): JSX.Element {
  const handleCopy = useCopyToClipboard();

  const animationBase =
    "animate-in fade-in slide-in-from-bottom-5 duration-700 ease-out";

  return (
    <main className="min-h-screen bg-background text-foreground p-4 sm:p-8 md:p-12 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[20%] left-[10%] w-96 h-96 bg-primary/20 dark:bg-primary/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute top-[40%] left-[50%] w-96 h-96 bg-primary/20 dark:bg-primary/10 rounded-full filter blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-[10%] right-[10%] w-96 h-96 bg-primary/20 dark:bg-primary/10 rounded-full filter blur-3xl animate-pulse delay-4000"></div>
      </div>

      <div className="w-full max-w-7xl mx-auto flex flex-col gap-12">
        <header className="flex flex-col sm:flex-row items-start justify-between gap-4 pb-6 animate-in fade-in slide-in-from-top-5 duration-700 ease-out">
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tighter">
              Theme Color System
            </h1>
            <p className="text-muted-foreground mt-2 max-w-2xl">
              A complete reference for the project&apos;s color tokens. Click
              any swatch to copy its CSS variable or OKLCH value.
            </p>
          </div>
          <div className="flex-shrink-0 flex items-center gap-2">
            <ThemeSwitchButton /> {/* <-- ADD THE NEW BUTTON HERE */}
            <Link
              href="./"
              className="flex items-center gap-2 text-primary-foreground bg-primary px-4 py-2 rounded-full shadow-lg hover:bg-primary/80 transition-all font-semibold whitespace-nowrap hover:scale-105 active:scale-95"
            >
              <ArrowLeftIcon />
              Back
            </Link>
          </div>
        </header>

        <Section title="Semantic Tokens" animationClasses={animationBase}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {colorData.semantic.map((token) => (
              <SemanticTokenCard
                key={token.bg}
                token={token}
                onCopy={handleCopy}
              />
            ))}
          </div>
        </Section>

        <ColorRampSection
          title="Core Palettes"
          data={colorData.palettes}
          onCopy={handleCopy}
          animationClasses={`${animationBase} delay-150`}
        />

        <ColorRampSection
          title="Status Colors"
          data={colorData.status}
          onCopy={handleCopy}
          animationClasses={`${animationBase} delay-300`}
        />
      </div>
    </main>
  );
}
