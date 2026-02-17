export interface ReceiptItem {
  id: number;
  rowNumber: number;
  productCode: string;
  productName: string;
  productNameEn: string;
  barcode: string;
  invoiceNumber: string;
  weight1: number;
  weight2: number;
  weight3: number;
  weight4: number;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  deliverySource: string;
  deliveryDestination: string;
}

export interface ReceiptHeader {
  receiptType: string;
  storeBranch: string;
  serialNumber: string;
  receiptDate: string;
  requestDate: string;
  documentNumber: string;
  requestNumber: string;
  returnNumber: string;
  invoiceNumber: string;
  purchaseLocation: string;
  quantityControl: string;
  qualityControl: string;
  faxNumber: string;
  mileadyDate: string;
  eventDate: string;
  cashType: string;
  personInCharge: string;
  documentSerial: string;
  account: string;
  warehouseSection: string;
  salesWarehouseSection: string;
  receiptTime: string;
  motorDays: string;
}

export interface ReceiptFooter {
  unit: string;
  deliveryDestination: string;
  totalAmount: number;
  totalQuantity: number;
  totalAdditions: number;
  totalFree: number;
  totalDiscounts: number;
  totalWeight: number;
  payableTax: number;
  detail1: string;
  detail2: string;
  detail3: string;
  detail4: string;
  currentAccount: string;
  linkedAccount: string;
}

export type EditableField = keyof ReceiptItem;

export interface ColumnDef {
  key: EditableField;
  label: string;
  width: number;
  editable: boolean;
  type: 'text' | 'number';
  align: 'right' | 'left' | 'center';
}
