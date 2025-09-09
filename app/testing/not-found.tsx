import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 text-center p-8">
      <h2 className="text-5xl font-extrabold tracking-tighter text-destructive">
        404
      </h2>
      <h1 className="text-3xl font-bold">Testing Component Not Found</h1>
      <p className="text-muted-foreground max-w-sm">
        The specific component you are trying to test does not exist or the URL
        is incorrect.
      </p>
      <Link
        href="/"
        className="mt-4 flex items-center gap-2 text-primary-foreground bg-primary px-4 py-2 rounded-full shadow-lg hover:bg-primary/80 transition-all font-semibold whitespace-nowrap hover:scale-105 active:scale-95"
      >
        Back to Home
      </Link>
    </div>
  );
}