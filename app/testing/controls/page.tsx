"use client";

import {
  Controls,
  ControlsAlert,
  ControlsButton,
  ControlsCheckbox,
  ControlsColor,
  ControlsColorArray,
  ControlsDropdown,
  ControlsFolder,
  ControlsInfo,
  ControlsMonitor,
  ControlsProgress,
  ControlsRadioGroup,
  ControlsSeparator,
  ControlsSlider,
  ControlsSpacer,
  ControlsText,
  ControlsTitle,
  ControlsToggle,
  ControlsNumber,
  ControlsRangeSlider,
  ControlsTextArea,
  ControlsNumberArray,
  ControlsStringArray,
  useControlState,
  ControlsPlot,
  ControlsBezier,
  ControlsVector2D,
  ControlsVector3D,
  ControlsImage,
} from "@/components/controls";
import React from "react";

export default function ControlsExample() {
  const { updateControl } = useControlState();

  React.useEffect(() => {
    let frameId: number;
    let lastTime = performance.now();
    let frameCount = 0;

    const loop = (currentTime: number) => {
      frameCount++;
      if (currentTime > lastTime + 1000) {
        const fps = frameCount / ((currentTime - lastTime) / 1000);

        updateControl("sine", fps);

        lastTime = currentTime;
        frameCount = 0;
      }
      frameId = requestAnimationFrame(loop);
    };

    frameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [updateControl]);

  return (
    <Controls title="Controls Menu">
      <ControlsTitle title="Controls Example" />
      <ControlsFolder title="Actions">
        <ControlsButton />
      </ControlsFolder>
      <ControlsFolder title="Booleans">
        <ControlsCheckbox id={"controls-checkbox"} initialValue={false} />
        <ControlsToggle id={"controls-toggle"} initialValue={false} />
      </ControlsFolder>
      <ControlsFolder title="Text">
        <ControlsText id={"controls-text"} initialValue={"Text goes here"} />
        <ControlsTextArea
          id={"controls-text-area"}
          initialValue={"Text goes here"}
        />
      </ControlsFolder>
      <ControlsFolder title="Numbers">
        <ControlsNumber id={"controls-number"} initialValue={2.37} />
        <ControlsSlider
          id={"controls-slider"}
          initialValue={5}
          min={0}
          max={10}
        />
        <ControlsRangeSlider
          id={"controls-range-slider"}
          initialValue={{
            min: 5,
            max: 10,
          }}
          min={0}
          max={15}
        />
        <ControlsVector3D
          id={"vector-three"}
          initialValue={{
            x: 2,
            y: 4,
            z: 3,
          }}
        />
      </ControlsFolder>
      <ControlsFolder title="Options">
        <ControlsDropdown
          id={"controls-dropdown"}
          initialValue={"cool"}
          options={[
            { label: "cool", value: "cool" },
            { label: "hot", value: "hot" },
          ]}
        />
        <ControlsRadioGroup
          id={"controls-radio-group"}
          initialValue={"cool"}
          options={[
            { label: "cool", value: "cool" },
            { label: "hot", value: "hot" },
          ]}
        />
      </ControlsFolder>
      <ControlsFolder title="Colors">
        <ControlsColor id={"controls-color"} initialValue={""} />
      </ControlsFolder>
      <ControlsFolder title="Display">
        <ControlsMonitor id={"controls-checkbox"} />
        <ControlsProgress id={"controls-slider"} />
        <ControlsPlot id={"sine"} />
      </ControlsFolder>
      <ControlsFolder title="Layout">
        <ControlsAlert text={"undefined"} />
        <ControlsInfo text={"undefined"} />
        <ControlsSeparator />
        <ControlsSpacer />
      </ControlsFolder>
      <ControlsFolder title="Complex">
        <ControlsColorArray id={"controls-color-array"} initialValue={[]} />
        <ControlsNumberArray id={"controls-number-array"} initialValue={[]} />
        <ControlsStringArray id={"controls-string-array"} initialValue={[]} />
      </ControlsFolder>
      <ControlsFolder title="Visual">
        <ControlsBezier
          id={"controls-bezier"}
          initialValue={[0.1, 0.9, 0.9, 0.1]}
        />
        <ControlsVector2D
          id={"vector-two"}
          initialValue={{
            x: -0.49,
            y: 0.33,
          }}
        />
      </ControlsFolder>
      <ControlsFolder title="Assets">
        <ControlsImage id={"Image"} initialValue={""} />
      </ControlsFolder>
    </Controls>
  );
}
