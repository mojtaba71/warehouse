import { useState, type FC } from "react";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  SettingOutlined,
  StepBackwardOutlined,
  StepForwardOutlined,
  LeftOutlined,
  RightOutlined,
  UnorderedListOutlined,
  TableOutlined,
} from "@ant-design/icons";

interface Props {
  onAdd: () => void;
  onDelete: () => void;
  onConfirm: () => void;
  onCancel: () => void;
  onEdit: () => void;
  hasSelection: boolean;
  currentRecord?: number;
  totalRecords?: number;
}

const LBL = "#1a4f82";
const BORDER = "#aac4de";
const H = 26;

const Btn: FC<{
  icon?: React.ReactNode;
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
  danger?: boolean;
  primary?: boolean;
  active?: boolean;
  iconOnly?: boolean;
  title?: string;
}> = ({
  icon,
  label,
  onClick,
  disabled,
  danger,
  primary,
  active,
  iconOnly,
  title,
}) => {
  const bg = disabled
    ? "#eef4fb"
    : active
      ? "linear-gradient(to bottom, #ffd591, #ffc069)"
      : primary
        ? "linear-gradient(to bottom, #4096ff, #1677ff)"
        : danger
          ? "linear-gradient(to bottom, #ff7875, #f5222d)"
          : "linear-gradient(to bottom, #f0f6fc, #dbeaf8)";

  const clr = primary && !disabled
    ? "#fff"
    : danger && !disabled
      ? "#fff"
      : disabled
        ? "#b0b8c4"
        : LBL;
  const bdr = disabled
    ? `1px solid #d0dde8`
    : active
      ? "1px solid #fa8c16"
      : primary
        ? "1px solid #1677ff"
        : danger
          ? "1px solid #f5222d"
          : `1px solid ${BORDER}`;

  return (
    <button
      title={title}
      onClick={disabled ? undefined : onClick}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        height: H,
        padding: iconOnly ? "0 6px" : "0 9px",
        fontSize: 11,
        background: bg,
        border: bdr,
        borderRadius: 3,
        color: clr,
        cursor: disabled ? "not-allowed" : "pointer",
        whiteSpace: "nowrap",
        flexShrink: 0,
      }}
    >
      {icon && (
        <span style={{ fontSize: 13, lineHeight: 1, display: "flex" }}>
          {icon}
        </span>
      )}
      {label && <span>{label}</span>}
    </button>
  );
};

const Sep: FC = () => (
  <div style={{ width: 1, height: 16, background: "#b8d0e8", flexShrink: 0 }} />
);

const ActionBar: FC<Props> = ({
  onDelete,
  onConfirm,
  onCancel,
  onEdit,
  hasSelection,
  currentRecord = 0,
  totalRecords = 0,
}) => {
  const [settingActive, setSettingActive] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    setSettingActive(false);
  };
  const handleCancel = () => {
    onCancel();
    setSettingActive(false);
  };

  const noSelection = currentRecord === 0;
  const atFirst = noSelection || currentRecord <= 1;
  const atLast = noSelection || currentRecord >= totalRecords;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        background: "linear-gradient(to bottom, #dbeaf8, #c8ddf0)",
        borderTop: "1px solid #8fa8c0",
        padding: "3px 8px",
        gap: 3,
        direction: "rtl",
        minHeight: 30,
      }}
    >
      <Btn
        icon={<SettingOutlined />}
        label="تنظیم"
        active={settingActive}
        onClick={() => setSettingActive((v) => !v)}
      />
      <Btn
        icon={<EditOutlined />}
        label="ویرایش"
        onClick={onEdit}
        disabled={!settingActive || !hasSelection}
      />
      <Btn
        icon={<DeleteOutlined />}
        label="حذف"
        danger
        onClick={onDelete}
        disabled={!settingActive || !hasSelection}
      />

      <Sep />

      <Btn
        icon={<StepBackwardOutlined />}
        iconOnly
        title="اولین رکورد"
        disabled={atFirst}
      />
      <Btn
        icon={<RightOutlined />}
        iconOnly
        title="رکورد قبلی"
        disabled={atFirst}
      />
      <Btn icon={<UnorderedListOutlined />} iconOnly title="نمایش ردیفی" />
      <Btn icon={<TableOutlined />} iconOnly title="نمایش جدولی" />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 3,
          fontSize: 11,
          color: LBL,
          background: "#fff",
          border: `1px solid ${BORDER}`,
          borderRadius: 3,
          height: H,
          padding: "0 8px",
          flexShrink: 0,
        }}
      >
        <span style={{ fontWeight: 600 }}>{currentRecord}</span>
        <span style={{ color: "#999" }}>/</span>
        <span>{totalRecords}</span>
      </div>

      <Btn
        icon={<LeftOutlined />}
        iconOnly
        title="رکورد بعدی"
        disabled={atLast}
      />
      <Btn
        icon={<StepForwardOutlined />}
        iconOnly
        title="آخرین رکورد"
        disabled={atLast}
      />

      <div style={{ flex: 1 }} />

      <Btn
        icon={<CheckCircleOutlined />}
        label="تایید"
        primary
        disabled={!settingActive}
        onClick={handleConfirm}
      />
      <Btn
        icon={<CloseCircleOutlined />}
        label="انصراف"
        disabled={!settingActive}
        onClick={handleCancel}
      />
    </div>
  );
};

export default ActionBar;
