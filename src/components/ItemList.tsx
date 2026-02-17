import { type FC, useState, useRef, useCallback } from 'react';
import { type ReceiptItem, type ColumnDef } from '../types';
import { MdArrowUpward, MdArrowDownward, MdUnfoldMore } from 'react-icons/md';

interface Props {
  items: ReceiptItem[];
  columns: ColumnDef[];
  selectedId: number | null;
  onSelect: (id: number) => void;
  onUpdate: (id: number, field: keyof ReceiptItem, value: string | number) => void;
}

type SortDir = 'asc' | 'desc' | null;

interface SortState {
  field: keyof ReceiptItem | null;
  dir: SortDir;
}

const formatNumber = (n: number) =>
  n.toLocaleString('fa-IR');

const ItemList: FC<Props> = ({ items, columns, selectedId, onSelect, onUpdate }) => {
  const [editCell, setEditCell] = useState<{ id: number; field: keyof ReceiptItem } | null>(null);
  const [editValue, setEditValue] = useState<string>('');
  const [sort, setSort] = useState<SortState>({ field: null, dir: null });
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
    if (e.key === 'Enter' || e.key === 'Tab') {
      e.preventDefault();
      commitEdit();
    }
    if (e.key === 'Escape') {
      setEditCell(null);
    }
  };

  const toggleSort = (field: keyof ReceiptItem) => {
    setSort(prev => {
      if (prev.field !== field) return { field, dir: 'asc' };
      if (prev.dir === 'asc') return { field, dir: 'desc' };
      return { field: null, dir: null };
    });
  };

  const sorted = [...items].sort((a, b) => {
    if (!sort.field || !sort.dir) return 0;
    const av = a[sort.field];
    const bv = b[sort.field];
    const cmp = typeof av === 'number' && typeof bv === 'number'
      ? av - bv
      : String(av).localeCompare(String(bv), 'fa');
    return sort.dir === 'asc' ? cmp : -cmp;
  });

  const SortIcon: FC<{ field: keyof ReceiptItem }> = ({ field }) => {
    if (sort.field !== field) return <MdUnfoldMore size={12} className="opacity-40" />;
    return sort.dir === 'asc'
      ? <MdArrowUpward size={12} className="text-blue-600" />
      : <MdArrowDownward size={12} className="text-blue-600" />;
  };

  return (
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
                const rawVal = item[col.key];
                const displayVal =
                  col.type === 'number' && col.key !== 'rowNumber'
                    ? formatNumber(rawVal as number)
                    : String(rawVal);

                return (
                  <div
                    key={col.key}
                    className={`editable-cell px-1 py-1 text-[11px] border-l border-gray-200 flex items-center
                      ${col.align === 'center' ? 'justify-center' : col.align === 'left' ? 'justify-start' : 'justify-end'}
                      ${col.editable ? 'hover:bg-yellow-50' : ''}`}
                    style={{ width: col.width, minWidth: col.width, flexShrink: 0 }}
                    onDoubleClick={() => col.editable && startEdit(item.id, col.key, item[col.key])}
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
                      <span
                        className="block w-full overflow-hidden text-ellipsis whitespace-nowrap"
                        style={{ textAlign: col.align, direction: col.align === 'left' ? 'ltr' : 'rtl' }}
                        title={displayVal}
                      >
                        {displayVal}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}

        {/* Empty rows for visual padding */}
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
  );
};

export default ItemList;
