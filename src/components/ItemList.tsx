import { type FC, useState, useRef, useCallback, useEffect } from 'react';
import { type ReceiptItem, type ColumnDef, type LookupType } from '../types';
import { MdArrowUpward, MdArrowDownward, MdUnfoldMore } from 'react-icons/md';
import { DownOutlined } from '@ant-design/icons';
import {
  productOptions,
  deliverySourceOptions,
  deliveryDestinationOptions,
  type ProductOption,
} from '../data/fakeData';

interface Props {
  items: ReceiptItem[];
  columns: ColumnDef[];
  selectedId: number | null;
  onSelect: (id: number) => void;
  onUpdate: (id: number, field: keyof ReceiptItem, value: string | number) => void;
}

type SortDir = 'asc' | 'desc' | null;
interface SortState { field: keyof ReceiptItem | null; dir: SortDir; }

const formatNumber = (n: number) => n === 0 ? '' : n.toLocaleString('fa-IR');

// ── Lookup Modal ──────────────────────────────────────────────────────────────
interface LookupModalProps {
  lookupType: LookupType;
  onSelect: (value: string, extra?: Partial<ReceiptItem>) => void;
  onClose: () => void;
}

const LookupModal: FC<LookupModalProps> = ({ lookupType, onSelect, onClose }) => {
  const [search, setSearch] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTimeout(() => searchRef.current?.focus(), 30);
  }, []);

  const handleBackdrop = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  };

  if (lookupType === 'product') {
    const filtered = productOptions.filter(p =>
      p.code.includes(search) ||
      p.name.includes(search) ||
      p.nameEn.toLowerCase().includes(search.toLowerCase()) ||
      p.barcode.includes(search)
    );
    return (
      <div
        style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999,
        }}
        onClick={handleBackdrop}
        onKeyDown={handleKey}
      >
        <div style={{
          background: '#fff', borderRadius: 4, width: 640, maxHeight: 420,
          display: 'flex', flexDirection: 'column', boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
          border: '1px solid #b8d0e8', direction: 'rtl',
        }}>
          <div style={{ padding: '8px 10px', borderBottom: '1px solid #dbeaf8', background: '#eef4fb' }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#1a4f82' }}>انتخاب کالا</span>
          </div>
          <div style={{ padding: '6px 10px', borderBottom: '1px solid #dbeaf8' }}>
            <input
              ref={searchRef}
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="جستجو..."
              style={{
                width: '100%', height: 26, fontSize: 11, padding: '0 8px',
                border: '1px solid #aac4de', borderRadius: 3, outline: 'none', direction: 'rtl',
              }}
            />
          </div>
          <div style={{ overflowY: 'auto', flex: 1 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11 }}>
              <thead>
                <tr style={{ background: '#dbeaf8', position: 'sticky', top: 0 }}>
                  <th style={{ padding: '4px 8px', textAlign: 'right', borderBottom: '1px solid #b8d0e8', color: '#1a4f82', fontWeight: 600 }}>کد کالا</th>
                  <th style={{ padding: '4px 8px', textAlign: 'right', borderBottom: '1px solid #b8d0e8', color: '#1a4f82', fontWeight: 600 }}>نام کالا</th>
                  <th style={{ padding: '4px 8px', textAlign: 'left', borderBottom: '1px solid #b8d0e8', color: '#1a4f82', fontWeight: 600 }}>نام انگلیسی</th>
                  <th style={{ padding: '4px 8px', textAlign: 'center', borderBottom: '1px solid #b8d0e8', color: '#1a4f82', fontWeight: 600 }}>بارکد</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p, i) => (
                  <tr
                    key={p.code}
                    style={{ background: i % 2 === 0 ? '#fff' : '#f5f9fd', cursor: 'pointer' }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#dbeaf8')}
                    onMouseLeave={e => (e.currentTarget.style.background = i % 2 === 0 ? '#fff' : '#f5f9fd')}
                    onClick={() => {
                      onSelect(p.code, {
                        productCode: p.code,
                        productName: p.name,
                        productNameEn: p.nameEn,
                        barcode: p.barcode,
                      });
                    }}
                  >
                    <td style={{ padding: '4px 8px', borderBottom: '1px solid #edf3f9', direction: 'ltr', textAlign: 'left' }}>{p.code}</td>
                    <td style={{ padding: '4px 8px', borderBottom: '1px solid #edf3f9' }}>{p.name}</td>
                    <td style={{ padding: '4px 8px', borderBottom: '1px solid #edf3f9', direction: 'ltr', textAlign: 'left' }}>{p.nameEn}</td>
                    <td style={{ padding: '4px 8px', borderBottom: '1px solid #edf3f9', direction: 'ltr', textAlign: 'center' }}>{p.barcode}</td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={4} style={{ padding: '12px 8px', textAlign: 'center', color: '#999' }}>موردی یافت نشد</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // deliverySource / deliveryDestination
  const opts = lookupType === 'deliverySource' ? deliverySourceOptions : deliveryDestinationOptions;
  const filtered = opts.filter(o => o.name.includes(search) || o.code.includes(search));
  const label = lookupType === 'deliverySource' ? 'انتخاب تحویل گیرنده' : 'انتخاب تحویل دهنده';

  return (
    <div
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999,
      }}
      onClick={handleBackdrop}
      onKeyDown={handleKey}
    >
      <div style={{
        background: '#fff', borderRadius: 4, width: 320, maxHeight: 360,
        display: 'flex', flexDirection: 'column', boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
        border: '1px solid #b8d0e8', direction: 'rtl',
      }}>
        <div style={{ padding: '8px 10px', borderBottom: '1px solid #dbeaf8', background: '#eef4fb' }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: '#1a4f82' }}>{label}</span>
        </div>
        <div style={{ padding: '6px 10px', borderBottom: '1px solid #dbeaf8' }}>
          <input
            ref={searchRef}
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="جستجو..."
            style={{
              width: '100%', height: 26, fontSize: 11, padding: '0 8px',
              border: '1px solid #aac4de', borderRadius: 3, outline: 'none', direction: 'rtl',
            }}
          />
        </div>
        <div style={{ overflowY: 'auto', flex: 1 }}>
          {filtered.map((o, i) => (
            <div
              key={o.code}
              style={{
                display: 'flex', gap: 8, padding: '5px 10px', fontSize: 11, cursor: 'pointer',
                background: i % 2 === 0 ? '#fff' : '#f5f9fd',
                borderBottom: '1px solid #edf3f9',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#dbeaf8')}
              onMouseLeave={e => (e.currentTarget.style.background = i % 2 === 0 ? '#fff' : '#f5f9fd')}
              onClick={() => onSelect(o.name)}
            >
              <span style={{ color: '#888', minWidth: 24 }}>{o.code}</span>
              <span style={{ color: '#222' }}>{o.name}</span>
            </div>
          ))}
          {filtered.length === 0 && (
            <div style={{ padding: '12px 8px', textAlign: 'center', color: '#999', fontSize: 11 }}>موردی یافت نشد</div>
          )}
        </div>
      </div>
    </div>
  );
};

// ── ItemList ──────────────────────────────────────────────────────────────────
const ItemList: FC<Props> = ({ items, columns, selectedId, onSelect, onUpdate }) => {
  const [editCell, setEditCell] = useState<{ id: number; field: keyof ReceiptItem } | null>(null);
  const [editValue, setEditValue] = useState<string>('');
  const [focusCell, setFocusCell] = useState<{ id: number; field: keyof ReceiptItem } | null>(null);
  const [sort, setSort] = useState<SortState>({ field: null, dir: null });
  const [lookupCell, setLookupCell] = useState<{ id: number; field: keyof ReceiptItem; type: LookupType } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const startEdit = useCallback(
    (id: number, field: keyof ReceiptItem, currentVal: string | number) => {
      if (field === 'rowNumber') return;
      setEditCell({ id, field });
      setEditValue(String(currentVal));
      setTimeout(() => inputRef.current?.select(), 30);
    },
    []
  );

  const commitEdit = useCallback(() => {
    if (!editCell) return;
    const col = columns.find(c => c.key === editCell.field);
    const parsed = col?.type === 'number' ? Number(editValue) || 0 : editValue;
    onUpdate(editCell.id, editCell.field, parsed);
    setEditCell(null);
  }, [editCell, editValue, columns, onUpdate]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === 'Tab') { e.preventDefault(); commitEdit(); }
    if (e.key === 'Escape') setEditCell(null);
  };

  const toggleSort = (field: keyof ReceiptItem) => {
    setSort(prev => {
      if (prev.field !== field) return { field, dir: 'asc' };
      if (prev.dir === 'asc') return { field, dir: 'desc' };
      return { field: null, dir: null };
    });
  };

  const handleLookupSelect = useCallback(
    (value: string, extra?: Partial<ReceiptItem>) => {
      if (!lookupCell) return;
      if (extra) {
        // For product: update all 4 fields
        (Object.keys(extra) as (keyof ReceiptItem)[]).forEach(k => {
          onUpdate(lookupCell.id, k, extra[k] as string | number);
        });
      } else {
        onUpdate(lookupCell.id, lookupCell.field, value);
      }
      setLookupCell(null);
    },
    [lookupCell, onUpdate]
  );

  const sorted = [...items].sort((a, b) => {
    if (!sort.field || !sort.dir) return 0;
    const av = a[sort.field], bv = b[sort.field];
    const cmp = typeof av === 'number' && typeof bv === 'number'
      ? av - bv : String(av).localeCompare(String(bv), 'fa');
    return sort.dir === 'asc' ? cmp : -cmp;
  });

  const SortIcon: FC<{ field: keyof ReceiptItem }> = ({ field }) => {
    if (sort.field !== field) return <MdUnfoldMore size={12} className="opacity-40" />;
    return sort.dir === 'asc'
      ? <MdArrowUpward size={12} className="text-blue-600" />
      : <MdArrowDownward size={12} className="text-blue-600" />;
  };

  return (
    <>
      <div className="flex-1 overflow-auto border-b border-gray-300 bg-white" style={{ direction: 'rtl', minHeight: 0 }}>
        {/* Header */}
        <div
          className="flex sticky top-0 z-10 bg-gradient-to-b from-gray-200 to-gray-300 border-b-2 border-gray-400 select-none"
          style={{ minWidth: columns.reduce((s, c) => s + c.width, 0) }}
        >
          {columns.map(col => (
            <div
              key={col.key}
              className="flex items-center justify-center gap-0.5 px-1 py-1.5 text-[11px] font-semibold text-gray-700 border-l border-gray-400 cursor-pointer hover:bg-gray-300 transition-colors"
              style={{ width: col.width, minWidth: col.width, flexShrink: 0 }}
              onClick={() => toggleSort(col.key)}
            >
              <SortIcon field={col.key} />
              <span>{col.label}</span>
            </div>
          ))}
        </div>

        {/* Rows */}
        <div style={{ minWidth: columns.reduce((s, c) => s + c.width, 0) }}>
          {sorted.map((item, rowIdx) => {
            const isSelected = item.id === selectedId;
            const isEven = rowIdx % 2 === 0;
            return (
              <div
                key={item.id}
                className={`receipt-row flex items-stretch border-b border-gray-200 cursor-pointer transition-colors
                  ${isSelected ? 'selected' : isEven ? 'bg-white' : 'bg-gray-50'}`}
                onClick={() => onSelect(item.id)}
              >
                {columns.map(col => {
                  const isEditing = editCell?.id === item.id && editCell?.field === col.key;
                  const isFocused = focusCell?.id === item.id && focusCell?.field === col.key;
                  const rawVal = item[col.key];
                  const displayVal =
                    col.type === 'number' && col.key !== 'rowNumber'
                      ? formatNumber(rawVal as number)
                      : String(rawVal);

                  return (
                    <div
                      key={col.key}
                      className={`editable-cell px-1 py-0.5 text-[11px] border-l border-gray-200 flex items-center relative
                        ${col.align === 'center' ? 'justify-center' : col.align === 'left' ? 'justify-start' : 'justify-end'}
                        ${col.editable ? 'hover:bg-yellow-50' : ''}`}
                      style={{ width: col.width, minWidth: col.width, flexShrink: 0 }}
                      onClick={e => {
                        e.stopPropagation();
                        onSelect(item.id);
                        if (col.editable) setFocusCell({ id: item.id, field: col.key });
                      }}
                      onDoubleClick={() => {
                        if (col.editable && !col.lookup) startEdit(item.id, col.key, item[col.key]);
                      }}
                    >
                      {isEditing ? (
                        <input
                          ref={inputRef}
                          value={editValue}
                          onChange={e => setEditValue(e.target.value)}
                          onBlur={commitEdit}
                          onKeyDown={handleKeyDown}
                          className="w-full border border-blue-400 rounded px-1 bg-white text-[11px] outline-none"
                          style={{ direction: col.align === 'left' ? 'ltr' : 'rtl', textAlign: col.align }}
                          type={col.type === 'number' ? 'number' : 'text'}
                        />
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center', width: '100%', gap: 2, minWidth: 0 }}>
                          <span
                            style={{
                              flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                              textAlign: col.align, direction: col.align === 'left' ? 'ltr' : 'rtl',
                            }}
                            title={displayVal}
                          >
                            {displayVal}
                          </span>
                          {col.lookup && isFocused && (
                            <button
                              style={{
                                flexShrink: 0, width: 16, height: 16, padding: 0,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                background: '#fff', border: '1px solid #aac4de', borderRadius: 2,
                                cursor: 'pointer', fontSize: 9, color: '#1a4f82',
                              }}
                              onMouseDown={e => {
                                e.stopPropagation();
                                e.preventDefault();
                                setLookupCell({ id: item.id, field: col.key, type: col.lookup! });
                              }}
                            >
                              <DownOutlined style={{ fontSize: 8 }} />
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}

          {/* Empty rows */}
          {Array.from({ length: Math.max(0, 8 - sorted.length) }).map((_, i) => (
            <div key={`empty-${i}`} className="flex border-b border-gray-100 bg-white" style={{ height: 26 }}>
              {columns.map(col => (
                <div
                  key={col.key}
                  className="border-l border-gray-100"
                  style={{ width: col.width, minWidth: col.width, flexShrink: 0 }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Lookup Modal */}
      {lookupCell && (
        <LookupModal
          lookupType={lookupCell.type}
          onSelect={handleLookupSelect}
          onClose={() => setLookupCell(null)}
        />
      )}
    </>
  );
};

export default ItemList;
