import React from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DateObject from "react-date-object";

type JalaliDatePickerProps = {
  className?: string;
  format?: string;
  value?: any;
  onChange?: (value: any, dateString?: string) => void;
  minDate?: any;
  maxDate?: any;
  minDateToday?: boolean;
  [key: string]: any;
};

const DatePickerComponent: React.FC<JalaliDatePickerProps> = ({
  className,
  format,
  value,
  onChange,
  minDate,
  maxDate,
  minDateToday,
  ...res
}) => {
  const fmt = (typeof format === "string" ? format : "YYYY/MM/DD") as string;

  const handleChange = (dateObject: any) => {
    if (dateObject && dateObject.isValid) {
      const dateString = dateObject.format(fmt);
      onChange?.(dateObject as any, dateString);
    } else {
      onChange?.(null as any, "");
    }
  };

  const computedMinDate = minDateToday
    ? new DateObject({ calendar: persian })
    : minDate;

  return (
    <DatePicker
      calendar={persian}
      locale={persian_fa}
      format={fmt}
      value={value as any}
      onChange={handleChange}
      style={{
        width: "100%",
        height: "40px",
      }}
      fixMainPosition={false}
      offsetY={4}
      offsetX={0}
      minDate={computedMinDate as any}
      maxDate={maxDate as any}
      {...(res as any)}
    />
  );
};

export default DatePickerComponent;
