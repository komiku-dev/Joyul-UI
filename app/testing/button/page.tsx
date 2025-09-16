"use client";

import {
  Controls,
  ControlsDropdown,
  ControlsText,
  useControlState,
  ControlsConditional,
  IconPicker,
  iconMap,
} from "@/components/controls";
import { Button } from "@/components/ui/button";
import { IconComponent } from "@/components/controls/internal/icon-manifest";

export default function ButtonExample() {
  const { controlsState } = useControlState();

  const variant = controlsState["variant"];
  const size = controlsState["size"];
  const text = controlsState["text"];
  const selectedIconName = controlsState["icon"];

  const IconComponent: IconComponent | undefined = iconMap[selectedIconName];

  return (
    <>
      <Controls>
        <ControlsDropdown
          id="variant"
          title="Variant"
          initialValue="default"
          options={[
            { label: "Default", value: "default" },
            { label: "Secondary", value: "secondary" },
            { label: "Destructive", value: "destructive" },
            { label: "Outline", value: "outline" },
            { label: "Ghost", value: "ghost" },
            { label: "Link", value: "link" },
          ]}
        />
        <ControlsDropdown
          id="size"
          title="Size"
          initialValue="default"
          options={[
            { label: "Default", value: "default" },
            { label: "Small", value: "sm" },
            { label: "Large", value: "lg" },
            { label: "Icon", value: "icon" },
          ]}
        />
        <ControlsConditional
          condition={(controlsState) => controlsState["size"] !== "icon"}
        >
          <ControlsText
            id={"text"}
            title="Button Text"
            initialValue={"Click me!"}
          />
        </ControlsConditional>
        <ControlsConditional when="size" is="icon">
          <IconPicker id={"icon"} initialValue={"IconSettings"} />
        </ControlsConditional>
      </Controls>
      <Button variant={variant} size={size}>
        {size === "icon" && IconComponent ? (
          <IconComponent className="h-4 w-4" />
        ) : (
          text
        )}
      </Button>
    </>
  );
}
