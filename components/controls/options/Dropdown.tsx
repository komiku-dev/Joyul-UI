"use client";
import * as React from "react";
import { cn } from "@/libs/utils";
import { IconChevronDown } from "@tabler/icons-react";
import { useControlState, useControlsContext } from "../context";
import { ControlsDropdownProps } from "../types";
import { controlGroupColors } from "../constants";
import {
  gutterStyles,
  inputBaseStyles,
  labelStyles,
  rowContainerStyles,
  rowContentContainerStyles,
} from "../styles";

export function Dropdown<T extends string | number>({
  title = "Dropdown",
  id,
  initialValue,
  options,
  disabled = false,
}: ControlsDropdownProps<T>) {
  const { controlsState, updateControl, registerControl } = useControlState();
  const { depth } = useControlsContext();
  const indentStyle = { paddingLeft: `${depth * 8}px` };

  React.useEffect(() => {
    registerControl(id, initialValue);
  }, [id, initialValue, registerControl]);

  const value = controlsState[id] ?? initialValue;
  const handleChange = (newValue: T) => updateControl(id, newValue);

  return (
    <div
      style={indentStyle}
      className={cn(rowContainerStyles, disabled && "opacity-50")}
    >
      <div className={cn(gutterStyles, controlGroupColors.OPTIONS)} />
      <div className={cn(rowContentContainerStyles)}>
        <span className={cn(labelStyles)}>{title}</span>
        <div className="relative flex items-center">
          <select
            value={value}
            onChange={(e) => handleChange(e.target.value as T)}
            disabled={disabled}
            className={cn(
              inputBaseStyles,
              "w-36 appearance-none pr-6 text-left"
            )}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-1.5">
            <IconChevronDown
              className={cn("h-3.5 w-3.5 text-slate-500 dark:text-zinc-400")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
