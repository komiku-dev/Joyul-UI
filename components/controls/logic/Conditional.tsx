/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import * as React from "react";
import { useControlState } from "../context";
import { ControlsConditionalProps } from "../types";

export function Conditional({
  condition,
  when,
  is,
  children,
}: ControlsConditionalProps) {
  const { controlsState } = useControlState();

  const shouldRender = React.useMemo(() => {
    if (condition) {
      try {
        return condition(controlsState);
      } catch (e) {
        return false;
      }
    }

    if (when) {
      return controlsState[when] === is;
    }
    return false;
  }, [controlsState, condition, when, is]);

  return shouldRender ? <>{children}</> : null;
}
