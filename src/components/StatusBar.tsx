import { type FC } from 'react';

interface Props {
  currentRecord: number;
  totalRecords: number;
  mode: 'view' | 'edit' | 'new';
  username: string;
  currentDate: string;
  currentTime: string;
}

const modeLabel: Record<string, string> = {
  view: 'نمایش',
  edit: 'ویرایش',
  new: 'درج جدید',
};

const modeColor: Record<string, string> = {
  view: 'text-gray-600',
  edit: 'text-orange-600',
  new: 'text-green-600',
};

const StatusBar: FC<Props> = ({ currentRecord, totalRecords, mode, username, currentDate, currentTime }) => {
  return (
    <div
      className="status-bar flex items-center justify-between px-3 py-0.5 text-[10px] text-gray-700 select-none"
      dir="rtl"
      style={{ fontSize: '10px' }}
    >
      <div className="flex items-center gap-3">
        <span>
          وضعیت فرم :{' '}
          <span className={`font-semibold ${modeColor[mode]}`}>{modeLabel[mode]}</span>
        </span>
        <span className="border-r border-gray-400 pr-3">
          رکورد جاری : <span className="font-semibold">{currentRecord}</span> از{' '}
          <span className="font-semibold">{totalRecords}</span>
        </span>
      </div>

      <div className="flex items-center gap-3">
        <span>
          نام کاربر جاری : <span className="font-semibold">{username}</span>
        </span>
        <span className="border-r border-gray-400 pr-3">
          فرایام : <span className="font-medium">دوره</span>
        </span>
        <span className="ltr font-mono border-r border-gray-400 pr-3">{currentTime}</span>
        <span className="font-semibold">{currentDate}</span>
      </div>
    </div>
  );
};

export default StatusBar;
