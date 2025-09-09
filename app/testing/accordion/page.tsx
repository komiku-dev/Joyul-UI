"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Controls,
  ControlsFolder,
  ControlsCheckbox,
  ControlsText,
} from "@/components/controls";
import { useState } from "react";

export default function ExampleAccordion() {
  const [defaultValue, setDefaultValue] = useState("item-1");
  const [openMultiple, setOpenMultiple] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const [itemOneDisabled, setItemOneDisabled] = useState(false);
  const [itemTwoDisabled, setItemTwoDisabled] = useState(false);
  const [itemThreeDisabled, setItemThreeDisabled] = useState(false);

  const [itemOneValue, setItemOneValue] = useState("item-1");
  const [itemTwoValue, setItemTwoValue] = useState("item-2");
  const [itemThreeValue, setItemThreeValue] = useState("item3");

  return (
    <>
      <Controls title="Controls">
        <ControlsText
          title="Default Value"
          value={defaultValue}
          onChange={setDefaultValue}
          disabled
        />
        <ControlsCheckbox
          title="Open multiple"
          value={openMultiple}
          onChange={setOpenMultiple}
        />
        <ControlsCheckbox
          title="Disabled"
          value={disabled}
          onChange={setDisabled}
        />
        <ControlsFolder title="Item 1">
          <ControlsText
            title="Value"
            value={itemOneValue}
            onChange={setItemOneValue}
          />
          <ControlsCheckbox
            title="Disabled"
            value={itemOneDisabled}
            onChange={setItemOneDisabled}
          />
        </ControlsFolder>
        <ControlsFolder title="Item 2">
          <ControlsText
            title="Value"
            value={itemTwoValue}
            onChange={setItemTwoValue}
          />
          <ControlsCheckbox
            title="Disabled"
            value={itemTwoDisabled}
            onChange={setItemTwoDisabled}
          />
        </ControlsFolder>
        <ControlsFolder title="Item 3">
          <ControlsText
            title="Value"
            value={itemThreeValue}
            onChange={setItemThreeValue}
          />
          <ControlsCheckbox
            title="Disabled"
            value={itemThreeDisabled}
            onChange={setItemThreeDisabled}
          />
        </ControlsFolder>
      </Controls>
      <Accordion
        className={"w-96"}
        openMultiple={openMultiple}
        disabled={disabled}
        defaultValue={[defaultValue]}
      >
        <AccordionItem value={itemOneValue} disabled={itemOneDisabled}>
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
        <AccordionItem value={itemTwoValue} disabled={itemTwoDisabled}>
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
        <AccordionItem value={itemThreeValue} disabled={itemThreeDisabled}>
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
