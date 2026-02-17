import { type FC, useState, useEffect } from 'react';
import { Modal, Switch } from 'antd';
import { DownOutlined, SearchOutlined } from '@ant-design/icons';
import { type ReceiptHeader } from '../types';
import PersianDatePicker from './PersianDatePicker';
import InputNumber from './NumberInput';
import {
  warehouseOptions,
  serialOptions,
  accountOptions,
  recipientOptions,
} from '../data/fakeData';

interface Props {
  header: ReceiptHeader;
  onChange: (field: keyof ReceiptHeader, value: string) => void;
}

// ─── style tokens ─────────────────────────────────────────────
const BG     = '#d6e8f7';
const LBL    = '#1a4f82';
const BORDER = '#b8d0e8';
const INPUT_H = 20;
const ROW_H   = 24;

interface LookupOption { code: string; name: string; }

// ─── Label ────────────────────────────────────────────────────
const L: FC<{ text: string; w?: number }> = ({ text, w = 80 }) => (
  <div style={{
    width: w, minWidth: w, fontSize: 11, color: LBL, fontWeight: 500,
    textAlign: 'right', paddingRight: 5, whiteSpace: 'nowrap', flexShrink: 0,
  }}>
    {text} :
  </div>
);

// ─── Plain white input ────────────────────────────────────────
const WI: FC<{
  value: string; onChange?: (v: string) => void;
  width?: number; ltr?: boolean; readOnly?: boolean; flex?: number;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}> = ({ value, onChange, width, ltr, readOnly, flex, onKeyDown }) => (
  <input
    value={value} readOnly={readOnly}
    onChange={e => onChange?.(e.target.value)}
    onKeyDown={onKeyDown}
    style={{
      width: flex ? undefined : (width ?? 100), flex: flex ?? undefined,
      height: INPUT_H, fontSize: 11, background: readOnly ? '#eef4fb' : '#fff',
      border: '1px solid #aac4de', borderRadius: 2, padding: '0 5px',
      direction: ltr ? 'ltr' : 'rtl', textAlign: ltr ? 'left' : 'right',
      outline: 'none', color: '#222', minWidth: 0,
    }}
    onFocus={e => { if (!readOnly) e.currentTarget.style.borderColor = '#4096ff'; }}
    onBlur={e => (e.currentTarget.style.borderColor = '#aac4de')}
  />
);

// ─── Numeric input ────────────────────────────────────────────
const NI: FC<{
  value: string; onChange: (v: string) => void;
  width?: number; flex?: number; ltr?: boolean;
}> = ({ value, onChange, width, flex, ltr }) => (
  <InputNumber
    value={value} onChange={onChange}
    thousandSeparator={false} allowNegative={false} decimalScale={0}
    variant="outlined"
    style={{
      width: flex ? undefined : (width ?? 100), flex: flex ?? undefined,
      height: INPUT_H, fontSize: 11, padding: '0 5px', minWidth: 0,
      direction: ltr ? 'ltr' : 'rtl',
    }}
    className="h-5! text-[11px]! rounded-xs! border-[#aac4de]! bg-white! text-gray-900! px-1! py-0!"
  />
);

// ─── Native select ────────────────────────────────────────────
const WS: FC<{
  value: string; onChange: (v: string) => void;
  options: string[]; width?: number; flex?: number;
}> = ({ value, onChange, options, width, flex }) => (
  <select
    value={value} onChange={e => onChange(e.target.value)}
    style={{
      width: flex ? undefined : (width ?? 120), flex: flex ?? undefined,
      height: INPUT_H, fontSize: 11, background: '#fff',
      border: '1px solid #aac4de', borderRadius: 2, padding: '0 4px',
      outline: 'none', color: '#222', direction: 'rtl', minWidth: 0,
    }}
  >
    {options.map(o => <option key={o} value={o}>{o}</option>)}
  </select>
);

// ─── Lookup Modal ─────────────────────────────────────────────
const LookupModal: FC<{
  open: boolean; title: string; options: LookupOption[];
  onSelect: (opt: LookupOption) => void; onClose: () => void;
}> = ({ open, title, options, onSelect, onClose }) => {
  const [search, setSearch] = useState('');
  const filtered = options.filter(o => o.code.includes(search) || o.name.includes(search));
  useEffect(() => { if (!open) setSearch(''); }, [open]);

  return (
    <Modal open={open} onCancel={onClose} footer={null}
      title={<span style={{ fontSize: 13, color: LBL }}>{title}</span>}
      width={380} styles={{ body: { padding: '8px 0 4px' } }} style={{ direction: 'rtl' }}
    >
      <div style={{ padding: '0 12px 8px', display: 'flex', alignItems: 'center', gap: 6 }}>
        <SearchOutlined style={{ color: '#888', fontSize: 13 }} />
        <input autoFocus value={search} onChange={e => setSearch(e.target.value)} placeholder="جستجو..."
          style={{ flex: 1, height: 26, fontSize: 11, border: '1px solid #aac4de', borderRadius: 3, padding: '0 8px', outline: 'none', direction: 'rtl', background: '#fff' }}
        />
      </div>
      <div style={{ display: 'flex', background: '#dbeaf8', borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`, padding: '3px 12px', fontSize: 11, color: LBL, fontWeight: 600 }}>
        <span style={{ width: 90 }}>کد</span>
        <span style={{ flex: 1 }}>نام</span>
      </div>
      <div style={{ maxHeight: 260, overflowY: 'auto' }}>
        {filtered.length === 0
          ? <div style={{ textAlign: 'center', padding: '12px 0', fontSize: 11, color: '#888' }}>موردی یافت نشد</div>
          : filtered.map((opt, i) => (
            <div key={opt.code} onClick={() => { onSelect(opt); onClose(); }}
              style={{ display: 'flex', padding: '4px 12px', fontSize: 11, cursor: 'pointer', background: i % 2 === 0 ? '#fff' : '#f5f9fd', borderBottom: '1px solid #e8f0f8' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#d6eaf8')}
              onMouseLeave={e => (e.currentTarget.style.background = i % 2 === 0 ? '#fff' : '#f5f9fd')}
            >
              <span style={{ width: 90, color: '#333', fontFamily: 'monospace' }}>{opt.code}</span>
              <span style={{ flex: 1, color: '#111' }}>{opt.name}</span>
            </div>
          ))}
      </div>
    </Modal>
  );
};

// ─── Lookup Field: [code][▼][name] ───────────────────────────
const LookupField: FC<{
  codeValue: string; nameValue: string;
  codeWidth?: number; ltr?: boolean; options: LookupOption[];
  onSelect: (opt: LookupOption) => void;
  onCodeChange: (v: string) => void;
  onArrowClick: () => void;
}> = ({ codeValue, nameValue, codeWidth = 55, ltr = true, options, onSelect, onCodeChange, onArrowClick }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const found = options.find(o => o.code === (e.target as HTMLInputElement).value);
      if (found) onSelect(found);
    }
  };
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1, minWidth: 0 }}>
      <WI value={codeValue} onChange={onCodeChange} onKeyDown={handleKeyDown} width={codeWidth} ltr={ltr} />
      <button onClick={onArrowClick} style={{
        width: INPUT_H, height: INPUT_H, flexShrink: 0,
        background: 'linear-gradient(to bottom, #e8f2fc, #d2e7f5)',
        border: '1px solid #aac4de', borderRadius: 2,
        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: 0,
      }}>
        <DownOutlined style={{ fontSize: 8, color: LBL }} />
      </button>
      <input readOnly value={nameValue} style={{
        flex: 1, height: INPUT_H, fontSize: 11, background: '#fff',
        border: '1px solid #aac4de', borderRadius: 2, padding: '0 5px',
        color: LBL, outline: 'none', minWidth: 0, direction: 'rtl',
      }} />
    </div>
  );
};

// ─── Time input ───────────────────────────────────────────────
const TimeInput: FC<{ value: string; onChange: (v: string) => void }> = ({ value, onChange }) => (
  <input type="time" value={value} onChange={e => onChange(e.target.value)}
    style={{ width: 66, height: INPUT_H, fontSize: 11, background: '#fff', border: '1px solid #aac4de', borderRadius: 2, padding: '0 3px', direction: 'ltr', outline: 'none', color: '#222' }}
    onFocus={e => (e.currentTarget.style.borderColor = '#4096ff')}
    onBlur={e => (e.currentTarget.style.borderColor = '#aac4de')}
  />
);

// ─── Barcode field: [input][▼][▲] ────────────────────────────
const BarcodeField: FC<{ value: string; onChange: (v: string) => void }> = ({ value, onChange }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
    <WI value={value} onChange={onChange} flex={1} ltr />
    {[false, true].map((flip, i) => (
      <button key={i} style={{
        width: INPUT_H, height: INPUT_H, flexShrink: 0,
        background: 'linear-gradient(to bottom, #e8f2fc, #d2e7f5)',
        border: '1px solid #aac4de', borderRadius: 2,
        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: 0,
      }}>
        <DownOutlined style={{ fontSize: 8, color: LBL, transform: flip ? 'rotate(180deg)' : undefined }} />
      </button>
    ))}
  </div>
);

// ─── Row / Col ────────────────────────────────────────────────
const Row: FC<{ children: React.ReactNode; last?: boolean }> = ({ children, last }) => (
  <div style={{ display: 'flex', alignItems: 'center', minHeight: ROW_H, borderBottom: last ? 'none' : `1px solid ${BORDER}` }}>
    {children}
  </div>
);

const Col: FC<{ children: React.ReactNode; last?: boolean }> = ({ children, last }) => (
  <div style={{
    flex: 1, display: 'flex', alignItems: 'center', gap: 4,
    padding: '2px 6px', borderLeft: last ? 'none' : `1px solid ${BORDER}`,
    minWidth: 0, overflow: 'hidden',
  }}>
    {children}
  </div>
);

// ─── helpers ─────────────────────────────────────────────────
const findName = (opts: LookupOption[], code: string) => opts.find(o => o.code === code)?.name ?? '';

type LookupKey = 'warehouse' | 'serial' | 'account' | 'recipient';

// ─── Main component ───────────────────────────────────────────
const HeaderForm: FC<Props> = ({ header, onChange }) => {
  const [openLookup, setOpenLookup] = useState<LookupKey | null>(null);

  const warehouseCode = header.storeBranch === 'انبار شعبه تراک' ? '800' : header.storeBranch;
  const warehouseName = findName(warehouseOptions, warehouseCode);
  const serialName    = findName(serialOptions,    header.serialNumber);
  const accountName   = findName(accountOptions,   header.account);
  const recipientName = findName(recipientOptions, header.personInCharge);

  const lookupConfig: Record<LookupKey, { title: string; options: LookupOption[] }> = {
    warehouse: { title: 'انتخاب انبار',        options: warehouseOptions },
    serial:    { title: 'انتخاب سریال',         options: serialOptions   },
    account:   { title: 'انتخاب کد حساب',       options: accountOptions  },
    recipient: { title: 'انتخاب تحویل گیرنده',  options: recipientOptions },
  };

  const handleSelect = (key: LookupKey) => (opt: LookupOption) => {
    if (key === 'warehouse')  onChange('storeBranch',    opt.code);
    if (key === 'serial')     onChange('serialNumber',   opt.code);
    if (key === 'account')    onChange('account',        opt.code);
    if (key === 'recipient')  onChange('personInCharge', opt.code);
  };

  const cfg = openLookup ? lookupConfig[openLookup] : null;

  return (
    <div style={{ background: BG, borderBottom: '2px solid #8fa8c0' }} dir="rtl">

      {cfg && (
        <LookupModal open={openLookup !== null} title={cfg.title} options={cfg.options}
          onSelect={handleSelect(openLookup!)} onClose={() => setOpenLookup(null)}
        />
      )}

      {/* ── Status bar ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#c2d8ee', borderBottom: '1px solid #8fa8c0', padding: '2px 10px', fontSize: 11 }}>
        <span style={{ color: LBL, fontWeight: 600 }}>وضعیت : رسید موقت</span>
        <span style={{ color: LBL, fontWeight: 500 }}>ساختار ارزی فعال :</span>
      </div>

      {/* ── 4-column grid ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>

        {/* ══════ ستون ۱: انبار / سریال / کد حساب / تحویل گیرنده ══════ */}
        <div style={{ borderLeft: `1px solid ${BORDER}` }}>
          <Row>
            <Col last>
              <L text="انبار" w={62} />
              <LookupField codeValue={warehouseCode} nameValue={warehouseName}
                codeWidth={40} onCodeChange={v => onChange('storeBranch', v)}
                onSelect={handleSelect('warehouse')} onArrowClick={() => setOpenLookup('warehouse')}
                options={warehouseOptions} />
            </Col>
          </Row>
          <Row>
            <Col last>
              <L text="سریـال" w={62} />
              <LookupField codeValue={header.serialNumber} nameValue={serialName}
                codeWidth={80} ltr onCodeChange={v => onChange('serialNumber', v)}
                onSelect={handleSelect('serial')} onArrowClick={() => setOpenLookup('serial')}
                options={serialOptions} />
            </Col>
          </Row>
          <Row>
            <Col last>
              <L text="کد حساب" w={62} />
              <LookupField codeValue={header.account} nameValue={accountName}
                codeWidth={46} ltr onCodeChange={v => onChange('account', v)}
                onSelect={handleSelect('account')} onArrowClick={() => setOpenLookup('account')}
                options={accountOptions} />
            </Col>
          </Row>
          <Row>
            <Col last>
              <L text="تحویل گیرنده" w={74} />
              <LookupField codeValue={header.personInCharge} nameValue={recipientName}
                codeWidth={32} ltr onCodeChange={v => onChange('personInCharge', v)}
                onSelect={handleSelect('recipient')} onArrowClick={() => setOpenLookup('recipient')}
                options={recipientOptions} />
            </Col>
          </Row>
          <Row last>
            <Col last>
              <L text="عملکرد" w={62} />
              <WS value="انبار و فروش" onChange={() => {}} options={['انبار و فروش', 'انبار و انبکاره']} flex={1} />
            </Col>
          </Row>
        </div>

        {/* ══════ ستون ۲: نوع رسید / شماره ارجاع / شماره درخواست / تسویه وجه / بارکد کالا ══════ */}
        <div style={{ borderLeft: `1px solid ${BORDER}` }}>
          <Row>
            <Col last>
              <L text="نوع رسیـد" w={68} />
              <WS value={header.receiptType} onChange={v => onChange('receiptType', v)}
                options={['رسید انتقالی غیر همزمان', 'رسید خرید', 'رسید مرجوعی']} flex={1} />
            </Col>
          </Row>
          <Row>
            <Col last>
              <L text="شماره ارجاع" w={68} />
              <NI value={header.returnNumber} onChange={v => onChange('returnNumber', v)} flex={1} ltr />
            </Col>
          </Row>
          <Row>
            <Col last>
              <L text="شماره درخواست" w={84} />
              <NI value={header.requestNumber} onChange={v => onChange('requestNumber', v)} flex={1} ltr />
            </Col>
          </Row>
          <Row>
            <Col last>
              <L text="تسویه وجه" w={68} />
              <Switch size="small" checked={header.cashType === 'نقد'}
                onChange={checked => onChange('cashType', checked ? 'نقد' : 'اعتباری')}
                style={{ backgroundColor: header.cashType === 'نقد' ? '#1a6e3a' : '#999', flexShrink: 0 }}
              />
              <WS value={header.cashType} onChange={v => onChange('cashType', v)}
                options={['نقد', 'اعتباری', 'چک', 'حواله']} flex={1} />
            </Col>
          </Row>
          <Row last>
            <Col last>
              <L text="بارکد کالا" w={68} />
              <BarcodeField value={header.faxNumber} onChange={v => onChange('faxNumber', v)} />
            </Col>
          </Row>
        </div>

        {/* ══════ ستون ۳: تاریخ رسید + ساعت / تاریخ درخواست / شماره سند / تاریخ میلادی / حوزه مالی ══════ */}
        <div style={{ borderLeft: `1px solid ${BORDER}` }}>
          <Row>
            <Col last>
              <L text="تاریخ رسیـد" w={70} />
              <PersianDatePicker value={header.receiptDate} onChange={v => onChange('receiptDate', v)} />
              <TimeInput value={header.receiptTime} onChange={v => onChange('receiptTime', v)} />
            </Col>
          </Row>
          <Row>
            <Col last>
              <L text="تاریخ درخواست" w={82} />
              <PersianDatePicker value={header.requestDate} onChange={v => onChange('requestDate', v)} placeholder="  /  /  " />
            </Col>
          </Row>
          <Row>
            <Col last>
              <L text="شماره سند" w={60} />
              <NI value={header.documentNumber} onChange={v => onChange('documentNumber', v)} flex={1} ltr />
            </Col>
          </Row>
          <Row>
            <Col last>
              <L text="تاریخ میلادی" w={72} />
              <PersianDatePicker value={header.mileadyDate} onChange={v => onChange('mileadyDate', v)} />
            </Col>
          </Row>
          <Row last>
            <Col last>
              <L text="حوزه مالی" w={60} />
              <WS value={header.warehouseSection} onChange={v => onChange('warehouseSection', v)}
                options={['نکدانه', 'انبار و انبکاره', 'انبار و فروش']} flex={1} />
            </Col>
          </Row>
        </div>

        {/* ══════ ستون ۴: شماره فاکتور / محل اقدام خرید / ش کنترل کیفی / سامانه مودیان / تاریخ موثر + روز ══════ */}
        <div>
          <Row>
            <Col last>
              <L text="شماره فاکتور" w={76} />
              <WI value={header.invoiceNumber} onChange={v => onChange('invoiceNumber', v)} flex={1} ltr />
            </Col>
          </Row>
          <Row>
            <Col last>
              <L text="محل اقدام خرید" w={86} />
              <WI value={header.purchaseLocation} onChange={v => onChange('purchaseLocation', v)} flex={1} />
            </Col>
          </Row>
          <Row>
            <Col last>
              <L text="ش کنترل کیفی" w={80} />
              <WS value={header.qualityControl} onChange={v => onChange('qualityControl', v)}
                options={['', 'تایید شده', 'رد شده', 'در انتظار']} flex={1} />
            </Col>
          </Row>
          <Row>
            <Col last>
              <L text="سامانه مودیان" w={80} />
              <WS value={header.quantityControl} onChange={v => onChange('quantityControl', v)}
                options={['', 'ثبت شده', 'در انتظار ثبت']} flex={1} />
            </Col>
          </Row>
          <Row last>
            <Col last>
              <L text="تاریخ موثر" w={68} />
              <PersianDatePicker value="" onChange={() => {}} placeholder="  /  /  " />
              <NI value={header.motorDays} onChange={v => onChange('motorDays', v)} width={32} ltr />
              <span style={{ fontSize: 11, color: LBL, whiteSpace: 'nowrap', flexShrink: 0 }}>روز</span>
            </Col>
          </Row>
        </div>

      </div>
    </div>
  );
};

export default HeaderForm;
