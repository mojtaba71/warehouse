import { type FC } from 'react';
import { type ReceiptFooter } from '../types';

export type FooterTab = 'current' | 'list';

interface Props {
  footer: ReceiptFooter;
  activeTab: FooterTab;
  onTabChange: (tab: FooterTab) => void;
}

const BG = '#d6e8f7';
const LBL = '#1a4f82';
const BORDER = '#b8d0e8';
const INPUT_H = 20;
const ROW_H = 24;

const L: FC<{ text: string }> = ({ text }) => (
  <span style={{ fontSize: 11, color: LBL, fontWeight: 500, whiteSpace: 'nowrap' }}>
    {text} :
  </span>
);

const VI: FC<{ value: string | number; flex?: number; width?: number; ltr?: boolean }> = ({
  value, flex, width, ltr,
}) => (
  <input
    readOnly
    value={typeof value === 'number' ? (value === 0 ? '' : value.toLocaleString('fa-IR')) : value}
    style={{
      width: flex ? undefined : (width ?? 80),
      flex: flex ?? undefined,
      height: INPUT_H, fontSize: 11,
      background: '#fff', border: '1px solid #aac4de',
      borderRadius: 2, padding: '0 5px',
      direction: ltr ? 'ltr' : 'rtl',
      textAlign: 'right', outline: 'none', color: '#222', minWidth: 0,
    }}
  />
);

const Rial: FC = () => (
  <span style={{
    fontSize: 10, color: LBL, whiteSpace: 'nowrap', flexShrink: 0,
    background: '#c8ddf0', border: '1px solid #aac4de', borderRadius: 2,
    padding: '1px 5px', height: INPUT_H, display: 'flex', alignItems: 'center',
  }}>ریال</span>
);

const Unit: FC<{ text: string }> = ({ text }) => (
  <span style={{
    fontSize: 10, color: LBL, whiteSpace: 'nowrap', flexShrink: 0,
    background: '#c8ddf0', border: '1px solid #aac4de', borderRadius: 2,
    padding: '1px 5px', height: INPUT_H, display: 'flex', alignItems: 'center',
  }}>{text}</span>
);

const Field: FC<{ label: string; lw: number; children: React.ReactNode }> = ({ label, lw, children }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 5, width: '100%', direction: 'rtl', minWidth: 0 }}>
    <div style={{ width: lw, flexShrink: 0, textAlign: 'right' }}>
      {label ? <L text={label} /> : null}
    </div>
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 3, minWidth: 0 }}>
      {children}
    </div>
  </div>
);

const Row: FC<{ children: React.ReactNode; last?: boolean }> = ({ children, last }) => (
  <div style={{
    display: 'flex', alignItems: 'center', minHeight: ROW_H,
    borderBottom: last ? 'none' : `1px solid ${BORDER}`,
  }}>{children}</div>
);

const Col: FC<{ children: React.ReactNode; last?: boolean }> = ({ children, last }) => (
  <div style={{
    flex: 1, padding: '2px 7px',
    borderLeft: last ? 'none' : `1px solid ${BORDER}`,
    minWidth: 0, overflow: 'hidden',
  }}>{children}</div>
);

const FooterSummary: FC<Props> = ({ footer, activeTab, onTabChange }) => {
  const LW1 = 58;
  const LW2 = 66;
  const LW3 = 96;
  const LW4 = 108;

  return (
    <div style={{ background: BG, borderTop: '2px solid #8fa8c0' }} dir="rtl">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>

        {/* ستون ۱: ویژگی ۱-۴ + حساب مرتبط + تب‌ها */}
        <div style={{ borderLeft: `1px solid ${BORDER}` }}>
          <Row><Col last><Field label="ویژگی ۱" lw={LW1}><VI value={footer.detail1} flex={1} /><Rial /></Field></Col></Row>
          <Row><Col last><Field label="ویژگی ۲" lw={LW1}><VI value={footer.detail2} flex={1} /><Rial /></Field></Col></Row>
          <Row><Col last><Field label="ویژگی ۳" lw={LW1}><VI value={footer.detail3} flex={1} /><Rial /></Field></Col></Row>
          <Row><Col last><Field label="ویژگی ۴" lw={LW1}><VI value={footer.detail4} flex={1} /><Rial /></Field></Col></Row>
          <Row><Col last><Field label="حساب مرتبط" lw={LW1}><VI value={footer.linkedAccount} flex={1} /></Field></Col></Row>
          {/* تب‌ها زیر حساب مرتبط — با divider جدا */}
          <Row last>
            <Col last>
              <div style={{ borderTop: `1px solid ${BORDER}`, marginBottom: 2 }} />
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2 }}>
                {(['current', 'list'] as FooterTab[]).map((tab) => {
                  const label = tab === 'list' ? 'نمایش لیست' : 'رکورد جاری';
                  const isActive = activeTab === tab;
                  return (
                    <button
                      key={tab}
                      onClick={() => onTabChange(tab)}
                      style={{
                        height: 26, padding: '0 10px', fontSize: 11,
                        fontWeight: isActive ? 600 : 400,
                        color: isActive ? LBL : '#555',
                        background: isActive
                          ? 'linear-gradient(to bottom, #ffffff, #eef4fb)'
                          : 'linear-gradient(to bottom, #dbeaf8, #c8ddf0)',
                        border: `1px solid ${BORDER}`,
                        borderBottom: isActive ? '1px solid transparent' : `1px solid ${BORDER}`,
                        borderRadius: '3px 3px 0 0',
                        cursor: 'pointer', flexShrink: 0, whiteSpace: 'nowrap',
                      }}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </Col>
          </Row>
        </div>

        {/* ستون ۲: دهنده کالا / تفصیلی */}
        <div style={{ borderLeft: `1px solid ${BORDER}` }}>
          <Row><Col last><Field label="دهنده کالا" lw={LW2}><VI value={footer.deliveryDestination} flex={1} /></Field></Col></Row>
          <Row><Col last><Field label="تفصیلی ۲" lw={LW2}><VI value="" flex={1} /></Field></Col></Row>
          <Row><Col last><Field label="تفصیلی ۳" lw={LW2}><VI value="انبکاره" flex={1} /></Field></Col></Row>
          <Row><Col last><Field label="تفصیلی ۴" lw={LW2}><VI value="" flex={1} /></Field></Col></Row>
          <Row last><Col last><Field label="" lw={LW2}><VI value="" flex={1} /></Field></Col></Row>
        </div>

        {/* ستون ۳: واحد / مقدار / ارز / وزن / VAT */}
        <div style={{ borderLeft: `1px solid ${BORDER}` }}>
          <Row><Col last><Field label="واحد کالا" lw={LW3}><VI value={footer.unit} flex={1} /><Unit text="عدد" /></Field></Col></Row>
          <Row><Col last><Field label="جمع مقدار" lw={LW3}><VI value={footer.totalQuantity} flex={1} ltr /><Unit text="عدد" /></Field></Col></Row>
          <Row><Col last><Field label="جمع ارز" lw={LW3}><VI value="" flex={1} /></Field></Col></Row>
          <Row><Col last><Field label="جمع وزن (KG)" lw={LW3}><VI value={footer.totalWeight} flex={1} ltr /></Field></Col></Row>
          <Row last><Col last><Field label="مالیات و عوارض VAT" lw={LW3}><VI value={footer.payableTax} flex={1} ltr /><Rial /></Field></Col></Row>
        </div>

        {/* ستون ۴: مبالغ */}
        <div>
          <Row><Col last><Field label="جمع مبلغ" lw={LW4}><VI value={footer.totalAmount} flex={1} ltr /><Rial /></Field></Col></Row>
          <Row><Col last><Field label="جمع اضافات" lw={LW4}><VI value={footer.totalAdditions} flex={1} ltr /><Rial /></Field></Col></Row>
          <Row><Col last><Field label="جمع قیمت تمام‌شده" lw={LW4}><VI value={footer.totalFree} flex={1} ltr /><Rial /></Field></Col></Row>
          <Row><Col last><Field label="جمع کسورات" lw={LW4}><VI value={footer.totalDiscounts} flex={1} ltr /><Rial /></Field></Col></Row>
          <Row last><Col last><Field label="قابل پرداخت" lw={LW4}><VI value={footer.totalAmount + footer.totalAdditions - footer.totalDiscounts} flex={1} ltr /><Rial /></Field></Col></Row>
        </div>

      </div>
    </div>
  );
};

export default FooterSummary;
