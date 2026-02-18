import React, { type FC, useState, useEffect, useRef } from "react";
import { Modal, Switch } from "antd";
import { DownOutlined, SearchOutlined } from "@ant-design/icons";
import Barcode from "react-barcode";
import JsBarcode from "jsbarcode";
import { type ReceiptHeader } from "../types";
import PersianDatePicker from "./PersianDatePicker";
import GregorianDatePicker from "./GregorianDatePicker";
import InputNumber from "./NumberInput";
import {
  warehouseOptions,
  serialOptions,
  accountOptions,
  recipientOptions,
  barcodeOptions,
} from "../data/fakeData";

interface Props {
  header: ReceiptHeader;
  onChange: (field: keyof ReceiptHeader, value: string) => void;
}

// ─── style tokens ─────────────────────────────────────────────
const BG = "#d6e8f7";
const LBL = "#1a4f82";
const BORDER = "#b8d0e8";
const INPUT_H = 20;
const ROW_H = 24;
const LABEL_GAP = 12; // فاصله حرفه‌ای بین label و input

interface LookupOption {
  code: string;
  name: string;
}

// ─── Label ────────────────────────────────────────────────────
const L: FC<{ text: string; w?: number }> = ({ text }) => (
  <span
    style={{
      fontSize: 11,
      color: LBL,
      fontWeight: 500,
      whiteSpace: "nowrap",
    }}
  >
    {text} :
  </span>
);

// ─── Plain white input ────────────────────────────────────────
const WI: FC<{
  value: string;
  onChange?: (v: string) => void;
  width?: number;
  ltr?: boolean;
  readOnly?: boolean;
  flex?: number;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}> = ({ value, onChange, width, ltr, readOnly, flex, onKeyDown }) => (
  <input
    value={value}
    readOnly={readOnly}
    onChange={(e) => onChange?.(e.target.value)}
    onKeyDown={onKeyDown}
    style={{
      width: flex ? undefined : (width ?? 100),
      flex: flex ?? undefined,
      height: INPUT_H,
      fontSize: 11,
      background: readOnly ? "#eef4fb" : "#fff",
      border: "1px solid #aac4de",
      borderRadius: 2,
      padding: "0 5px",
      direction: ltr ? "ltr" : "rtl",
      textAlign: ltr ? "left" : "right",
      outline: "none",
      color: "#222",
      minWidth: 0,
    }}
    onFocus={(e) => {
      if (!readOnly) e.currentTarget.style.borderColor = "#4096ff";
    }}
    onBlur={(e) => (e.currentTarget.style.borderColor = "#aac4de")}
  />
);

// ─── Numeric input ────────────────────────────────────────────
const NI: FC<{
  value: string;
  onChange: (v: string) => void;
  width?: number;
  flex?: number;
  ltr?: boolean;
}> = ({ value, onChange, width, flex, ltr }) => (
  <InputNumber
    value={value}
    onChange={onChange}
    thousandSeparator={false}
    allowNegative={false}
    decimalScale={0}
    style={{
      width: flex ? undefined : (width ?? 100),
      flex: flex ?? undefined,
      height: INPUT_H,
      fontSize: 11,
      padding: "0 5px",
      minWidth: 0,
      direction: ltr ? "ltr" : "rtl",
      textAlign: ltr ? "left" : "right",
      border: "1px solid #aac4de",
      borderRadius: 2,
      outline: "none",
      background: "#fff",
      color: "#222",
    }}
  />
);

// ─── Native select ────────────────────────────────────────────
const WS: FC<{
  value: string;
  onChange: (v: string) => void;
  options: string[];
  width?: number;
  flex?: number;
}> = ({ value, onChange, options, width, flex }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    style={{
      width: flex ? undefined : (width ?? 120),
      flex: flex ?? undefined,
      height: INPUT_H,
      fontSize: 11,
      background: "#fff",
      border: "1px solid #aac4de",
      borderRadius: 2,
      padding: "0 4px",
      outline: "none",
      color: "#222",
      direction: "rtl",
      minWidth: 0,
    }}
  >
    {options.map((o) => (
      <option key={o} value={o}>
        {o}
      </option>
    ))}
  </select>
);

// ─── Lookup Modal ─────────────────────────────────────────────
const LookupModal: FC<{
  open: boolean;
  title: string;
  options: LookupOption[];
  onSelect: (opt: LookupOption) => void;
  onClose: () => void;
}> = ({ open, title, options, onSelect, onClose }) => {
  const [search, setSearch] = useState("");
  const filtered = options.filter(
    (o) => o.code.includes(search) || o.name.includes(search),
  );
  useEffect(() => {
    if (!open) setSearch("");
  }, [open]);

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      title={<span style={{ fontSize: 13, color: LBL }}>{title}</span>}
      width={380}
      styles={{ body: { padding: "8px 0 4px" } }}
      style={{ direction: "rtl" }}
    >
      <div
        style={{
          padding: "0 12px 8px",
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <SearchOutlined style={{ color: "#888", fontSize: 13 }} />
        <input
          autoFocus
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="جستجو..."
          style={{
            flex: 1,
            height: 26,
            fontSize: 11,
            border: "1px solid #aac4de",
            borderRadius: 3,
            padding: "0 8px",
            outline: "none",
            direction: "rtl",
            background: "#fff",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          background: "#dbeaf8",
          borderTop: `1px solid ${BORDER}`,
          borderBottom: `1px solid ${BORDER}`,
          padding: "3px 12px",
          fontSize: 11,
          color: LBL,
          fontWeight: 600,
        }}
      >
        <span style={{ width: 90 }}>کد</span>
        <span style={{ flex: 1 }}>نام</span>
      </div>
      <div style={{ maxHeight: 260, overflowY: "auto" }}>
        {filtered.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "12px 0",
              fontSize: 11,
              color: "#888",
            }}
          >
            موردی یافت نشد
          </div>
        ) : (
          filtered.map((opt, i) => (
            <div
              key={opt.code}
              onClick={() => {
                onSelect(opt);
                onClose();
              }}
              style={{
                display: "flex",
                padding: "4px 12px",
                fontSize: 11,
                cursor: "pointer",
                background: i % 2 === 0 ? "#fff" : "#f5f9fd",
                borderBottom: "1px solid #e8f0f8",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#d6eaf8")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background =
                  i % 2 === 0 ? "#fff" : "#f5f9fd")
              }
            >
              <span
                style={{ width: 90, color: "#333", fontFamily: "monospace" }}
              >
                {opt.code}
              </span>
              <span style={{ flex: 1, color: "#111" }}>{opt.name}</span>
            </div>
          ))
        )}
      </div>
    </Modal>
  );
};

// ─── Lookup Field: [code][▼][name] ───────────────────────────
const LookupField: FC<{
  codeValue: string;
  nameValue: string;
  codeWidth?: number;
  ltr?: boolean;
  options: LookupOption[];
  onSelect: (opt: LookupOption) => void;
  onCodeChange: (v: string) => void;
  onArrowClick: () => void;
}> = ({
  codeValue,
  nameValue,
  codeWidth = 55,
  ltr = true,
  options,
  onSelect,
  onCodeChange,
  onArrowClick,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const found = options.find(
        (o) => o.code === (e.target as HTMLInputElement).value,
      );
      if (found) onSelect(found);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        flex: 1,
        minWidth: 0,
      }}
    >
      <WI
        value={codeValue}
        onChange={onCodeChange}
        onKeyDown={handleKeyDown}
        width={codeWidth}
        ltr={ltr}
      />
      <button
        onClick={onArrowClick}
        style={{
          width: INPUT_H,
          height: INPUT_H,
          flexShrink: 0,
          background: "linear-gradient(to bottom, #e8f2fc, #d2e7f5)",
          border: "1px solid #aac4de",
          borderRadius: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          padding: 0,
        }}
      >
        <DownOutlined style={{ fontSize: 8, color: LBL }} />
      </button>
      <input
        readOnly
        value={nameValue}
        style={{
          flex: 1,
          height: INPUT_H,
          fontSize: 11,
          background: "#fff",
          border: "1px solid #aac4de",
          borderRadius: 2,
          padding: "0 5px",
          color: LBL,
          outline: "none",
          minWidth: 120,
          direction: "rtl",
        }}
      />
    </div>
  );
};

// ─── Time input ───────────────────────────────────────────────
const TimeInput: FC<{ value: string; onChange: (v: string) => void }> = ({
  value,
  onChange,
}) => (
  <input
    type="time"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    style={{
      width: 66,
      height: INPUT_H,
      fontSize: 11,
      background: "#fff",
      border: "1px solid #aac4de",
      borderRadius: 2,
      padding: "0 3px",
      direction: "ltr",
      outline: "none",
      color: "#222",
    }}
    onFocus={(e) => (e.currentTarget.style.borderColor = "#4096ff")}
    onBlur={(e) => (e.currentTarget.style.borderColor = "#aac4de")}
  />
);

// ─── detect JsBarcode format ──────────────────────────────────
const detectFormat = (code: string): string => {
  const digits = code.replace(/[^0-9]/g, '');
  const isAllDigits = /^[0-9]+$/.test(code);
  if (isAllDigits && code.length === 13) return 'EAN13';
  if (isAllDigits && code.length === 12) return 'UPC';
  if (isAllDigits && code.length === 8)  return 'EAN8';
  if (isAllDigits && code.length === 14) return 'ITF14';
  if (digits.length === 0 && /^[A-Z0-9 \-$.\/+%]+$/.test(code)) return 'CODE39';
  return 'CODE128'; // fallback – supports all printable ASCII
};

// ─── Inline SVG barcode (fits fixed height) ───────────────────
const InlineBarcode: FC<{ code: string; height: number }> = ({ code, height }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const format = detectFormat(code);

  useEffect(() => {
    if (!svgRef.current || !code) return;
    try {
      JsBarcode(svgRef.current, code, {
        format,
        displayValue: false,
        margin: 0,
        background: 'transparent',
        lineColor: '#111',
        width: 1,
        height,
      });
      const svg = svgRef.current;
      svg.setAttribute('width', '100%');
      svg.setAttribute('height', String(height));
    } catch { /* کد نامعتبر */ }
  }, [code, format, height]);

  return <svg ref={svgRef} style={{ display: 'block', width: '100%', height }} />;
};

// ─── Barcode Display Component (modal) ───────────────────────
const BarcodeDisplay: FC<{ code: string }> = ({ code }) => {
  const format = detectFormat(code);
  const labelMap: Record<string, string> = {
    EAN13: 'بارکد استاندارد بین‌المللی (13 رقم)',
    UPC:   'بارکد آمریکای شمالی (12 رقم)',
    EAN8:  'بارکد محصولات کوچک (8 رقم)',
    ITF14: 'بارکد کارتن و پالت (14 رقم)',
    CODE39:'بارکد حروفی‌عددی (نظامی/دولتی)',
    CODE128:'بارکد همه‌منظوره (انبارداری)',
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: '16px 24px' }}>
      <div style={{
        fontSize: 12, fontWeight: 600, color: '#1a4f82',
        padding: '3px 12px', background: '#e8f4fd', borderRadius: 4, border: '1px solid #b8d0e8',
      }}>
        {format}
      </div>
      <Barcode
        value={code}
        format={format as never}
        width={1.8}
        height={80}
        displayValue
        fontSize={12}
        margin={6}
        background="#ffffff"
        lineColor="#000000"
      />
      <div style={{ fontSize: 11, color: '#666', textAlign: 'center' }}>
        {labelMap[format] ?? 'بارکد استاندارد'}
      </div>
    </div>
  );
};

// ─── Barcode Selection Modal ──────────────────────────────────
const BarcodeSelectionModal: FC<{
  open: boolean;
  onSelect: (code: string) => void;
  onClose: () => void;
}> = ({ open, onSelect, onClose }) => {
  const [search, setSearch] = useState('');
  const filtered = barcodeOptions.filter(
    o => o.code.includes(search) || o.name.includes(search)
  );
  
  useEffect(() => { if (!open) setSearch(''); }, [open]);

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      title={<span style={{ fontSize: 13, color: LBL }}>انتخاب بارکد</span>}
      width={450}
      styles={{ body: { padding: '8px 0 4px' } }}
      style={{ direction: 'rtl' }}
    >
      <div style={{ padding: '0 12px 8px', display: 'flex', alignItems: 'center', gap: 6 }}>
        <SearchOutlined style={{ color: '#888', fontSize: 13 }} />
        <input
          autoFocus
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="جستجو..."
          style={{
            flex: 1,
            height: 26,
            fontSize: 11,
            border: '1px solid #aac4de',
            borderRadius: 3,
            padding: '0 8px',
            outline: 'none',
            direction: 'rtl',
            background: '#fff',
          }}
        />
      </div>
      <div style={{
        display: 'flex',
        background: '#dbeaf8',
        borderTop: `1px solid ${BORDER}`,
        borderBottom: `1px solid ${BORDER}`,
        padding: '3px 12px',
        fontSize: 11,
        color: LBL,
        fontWeight: 600,
      }}>
        <span style={{ width: 150 }}>کد بارکد</span>
        <span style={{ flex: 1 }}>نام</span>
      </div>
      <div style={{ maxHeight: 320, overflowY: 'auto' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '12px 0', fontSize: 11, color: '#888' }}>
            موردی یافت نشد
          </div>
        ) : (
          filtered.map((opt, i) => (
            <div
              key={opt.code}
              onClick={() => { onSelect(opt.code); onClose(); }}
              style={{
                display: 'flex', alignItems: 'center',
                padding: '6px 12px', fontSize: 11, cursor: 'pointer',
                background: i % 2 === 0 ? '#fff' : '#f5f9fd',
                borderBottom: '1px solid #e8f0f8', gap: 10,
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#d6eaf8')}
              onMouseLeave={e => (e.currentTarget.style.background = i % 2 === 0 ? '#fff' : '#f5f9fd')}
            >
              {/* thumbnail بارکد واقعی */}
              <div style={{ width: 100, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
                <Barcode
                  value={opt.code}
                  format={detectFormat(opt.code) as never}
                  width={0.7}
                  height={22}
                  displayValue={false}
                  margin={0}
                  background="transparent"
                  lineColor="#333"
                />
              </div>
              <span style={{ width: 120, color: '#333', fontFamily: 'monospace', fontSize: 10, flexShrink: 0 }}>{opt.code}</span>
              <span style={{ flex: 1, color: '#111' }}>{opt.name}</span>
            </div>
          ))
        )}
      </div>
    </Modal>
  );
};

// ─── Barcode Scanner Modal ─────────────────────────────────────
const BarcodeScannerModal: FC<{
  open: boolean;
  barcode: string;
  onClose: () => void;
}> = ({ open, barcode, onClose }) => {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      title={<span style={{ fontSize: 13, color: LBL }}>بارکد خوان</span>}
      width={500}
      styles={{ body: { padding: '20px', textAlign: 'center' } }}
      style={{ direction: 'rtl' }}
    >
      {barcode ? (
        <BarcodeDisplay code={barcode} />
      ) : (
        <div style={{ padding: '40px', color: '#888', fontSize: 12 }}>
          لطفاً ابتدا یک بارکد انتخاب کنید
        </div>
      )}
    </Modal>
  );
};

// ─── Barcode Field ─────────────────────────────────────────────
// سه حالت:
//  1. focused=true  → input عادی برای تایپ کد
//  2. focused=false + value → تصویر بارکد پر باکس
//  3. focused=false + !value → placeholder خاکستری
const BarcodeField: FC<{ value: string; onChange: (v: string) => void }> = ({
  value,
  onChange,
}) => {
  const [focused, setFocused] = useState(false);
  const [showSelectionModal, setShowSelectionModal] = useState(false);
  const [showScannerModal, setShowScannerModal] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const btnStyle: React.CSSProperties = {
    width: INPUT_H, height: INPUT_H, flexShrink: 0,
    background: 'linear-gradient(to bottom, #e8f2fc, #d2e7f5)',
    border: '1px solid #aac4de', borderRadius: 2,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', padding: 0,
  };

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1, minWidth: 0 }}>

        {/* ── باکس اصلی: تصویر بارکد یا input ── */}
        <div
          style={{
            flex: 1, height: INPUT_H, minWidth: 0, position: 'relative',
            border: `1px solid ${focused ? '#4096ff' : '#aac4de'}`,
            borderRadius: 2, background: '#fff', overflow: 'hidden',
            cursor: focused ? 'text' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
          onClick={() => {
            setFocused(true);
            setTimeout(() => inputRef.current?.focus(), 0);
          }}
        >
          {/* input – فقط وقتی focused هست نمایش داده میشه */}
          {focused && (
            <input
              ref={inputRef}
              value={value}
              onChange={e => onChange(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onKeyDown={e => { if (e.key === 'Escape') { setFocused(false); inputRef.current?.blur(); } }}
              autoFocus
              style={{
                position: 'absolute', inset: 0, width: '100%', height: '100%',
                border: 'none', outline: 'none', background: 'transparent',
                fontSize: 11, padding: '0 5px', direction: 'ltr',
                color: '#222', cursor: 'text',
              }}
            />
          )}

          {/* نمایش بارکد یا placeholder – فقط وقتی focused نیست */}
          {!focused && (
            value ? (
              <InlineBarcode code={value} height={INPUT_H - 2} />
            ) : (
              <span style={{ color: '#bbb', fontSize: 10, pointerEvents: 'none', userSelect: 'none' }}>
                کلیک برای وارد کردن بارکد
              </span>
            )
          )}
        </div>

        {/* ▼ انتخاب از لیست */}
        <button style={btnStyle} onClick={e => { e.stopPropagation(); setShowSelectionModal(true); }}>
          <DownOutlined style={{ fontSize: 8, color: LBL }} />
        </button>

        {/* ▲ نمایش بارکد کامل */}
        <button style={btnStyle} onClick={e => { e.stopPropagation(); setShowScannerModal(true); }}>
          <DownOutlined style={{ fontSize: 8, color: LBL, transform: 'rotate(180deg)' }} />
        </button>
      </div>

      <BarcodeSelectionModal
        open={showSelectionModal}
        onSelect={v => { onChange(v); setFocused(false); }}
        onClose={() => setShowSelectionModal(false)}
      />
      <BarcodeScannerModal
        open={showScannerModal}
        barcode={value}
        onClose={() => setShowScannerModal(false)}
      />
    </>
  );
};

// ─── Row / Col ────────────────────────────────────────────────
const Row: FC<{ children: React.ReactNode; last?: boolean }> = ({
  children,
  last,
}) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      minHeight: ROW_H,
      borderBottom: last ? "none" : `1px solid ${BORDER}`,
    }}
  >
    {children}
  </div>
);

const Col: FC<{ children: React.ReactNode; last?: boolean }> = ({
  children,
  last,
}) => (
  <div
    style={{
      flex: 1,
      padding: "2px 6px",
      borderLeft: last ? "none" : `1px solid ${BORDER}`,
      minWidth: 0,
      overflow: "hidden",
    }}
  >
    {children}
  </div>
);

// ─── Field: label (ثابت) + فاصله + input (هم‌تراز) ─────────────
const Field: FC<{
  label: React.ReactNode;
  labelWidth: number;
  children: React.ReactNode;
}> = ({ label, labelWidth, children }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: LABEL_GAP,
      width: "100%",
      minWidth: 0,
      direction: "rtl",
    }}
  >
    <div
      style={{
        width: labelWidth,
        flexShrink: 0,
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingLeft: 0,
        textAlign: "right",
      }}
    >
      {label}
    </div>
    <div
      style={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        alignItems: "center",
        gap: 4,
      }}
    >
      {children}
    </div>
  </div>
);

// ─── helpers ─────────────────────────────────────────────────
const findName = (opts: LookupOption[], code: string) =>
  opts.find((o) => o.code === code)?.name ?? "";

type LookupKey = "warehouse" | "serial" | "account" | "recipient";

// ─── Main component ───────────────────────────────────────────
const HeaderForm: FC<Props> = ({ header, onChange }) => {
  const [openLookup, setOpenLookup] = useState<LookupKey | null>(null);

  const warehouseCode =
    header.storeBranch === "انبار شعبه تراک" ? "800" : header.storeBranch;
  const warehouseName = findName(warehouseOptions, warehouseCode);
  const serialName = findName(serialOptions, header.serialNumber);
  const accountName = findName(accountOptions, header.account);
  const recipientName = findName(recipientOptions, header.personInCharge);

  const lookupConfig: Record<
    LookupKey,
    { title: string; options: LookupOption[] }
  > = {
    warehouse: { title: "انتخاب انبار", options: warehouseOptions },
    serial: { title: "انتخاب سریال", options: serialOptions },
    account: { title: "انتخاب کد حساب", options: accountOptions },
    recipient: { title: "انتخاب تحویل گیرنده", options: recipientOptions },
  };

  const handleSelect = (key: LookupKey) => (opt: LookupOption) => {
    if (key === "warehouse") onChange("storeBranch", opt.code);
    if (key === "serial") onChange("serialNumber", opt.code);
    if (key === "account") onChange("account", opt.code);
    if (key === "recipient") onChange("personInCharge", opt.code);
  };

  const cfg = openLookup ? lookupConfig[openLookup] : null;

  return (
    <div
      style={{ background: BG, borderBottom: "2px solid #8fa8c0" }}
      dir="rtl"
    >
      {cfg && (
        <LookupModal
          open={openLookup !== null}
          title={cfg.title}
          options={cfg.options}
          onSelect={handleSelect(openLookup!)}
          onClose={() => setOpenLookup(null)}
        />
      )}

      {/* ── Status bar ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#c2d8ee",
          borderBottom: "1px solid #8fa8c0",
          padding: "2px 10px",
          fontSize: 11,
        }}
      >
        <span style={{ color: LBL, fontWeight: 600 }}>وضعیت : رسید موقت</span>
        <span style={{ color: LBL, fontWeight: 500 }}>ساختار ارزی فعال :</span>
      </div>

      {/* ── 4-column grid ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
        {/* ══════ ستون ۱: انبار / سریال / کد حساب / تحویل گیرنده ══════ */}
        <div style={{ borderLeft: `1px solid ${BORDER}` }}>
          <Row>
            <Col last>
              <Field labelWidth={78} label={<L text="انبار" />}>
                <LookupField
                  codeValue={warehouseCode}
                  nameValue={warehouseName}
                  codeWidth={100}
                  onCodeChange={(v) => onChange("storeBranch", v)}
                  onSelect={handleSelect("warehouse")}
                  onArrowClick={() => setOpenLookup("warehouse")}
                  options={warehouseOptions}
                />
              </Field>
            </Col>
          </Row>
          <Row>
            <Col last>
              <Field labelWidth={78} label={<L text="سریـال" />}>
                <LookupField
                  codeValue={header.serialNumber}
                  nameValue={serialName}
                  codeWidth={100}
                  ltr
                  onCodeChange={(v) => onChange("serialNumber", v)}
                  onSelect={handleSelect("serial")}
                  onArrowClick={() => setOpenLookup("serial")}
                  options={serialOptions}
                />
              </Field>
            </Col>
          </Row>
          <Row>
            <Col last>
              <Field labelWidth={78} label={<L text="کد حساب" />}>
                <LookupField
                  codeValue={header.account}
                  nameValue={accountName}
                  codeWidth={100}
                  ltr
                  onCodeChange={(v) => onChange("account", v)}
                  onSelect={handleSelect("account")}
                  onArrowClick={() => setOpenLookup("account")}
                  options={accountOptions}
                />
              </Field>
            </Col>
          </Row>
          <Row>
            <Col last>
              <Field labelWidth={78} label={<L text="تحویل گیرنده" />}>
                <LookupField
                  codeValue={header.personInCharge}
                  nameValue={recipientName}
                  codeWidth={100}
                  ltr
                  onCodeChange={(v) => onChange("personInCharge", v)}
                  onSelect={handleSelect("recipient")}
                  onArrowClick={() => setOpenLookup("recipient")}
                  options={recipientOptions}
                />
              </Field>
            </Col>
          </Row>
          <Row last>
            <Col last>
              <Field labelWidth={78} label={<L text="عملکرد" />}>
                <WS
                  value="انبار و فروش"
                  onChange={() => {}}
                  options={["انبار و فروش", "انبار و انبکاره"]}
                  flex={1}
                />
              </Field>
            </Col>
          </Row>
        </div>

        {/* ══════ ستون ۲: نوع رسید / شماره ارجاع / شماره درخواست / تسویه وجه / بارکد کالا ══════ */}
        <div style={{ borderLeft: `1px solid ${BORDER}` }}>
          <Row>
            <Col last>
              <Field labelWidth={86} label={<L text="نوع رسیـد" />}>
                <WS
                  value={header.receiptType}
                  onChange={(v) => onChange("receiptType", v)}
                  options={[
                    "رسید انتقالی غیر همزمان",
                    "رسید خرید",
                    "رسید مرجوعی",
                  ]}
                  flex={1}
                />
              </Field>
            </Col>
          </Row>
          <Row>
            <Col last>
              <Field labelWidth={86} label={<L text="شماره ارجاع" />}>
                <NI
                  value={header.returnNumber}
                  onChange={(v) => onChange("returnNumber", v)}
                  flex={1}
                  ltr
                />
              </Field>
            </Col>
          </Row>
          <Row>
            <Col last>
              <Field labelWidth={86} label={<L text="شماره درخواست" />}>
                <NI
                  value={header.requestNumber}
                  onChange={(v) => onChange("requestNumber", v)}
                  flex={1}
                  ltr
                />
              </Field>
            </Col>
          </Row>
          <Row>
            <Col last>
              <Field labelWidth={86} label={<L text="تسویه وجه" />}>
                <Switch
                  size="small"
                  checked={header.cashType === "نقد"}
                  onChange={(checked) =>
                    onChange("cashType", checked ? "نقد" : "اعتباری")
                  }
                  style={{
                    backgroundColor:
                      header.cashType === "نقد" ? "#1a6e3a" : "#999",
                    flexShrink: 0,
                  }}
                />
                <WS
                  value={header.cashType}
                  onChange={(v) => onChange("cashType", v)}
                  options={["نقد", "اعتباری", "چک", "حواله"]}
                  flex={1}
                />
              </Field>
            </Col>
          </Row>
          <Row last>
            <Col last>
              <Field labelWidth={86} label={<L text="بارکد کالا" />}>
                <BarcodeField
                  value={header.faxNumber}
                  onChange={(v) => onChange("faxNumber", v)}
                />
              </Field>
            </Col>
          </Row>
        </div>

        {/* ══════ ستون ۳: تاریخ رسید + ساعت / تاریخ درخواست / شماره سند / تاریخ میلادی / حوزه مالی ══════ */}
        <div style={{ borderLeft: `1px solid ${BORDER}` }}>
          <Row>
            <Col last>
              <Field labelWidth={84} label={<L text="تاریخ رسیـد" />}>
                <PersianDatePicker
                  value={header.receiptDate}
                  onChange={(v) => onChange("receiptDate", v)}
                />
                <TimeInput
                  value={header.receiptTime}
                  onChange={(v) => onChange("receiptTime", v)}
                />
              </Field>
            </Col>
          </Row>
          <Row>
            <Col last>
              <Field labelWidth={84} label={<L text="تاریخ درخواست" />}>
                <PersianDatePicker
                  value={header.requestDate}
                  onChange={(v) => onChange("requestDate", v)}
                  placeholder="  /  /  "
                />
              </Field>
            </Col>
          </Row>
          <Row>
            <Col last>
              <Field labelWidth={84} label={<L text="شماره سند" />}>
                <NI
                  value={header.documentNumber}
                  onChange={(v) => onChange("documentNumber", v)}
                  flex={1}
                  ltr
                />
              </Field>
            </Col>
          </Row>
          <Row>
            <Col last>
              <Field labelWidth={84} label={<L text="تاریخ میلادی" />}>
                <GregorianDatePicker
                  value={header.mileadyDate}
                  onChange={(v) => onChange("mileadyDate", v)}
                  placeholder="  /  /  "
                />
              </Field>
            </Col>
          </Row>
          <Row last>
            <Col last>
              <Field labelWidth={84} label={<L text="حوزه مالی" />}>
                <WS
                  value={header.warehouseSection}
                  onChange={(v) => onChange("warehouseSection", v)}
                  options={["نکدانه", "انبار و انبکاره", "انبار و فروش"]}
                  flex={1}
                />
              </Field>
            </Col>
          </Row>
        </div>

        {/* ══════ ستون ۴: شماره فاکتور / محل اقدام خرید / ش کنترل کیفی / سامانه مودیان / تاریخ موثر + روز ══════ */}
        <div>
          <Row>
            <Col last>
              <Field labelWidth={88} label={<L text="شماره فاکتور" />}>
                <WI
                  value={header.invoiceNumber}
                  onChange={(v) => onChange("invoiceNumber", v)}
                  flex={1}
                  ltr
                />
              </Field>
            </Col>
          </Row>
          <Row>
            <Col last>
              <Field labelWidth={88} label={<L text="محل اقدام خرید" />}>
                <WI
                  value={header.purchaseLocation}
                  onChange={(v) => onChange("purchaseLocation", v)}
                  flex={1}
                />
              </Field>
            </Col>
          </Row>
          <Row>
            <Col last>
              <Field labelWidth={88} label={<L text="ش کنترل کیفی" />}>
                <WS
                  value={header.qualityControl}
                  onChange={(v) => onChange("qualityControl", v)}
                  options={["", "تایید شده", "رد شده", "در انتظار"]}
                  flex={1}
                />
              </Field>
            </Col>
          </Row>
          <Row>
            <Col last>
              <Field labelWidth={88} label={<L text="سامانه مودیان" />}>
                <WS
                  value={header.quantityControl}
                  onChange={(v) => onChange("quantityControl", v)}
                  options={["", "ثبت شده", "در انتظار ثبت"]}
                  flex={1}
                />
              </Field>
            </Col>
          </Row>
          <Row last>
            <Col last>
              <Field labelWidth={88} label={<L text="تاریخ موثر" />}>
                <PersianDatePicker
                  value=""
                  onChange={() => {}}
                  placeholder="  /  /  "
                />
                <NI
                  value={header.motorDays}
                  onChange={(v) => onChange("motorDays", v)}
                  width={32}
                  ltr
                />
                <span
                  style={{
                    fontSize: 11,
                    color: LBL,
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                  }}
                >
                  روز
                </span>
              </Field>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default HeaderForm;
