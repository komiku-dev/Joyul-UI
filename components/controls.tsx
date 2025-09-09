"use client";

import * as React from "react";
import { cn } from "@/libs/utils";

import {
  IconChevronRight,
  IconCheck,
  IconChevronDown
} from "@tabler/icons-react";
import { useState } from "react";

// --- Prop Interfaces ---

interface ControlsProps {
  /** The main title for the entire control panel. */
  title?: string;
  /** The child controls and folders to be rendered inside. */
  children?: React.ReactNode;
  /** The initial open/closed state of the folder. Defaults to true (open). */
  initiallyOpen?: boolean;
}

interface ControlsFolderProps {
  /** The title of the folder, which is clickable to toggle visibility. */
  title?: string;
  /** The controls to be nested inside this folder. */
  children?: React.ReactNode;
  /** The initial open/closed state of the folder. Defaults to true (open). */
  initiallyOpen?: boolean;
}

interface ControlsButtonProps {
  /** The text displayed the button. */
  title?: string;
  /** The function to execute when the button is clicked. */
  onClick?: () => void;
  /** If true, the button will be non-interactive. */
  disabled?: boolean;
}

interface ControlsCheckboxProps {
  /** The label displayed next to the checkbox. */
  title?: string;
  /** The current checked state of the checkbox. */
  value: boolean;
  /** Callback that receives the new boolean value when toggled. */
  onChange: (newValue: boolean) => void;
  /** If true, the checkbox will be non-interactive. */
  disabled?: boolean;
}

interface ControlsToggleProps {
  /** The label displayed next to the toggle switch. */
  title?: string;
  /** The current "on" (true) or "off" (false) state. */
  value: boolean;
  /** Callback that receives the new boolean value when toggled. */
  onChange: (newValue: boolean) => void;
  /** If true, the toggle will be non-interactive. */
  disabled?: boolean;
}

interface ControlsTextProps {
  /** The label for the text input. */
  title?: string;
  /** The current string value of the input. */
  value: string;
  /** Callback that receives the new string value onchange. */
  onChange: (newValue: string) => void;
  /** If true, the text input will be non-interactive. */
  disabled?: boolean;
}

interface ControlsSliderProps {
  /** The label for the slider. */
  title?: string;
  /** The current numeric value of the slider. */
  value: number;
  /** Callback that receives the new number value as the slider moves. */
  onChange: (newValue: number) => void;
  /** The minimum value of the slider range. */
  min: number;
  /** The maximum value of the slider range. */
  max: number;
  /** The increment step of the slider. Defaults to 1. */
  step?: number;
  /** If true, the slider will be non-interactive. */
  disabled?: boolean;
}

interface ControlsNumberProps {
  /** The label for the number input. */
  title?: string;
  /** The current numeric value. */
  value: number;
  /** Callback that receives the new number value onchange. */
  onChange: (newValue: number) => void;
  /** The minimum allowed value (optional). */
  min?: number;
  /** The maximum allowed value (optional). */
  max?: number;
  /** The increment step (optional). */
  step?: number;
  /** If true, the input will be non-interactive. */
  disabled?: boolean;
}

interface ControlsDropdownProps<T extends string | number> {
  /** The label for the dropdown. */
  title?: string;
  /** The currently selected value. */
  value: T;
  /** Callback that receives the new selected value. */
  onChange: (newValue: T) => void;
  /** An array of options to display, each with a visible `label` and a `value`. */
  options: Array<{ label: string; value: T }>;
  /** If true, the dropdown will be non-interactive. */
  disabled?: boolean;
}

interface ControlsColorProps {
  /** The label for the color picker. */
  title?: string;
  /** The current color value in hex format (e.g., "#ff0000"). */
  value: string;
  /** Callback that receives the new color string. */
  onChange: (newValue: string) => void;
  /** If true, the color picker will be non-interactive. */
  disabled?: boolean;
}

// --- Context for Managing Depth and Root Status ---

interface ControlsContextType {
  /** The nesting depth, starting at 0 for the root. */
  depth: number;
  /** True if the context is provided by the top-level <Controls /> component. */
  isRoot: boolean;
}

const ControlsContext = React.createContext<ControlsContextType | undefined>(
  undefined
);

/** Custom hook to consume the ControlsContext. */
function useControlsContext() {
  const context = React.useContext(ControlsContext);
  if (context === undefined) {
    throw new Error(
      "This component must be used within a <Controls> container."
    );
  }
  return context;
}

// --- Components ---

function Controls({
  title = "Controls",
  children,
  initiallyOpen = false,
}: ControlsProps) {
  const [isOpen, setIsOpen] = useState(initiallyOpen);

  const parentContext = React.useContext(ControlsContext);
  React.useEffect(() => {
    if (parentContext) {
      throw new Error("<Controls> component cannot be nested inside another.");
    }
  }, [parentContext]);

  return (
    <ControlsContext.Provider value={{ depth: 1, isRoot: true }}>
      <div
        className={cn(
          "absolute top-4 left-4 w-72 overflow-hidden rounded-sm border",
          "bg-white text-slate-900 border-slate-200",
          "dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-700",
          "transition-shadow duration-200 ease-out",
          isOpen && "shadow-xl dark:shadow-zinc-200/10"
        )}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "group flex h-7 w-full flex-row items-center justify-between transition-colors",
            "hover:bg-slate-100 dark:hover:bg-zinc-800/50",
            "focus-visible:outline-none focus-visible:border-2 focus-visible:border-slate-900 dark:focus-visible:border-white"
          )}
        >
          <div className="flex flex-row items-center gap-2">
            <div
              className={cn(
                "min-w-1 self-stretch",
                "bg-slate-900 dark:bg-white"
              )}
            />
            <span
              className={cn(
                "select-none text-xs font-bold transition-colors",
                "text-slate-500 group-hover:text-slate-900",
                "dark:text-zinc-400 dark:group-hover:text-zinc-100"
              )}
            >
              {title}
            </span>
          </div>
          <IconChevronRight
            className={cn(
              "mr-2 size-3.5 transition-transform duration-200",
              isOpen && "rotate-90"
            )}
          />
        </button>

        <div
          className={cn(
            "grid transition-[grid-template-rows] duration-200 ease-out",
            isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          )}
        >
          <div
            className={cn(
              "overflow-hidden",
              "bg-white dark:bg-zinc-900",
              !isOpen && "invisible"
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </ControlsContext.Provider>
  );
}

function ControlsFolder({
  title = "Controls Folder",
  children,
  initiallyOpen = false,
}: ControlsFolderProps) {
  const { depth } = useControlsContext();
  const [isOpen, setIsOpen] = useState(initiallyOpen);
  const indentStyle = { paddingLeft: `${depth * 8}px` };

  return (
    <div className={cn("border-t", "border-slate-200", "dark:border-zinc-800")}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={indentStyle}
        className={cn(
          "group flex h-7 w-full flex-row items-center justify-between pr-2 transition-colors",
          "hover:bg-slate-100 dark:hover:bg-zinc-800/50",
          "focus-visible:outline-none focus-visible:border-2 focus-visible:border-zinc-500"
        )}
      >
        <div className="flex flex-row items-center gap-2">
          <div className="min-w-1 self-stretch bg-zinc-500" />
          <span
            className={cn(
              "select-none text-xs font-semibold transition-colors",
              "text-slate-500 group-hover:text-slate-900",
              "dark:text-zinc-400 dark:group-hover:text-zinc-100"
            )}
          >
            {title}
          </span>
        </div>
        <IconChevronRight
          className={cn(
            "size-3.5 transition-transform duration-200",
            isOpen && "rotate-90"
          )}
        />
      </button>

      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-200 ease-out",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className={cn("overflow-hidden", !isOpen && "invisible")}>
          <ControlsContext.Provider value={{ depth: depth + 1, isRoot: false }}>
            {children}
          </ControlsContext.Provider>
        </div>
      </div>
    </div>
  );
}

function ControlsButton({
  title = "Button",
  onClick,
  disabled = false,
}: ControlsButtonProps) {
  const { depth } = useControlsContext();
  const indentStyle = { paddingLeft: `${depth * 8}px` };

  return (
    <div
      style={indentStyle}
      className={cn(
        "group flex h-7 w-full flex-row border-t",
        "border-slate-200",
        "dark:border-zinc-800",
        disabled && "opacity-50"
      )}
    >
      <div className="min-w-1 bg-rose-400" />
      <button
        className={cn(
          "m-1 flex-grow rounded-sm px-2 text-xs font-medium transition-colors",
          "bg-slate-100 text-slate-700 group-hover:bg-slate-200 group-hover:text-slate-900 active:bg-slate-300",
          "dark:bg-zinc-800 dark:text-zinc-400 dark:group-hover:bg-zinc-700 dark:group-hover:text-white dark:active:bg-zinc-600",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2",
          "focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-900", //sets
          "disabled:cursor-not-allowed disabled:opacity-70 disabled:text-slate-400 dark:disabled:text-zinc-500" // Disabled
        )}
        disabled={disabled}
        onClick={onClick}
      >
        {title}
      </button>
    </div>
  );
}

function ControlsCheckbox({
  title = "Checkbox",
  value,
  onChange,
  disabled = false,
}: ControlsCheckboxProps) {
  const { depth } = useControlsContext();
  const indentStyle = { paddingLeft: `${depth * 8}px` };

  return (
    <div
      style={indentStyle}
      className={cn(
        "group flex h-7 w-full flex-row border-t",
        "border-slate-200 dark:border-zinc-800",
        disabled && "opacity-50"
      )}
    >
      <div className="min-w-1 bg-lime-400" />
      <label
        className={cn(
          "flex w-full cursor-pointer flex-row items-center justify-between px-2",
          disabled && "cursor-not-allowed"
        )}
      >
        <span
          className={cn(
            "select-none text-xs transition-colors",
            "text-slate-500 group-hover:text-slate-900 group-focus-within:text-slate-900",
            "dark:text-zinc-400 dark:group-hover:text-zinc-100 dark:group-focus-within:text-zinc-100"
          )}
        >
          {title}
        </span>
        <input
          type="checkbox"
          checked={value}
          onChange={() => onChange(!value)}
          disabled={disabled}
          className="sr-only peer"
        />
        <div
          className={cn(
            "flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-sm border transition-colors",
            "border-slate-300 bg-white",
            "peer-focus-visible:ring-2 peer-focus-visible:ring-lime-400 peer-focus-visible:ring-offset-2",
            "peer-focus-visible:ring-offset-white dark:peer-focus-visible:ring-offset-zinc-900",
            value && "border-lime-500 bg-lime-500",
            "dark:border-zinc-600 dark:bg-zinc-900",
            value && "dark:bg-zinc-200 dark:border-zinc-200"
          )}
        >
          {value && (
            <IconCheck
              stroke={3}
              className={cn("h-3 w-3", "text-white", "dark:text-zinc-900")}
            />
          )}
        </div>
      </label>
    </div>
  );
}

function ControlsToggle({
  title = "Toggle",
  value,
  onChange,
  disabled = false,
}: ControlsToggleProps) {
  const { depth } = useControlsContext();
  const indentStyle = { paddingLeft: `${depth * 8}px` };

  return (
    <div
      style={indentStyle}
      className={cn(
        "group flex h-7 w-full flex-row border-t",
        "border-slate-200 dark:border-zinc-800",
        disabled && "opacity-50"
      )}
    >
      <div className="min-w-1 bg-lime-400" />
      <label
        className={cn(
          "flex w-full cursor-pointer flex-row items-center justify-between px-2",
          disabled && "cursor-not-allowed"
        )}
      >
        <span
          className={cn(
            "select-none text-xs transition-colors",
            "text-slate-500 group-hover:text-slate-900 group-focus-within:text-slate-900",
            "dark:text-zinc-400 dark:group-hover:text-zinc-100 dark:group-focus-within:text-zinc-100"
          )}
        >
          {title}
        </span>
        <input
          type="checkbox"
          checked={value}
          onChange={() => onChange(!value)}
          disabled={disabled}
          className="sr-only peer"
        />
        <div
          className={cn(
            "relative flex h-5 w-9 flex-shrink-0 items-center rounded-full transition-colors",
            "bg-slate-200",
            "peer-focus-visible:ring-2 peer-focus-visible:ring-lime-400 peer-focus-visible:ring-offset-2",
            "peer-focus-visible:ring-offset-white dark:peer-focus-visible:ring-offset-zinc-900", //sets
            value && "bg-lime-500",
            "dark:bg-zinc-700",
            value && "dark:bg-zinc-200"
          )}
        >
          <span
            className={cn(
              "absolute h-3.5 w-3.5 transform rounded-full shadow ring-0 transition-transform duration-200 ease-out",
              value ? "translate-x-4 bg-white" : "translate-x-1 bg-white",
              value
                ? "dark:translate-x-4.5 dark:bg-zinc-800"
                : "dark:translate-x-1 dark:bg-zinc-200"
            )}
          />
        </div>
      </label>
    </div>
  );
}

function ControlsText({
  title = "Text",
  value,
  onChange,
  disabled = false,
}: ControlsTextProps) {
  const { depth } = useControlsContext();
  const indentStyle = { paddingLeft: `${depth * 8}px` };

  return (
    <div
      style={indentStyle}
      className={cn(
        "group flex h-7 w-full flex-row border-t",
        "border-slate-200 dark:border-zinc-800",
        disabled && "opacity-50"
      )}
    >
      <div className="min-w-1 bg-indigo-400" />
      <div className="flex w-full flex-row items-center justify-between px-2">
        <span
          className={cn(
            "select-none text-xs transition-colors",
            "text-slate-500 group-hover:text-slate-900 group-focus-within:text-slate-900",
            "dark:text-zinc-400 dark:group-hover:text-zinc-100 dark:group-focus-within:text-zinc-100"
          )}
        >
          {title}
        </span>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={cn(
            "h-5 w-36 rounded-sm px-1.5 text-right text-xs",
            "bg-slate-100 text-slate-900",
            "dark:bg-zinc-700 dark:text-zinc-200",
            "focus:outline-none focus:ring-1 focus:ring-indigo-400",
            "disabled:cursor-not-allowed"
          )}
        />
      </div>
    </div>
  );
}

function ControlsSlider({
  title = "Slider",
  value,
  onChange,
  min,
  max,
  step = 1,
  disabled = false,
}: ControlsSliderProps) {
  const { depth } = useControlsContext();
  const indentStyle = { paddingLeft: `${depth * 8}px` };

  const percentage = ((value - min) / (max - min)) * 100;
  const trackStyle = {
    background: `linear-gradient(to right, var(--slider-accent-color) ${percentage}%, var(--slider-fill-color) ${percentage}%)`,
  };

  return (
    <div
      style={indentStyle}
      className={cn(
        "group flex h-7 w-full flex-row border-t",
        "border-slate-200 dark:border-zinc-800",
        disabled && "opacity-50"
      )}
    >
      <div className="min-w-1 bg-sky-400" />
      <div className="flex w-full flex-row items-center justify-between px-2">
        <span
          className={cn(
            "select-none text-xs transition-colors",
            "text-slate-500 group-hover:text-slate-900 group-focus-within:text-slate-900",
            "dark:text-zinc-400 dark:group-hover:text-zinc-100 dark:group-focus-within:text-zinc-100"
          )}
        >
          {title}
        </span>
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "w-10 text-right text-xs",
              "text-slate-500",
              "dark:text-zinc-400"
            )}
          >
            {value.toFixed(2)}
          </span>
          <input
            type="range"
            value={value}
            onChange={(e) => onChange(parseFloat(e.target.value))}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            style={trackStyle}
            className={cn(
              "h-1.5 w-24 cursor-pointer appearance-none rounded-full",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2",
              "focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-900",
              "disabled:cursor-not-allowed",
              "[&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow",
              "[&::-webkit-slider-thumb]:bg-slate-800 dark:[&::-webkit-slider-thumb]:bg-zinc-200",
              "[&::-moz-range-thumb]:h-3.5 [&::-moz-range-thumb]:w-3.5 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-none",
              "[&::-moz-range-thumb]:bg-slate-800 dark:[&::-moz-range-thumb]:bg-zinc-200"
            )}
          />
        </div>
      </div>
    </div>
  );
}

function ControlsNumber({
  title = "Number",
  value,
  onChange,
  min,
  max,
  step,
  disabled = false,
}: ControlsNumberProps) {
  const { depth } = useControlsContext();
  const indentStyle = { paddingLeft: `${depth * 8}px` };

  return (
    <div
      style={indentStyle}
      className={cn(
        "group flex h-7 w-full flex-row border-t",
        "border-slate-200 dark:border-zinc-800",
        disabled && "opacity-50"
      )}
    >
      <div className="min-w-1 bg-sky-400" />
      <div className="flex w-full flex-row items-center justify-between px-2">
        <span
          className={cn(
            "select-none text-xs transition-colors",
            "text-slate-500 group-hover:text-slate-900 group-focus-within:text-slate-900",
            "dark:text-zinc-400 dark:group-hover:text-zinc-100 dark:group-focus-within:text-zinc-100"
          )}
        >
          {title}
        </span>
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.valueAsNumber || 0)}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          className={cn(
            "h-5 w-16 rounded-sm px-1.5 text-right text-xs",
            "bg-slate-100 text-slate-900",
            "dark:bg-zinc-700 dark:text-zinc-200",
            "focus:outline-none focus:ring-1 focus:ring-sky-400",
            "disabled:cursor-not-allowed",
            "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          )}
        />
      </div>
    </div>
  );
}

function ControlsDropdown<T extends string | number>({
  title = "Dropdown",
  value,
  onChange,
  options,
  disabled = false,
}: ControlsDropdownProps<T>) {
  const { depth } = useControlsContext();
  const indentStyle = { paddingLeft: `${depth * 8}px` };

  return (
    <div
      style={indentStyle}
      className={cn(
        "group flex h-7 w-full flex-row border-t",
        "border-slate-200 dark:border-zinc-800",
        disabled && "opacity-50"
      )}
    >
      <div className="min-w-1 bg-teal-400" />
      <div className="flex w-full flex-row items-center justify-between px-2">
        <span
          className={cn(
            "select-none text-xs transition-colors",
            "text-slate-500 group-hover:text-slate-900 group-focus-within:text-slate-900",
            "dark:text-zinc-400 dark:group-hover:text-zinc-100 dark:group-focus-within:text-zinc-100"
          )}
        >
          {title}
        </span>
        <div className="relative flex items-center">
          <select
            value={value}
            onChange={(e) => onChange(e.target.value as T)}
            disabled={disabled}
            className={cn(
              "h-5 w-36 appearance-none rounded-sm pl-1.5 pr-6 text-left text-xs",
              "bg-slate-100 text-slate-900",
              "dark:bg-zinc-700 dark:text-zinc-200",
              "focus:outline-none focus:ring-1 focus:ring-teal-400",
              "disabled:cursor-not-allowed"
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
              className={cn(
                "h-3.5 w-3.5",
                "text-slate-500",
                "dark:text-zinc-400"
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ControlsColor({
  title = "Color",
  value,
  onChange,
  disabled = false,
}: ControlsColorProps) {
  const { depth } = useControlsContext();
  const indentStyle = { paddingLeft: `${depth * 8}px` };

  return (
    <div
      style={indentStyle}
      className={cn(
        "group flex h-7 w-full flex-row border-t",
        "border-slate-200 dark:border-zinc-800",
        disabled && "opacity-50"
      )}
    >
      <div className="min-w-1 bg-zinc-400" />
      <div className="flex w-full flex-row items-center justify-between px-2">
        <span
          className={cn(
            "select-none text-xs transition-colors",
            "text-slate-500 group-hover:text-slate-900 group-focus-within:text-slate-900",
            "dark:text-zinc-400 dark:group-hover:text-zinc-100 dark:group-focus-within:text-zinc-100"
          )}
        >
          {title}
        </span>
        <div className="flex items-center gap-1.5">
          <div
            className={cn(
              "relative h-5 w-5 rounded-sm border",
              "border-slate-300 dark:border-zinc-600",
              "focus-within:ring-1 focus-within:ring-zinc-400"
            )}
            style={{ backgroundColor: value }}
          >
            <input
              type="color"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              disabled={disabled}
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            />
          </div>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            className={cn(
              "h-5 w-20 rounded-sm px-1.5 font-mono text-right text-xs uppercase",
              "bg-slate-100 text-slate-900",
              "dark:bg-zinc-700 dark:text-zinc-200",
              "focus:outline-none focus:ring-1 focus:ring-zinc-400",
              "disabled:cursor-not-allowed"
            )}
          />
        </div>
      </div>
    </div>
  );
}

export {
  Controls,
  ControlsFolder,
  ControlsButton,
  ControlsCheckbox,
  ControlsToggle,
  ControlsText,
  ControlsSlider,
  ControlsNumber,
  ControlsDropdown,
  ControlsColor,
};
