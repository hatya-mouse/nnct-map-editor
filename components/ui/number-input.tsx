"use client";

import { NumberField as NumberFieldPrimitive } from "@base-ui/react/number-field";
import { MinusIcon, PlusIcon } from "lucide-react";
import type React from "react";
import { createContext, useContext, useId } from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { FieldLabel } from "@/components/ui/field";

const NumberInputContext = createContext<{
  inputId?: string;
  invalid?: boolean;
}>({});

const stepperClassName = cn(
  buttonVariants({ variant: "ghost" }),
  "relative h-8 in-data-[size=lg]:h-9 in-data-[size=sm]:h-7",
  "rounded-none",
  "pointer-coarse:after:absolute pointer-coarse:after:size-full pointer-coarse:after:min-h-11 pointer-coarse:after:min-w-11"
);

const isEmpty = (value: number | string | null | undefined) =>
  value === null || value === undefined || value === "";

const toNumber = (value: number | string | null | undefined) => {
  if (isEmpty(value)) {
    return null;
  }
  const next = typeof value === "number" ? value : Number(value);
  return Number.isNaN(next) ? null : next;
};

const toStringValue = (value: number | null) =>
  value === null ? "" : String(value);

interface NumberInputProps
  extends Omit<
    React.ComponentProps<typeof NumberFieldPrimitive.Root>,
    "defaultValue" | "format" | "onValueChange" | "value"
  > {
  allowMouseWheel?: boolean;
  defaultValue?: number | string;
  formatOptions?: Intl.NumberFormatOptions;
  invalid?: boolean;
  onValueChange?: (details: { value: string }) => void;
  size?: "sm" | "md" | "lg";
  value?: number | string;
}

export const NumberInput = (props: NumberInputProps) => {
  const {
    allowMouseWheel,
    className,
    defaultValue,
    formatOptions,
    id,
    invalid,
    onValueChange,
    size = "md",
    value,
    ...rest
  } = props;
  // Base UI keeps the input's id to itself unless it's given one, and the
  // scrubber's label needs it.
  const fallbackId = useId();
  const inputId = id ?? fallbackId;
  const controlled = value !== undefined;
  const handleValueChange = (next: number | null) => {
    onValueChange?.({ value: toStringValue(next) });
  };

  return (
    <NumberInputContext.Provider value={{ inputId, invalid }}>
      <NumberFieldPrimitive.Root
        allowWheelScrub={allowMouseWheel}
        aria-invalid={invalid || undefined}
        className={cn(
          "group/number-field",
          "flex w-full flex-col items-start gap-2",
          "has-data-[slot=number-field-increment]:has-data-[slot=number-field-decrement]:**:data-[slot=number-field-input]:text-center",
          className
        )}
        data-invalid={invalid || undefined}
        data-size={size}
        data-slot="number-field"
        defaultValue={
          controlled ? undefined : (toNumber(defaultValue) ?? undefined)
        }
        format={formatOptions}
        id={inputId}
        onValueChange={handleValueChange}
        value={controlled ? toNumber(value) : undefined}
        {...rest}
      />
    </NumberInputContext.Provider>
  );
};

export const NumberInputGroup = (
  props: React.ComponentProps<typeof NumberFieldPrimitive.Group>
) => {
  const { className, ...rest } = props;

  return (
    <NumberFieldPrimitive.Group
      className={cn(
        "relative",
        "w-full",
        "flex justify-between",
        "bg-transparent dark:bg-input/30",
        "text-base",
        "rounded-lg border border-input shadow-xs/5 ring-ring/32",
        "transition-shadow",
        "focus-within:border-primary focus-within:ring-[3px] focus-within:ring-ring/32",
        "data-disabled:pointer-events-none data-disabled:opacity-64",
        "in-data-invalid:border-destructive in-data-invalid:ring-[3px] in-data-invalid:ring-destructive/24",
        "motion-reduce:transition-none!",
        className
      )}
      data-slot="number-field-group"
      {...rest}
    />
  );
};

export const NumberInputDecrement = (
  props: React.ComponentProps<typeof NumberFieldPrimitive.Decrement>
) => {
  const { className, children, ...rest } = props;

  return (
    <NumberFieldPrimitive.Decrement
      aria-label="Decrement"
      className={cn(
        stepperClassName,
        "rounded-s-[calc(var(--radius-lg)+1px)]",
        className
      )}
      data-slot="number-field-decrement"
      {...rest}
    >
      {children ?? <MinusIcon aria-hidden />}
    </NumberFieldPrimitive.Decrement>
  );
};

export const NumberInputIncrement = (
  props: React.ComponentProps<typeof NumberFieldPrimitive.Increment>
) => {
  const { className, children, ...rest } = props;

  return (
    <NumberFieldPrimitive.Increment
      aria-label="Increment"
      className={cn(
        stepperClassName,
        "rounded-e-[calc(var(--radius-lg)+1px)]",
        className
      )}
      data-slot="number-field-increment"
      {...rest}
    >
      {children ?? <PlusIcon aria-hidden />}
    </NumberFieldPrimitive.Increment>
  );
};

export const NumberInputInput = (
  props: React.ComponentProps<typeof NumberFieldPrimitive.Input>
) => {
  const { className, ...rest } = props;
  const { invalid } = useContext(NumberInputContext);

  return (
    <NumberFieldPrimitive.Input
      // Set only when true: an `aria-invalid` of undefined would also clear
      // the one a Base UI Field gives the input.
      {...(invalid ? { "aria-invalid": true } : {})}
      className={cn(
        "dark:bg-input/30 border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 disabled:bg-input/50 dark:disabled:bg-input/80 h-8 rounded-lg border bg-transparent px-2.5 py-1 text-base transition-colors file:h-6 file:text-sm file:font-medium focus-visible:ring-3 aria-invalid:ring-3 md:text-sm w-full min-w-0 grow placeholder:text-muted-foreground",
        "h-8 in-data-[size=lg]:h-9 in-data-[size=sm]:h-7",
        "tabular-nums",
        "border-0 bg-transparent shadow-none outline-none ring-0",
        "focus-visible:ring-0",
        className
      )}
      data-slot="number-field-input"
      {...rest}
    />
  );
};

export const NumberInputScrubber = (
  props: React.ComponentProps<typeof NumberFieldPrimitive.ScrubArea>
) => {
  const { className, children, ...rest } = props;
  const { inputId } = useContext(NumberInputContext);

  return (
    <NumberFieldPrimitive.ScrubArea
      className={cn("flex cursor-ew-resize", className)}
      data-slot="number-field-scrubber"
      {...rest}
    >
      <FieldLabel htmlFor={inputId}>{children}</FieldLabel>
    </NumberFieldPrimitive.ScrubArea>
  );
};
