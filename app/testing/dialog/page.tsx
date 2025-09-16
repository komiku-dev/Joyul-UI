"use client";

import {
  useControlState,
  Controls,
  ControlsTitle,
  ControlsFolder,
  ControlsDropdown,
} from "@/components/controls/index";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogActionList,
  DialogAction,
} from "@/components/ui/dialog";

export default function DialogExample() {
  const { controlsState, updateControl } = useControlState();

  //   Actions
  const ActionOneVariant = controlsState["action-one-variant"];
  const ActionTwoVariant = controlsState["action-two-variant"];

  return (
    <>
      <Controls title=" Dialog Controls">
        <ControlsTitle title="Actions" />
        <ControlsFolder title="Action 1">
          <ControlsDropdown
            title="Variant"
            id={"action-one-variant"}
            initialValue={"outline"}
            options={[
              { label: "Default", value: "default" },
              { label: "Secondary", value: "secondary" },
              { label: "Destructive", value: "destructive" },
              { label: "Outline", value: "outline" },
              { label: "Ghost", value: "ghost" },
              { label: "Link", value: "link" },
            ]}
          />
        </ControlsFolder>
        <ControlsFolder title="Action 2">
          <ControlsDropdown
            title="Variant"
            id={"action-two-variant"}
            initialValue={"secondary"}
            options={[
              { label: "Default", value: "default" },
              { label: "Secondary", value: "secondary" },
              { label: "Destructive", value: "destructive" },
              { label: "Outline", value: "outline" },
              { label: "Ghost", value: "ghost" },
              { label: "Link", value: "link" },
            ]}
          />
        </ControlsFolder>
      </Controls>
      <Dialog onOpenChange={(open) => updateControl("dialog-state", open)}>
        <DialogTrigger
          className={
            "flex h-10 items-center justify-center rounded-md px-3.5 text-base font-medium select-none bg-primary text-primary-foreground hover:bg-primary/90"
          }
        >
          Click me
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>This is an dialog</DialogTitle>
          <DialogDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
            deserunt fuga, doloremque totam consequuntur beatae eligendi,
            laborum exercitationem, quae quisquam delectus voluptatum! Assumenda
            excepturi quis vitae illum, corrupti saepe nemo!
          </DialogDescription>
          <DialogActionList>
            <DialogAction variant={ActionOneVariant}>Action 1</DialogAction>
            <DialogAction variant={ActionTwoVariant}>Action 2</DialogAction>
          </DialogActionList>
        </DialogContent>
      </Dialog>
    </>
  );
}
