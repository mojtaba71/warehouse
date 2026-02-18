import { type ReceiptItem, type ReceiptHeader, type ReceiptFooter, type ColumnDef } from '../types';

// تابع برای گرفتن تاریخ امروز به صورت میلادی
const getTodayGregorian = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}/${month}/${day}`;
};

export const receiptHeader: ReceiptHeader = {
  receiptType: 'رسید انتقالی غیر همزمان',
  storeBranch: 'انبار شعبه تراک',
  serialNumber: '۱۴۰۴-۰۰۰۰۳۲',
  receiptDate: '۱۴۰۳/۰۳/۲۹',
  requestDate: '/ /',
  documentNumber: '۵۳۵',
  requestNumber: '',
  returnNumber: '',
  invoiceNumber: '',
  purchaseLocation: 'محل اقدام خرید',
  quantityControl: 'تی کنترل کیفی',
  qualityControl: '',
  faxNumber: '6260138622223',
  mileadyDate: getTodayGregorian(), // تاریخ امروز به صورت میلادی
  eventDate: '/ /',
  cashType: 'نقد',
  personInCharge: 'رسید مستقیم',
  documentSerial: '۱۴۰۴-۰۰۰۰۰۳',
  account: '',
  warehouseSection: 'انبار و انبکاره',
  salesWarehouseSection: 'انبار و فروش',
  receiptTime: '16:35',
  motorDays: '',
};

export const warehouseOptions = [
  { code: '800', name: 'انبار شعبه اراک' },
  { code: '801', name: 'انبار مرکزی تهران' },
  { code: '802', name: 'انبار شعبه اصفهان' },
  { code: '803', name: 'انبار شعبه تبریز' },
  { code: '804', name: 'انبار موقت خط تولید' },
];

export const serialOptions = [
  { code: '۱۴۰۴-۰۰۰۰۳۲', name: 'رسید انبار اراک' },
  { code: '۱۴۰۴-۰۰۰۰۳۳', name: 'رسید انبار مرکزی' },
  { code: '۱۴۰۴-۰۰۰۰۳۴', name: 'رسید انبار اصفهان' },
  { code: '۱۴۰۳-۰۰۰۱۲۰', name: 'رسید برگشتی از فروش' },
];

export const accountOptions = [
  { code: '۱۱۰۱', name: 'حساب جاری شعب' },
  { code: '۱۱۰۲', name: 'حساب صندوق' },
  { code: '۲۲۰۱', name: 'بدهکاران تجاری' },
  { code: '۳۳۰۱', name: 'موجودی کالا' },
  { code: '۴۴۰۱', name: 'درآمد فروش' },
];

export const recipientOptions = [
  { code: '۱', name: 'انبار و فروش' },
  { code: '۲', name: 'انبار و انبکاره' },
  { code: '۳', name: 'واحد تولید' },
  { code: '۴', name: 'واحد توزیع' },
];

export interface ProductOption {
  code: string;
  name: string;
  nameEn: string;
  barcode: string;
}

export const productOptions: ProductOption[] = [
  { code: '۲۰۰۱۰۰۱', name: 'آبمیوه آناناس ۲۲۰cc', nameEn: 'pineapple 220 cc', barcode: '6260138622223' },
  { code: '۲۰۰۱۰۰۲', name: 'آبمیوه انبه ۳۰۰cc', nameEn: 'Mango 300 cc', barcode: '6260138930001' },
  { code: '۲۰۰۱۰۰۳', name: 'آبمیوه سیب ۲۰۰cc', nameEn: 'apple 200 cc', barcode: '6260138930002' },
  { code: '۲۰۰۱۰۰۴', name: 'آبمیوه انگور ۱lit', nameEn: 'grape 1000 cc', barcode: '6260138930003' },
  { code: '۲۰۰۱۰۰۵', name: 'آبمیوه پرتقال توسرخ ۱lit', nameEn: 'Red orange 1000 cc', barcode: '6260138930004' },
  { code: '۲۰۰۱۰۰۶', name: 'آبمیوه سیب کیوی ۱lit', nameEn: 'Mixed apple & kiwi 1 lit', barcode: '6260138930005' },
  { code: '۲۰۰۱۰۰۷', name: 'آبمیوه لیموناد نساج ۱۰۰۰cc', nameEn: 'lemonade 1000 cc', barcode: '6260138609192' },
  { code: '۲۰۰۱۰۰۸', name: 'آبمیوه هلو ۲۰۰cc', nameEn: 'peach 200 cc', barcode: '6260138610002' },
  { code: '۲۰۰۱۰۰۹', name: 'آبمیوه توت فرنگی ۳۰۰cc', nameEn: 'strawberry 300 cc', barcode: '6260138610003' },
  { code: '۲۰۰۱۰۱۰', name: 'آبمیوه گریپ فروت ۱lit', nameEn: 'grapefruit 1000 cc', barcode: '6260138610004' },
];

export const deliverySourceOptions = [
  { code: '۱', name: 'انبار و فروش' },
  { code: '۲', name: 'انبار و انبکاره' },
  { code: '۳', name: 'واحد تولید' },
  { code: '۴', name: 'واحد توزیع' },
  { code: '۵', name: 'انبار مرکزی' },
];

export const deliveryDestinationOptions = [
  { code: '۱', name: 'محصول' },
  { code: '۲', name: 'کارخانه' },
  { code: '۳', name: 'واحد بسته‌بندی' },
  { code: '۴', name: 'مخزن مواد اولیه' },
  { code: '۵', name: 'انبار موقت' },
];

export const barcodeOptions = [
  // EAN-13
  { code: '6260138622223', name: 'بارکد محصول آبمیوه آناناس' },
  { code: '6260138930001', name: 'بارکد محصول آناناس 220cc' },
  { code: '6260138930002', name: 'بارکد محصول انبه 300cc' },
  { code: '6260138930003', name: 'بارکد محصول سیب 200cc' },
  { code: '5901234123457', name: 'EAN-13: محصول خرده‌فروشی' },
  { code: '9780143007234', name: 'EAN-13: کد کتاب (ISBN)' },

  // UPC-A
  { code: '012345678905', name: 'UPC-A: بارکد آمریکای شمالی' },
  { code: '123456789012', name: 'UPC-A: محصول خرده‌فروشی' },

  // EAN-8
  { code: '12345670', name: 'EAN-8: محصولات کوچک (8 رقم)' },

  // ITF-14
  { code: '12345678901231', name: 'ITF-14: کارتن و پالت (14 رقم)' },

  // Code 128
  { code: 'ABC123456789', name: 'Code 128: کد انبارداری' },
  { code: 'INV2024012345', name: 'Code 128: کد فاکتور' },
];

export const receiptItems: ReceiptItem[] = [
  {
    id: 1,
    rowNumber: 1,
    productCode: '۲۰۰۱۰۰۱',
    productName: 'آبمیوه آناناس ۲۲۰cc',
    productNameEn: 'pineapple ۲۲۰ cc',
    barcode: '۶۲۶۰۱۳۸۶۲۲۲۲۳',
    invoiceNumber: '۴۶۰-۱۳۸۶۳-۱۸',
    weight1: 1.01,
    weight2: 0.102,
    weight3: 0.103,
    weight4: 0.104,
    quantity: 200,
    unitPrice: 3400,
    totalPrice: 680000,
    deliverySource: 'محصول',
    deliveryDestination: 'کارخانه',
  },
  {
    id: 2,
    rowNumber: 2,
    productCode: '۲۰۰۱۰۰۱',
    productName: 'آبمیوه آناناس ۲۲۰cc',
    productNameEn: 'pineapple ۲۲۰ cc',
    barcode: '۶۲۶۰۱۳۸۶۲۲۲۲۳',
    invoiceNumber: '۴۶۰-۱۳۸۶۳-۱۸',
    weight1: 1.01,
    weight2: 0.102,
    weight3: 0.103,
    weight4: 0.104,
    quantity: 200,
    unitPrice: 3400,
    totalPrice: 680000,
    deliverySource: 'محصول',
    deliveryDestination: 'کارخانه',
  },
  {
    id: 3,
    rowNumber: 3,
    productCode: '۲۰۰۱۰۰۲',
    productName: 'آبمیوه انبه ۳۰۰cc',
    productNameEn: 'Mango ۳۰۰ cc',
    barcode: '۶۲۶۰۱۳۸۹۳۰۰۰۱',
    invoiceNumber: '۴۶۰-۱۳۸۶۳-۱۸',
    weight1: 1.01,
    weight2: 0.102,
    weight3: 0.103,
    weight4: 0.104,
    quantity: 200,
    unitPrice: 3950,
    totalPrice: 790000,
    deliverySource: 'محصول',
    deliveryDestination: 'کارخانه',
  },
  {
    id: 4,
    rowNumber: 4,
    productCode: '۲۰۰۱۰۰۳',
    productName: 'آبمیوه سیب ۲۰۰cc',
    productNameEn: 'apple ۲۰۰ cc',
    barcode: '۶۲۶۰۱۳۸۹۳۰۰۰۲',
    invoiceNumber: '۴۶۰-۱۳۸۹۳-۳۰',
    weight1: 1.01,
    weight2: 0.102,
    weight3: 0.103,
    weight4: 0.104,
    quantity: 200,
    unitPrice: 1800,
    totalPrice: 360000,
    deliverySource: 'محصول',
    deliveryDestination: 'کارخانه',
  },
  {
    id: 5,
    rowNumber: 5,
    productCode: '۲۰۰۱۰۰۴',
    productName: 'آبمیوه انگور ۱lit',
    productNameEn: 'grape ۱۰۰۰ cc',
    barcode: '۶۲۶۰۱۳۸۹۳۰۰۰۳',
    invoiceNumber: '۴۶۰-۱۳۸۹۳-۳۰',
    weight1: 1.01,
    weight2: 0.14,
    weight3: 0.13,
    weight4: 0.104,
    quantity: 40,
    unitPrice: 8200,
    totalPrice: 328000,
    deliverySource: 'محصول',
    deliveryDestination: 'کارخانه',
  },
  {
    id: 6,
    rowNumber: 6,
    productCode: '۲۰۰۱۰۰۵',
    productName: 'آبمیوه پرتقال توسرخ ۱lit',
    productNameEn: 'Red orange ۱۰۰۰ cc',
    barcode: '۶۲۶۰۱۳۸۹۳۰۰۰۴',
    invoiceNumber: '۴۶۰-۱۳۸۶۳-۱۸',
    weight1: 1.01,
    weight2: 0.102,
    weight3: 0.103,
    weight4: 0.104,
    quantity: 200,
    unitPrice: 3000,
    totalPrice: 600000,
    deliverySource: 'محصول',
    deliveryDestination: 'کارخانه',
  },
  {
    id: 7,
    rowNumber: 7,
    productCode: '۲۰۰۱۰۰۶',
    productName: 'آبمیوه سیب کیوی ۱lit',
    productNameEn: 'Mixed apple & kiwi ۱ lit',
    barcode: '۶۲۶۰۱۳۸۹۳۰۰۰۵',
    invoiceNumber: '۴۶۰-۱۳۸۶۳-۱۸',
    weight1: 1.01,
    weight2: 0.102,
    weight3: 0.103,
    weight4: 0.104,
    quantity: 200,
    unitPrice: 3200,
    totalPrice: 640000,
    deliverySource: 'محصول',
    deliveryDestination: 'کارخانه',
  },
  {
    id: 8,
    rowNumber: 8,
    productCode: '۲۰۰۱۰۰۷',
    productName: 'آبمیوه لیموناد نساج ۱۰۰۰ cc',
    productNameEn: 'lemonade ۱۰۰۰ cc lit',
    barcode: '۶۲۶۰۱۳۸۶۰۱-۹۲',
    invoiceNumber: '۴۶۰-۱۳۸۶۳-۱۸',
    weight1: 1.01,
    weight2: 0.104,
    weight3: 0.103,
    weight4: 0.104,
    quantity: 200,
    unitPrice: 3600,
    totalPrice: 720000,
    deliverySource: 'محصول',
    deliveryDestination: 'کارخانه',
  },
];

export const receiptFooter: ReceiptFooter = {
  unit: 'عدد',
  deliveryDestination: 'محصول - کارخانه',
  totalAmount: 0,
  totalQuantity: 0,
  totalAdditions: 0,
  totalFree: 0,
  totalDiscounts: 0,
  totalWeight: 5942.27,
  payableTax: 0,
  detail1: 'آقوطلی',
  detail2: '',
  detail3: 'انبکاره',
  detail4: '',
  currentAccount: '',
  linkedAccount: '',
};

export const COLUMNS: ColumnDef[] = [
  { key: 'rowNumber', label: 'ردیف', width: 45, editable: false, type: 'number', align: 'center' },
  { key: 'productCode', label: 'کد کالا', width: 90, editable: true, type: 'text', align: 'center', lookup: 'product' },
  { key: 'barcode', label: 'بارکد کالا', width: 150, editable: true, type: 'text', align: 'center', lookup: 'product' },
  { key: 'invoiceNumber', label: 'شماره فیش', width: 140, editable: true, type: 'text', align: 'center' },
  { key: 'weight1', label: 'ویژگی ۱', width: 75, editable: true, type: 'number', align: 'center' },
  { key: 'weight2', label: 'ویژگی ۲', width: 75, editable: true, type: 'number', align: 'center' },
  { key: 'weight3', label: 'ویژگی ۳', width: 75, editable: true, type: 'number', align: 'center' },
  { key: 'weight4', label: 'ویژگی ۴', width: 75, editable: true, type: 'number', align: 'center' },
  { key: 'productName', label: 'نام کالا', width: 190, editable: true, type: 'text', align: 'right', lookup: 'product' },
  { key: 'productNameEn', label: 'نام انگلیسی کالا', width: 190, editable: true, type: 'text', align: 'left', lookup: 'product' },
  { key: 'deliveryDestination', label: 'تحویل دهنده کالا', width: 120, editable: true, type: 'text', align: 'center', lookup: 'deliveryDestination' },
  { key: 'deliverySource', label: 'تحویل گیرنده کالا', width: 120, editable: true, type: 'text', align: 'center', lookup: 'deliverySource' },
  { key: 'quantity', label: 'مقدار', width: 70, editable: true, type: 'number', align: 'center' },
  { key: 'unitPrice', label: 'بهای واحد', width: 90, editable: true, type: 'number', align: 'center' },
  { key: 'totalPrice', label: 'مبلغ کل', width: 100, editable: true, type: 'number', align: 'center' },
];
