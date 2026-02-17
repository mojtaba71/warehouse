import { type FC } from 'react';
import { Button, Tooltip } from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { MdQrCode2 } from 'react-icons/md';
import { BarcodeOutlined } from '@ant-design/icons';

interface Props {
  onAdd: () => void;
  onDelete: () => void;
  onConfirm: () => void;
  onCancel: () => void;
  onEdit: () => void;
  hasSelection: boolean;
}

const ActionBar: FC<Props> = ({ onDelete, onConfirm, onCancel, onEdit, hasSelection }) => {
  return (
    <div
      className="flex items-center bg-linear-to-b from-gray-100 to-gray-200 border-t-2 border-gray-400 px-2 py-1 gap-1"
      dir="rtl"
    >
      {/* راست: تنظیم / ویرایش */}
      <div className="flex items-center gap-1">
        <Tooltip title="تنظیم">
          <Button size="small" icon={<SettingOutlined />}>تنظیم</Button>
        </Tooltip>
        <Tooltip title="ویرایش">
          <Button size="small" icon={<EditOutlined />} onClick={onEdit} disabled={!hasSelection}>ویرایش</Button>
        </Tooltip>
      </div>

      <div className="w-px h-5 bg-gray-300 mx-1" />

      {/* میانی: حذف / نمایش لیست / بارکد */}
      <div className="flex items-center gap-1">
        <Tooltip title="حذف سطر انتخابی">
          <Button size="small" danger icon={<DeleteOutlined />} onClick={onDelete} disabled={!hasSelection}>حذف</Button>
        </Tooltip>
        <Tooltip title="نمایش لیست">
          <Button size="small" icon={<EyeOutlined />}>نمایش لیست</Button>
        </Tooltip>
        <Tooltip title="بارکد">
          <Button size="small" icon={<BarcodeOutlined />}><MdQrCode2 size={13} /></Button>
        </Tooltip>
      </div>

      {/* spacer */}
      <div className="flex-1" />

      {/* چپ: انصراف / تایید */}
      <div className="flex items-center gap-1">
        <Tooltip title="انصراف از تغییرات">
          <Button size="small" icon={<CloseCircleOutlined />} onClick={onCancel}>انصراف</Button>
        </Tooltip>
        <Tooltip title="تایید و ذخیره">
          <Button size="small" type="primary" icon={<CheckCircleOutlined />} onClick={onConfirm}>تایید</Button>
        </Tooltip>
      </div>
    </div>
  );
};

export default ActionBar;
