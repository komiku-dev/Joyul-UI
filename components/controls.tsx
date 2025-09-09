/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { cn } from "@/libs/utils";

import {
  IconCheck,
  IconChevronDown,
  IconChevronRight,
  IconCircle,
  IconInfoCircle,
  IconCircleCheck,
  IconAlertTriangle,
  IconAlertCircle,
} from "@tabler/icons-react";

interface ControlsProps {
  title?: string;
  children?: React.ReactNode;
  initiallyOpen?: boolean;
}
interface ControlsFolderProps {
  title?: string;
  children?: React.ReactNode;
  initiallyOpen?: boolean;
}
interface ControlsButtonProps {
  title?: string;
  onClick?: () => void;
  disabled?: boolean;
}
interface ControlsCheckboxProps {
  title?: string;
  id: string;
  initialValue: boolean;
  disabled?: boolean;
}
interface ControlsToggleProps {
  title?: string;
  id: string;
  initialValue: boolean;
  disabled?: boolean;
}
interface ControlsTextProps {
  title?: string;
  id: string;
  initialValue: string;
  disabled?: boolean;
}
interface ControlsSliderProps {
  title?: string;
  id: string;
  initialValue: number;
  min: number;
  max: number;
  step?: number;
  disabled?: boolean;
}
interface ControlsNumberProps {
  title?: string;
  id: string;
  initialValue: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
}
interface ControlsDropdownProps<T extends string | number> {
  title?: string;
  id: string;
  initialValue: T;
  options: Array<{ label: string; value: T }>;
  disabled?: boolean;
}
interface ControlsColorProps {
  title?: string;
  id: string;
  initialValue: string;
  disabled?: boolean;
}
interface ControlsTextAreaProps {
  title?: string;
  id: string;
  initialValue: string;
  rows?: number;
  disabled?: boolean;
}
interface ControlsRangeSliderProps {
  title?: string;
  id: string;
  initialValue: { min: number; max: number };
  min: number;
  max: number;
  step?: number;
  disabled?: boolean;
}
interface ControlsMonitorProps {
  title?: string;
  id: string;
}
interface ControlsTitleProps {
  title?: string;
}
interface ControlsRadioGroupProps<T extends string | number> {
  title?: string;
  id: string;
  initialValue: T;
  options: Array<{ label: string; value: T }>;
  disabled?: boolean;
}
interface ControlsProgressProps {
  title?: string;
  id: string;
  min?: number;
  max?: number;
}
interface ControlsInfoProps {
  text: string | React.ReactNode;
}
interface ControlsAlertProps {
  text: string;
  variant?: "info" | "success" | "warning" | "error";
  show?: boolean;
}
interface ControlsSpacerProps {
  size?: "sm" | "md" | "lg";
}

interface ControlsStateContextType {
  controlsState: Record<string, any>;
  updateControl: (id: string, value: any) => void;
  registerControl: (id: string, initialValue: any) => void;
}

const ControlsStateContext = React.createContext<
  ControlsStateContextType | undefined
>(undefined);

function ControlsProvider({ children }: { children: React.ReactNode }) {
  const [controlsState, setControlsState] = React.useState<Record<string, any>>(
    {}
  );

  const registerControl = React.useCallback((id: string, initialValue: any) => {
    setControlsState((prevState) => {
      if (Object.prototype.hasOwnProperty.call(prevState, id)) {
        return prevState;
      }
      return {
        ...prevState,
        [id]: initialValue,
      };
    });
  }, []);

  const updateControl = React.useCallback((id: string, value: any) => {
    setControlsState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  }, []);

  return (
    <ControlsStateContext.Provider
      value={{ controlsState, updateControl, registerControl }}
    >
      {children}
    </ControlsStateContext.Provider>
  );
}

function useControlState() {
  const context = React.useContext(ControlsStateContext);
  if (context === undefined) {
    throw new Error("useControlState must be used within a ControlsProvider");
  }
  return context;
}

interface ControlsContextType {
  depth: number;
  isRoot: boolean;
}
const ControlsContext = React.createContext<ControlsContextType | undefined>(
  undefined
);
function useControlsContext() {
  const context = React.useContext(ControlsContext);
  if (context === undefined) {
    throw new Error(
      "This component must be used within a <Controls> container."
    );
  }
  return context;
}

function Controls({
  title = "Controls",
  children,
  initiallyOpen = false,
}: ControlsProps) {
  const [isOpen, setIsOpen] = React.useState(initiallyOpen);
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
            "hover:bg-slate-100 dark:hover:bg-zinc-800/50"
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
  const [isOpen, setIsOpen] = React.useState(initiallyOpen);
  const indentStyle = { paddingLeft: `${depth * 8}px` };

  return (
    <div className={cn("border-t border-slate-200 dark:border-zinc-800")}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={indentStyle}
        className={cn(
          "group flex h-7 w-full flex-row items-center justify-between pr-2 transition-colors",
          "hover:bg-slate-100 dark:hover:bg-zinc-800/50"
        )}
      >
        <div className="flex flex-row items-center gap-2">
          <div className="min-w-1 self-stretch bg-zinc-500" />
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
        "border-slate-200 dark:border-zinc-800",
        disabled && "opacity-50"
      )}
    >
      <div className="min-w-1 bg-rose-400" />
      <button
        className={cn(
          "h-full w-full rounded-sm px-2 text-xs font-medium transition-colors",
          "bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 active:bg-slate-300",
          "dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-white dark:active:bg-zinc-600",
          "disabled:cursor-not-allowed disabled:opacity-70 disabled:text-slate-400 dark:disabled:text-zinc-500"
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
  id,
  initialValue,
  disabled = false,
}: ControlsCheckboxProps) {
  const { controlsState, updateControl, registerControl } = useControlState();
  const { depth } = useControlsContext();
  const indentStyle = { paddingLeft: `${depth * 8}px` };

  React.useEffect(() => {
    registerControl(id, initialValue);
  }, [id, initialValue, registerControl]);

  const value = controlsState[id] ?? initialValue;
  const handleChange = (newValue: boolean) => updateControl(id, newValue);

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
          "flex w-full flex-row items-center justify-between px-2",
          disabled ? "cursor-not-allowed" : "cursor-pointer"
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
          onChange={() => handleChange(!value)}
          disabled={disabled}
          className="sr-only peer"
        />
        <div
          className={cn(
            "flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-sm border transition-colors",
            "border-slate-300 bg-white dark:border-zinc-600 dark:bg-zinc-900",
            value &&
              "border-lime-500 bg-lime-500 dark:bg-zinc-200 dark:border-zinc-200"
          )}
        >
          {value && (
            <IconCheck
              stroke={3}
              className={cn("h-3 w-3 text-white dark:text-zinc-900")}
            />
          )}
        </div>
      </label>
    </div>
  );
}

function ControlsToggle({
  title = "Toggle",
  id,
  initialValue,
  disabled = false,
}: ControlsToggleProps) {
  const { controlsState, updateControl, registerControl } = useControlState();
  const { depth } = useControlsContext();
  const indentStyle = { paddingLeft: `${depth * 8}px` };

  React.useEffect(() => {
    registerControl(id, initialValue);
  }, [id, initialValue, registerControl]);

  const value = controlsState[id] ?? initialValue;
  const handleChange = (newValue: boolean) => updateControl(id, newValue);

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
          "flex w-full flex-row items-center justify-between px-2",
          disabled ? "cursor-not-allowed" : "cursor-pointer"
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
          onChange={() => handleChange(!value)}
          disabled={disabled}
          className="sr-only peer"
        />
        <div
          className={cn(
            "relative flex h-5 w-9 flex-shrink-0 items-center rounded-full transition-colors",
            "bg-slate-200 dark:bg-zinc-700",
            value && "bg-lime-500 dark:bg-zinc-200"
          )}
        >
          <span
            className={cn(
              "absolute h-3.5 w-3.5 transform rounded-full bg-white shadow ring-0 transition-transform duration-200 ease-out",
              value ? "translate-x-4" : "translate-x-1",
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
  id,
  initialValue,
  disabled = false,
}: ControlsTextProps) {
  const { controlsState, updateControl, registerControl } = useControlState();
  const { depth } = useControlsContext();
  const indentStyle = { paddingLeft: `${depth * 8}px` };

  React.useEffect(() => {
    registerControl(id, initialValue);
  }, [id, initialValue, registerControl]);

  const value = controlsState[id] ?? initialValue;
  const handleChange = (newValue: string) => updateControl(id, newValue);

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
          onChange={(e) => handleChange(e.target.value)}
          disabled={disabled}
          className={cn(
            "h-5 w-36 rounded-sm border-0 bg-slate-100 px-1.5 text-right text-xs outline-none ring-0",
            "text-slate-900 dark:bg-zinc-700 dark:text-zinc-200",
            "disabled:cursor-not-allowed"
          )}
        />
      </div>
    </div>
  );
}

function ControlsSlider({
  title = "Slider",
  id,
  initialValue,
  min,
  max,
  step = 1,
  disabled = false,
}: ControlsSliderProps) {
  const { controlsState, updateControl, registerControl } = useControlState();
  const { depth } = useControlsContext();
  const indentStyle = { paddingLeft: `${depth * 8}px` };

  React.useEffect(() => {
    registerControl(id, initialValue);
  }, [id, initialValue, registerControl]);

  const value = controlsState[id] ?? initialValue;
  const handleChange = (newValue: number) => updateControl(id, newValue);

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
              "w-10 text-right text-xs text-slate-500 dark:text-zinc-400"
            )}
          >
            {value.toFixed(2)}
          </span>
          <input
            type="range"
            value={value}
            onChange={(e) => handleChange(parseFloat(e.target.value))}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            style={trackStyle}
            className={cn(
              "h-1.5 w-24 cursor-pointer appearance-none rounded-full outline-none",
              "[--slider-accent-color:theme(colors.sky.400)]",
              "[--slider-fill-color:theme(colors.slate.200)] dark:[--slider-fill-color:theme(colors.zinc.700)]",
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
  id,
  initialValue,
  min,
  max,
  step,
  disabled = false,
}: ControlsNumberProps) {
  const { controlsState, updateControl, registerControl } = useControlState();
  const { depth } = useControlsContext();
  const indentStyle = { paddingLeft: `${depth * 8}px` };

  React.useEffect(() => {
    registerControl(id, initialValue);
  }, [id, initialValue, registerControl]);

  const value = controlsState[id] ?? initialValue;
  const handleChange = (newValue: number) => updateControl(id, newValue);

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
          onChange={(e) => handleChange(e.target.valueAsNumber || 0)}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          className={cn(
            "h-5 w-20 rounded-sm border-0 bg-slate-100 px-1.5 text-right text-xs outline-none ring-0",
            "text-slate-900 dark:bg-zinc-700 dark:text-zinc-200",
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
            onChange={(e) => handleChange(e.target.value as T)}
            disabled={disabled}
            className={cn(
              "h-5 w-36 appearance-none rounded-sm border-0 bg-slate-100 pl-1.5 pr-6 text-left text-xs outline-none ring-0",
              "text-slate-900 dark:bg-zinc-700 dark:text-zinc-200",
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
              className={cn("h-3.5 w-3.5 text-slate-500 dark:text-zinc-400")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ControlsColor({
  title = "Color",
  id,
  initialValue,
  disabled = false,
}: ControlsColorProps) {
  const { controlsState, updateControl, registerControl } = useControlState();
  const { depth } = useControlsContext();
  const indentStyle = { paddingLeft: `${depth * 8}px` };

  React.useEffect(() => {
    registerControl(id, initialValue);
  }, [id, initialValue, registerControl]);

  const value = controlsState[id] ?? initialValue;
  const handleChange = (newValue: string) => updateControl(id, newValue);

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
              "border-slate-300 dark:border-zinc-600"
            )}
            style={{ backgroundColor: value }}
          >
            <input
              type="color"
              value={value}
              onChange={(e) => handleChange(e.target.value)}
              disabled={disabled}
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            />
          </div>
          <input
            type="text"
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            disabled={disabled}
            className={cn(
              "h-5 w-20 rounded-sm border-0 bg-slate-100 px-1.5 font-mono text-right text-xs uppercase outline-none ring-0",
              "text-slate-900 dark:bg-zinc-700 dark:text-zinc-200",
              "disabled:cursor-not-allowed"
            )}
          />
        </div>
      </div>
    </div>
  );
}

function ControlsMonitor({ title = "Monitor", id }: ControlsMonitorProps) {
  const { controlsState } = useControlState();
  const { depth } = useControlsContext();
  const indentStyle = { paddingLeft: `${depth * 8}px` };

  const formatValue = (val: unknown): string => {
    if (val === undefined || val === null) {
      return "N/A";
    }
    if (typeof val === "number") {
      return parseFloat(val.toFixed(3)).toString();
    }
    if (typeof val === "boolean") {
      return val ? "true" : "false";
    }
    return String(val);
  };

  const isDefined = Object.prototype.hasOwnProperty.call(controlsState, id);
  const valueToDisplay = isDefined ? formatValue(controlsState[id]) : "N/A";

  return (
    <div
      style={indentStyle}
      className={cn(
        "group flex h-7 w-full flex-row border-t",
        "border-slate-200 dark:border-zinc-800"
      )}
    >
      <div className="min-w-1 bg-gray-400" />
      <div className="flex w-full flex-row items-center justify-between px-2">
        <span
          className={cn(
            "select-none text-xs text-slate-500 dark:text-zinc-400"
          )}
        >
          {title}
        </span>
        <span
          className={cn(
            "h-5 min-w-[3rem] select-all rounded-sm bg-slate-100 px-1.5 flex items-center justify-end font-mono text-xs",
            "text-slate-700 dark:bg-zinc-800 dark:text-zinc-300"
          )}
        >
          {valueToDisplay}
        </span>
      </div>
    </div>
  );
}

function ControlsTextArea({
  title = "Text Area",
  id,
  initialValue,
  rows = 3,
  disabled = false,
}: ControlsTextAreaProps) {
  const { controlsState, updateControl, registerControl } = useControlState();
  const { depth } = useControlsContext();
  const indentStyle = { paddingLeft: `${depth * 8}px` };

  React.useEffect(() => {
    registerControl(id, initialValue);
  }, [id, initialValue, registerControl]);

  const value = controlsState[id] ?? initialValue;
  const handleChange = (newValue: string) => updateControl(id, newValue);

  return (
    <div
      style={indentStyle}
      className={cn(
        "group flex w-full flex-col border-t",
        "border-slate-200 dark:border-zinc-800",
        disabled && "opacity-50"
      )}
    >
      <div className="flex w-full flex-row">
        <div className="min-w-1 self-stretch bg-indigo-400" />
        <div className="flex w-full flex-col gap-1.5 px-2 py-1.5">
          <span
            className={cn(
              "select-none text-xs transition-colors",
              "text-slate-500 group-hover:text-slate-900 group-focus-within:text-slate-900",
              "dark:text-zinc-400 dark:group-hover:text-zinc-100 dark:group-focus-within:text-zinc-100"
            )}
          >
            {title}
          </span>
          <textarea
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            rows={rows}
            disabled={disabled}
            className={cn(
              "w-full resize-y rounded-sm border-0 bg-slate-100 p-1.5 text-xs outline-none ring-0",
              "text-slate-900 dark:bg-zinc-700 dark:text-zinc-200",
              "disabled:cursor-not-allowed"
            )}
          />
        </div>
      </div>
    </div>
  );
}

function ControlsRangeSlider({
  title = "Range Slider",
  id,
  initialValue,
  min,
  max,
  step = 1,
  disabled = false,
}: ControlsRangeSliderProps) {
  const { controlsState, updateControl, registerControl } = useControlState();
  const { depth } = useControlsContext();
  const indentStyle = { paddingLeft: `${depth * 8}px` };

  React.useEffect(() => {
    registerControl(id, initialValue);
  }, [id, initialValue, registerControl]);

  const value = controlsState[id] ?? initialValue;
  const handleChange = (newValue: { min: number; max: number }) =>
    updateControl(id, newValue);

  const minPos = ((value.min - min) / (max - min)) * 100;
  const maxPos = ((value.max - min) / (max - min)) * 100;

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Math.min(parseFloat(e.target.value), value.max - step);
    handleChange({ ...value, min: newMin });
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Math.max(parseFloat(e.target.value), value.min + step);
    handleChange({ ...value, max: newMax });
  };

  const sharedInputClasses = cn(
    "pointer-events-none absolute h-full w-full appearance-none bg-transparent outline-none",
    "disabled:cursor-not-allowed",
    "[&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow",
    "[&::-webkit-slider-thumb]:bg-slate-800 dark:[&::-webkit-slider-thumb]:bg-zinc-200",
    "[&::-moz-range-thumb]:h-3.5 [&::-moz-range-thumb]:w-3.5 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-none",
    "[&::-moz-range-thumb]:bg-slate-800 dark:[&::-moz-range-thumb]:bg-zinc-200"
  );

  return (
    <div
      style={indentStyle}
      className={cn(
        "group flex h-12 w-full flex-col justify-center border-t",
        "border-slate-200 dark:border-zinc-800",
        disabled && "opacity-50"
      )}
    >
      <div className="flex w-full items-center">
        <div className="min-w-1 self-stretch bg-sky-400" />
        <div className="flex w-full flex-col gap-1 px-2 py-1.5">
          <div className="flex w-full items-center justify-between">
            <span
              className={cn(
                "select-none text-xs transition-colors",
                "text-slate-500 group-hover:text-slate-900 group-focus-within:text-slate-900",
                "dark:text-zinc-400 dark:group-hover:text-zinc-100 dark:group-focus-within:text-zinc-100"
              )}
            >
              {title}
            </span>
            <span className="font-mono text-xs text-slate-500 dark:text-zinc-400">
              {`${value.min.toFixed(2)} - ${value.max.toFixed(2)}`}
            </span>
          </div>

          <div className="relative h-4 w-full">
            <div className="absolute top-1/2 h-1.5 w-full -translate-y-1/2 rounded-full bg-slate-200 dark:bg-zinc-700" />
            <div
              className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-sky-400"
              style={{ left: `${minPos}%`, right: `${100 - maxPos}%` }}
            />
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={value.min}
              onChange={handleMinChange}
              disabled={disabled}
              className={sharedInputClasses}
            />
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={value.max}
              onChange={handleMaxChange}
              disabled={disabled}
              className={sharedInputClasses}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ControlsTitle({ title = "Section Title" }: ControlsTitleProps) {
  const { depth } = useControlsContext();
  const indentStyle = { paddingLeft: `${depth * 8}px` };

  return (
    <div
      style={indentStyle}
      className={cn(
        "flex h-7 w-full items-center border-t pt-1",
        "border-slate-200 dark:border-zinc-800"
      )}
    >
      <div className="flex w-full items-center px-2">
        <span
          className={cn(
            "select-none text-xs font-bold uppercase tracking-wider",
            "text-slate-400 dark:text-zinc-500"
          )}
        >
          {title}
        </span>
      </div>
    </div>
  );
}

function ControlsSeparator() {
  const { depth } = useControlsContext();
  const indentStyle = {
    paddingLeft: `${depth * 8 + 8}px`,
    paddingRight: "8px",
  };

  return (
    <div
      className={cn(
        "flex h-4 w-full items-center border-t",
        "border-slate-200 dark:border-zinc-800"
      )}
    >
      <div style={indentStyle} className="w-full">
        <div className="h-px w-full bg-slate-200 dark:bg-zinc-700" />
      </div>
    </div>
  );
}

function ControlsRadioGroup<T extends string | number>({
  title = "Radio Group",
  id,
  initialValue,
  options,
  disabled = false,
}: ControlsRadioGroupProps<T>) {
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
      className={cn(
        "group flex w-full flex-col border-t",
        "border-slate-200 dark:border-zinc-800",
        disabled && "opacity-50"
      )}
    >
      <div className="flex w-full flex-row">
        <div className="min-w-1 self-stretch bg-fuchsia-400" />
        <div className="flex w-full flex-col gap-1.5 px-2 py-1.5">
          <span
            className={cn(
              "select-none text-xs",
              "text-slate-500 dark:text-zinc-400"
            )}
          >
            {title}
          </span>
          <div className="flex flex-col gap-1.5">
            {options.map((option) => {
              const isSelected = value === option.value;
              return (
                <label
                  key={option.value}
                  className={cn(
                    "flex cursor-pointer items-center gap-2",
                    disabled && "cursor-not-allowed"
                  )}
                >
                  <div
                    className={cn(
                      "flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border transition-colors",
                      "border-slate-300 bg-white dark:border-zinc-600 dark:bg-zinc-900",
                      isSelected &&
                        "border-fuchsia-500 bg-fuchsia-500 dark:border-zinc-200 dark:bg-zinc-200"
                    )}
                  >
                    {isSelected && (
                      <IconCircle
                        stroke={3}
                        className={cn(
                          "h-2 w-2 fill-white text-white dark:fill-zinc-900 dark:text-zinc-900"
                        )}
                      />
                    )}
                  </div>
                  <span
                    className={cn(
                      "select-none text-xs",
                      "text-slate-600 dark:text-zinc-300"
                    )}
                  >
                    {option.label}
                  </span>
                  <input
                    type="radio"
                    name={id}
                    value={option.value}
                    checked={isSelected}
                    onChange={() => handleChange(option.value)}
                    disabled={disabled}
                    className="sr-only"
                  />
                </label>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function ControlsProgress({
  title = "Progress",
  id,
  min = 0,
  max = 100,
}: ControlsProgressProps) {
  const { controlsState } = useControlState();
  const { depth } = useControlsContext();
  const indentStyle = { paddingLeft: `${depth * 8}px` };

  const rawValue = controlsState[id] ?? 0;
  const value = Math.max(min, Math.min(rawValue, max));
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div
      style={indentStyle}
      className={cn(
        "group flex h-7 w-full flex-row border-t",
        "border-slate-200 dark:border-zinc-800"
      )}
    >
      <div className="min-w-1 bg-cyan-400" />
      <div className="flex w-full flex-row items-center justify-between px-2">
        <span
          className={cn(
            "select-none text-xs",
            "text-slate-500 dark:text-zinc-400"
          )}
        >
          {title}
        </span>
        <div className="flex h-5 w-40 items-center gap-2">
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-zinc-700">
            <div
              className="h-full rounded-full bg-cyan-400 transition-[width] duration-150"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <span className="w-10 text-right font-mono text-xs text-slate-500 dark:text-zinc-400">
            {value.toFixed(0)}%
          </span>
        </div>
      </div>
    </div>
  );
}

function ControlsInfo({ text }: ControlsInfoProps) {
  const { depth } = useControlsContext();
  const indentStyle = {
    paddingLeft: `${depth * 8 + 8}px`,
    paddingRight: "8px",
  };

  return (
    <div
      className={cn(
        "flex w-full items-center border-t py-2",
        "border-slate-200 dark:border-zinc-800"
      )}
    >
      <p
        style={indentStyle}
        className="text-xs text-slate-500 dark:text-zinc-400"
      >
        {text}
      </p>
    </div>
  );
}

function ControlsSpacer({ size = "md" }: ControlsSpacerProps) {
  const heightClass = {
    sm: "h-1",
    md: "h-2",
    lg: "h-4",
  }[size];

  return (
    <div
      className={cn(
        "w-full border-t border-slate-200 dark:border-zinc-800",
        heightClass
      )}
    />
  );
}

function ControlsAlert({
  text,
  variant = "info",
  show = true,
}: ControlsAlertProps) {
  const { depth } = useControlsContext();
  const indentStyle = {
    paddingLeft: `${depth * 8 + 8}px`,
    paddingRight: "8px",
  };

  const variantStyles = {
    info: {
      container: "bg-sky-100 dark:bg-sky-500/20",
      icon: IconInfoCircle,
      iconColor: "text-sky-600 dark:text-sky-400",
      textColor: "text-sky-800 dark:text-sky-300",
    },
    success: {
      container: "bg-emerald-100 dark:bg-emerald-500/20",
      icon: IconCircleCheck,
      iconColor: "text-emerald-600 dark:text-emerald-400",
      textColor: "text-emerald-800 dark:text-emerald-300",
    },
    warning: {
      container: "bg-amber-100 dark:bg-amber-500/20",
      icon: IconAlertTriangle,
      iconColor: "text-amber-600 dark:text-amber-400",
      textColor: "text-amber-800 dark:text-amber-300",
    },
    error: {
      container: "bg-rose-100 dark:bg-rose-500/20",
      icon: IconAlertCircle,
      iconColor: "text-rose-600 dark:text-rose-400",
      textColor: "text-rose-800 dark:text-rose-300",
    },
  };

  if (!show) {
    return null;
  }

  const styles = variantStyles[variant];
  const IconComponent = styles.icon;

  return (
    <div
      className={cn(
        "w-full border-t border-slate-200 dark:border-zinc-800 py-2"
      )}
    >
      <div style={indentStyle}>
        <div
          className={cn(
            "flex items-start gap-2 rounded-sm p-2",
            styles.container
          )}
        >
          <IconComponent
            className={cn("mt-px h-4 w-4 flex-shrink-0", styles.iconColor)}
          />
          <p className={cn("text-xs", styles.textColor)}>{text}</p>
        </div>
      </div>
    </div>
  );
}

export {
  ControlsProvider,
  useControlState,
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
  ControlsTextArea,
  ControlsRangeSlider,
  ControlsTitle,
  ControlsSeparator,
  ControlsMonitor,
  ControlsRadioGroup,
  ControlsProgress,
  ControlsInfo,
  ControlsSpacer,
  ControlsAlert,
};
