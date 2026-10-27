import React, { InputHTMLAttributes, ReactNode, useId } from "react";

export interface InputWithIconProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: ReactNode;
  iconPosition?: "left" | "right";
  helperText?: string;
  error?: string;
  containerClassName?: string;
}

/**
 * InputWithIcon
 * Scoped, accessible input with dedicated icon container.
 * Eliminates text/icon overlap by using a non-shrinking flex column for the icon
 * and min-width: 0 on the editable input area.
 */
export default function InputWithIcon({
  id: customId,
  label,
  icon,
  iconPosition = "left",
  helperText,
  error,
  containerClassName = "",
  className = "",
  disabled,
  required,
  ...inputProps
}: InputWithIconProps) {
  const generatedId = useId();
  const inputId = customId || generatedId;
  const helperId = `${inputId}-helper`;
  const errorId = `${inputId}-error`;

  return (
    <div className={`w-full flex flex-col ${containerClassName}`}>
      <label
        htmlFor={inputId}
        className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5"
      >
        {label}
        {required && <span className="text-rose-500 ml-1" aria-hidden="true">*</span>}
      </label>

      <div
        className={`w-full flex items-center rounded-xl border bg-white shadow-2xs transition-all min-h-[48px] ${
          error
            ? "border-rose-400 ring-2 ring-rose-400/20"
            : "border-slate-300 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-500/20"
        } ${disabled ? "bg-slate-100 opacity-70 cursor-not-allowed" : ""}`}
      >
        {iconPosition === "left" && (
          <div
            className="shrink-0 flex items-center justify-center pl-3.5 pr-2.5 text-slate-500 pointer-events-none select-none"
            aria-hidden="true"
          >
            {icon}
          </div>
        )}

        <input
          id={inputId}
          disabled={disabled}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          className={`flex-1 min-w-0 bg-transparent py-3 pr-3.5 text-base sm:text-base text-slate-800 placeholder:text-slate-400 focus:outline-none leading-relaxed ${
            iconPosition === "right" ? "pl-3.5" : ""
          } ${className}`}
          {...inputProps}
        />

        {iconPosition === "right" && (
          <div
            className="shrink-0 flex items-center justify-center pr-3.5 pl-2.5 text-slate-500 pointer-events-none select-none"
            aria-hidden="true"
          >
            {icon}
          </div>
        )}
      </div>

      {error ? (
        <p id={errorId} className="text-xs text-rose-600 mt-1 font-medium">
          {error}
        </p>
      ) : helperText ? (
        <p id={helperId} className="text-xs text-slate-500 mt-1">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
