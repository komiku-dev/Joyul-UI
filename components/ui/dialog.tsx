import * as React from "react";
import { cn } from "@/libs/utils";
import { type VariantProps } from "class-variance-authority";

import { Dialog as DialogPrimitives } from "@base-ui-components/react/dialog";
import { buttonVariants } from "./button";

function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitives.Root>) {
  return <DialogPrimitives.Root {...props} />;
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitives.Trigger>) {
  return <DialogPrimitives.Trigger {...props} />;
}

function DialogContent({
  children,
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitives.Popup>) {
  return (
    <DialogPrimitives.Portal>
      <DialogPrimitives.Backdrop
        className={cn(
          "fixed inset-0 bg-black/20 z-50 backdrop-blur-lg",
          "transition-colors data-[open]:animate-in data-[closed]:animate-out data-[open]:fade-in-0 data-[closed]:fade-out-0"
        )}
      />
      <DialogPrimitives.Popup
        className={cn(
          "fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 w-full max-w-[calc(100%-2rem)] sm:max-w-lg",
          "bg-surface text-foreground rounded-xl outline-border outline-2 transition-all",
          "data-[open]:animate-in data-[open]:fade-in-0 data-[open]:zoom-in-95 ", // Opening animations
          "data-[closed]:animate-out data-[closed]:fade-out-0 data-[closed]:zoom-out-95 ", // Closing animations
          className
        )}
        {...props}
      >
        {children}
      </DialogPrimitives.Popup>
    </DialogPrimitives.Portal>
  );
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitives.Title>) {
  return (
    <DialogPrimitives.Title
      className={cn("-mt-1.5 mb-1 text-lg font-medium", className)}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitives.Description>) {
  return (
    <DialogPrimitives.Description
      className={cn("mb-6 text-base text-muted-foreground", className)}
      {...props}
    />
  );
}

function DialogActionList({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div className={cn("flex justify-end gap-4", className)} {...props} />;
}

function DialogAction({
  variant,
  size,
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitives.Close> &
  VariantProps<typeof buttonVariants>) {
  return (
    <DialogPrimitives.Close
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogActionList,
  DialogAction,
};
