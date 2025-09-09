import * as React from "react";
import { cn } from "@/libs/utils";

import { Accordion as AccordionPrimitives } from "@base-ui-components/react";
import { IconChevronDown } from "@tabler/icons-react";

function Accordion({
  openMultiple = false,
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitives.Root>) {
  return (
    <AccordionPrimitives.Root
      openMultiple={openMultiple}
      className={cn("flex flex-col justify-center text-foreground", className)}
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
      className={cn(
        "group",
        "not-last:border-b dark:border-foreground/15",
        "data-[disabled]:opacity-70",
        className
      )}
      {...props}
    />
  );
}

function AccordionTrigger({
  children,
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitives.Trigger>) {
  return (
    <AccordionPrimitives.Header>
      <AccordionPrimitives.Trigger
        className={cn(
          "group relative flex w-full items-baseline justify-between gap-4 py-2 pr-1 pl-3 text-left font-medium hover:underline",
          "disabled:cursor-not-allowed disabled:no-underline disabled:opacity-50",
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
        "h-[var(--accordion-panel-height)] overflow-hidden text-base text-muted-foreground",
        "transition-[height] ease-out data-[ending-style]:h-0 data-[starting-style]:h-0",
        "group-data-[disabled]:opacity-70",
        className
      )}
      {...props}
    />
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
