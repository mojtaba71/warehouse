import { type FC } from 'react';
import DatePicker from 'react-multi-date-picker';
import gregorian from 'react-date-object/calendars/gregorian';
import gregorian_en from 'react-date-object/locales/gregorian_en';
import DateObject from 'react-date-object';

interface Props {
  label?: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

const GregorianDatePicker: FC<Props> = ({
  label,
  value,
  onChange,
  placeholder = 'انتخاب تاریخ',
  disabled = false,
}) => {
  const handleChange = (dateObject: DateObject | null) => {
    if (dateObject && dateObject.isValid) {
      const dateString = dateObject.format('YYYY/MM/DD');
      onChange(dateString);
    } else {
      onChange('');
    }
  };

  return (
    <>
      {label && (
        <span style={{ fontSize: 11, color: '#1a4f82', whiteSpace: 'nowrap', fontWeight: 500 }}>
          {label} :
        </span>
      )}
      <DatePicker
        calendar={gregorian}
        locale={gregorian_en}
        format="YYYY/MM/DD"
        value={value || undefined}
        onChange={handleChange}
        disabled={disabled}
        placeholder={placeholder}
        style={{ width: "100%", height: 20, fontSize: 11 }}
        inputClass="rmdp-input"
        fixMainPosition={false}
        offsetY={4}
        offsetX={0}
      />
    </>
  );
};

export default GregorianDatePicker;
