import React from "react";
import { NumericFormat, type NumberFormatValues } from "react-number-format";

export interface InputNumberProps {
  variant?: "outlined" | "borderless" | "filled";
  value?: number | string;
  onChange?: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  decimalScale?: number;
  thousandSeparator?: boolean;
  min?: number;
  max?: number;
  maxLength?: number;
  allowNegative?: boolean;
  placeholder?: string;
  allowedDecimalSeparators?: Array<string>;
  decimalSeparator?: string;
  fixedDecimalScale?: boolean;
  allowLeadingZeros?: boolean;
  style?: React.CSSProperties;
  className?: string;
  disabled?: boolean;
}

const InputNumber: React.FC<InputNumberProps> = ({
  value,
  onChange,
  onKeyDown,
  decimalScale = 0,
  thousandSeparator = false,
  min,
  max,
  maxLength,
  allowNegative = false,
  placeholder,
  allowedDecimalSeparators,
  decimalSeparator,
  fixedDecimalScale = false,
  allowLeadingZeros = false,
  style,
  className = "",
  disabled,
}) => {
  const handleValueChange = (values: NumberFormatValues) => {
    if (onChange) {
      onChange(values.value);
    }
  };

  return (
    <NumericFormat
      value={value}
      onValueChange={handleValueChange}
      displayType="input"
      decimalScale={decimalScale}
      thousandSeparator={thousandSeparator}
      allowNegative={allowNegative}
      allowedDecimalSeparators={allowedDecimalSeparators}
      decimalSeparator={decimalSeparator}
      fixedDecimalScale={fixedDecimalScale}
      allowLeadingZeros={allowLeadingZeros}
      min={min}
      maxLength={maxLength}
      max={max}
      style={{
        backgroundColor: '#fff',
        ...style,
      }}
      placeholder={placeholder}
      className={className}
      disabled={disabled}
      onKeyDown={onKeyDown}
    />
  );
};

export default InputNumber;
