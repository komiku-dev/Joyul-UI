"use client";

import {
  Controls,
  ControlsFolder,
  ControlsToggle,
  useControlState,
} from "@/components/controls";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
} from "@/components/ui/avatar";

export default function AvatarExample() {
  const { controlsState } = useControlState();

  const singleGrayscaled = controlsState["single-grayscaled"];
  const groupGrayscaled = controlsState["group-grayscaled"];
  const showImage = controlsState["show-image"];

  return (
    <>
      <Controls>
        <ControlsFolder title="Singular">
          <ControlsToggle
            title="Grayscaled"
            id="single-grayscaled"
            initialValue={false}
          />
          <ControlsToggle
            title="Show Image"
            id="show-image"
            initialValue={true}
          />
        </ControlsFolder>
        <ControlsFolder title="Group">
          <ControlsToggle
            title="Grayscaled"
            id="group-grayscaled"
            initialValue={false}
          />
        </ControlsFolder>
      </Controls>
      <div className="flex flex-row flex-wrap items-center gap-12">
        <Avatar grayscaled={singleGrayscaled}>
          <AvatarImage
            src={
              showImage &&
              "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80"
            }
            width="48"
            height="48"
          />
          <AvatarFallback>LT</AvatarFallback>
        </Avatar>
        <AvatarGroup grayscaled={groupGrayscaled}>
          <Avatar>
            <AvatarImage
              src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80"
              width="48"
              height="48"
            />
            <AvatarFallback>LT</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage
              src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80"
              width="48"
              height="48"
            />
            <AvatarFallback>LT</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage
              src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80"
              width="48"
              height="48"
            />
            <AvatarFallback>LT</AvatarFallback>
          </Avatar>
        </AvatarGroup>
      </div>
    </>
  );
}
