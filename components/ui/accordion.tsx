import * as React from "react";
import { cn } from "@/libs/utils";

import { Accordion as AccordionPrimitives } from "@base-ui-components/react";
import { IconChevronDown } from "@tabler/icons-react";

function Accordion({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitives.Root>) {
  return (
    <AccordionPrimitives.Root
      className={cn("flex flex-col justify-center w-full", className)}
      {...props}
    />
  );
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitives.Item>) {
  return (
    <AccordionPrimitives.Item
      className={cn("not-last:border-b", className)}
      {...props}
    />
  );
}

function AccordionHeader({
  children,
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitives.Trigger>) {
  return (
    <AccordionPrimitives.Header>
      <AccordionPrimitives.Trigger
        className={cn(
          "group relative flex w-full items-center justify-between gap-4 py-2 pr-1 pl-3 text-left font-medium hover:underline",
          className
        )}
        {...props}
      >
        {children}
        <IconChevronDown className="mr-2 size-4 transition-all ease-out group-data-[panel-open]:rotate-180" />
      </AccordionPrimitives.Trigger>
    </AccordionPrimitives.Header>
  );
}

function AccordionContent({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitives.Panel>) {
  return (
    <AccordionPrimitives.Panel
      className={cn(
        "h-[var(--accordion-panel-height)] px-3 pb-4 pt-1 overflow-hidden text-base text-muted-foreground transition-[height] ease-out data-[ending-style]:h-0 data-[starting-style]:h-0",
        className
      )}
      {...props}
    />
  );
}

export { Accordion, AccordionItem, AccordionHeader, AccordionContent };
