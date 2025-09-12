import * as React from "react";
import { cn } from "@/libs/utils";
import { cva, type VariantProps } from "class-variance-authority";

import { AlertDialog as AlertDialogPrimitives } from "@base-ui-components/react/alert-dialog";

function AlertDialog({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitives.Root>) {
  return <AlertDialogPrimitives.Root {...props} />;
}

function AlertDialogTrigger({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitives.Trigger>) {
  return <AlertDialogPrimitives.Trigger {...props} />;
}

function AlertDialogContent({
  children,
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitives.Popup>) {
  return (
    <AlertDialogPrimitives.Portal>
      <AlertDialogPrimitives.Backdrop
        className={cn(
          "fixed inset-0 bg-black/20 z-50 backdrop-blur-lg",
          "transition-colors data-[open]:animate-in data-[closed]:animate-out data-[open]:fade-in-0 data-[closed]:fade-out-0"
        )}
      />
      <AlertDialogPrimitives.Popup
        className={cn(
          "fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 w-full max-w-[calc(100%-2rem)] sm:max-w-lg",
          "bg-background text-foreground rounded-xl outline-border outline-2 transition-all",
          "data-[open]:animate-in data-[open]:fade-in-0 data-[open]:zoom-in-95 ", // Opening animations
          "data-[closed]:animate-out data-[closed]:fade-out-0 data-[closed]:zoom-out-95 ", // Closing animations
          className
        )}
        {...props}
      >
        {children}
      </AlertDialogPrimitives.Popup>
    </AlertDialogPrimitives.Portal>
  );
}

function AlertDialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitives.Title>) {
  return (
    <AlertDialogPrimitives.Title className={cn("-mt-1.5 mb-1 text-lg font-medium", className)} {...props} />
  );
}

function AlertDialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitives.Description>) {
  return (
    <AlertDialogPrimitives.Description
      className={cn("mb-6 text-base text-muted-foreground", className)}
      {...props}
    />
  );
}

function AlertDialogActionList({ className, ...props}: React.ComponentProps<"div">) {
    return <div className={cn("flex justify-end gap-4", className)} {...props} />
}

const alertDialogActionVariants = cva(
  "flex h-10 items-center justify-center rounded-md px-3.5 text-base font-medium select-none",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "underline-offset-4 hover:underline text-primary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface AlertDialogActionProps
  extends React.ComponentProps<typeof AlertDialogPrimitives.Close>,
    VariantProps<typeof alertDialogActionVariants> {}

function AlertDialogAction({
  variant,
  className,
  ...props
}: AlertDialogActionProps) {
  return (
    <AlertDialogPrimitives.Close
      className={cn(alertDialogActionVariants({ variant, className }))}
      {...props}
    />
  );
}

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogActionList,
  AlertDialogAction,
};
