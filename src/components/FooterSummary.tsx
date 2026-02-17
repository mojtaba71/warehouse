import { type FC } from 'react';
import { type ReceiptFooter } from '../types';

interface Props {
  footer: ReceiptFooter;
}

const Row: FC<{ label: string; value?: string | number; unit?: string; highlight?: boolean }> = ({
  label, value = '', unit = 'ریال', highlight
}) => (
  <div className={`flex items-center border-b border-gray-200 ${highlight ? 'bg-yellow-50' : ''}`} style={{ minHeight: 22 }}>
    <span className="text-[11px] text-gray-600 whitespace-nowrap px-2 py-0.5 border-l border-gray-200 w-36 shrink-0">{label} :</span>
    <span className="text-[11px] text-gray-800 px-2 flex-1 text-left ltr">
      {typeof value === 'number' ? value.toLocaleString('fa-IR') : value}
    </span>
    {unit && <span className="text-[10px] text-gray-500 px-1 shrink-0">{unit}</span>}
  </div>
);

const FooterSummary: FC<Props> = ({ footer }) => {
  return (
    <div className="bg-[#f5f5f5] border-t-2 border-gray-400" dir="rtl">
      <div className="flex" style={{ minHeight: 0 }}>

        {/* پنل راست: اطلاعات تکمیلی */}
        <div className="border-l border-gray-300" style={{ width: '28%', minWidth: 240 }}>
          <div className="bg-[#d9d9d9] border-b border-gray-300 px-2 py-0.5">
            <span className="text-[11px] font-semibold text-gray-700">اطلاعات تکمیلی</span>
          </div>
          <div className="grid grid-cols-2">
            <div className="border-l border-gray-200">
              <Row label="ویژگی ۱" value={footer.detail1} unit="" />
              <Row label="ویژگی ۲" value={footer.detail2} unit="" />
              <Row label="ویژگی ۳" value={footer.detail3} unit="" />
              <Row label="ویژگی ۴" value={footer.detail4} unit="" />
            </div>
            <div>
              <Row label="تفصیلی ۱" value="آقوطلی" unit="" />
              <Row label="تفصیلی ۲" value="" unit="" />
              <Row label="تفصیلی ۳" value="انبکاره" unit="" />
              <Row label="تفصیلی ۴" value="" unit="" />
            </div>
          </div>
          <div className="flex items-center border-b border-gray-200 px-2 py-0.5" style={{ minHeight: 22 }}>
            <span className="text-[11px] text-gray-600">حساب مرتبط :</span>
          </div>
          <div className="flex items-center px-2 py-0.5" style={{ minHeight: 22 }}>
            <span className="text-[11px] text-gray-600">رکورد جاری :</span>
          </div>
        </div>

        {/* پنل میانی: خلاصه مقادیر */}
        <div className="border-l border-gray-300" style={{ width: '36%', minWidth: 280 }}>
          <div className="bg-[#d9d9d9] border-b border-gray-300 px-2 py-0.5">
            <span className="text-[11px] font-semibold text-gray-700">خلاصه مقادیر</span>
          </div>
          <Row label="واحد کالا" value={footer.unit} unit="عدد" />
          <Row label="دهنده کالا" value={footer.deliveryDestination} unit="" />
          <Row label="جمع مقدار" value={footer.totalQuantity} unit="عدد" />
          <Row label="جمع ارز" value="" unit="" />
          <Row label="جمع وزن (KG)" value={footer.totalWeight} unit="" highlight />
        </div>

        {/* پنل چپ: خلاصه مبالغ */}
        <div className="flex-1">
          <div className="bg-[#d9d9d9] border-b border-gray-300 px-2 py-0.5">
            <span className="text-[11px] font-semibold text-gray-700">خلاصه مبالغ</span>
          </div>
          <Row label="جمع مبلغ" value={footer.totalAmount} />
          <Row label="جمع اضافات" value={footer.totalAdditions} />
          <Row label="جمع قیمت (هامرشده)" value={footer.totalFree} />
          <Row label="جمع کسورات" value={footer.totalDiscounts} />
          <Row label="مالیات و عوارض VAT" value={footer.payableTax} highlight />
          <Row label="قابل پرداخت" value={footer.payableTax} highlight />
        </div>
      </div>
    </div>
  );
};

export default FooterSummary;
