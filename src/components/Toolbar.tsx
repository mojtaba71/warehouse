import { type FC, useState } from "react";
import { Tooltip } from "antd";
import {
  FaFileInvoice,
  FaPrint,
  FaMoneyBillWave,
  FaBarcode,
  FaTruck,
  FaUndo,
} from "react-icons/fa";
import {
  MdSearch,
  MdOutlineReceiptLong,
  MdOutlineWarehouse,
  MdOutlineDashboard,
} from "react-icons/md";
import { BsFileEarmarkText, BsCalculator } from "react-icons/bs";
import { AiOutlineSetting } from "react-icons/ai";
import { IoArrowUndoSharp } from "react-icons/io5";
import { RiArrowGoBackLine } from "react-icons/ri";

interface ToolbarButton {
  id: string;
  icon: React.ReactNode;
  label: string;
  shortcut?: string;
}

type TabId = "operational" | "general" | "forms";

const ic = (node: React.ReactNode, color: string) => (
  <span style={{ color, display: "flex", alignItems: "center" }}>{node}</span>
);

const ALL_BUTTONS: ToolbarButton[] = [
  {
    id: "factors",
    icon: ic(<FaFileInvoice size={22} />, "#e67e22"),
    label: "عوامل فاکتور",
  },
  {
    id: "search",
    icon: ic(<MdSearch size={24} />, "#2980b9"),
    label: "فراخوانی",
  },
  {
    id: "revive",
    icon: ic(<IoArrowUndoSharp size={22} />, "#27ae60"),
    label: "ابطال / احیا",
  },
  { id: "return", icon: ic(<FaUndo size={19} />, "#8e44ad"), label: "ارجاع" },
  {
    id: "rialy",
    icon: ic(<BsFileEarmarkText size={21} />, "#16a085"),
    label: "ریالی شده ها",
  },
  {
    id: "truck",
    icon: ic(<FaTruck size={21} />, "#2c3e50"),
    label: "بارنامه و باسکول",
  },
  {
    id: "insert",
    icon: ic(<MdOutlineReceiptLong size={24} />, "#c0392b"),
    label: "درج بین اسناد",
    shortcut: "Ctrl+F7",
  },
  {
    id: "serial",
    icon: ic(<FaBarcode size={21} />, "#7f8c8d"),
    label: "سریال های حذف شده",
  },
  {
    id: "price",
    icon: ic(<BsCalculator size={21} />, "#1abc9c"),
    label: "قیمت گذاری",
  },
  {
    id: "pay",
    icon: ic(<FaMoneyBillWave size={21} />, "#27ae60"),
    label: "پرداخت",
  },
  {
    id: "card",
    icon: ic(<FaPrint size={21} />, "#2980b9"),
    label: "صدور کارت گارانتی",
  },
];

const TAB_BUTTONS: Record<TabId, ToolbarButton[]> = {
  operational: ALL_BUTTONS,
  general: [
    {
      id: "g1",
      icon: ic(<AiOutlineSetting size={22} />, "#555"),
      label: "تنظیمات عمومی",
    },
    {
      id: "g2",
      icon: ic(<RiArrowGoBackLine size={20} />, "#8e44ad"),
      label: "بازگشت",
    },
    {
      id: "g3",
      icon: ic(<MdOutlineDashboard size={22} />, "#2980b9"),
      label: "داشبورد",
    },
  ],
  forms: [
    {
      id: "f1",
      icon: ic(<MdOutlineWarehouse size={22} />, "#c0392b"),
      label: "فرم انبار",
    },
    {
      id: "f2",
      icon: ic(<BsFileEarmarkText size={21} />, "#16a085"),
      label: "فرم گزارشات",
    },
  ],
};

const TABS: { id: TabId; label: string }[] = [
  { id: "general", label: "ابزارهای عمومی" },
  { id: "operational", label: "ابزارهای عملیاتی" },
  { id: "forms", label: "فرم های مرتبط" },
];

const tabBase: React.CSSProperties = {
  padding: "4px 18px 5px",
  fontSize: 11,
  fontFamily: "inherit",
  cursor: "pointer",
  borderRadius: "5px 5px 0 0",
  border: "1px solid #8fa8c0",
  borderBottom: "none",
  marginLeft: 2,
  position: "relative",
  transition: "background 0.1s",
  userSelect: "none",
};

const btnBase: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 2,
  padding: "3px 8px 4px",
  minWidth: 58,
  fontFamily: "inherit",
  cursor: "pointer",
  borderRadius: 3,
  border: "1px solid transparent",
  background: "transparent",
  transition: "all 0.1s",
  color: "#222",
};

const Toolbar: FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>("operational");
  const [activeBtn, setActiveBtn] = useState<string>("insert");

  const buttons = TAB_BUTTONS[activeTab];

  const getTabStyle = (id: TabId): React.CSSProperties => {
    const isActive = activeTab === id;
    return {
      ...tabBase,
      fontWeight: isActive ? 600 : 400,
      color: isActive ? "#111" : "#444",
      marginBottom: isActive ? -1 : 0,
      zIndex: isActive ? 3 : 1,
      background: isActive
        ? "linear-gradient(to bottom, #f8f8f8, #ffffff)"
        : "linear-gradient(to bottom, #bfcfe3, #adc0d6)",
      borderBottom: isActive ? "1px solid #fff" : "1px solid #8fa8c0",
      boxShadow: isActive ? "0 -1px 3px rgba(0,0,0,0.08)" : "none",
    };
  };

  const getBtnStyle = (id: string): React.CSSProperties => {
    const isActive = activeBtn === id;
    return {
      ...btnBase,
      border: isActive ? "1px solid #c8922a" : "1px solid transparent",
      background: isActive
        ? "linear-gradient(to bottom, #ffe7a0, #ffd06a)"
        : "transparent",
      boxShadow: isActive ? "inset 0 1px 2px rgba(0,0,0,0.12)" : "none",
    };
  };

  return (
    <div
      dir="rtl"
      className="select-none"
      style={{ borderBottom: "2px solid #8fa8c0" }}
    >
      {/* ── Tab strip ── */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          background: "linear-gradient(to bottom, #d6e4f7, #c0d2e8)",
          paddingTop: 5,
          paddingRight: 4,
          paddingLeft: 4,
        }}
      >
        {TABS.map((tab) => (
          <button
            key={tab.id}
            style={getTabStyle(tab.id)}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Button strip ── */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 1,
          minHeight: 54,
          padding: "2px 4px",
          background: "linear-gradient(to bottom, #dbeaf8, #c8ddf0)",
          position: "relative",
          zIndex: 2,
          borderTop: "1px solid #fff",
        }}
      >
        {buttons.map((btn) => {
          const isActive = activeBtn === btn.id;
          return (
            <Tooltip
              key={btn.id}
              title={
                btn.shortcut ? `${btn.label}  (${btn.shortcut})` : btn.label
              }
              placement="bottom"
              mouseEnterDelay={0.5}
            >
              <button
                style={getBtnStyle(btn.id)}
                onClick={() => setActiveBtn(btn.id)}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    Object.assign(
                      (e.currentTarget as HTMLButtonElement).style,
                      {
                        background:
                          "linear-gradient(to bottom, #e8f0fc, #d4e4f8)",
                        border: "1px solid #7da8d8",
                      },
                    );
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    Object.assign(
                      (e.currentTarget as HTMLButtonElement).style,
                      {
                        background: "transparent",
                        border: "1px solid transparent",
                      },
                    );
                  }
                }}
              >
                <span style={{ lineHeight: 1, opacity: isActive ? 0.85 : 1 }}>
                  {btn.icon}
                </span>
                <span
                  style={{
                    fontSize: 10,
                    lineHeight: 1.25,
                    textAlign: "center",
                    whiteSpace: "nowrap",
                    color: "#111",
                  }}
                >
                  {btn.label}
                </span>
                {btn.shortcut && (
                  <span
                    style={{
                      fontSize: 9,
                      color: "#1a56c4",
                      fontWeight: 600,
                      lineHeight: 1,
                    }}
                  >
                    {btn.shortcut}
                  </span>
                )}
              </button>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
};

export default Toolbar;
