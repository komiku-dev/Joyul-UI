import * as React from "react";
import { Avatar as AvatarPrimitives } from "@base-ui-components/react/avatar";

import { cn } from "@/libs/utils";

function Avatar({
  grayscaled = false,
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitives.Root> & {
  grayscaled?: boolean;
}) {
  return (
    <AvatarPrimitives.Root
      data-slot="avatar"
      className={cn(
        "relative flex size-12 shrink-0 overflow-hidden rounded-full bg-accent select-none align-middle text-base text-secondary-foreground font-medium border-2",
        grayscaled &&
          "grayscale hover:grayscale-0",
        className
      )}
      {...props}
    />
  );
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitives.Image>) {
  return (
    <AvatarPrimitives.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full object-cover", className)}
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitives.Fallback>) {
  return (
    <AvatarPrimitives.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "flex size-full items-center justify-center rounded-full bg-secondary",
        className
      )}
      {...props}
    />
  );
}

function AvatarGroup({
  grayscaled = false,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  grayscaled?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex -space-x-4",
        grayscaled &&
          "*:data-[slot=avatar]:grayscale *:data-[slot=avatar]:hover:grayscale-0",
        className
      )}
      {...props}
    />
  );
}

export { Avatar, AvatarImage, AvatarFallback, AvatarGroup };
