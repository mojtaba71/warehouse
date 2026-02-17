import { type FC } from 'react';
import DatePickerComponent from './DatePicker';

interface Props {
  label?: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

const persianToLatin = (str: string) =>
  str.replace(/[۰-۹]/g, d => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)));

const PersianDatePicker: FC<Props> = ({
  label,
  value,
  onChange,
  placeholder = 'انتخاب تاریخ',
  disabled = false,
}) => {
  const latinValue = value ? persianToLatin(value) : '';

  return (
    <>
      {label && (
        <span style={{ fontSize: 11, color: '#1a4f82', whiteSpace: 'nowrap', fontWeight: 500 }}>{label} :</span>
      )}
      <DatePickerComponent
        value={latinValue || undefined}
        format="YYYY/MM/DD"
        disabled={disabled}
        placeholder={placeholder}
        onChange={(_dateObj: unknown, dateString?: string) => {
          onChange(dateString ?? '');
        }}
        style={{ height: 20, fontSize: 11 }}
        inputClass="rmdp-input"
      />
    </>
  );
};

export default PersianDatePicker;
