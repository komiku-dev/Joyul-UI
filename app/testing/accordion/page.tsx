"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  useControlState,
  Controls,
  ControlsFolder,
  ControlsCheckbox,
  ControlsText,
  ControlsSeparator,
  ControlsTitle,
} from "@/components/controls";

export default function ExampleAccordion() {
  const { controlsState } = useControlState();

  // Root
  const rootMultiple = controlsState["root-multiple"];
  const rootDisabled = controlsState["root-disabled"];

  // Item 1
  const item1Value = controlsState["item-1-value"];
  const item1Disabled = controlsState["item-1-disabled"];

  // Item 2
  const item2Value = controlsState["item-2-value"];
  const isItem2Disabled = controlsState["item-2-disabled"];

  // Item 3
  const item3Value = controlsState["item-3-value"];
  const item3Disabled = controlsState["item-3-disabled"];

  return (
    <>
      <Controls title="Controls">
        <ControlsTitle title="Root" />
        <ControlsCheckbox
          title="Open multiple"
          id="root-multiple"
          initialValue={false}
        />
        <ControlsCheckbox
          title="Disabled"
          id="root-disabled"
          initialValue={false}
        />
        <ControlsSeparator />
        <ControlsTitle title="Items" />
        <ControlsFolder title="Item 1">
          <ControlsText
            title="Value"
            id="item-1-value"
            initialValue={"item-1"}
          />
          <ControlsCheckbox
            title="Disabled"
            id="item-1-disabled"
            initialValue={false}
          />
        </ControlsFolder>
        <ControlsFolder title="Item 2">
          <ControlsText
            title="Value"
            id="item-2-value"
            initialValue={"item-2"}
          />
          <ControlsCheckbox
            title="Disabled"
            id="item-2-disabled"
            initialValue={false}
          />
        </ControlsFolder>
        <ControlsFolder title="Item 3">
          <ControlsText
            title="Value"
            id="item-3-value"
            initialValue={"item-3"}
          />
          <ControlsCheckbox
            title="Disabled"
            id="item-3-disabled"
            initialValue={false}
          />
        </ControlsFolder>
      </Controls>
      <Accordion
        className={"w-96"}
        openMultiple={rootMultiple}
        disabled={rootDisabled}
      >
        <AccordionItem value={item1Value} disabled={item1Disabled}>
          <AccordionTrigger>What is Joyul UI?</AccordionTrigger>
          <AccordionContent>
            <div className="p-3">
              <p>
                Joyul UI is a modern React component library focused on
                developer experience, accessibility, and design flexibility. It
                offers a suite of customizable, unstyled primitives and
                beautiful UI elements to help you build consistent, high-quality
                web applications quickly.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value={item2Value} disabled={isItem2Disabled}>
          <AccordionTrigger>How do I get started?</AccordionTrigger>
          <AccordionContent>
            <div className="p-3 space-y-2">
              <p>
                To get started with Joyul UI, visit the documentation site and
                install the package using your preferred package manager:
              </p>
              <p>
                Import the components you need and start building! Joyul UI is
                designed for easy customization and seamless integration into
                your React projects.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value={item3Value} disabled={item3Disabled}>
          <AccordionTrigger>Is it accessible</AccordionTrigger>
          <AccordionContent>
            <div className="p-3">
              <p>
                Yes. It follows the WAI-ARIA design pattern for accordions,
                ensuring it is accessible to all users.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}
