import { IconAlertTriangle, IconBulb } from "@tabler/icons-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-16">
      <IconAlertTriangle className="w-12 h-12 text-primary animate-bounce" />
      <h2 className="text-3xl font-extrabold tracking-tight text-foreground">
        Components Explorer
      </h2>
      <p className="text-lg text-muted-foreground text-center max-w-xl">
        Welcome to the Components Explorer! Here you&apos;ll soon find a
        comprehensive list of all UI components available in this project,
        complete with usage examples and documentation.
      </p>

      <div className="w-full max-w-md bg-muted/40 dark:bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10 flex flex-col gap-3 mt-2">
        <span className="text-base font-semibold text-foreground">
          Planned Components:
        </span>
        <ul className="list-disc list-inside text-muted-foreground text-sm pl-2 space-y-1">
          <li>Button</li>
          <li>Input</li>
          <li>Card</li>
          <li>Modal</li>
          <li>Dropdown</li>
          <li>And more...</li>
        </ul>
      </div>

      <Link
        href="https://github.com/komiku-dev/Joyul-UI/issues/new?title=Component+Suggestion&labels=enhancement&type=feature"
        target="_blank"
        className="mt-4 inline-flex items-center gap-2 text-primary-foreground bg-primary px-5 py-2 rounded-full shadow-lg hover:bg-primary/80 transition-all font-semibold whitespace-nowrap hover:scale-105 active:scale-95"
      >
        <IconBulb /> Suggest a Component
      </Link>
    </div>
  );
}
