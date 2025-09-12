"use client";

import {
  useControlState,
  Controls,
  ControlsTitle,
  ControlsFolder,
  ControlsDropdown,
} from "@/components/controls/index";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogActionList,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

export default function AlertDialogExample() {
  const { controlsState, updateControl } = useControlState();

  //   Actions
  const ActionOneVariant = controlsState["action-one-variant"];
  const ActionTwoVariant = controlsState["action-two-variant"];

  return (
    <>
      <Controls title="Alert Dialog Controls">
        <ControlsTitle title="Actions" />
        <ControlsFolder title="Action 1">
          <ControlsDropdown
            title="Variant"
            id={"action-one-variant"}
            initialValue={"default"}
            options={[
              { label: "Default", value: "default" },
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
            initialValue={"destructive"}
            options={[
              { label: "Default", value: "default" },
              { label: "Destructive", value: "destructive" },
              { label: "Outline", value: "outline" },
              { label: "Ghost", value: "ghost" },
              { label: "Link", value: "link" },
            ]}
          />
        </ControlsFolder>
      </Controls>
      <AlertDialog onOpenChange={(open) => updateControl("dialog-state", open)}>
        <AlertDialogTrigger
          className={
            "flex h-10 items-center justify-center rounded-md px-3.5 text-base font-medium select-none bg-primary text-primary-foreground hover:bg-primary/90"
          }
        >
          Click me
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>This is an alert dialog</AlertDialogTitle>
          <AlertDialogDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
            deserunt fuga, doloremque totam consequuntur beatae eligendi,
            laborum exercitationem, quae quisquam delectus voluptatum! Assumenda
            excepturi quis vitae illum, corrupti saepe nemo!
          </AlertDialogDescription>
          <AlertDialogActionList>
            <AlertDialogAction variant={ActionOneVariant}>
              Action 1
            </AlertDialogAction>
            <AlertDialogAction variant={ActionTwoVariant}>
              Action 2
            </AlertDialogAction>
          </AlertDialogActionList>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
