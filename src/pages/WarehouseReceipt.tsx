import { type FC, useState, useEffect, useCallback } from "react";
import { Modal, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import Toolbar from "../components/Toolbar";
import HeaderForm from "../components/HeaderForm";
import ItemList from "../components/ItemList";
import FooterSummary, { type FooterTab } from "../components/FooterSummary";
import ActionBar from "../components/ActionBar";
import StatusBar from "../components/StatusBar";
import {
  receiptHeader as initHeader,
  receiptItems as initItems,
  receiptFooter as initFooter,
  COLUMNS,
} from "../data/fakeData";
import {
  type ReceiptHeader,
  type ReceiptItem,
  type ReceiptFooter,
} from "../types";

const computeFooter = (
  items: ReceiptItem[],
  base: ReceiptFooter,
): ReceiptFooter => {
  const totalQuantity = items.reduce((s, i) => s + i.quantity, 0);
  const totalAmount = items.reduce((s, i) => s + i.totalPrice, 0);
  const totalWeight = items.reduce((s, i) => s + i.weight1 * i.quantity, 0);
  return {
    ...base,
    totalQuantity,
    totalAmount,
    totalWeight: Math.round(totalWeight * 100) / 100,
  };
};

const WarehouseReceipt: FC = () => {
  const [header, setHeader] = useState<ReceiptHeader>(initHeader);
  const [items, setItems] = useState<ReceiptItem[]>(initItems);
  const [footer, setFooter] = useState<ReceiptFooter>(
    computeFooter(initItems, initFooter),
  );
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [mode, setMode] = useState<"view" | "edit" | "new">("view");
  const [footerTab, setFooterTab] = useState<FooterTab>("current");
  const [currentTime, setCurrentTime] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  // Live clock
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, "0");
      const m = String(now.getMinutes()).padStart(2, "0");
      const s = String(now.getSeconds()).padStart(2, "0");
      setCurrentTime(`${h}:${m}:${s}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const handleHeaderChange = useCallback(
    (field: keyof ReceiptHeader, value: string) => {
      setHeader((prev) => ({ ...prev, [field]: value }));
      setMode("edit");
    },
    [],
  );

  const handleItemUpdate = useCallback(
    (id: number, field: keyof ReceiptItem, value: string | number) => {
      setItems((prev) => {
        const updated = prev.map((item) => {
          if (item.id !== id) return item;
          const next = { ...item, [field]: value };
          if (field === "quantity" || field === "unitPrice") {
            next.totalPrice = next.quantity * next.unitPrice;
          }
          return next;
        });
        setFooter(computeFooter(updated, footer));
        return updated;
      });
      setMode("edit");
    },
    [footer],
  );

  const handleAdd = useCallback(() => {
    const newId = Math.max(...items.map((i) => i.id), 0) + 1;
    const newItem: ReceiptItem = {
      id: newId,
      rowNumber: items.length + 1,
      productCode: "",
      productName: "",
      productNameEn: "",
      barcode: "",
      invoiceNumber: "",
      weight1: 0,
      weight2: 0,
      weight3: 0,
      weight4: 0,
      quantity: 0,
      unitPrice: 0,
      totalPrice: 0,
      deliverySource: "محصول",
      deliveryDestination: "کارخانه",
    };
    setItems((prev) => {
      const updated = [...prev, newItem];
      setFooter(computeFooter(updated, footer));
      return updated;
    });
    setSelectedId(newId);
    setMode("new");
  }, [items, footer]);

  const handleDelete = useCallback(() => {
    if (!selectedId) return;
    Modal.confirm({
      title: "حذف سطر",
      icon: <ExclamationCircleOutlined />,
      content: "آیا از حذف این سطر اطمینان دارید؟",
      okText: "بله",
      cancelText: "خیر",
      direction: "rtl",
      onOk: () => {
        setItems((prev) => {
          const updated = prev
            .filter((i) => i.id !== selectedId)
            .map((i, idx) => ({ ...i, rowNumber: idx + 1 }));
          setFooter(computeFooter(updated, footer));
          return updated;
        });
        setSelectedId(null);
        messageApi.success("سطر با موفقیت حذف شد");
      },
    });
  }, [selectedId, footer, messageApi]);

  const handleConfirm = useCallback(() => {
    messageApi.success("رسید با موفقیت ثبت شد");
    setMode("view");
  }, [messageApi]);

  const handleCancel = useCallback(() => {
    setItems(initItems);
    setHeader(initHeader);
    setFooter(computeFooter(initItems, initFooter));
    setSelectedId(null);
    setMode("view");
    messageApi.info("تغییرات لغو شد");
  }, [messageApi]);

  const handleEdit = useCallback(() => {
    setMode("edit");
  }, []);

  const currentIdx = items.findIndex((i) => i.id === selectedId);

  return (
    <div
      className="h-screen flex flex-col bg-gray-100 overflow-hidden"
      style={{ minWidth: 900 }}
    >
      {contextHolder}

      {/* Window title bar */}
      <div
        className="flex items-center justify-between bg-linear-to-b from-[#1c5c9e] to-[#1a4f8a] px-3 py-1.5 text-white select-none"
        dir="rtl"
      >
        <span className="text-sm font-semibold">رسید انبار - ریالی</span>
        <div className="flex gap-2">
          <button className="w-4 h-4 bg-yellow-400 rounded-full hover:bg-yellow-300 transition-colors" />
          <button className="w-4 h-4 bg-green-400 rounded-full hover:bg-green-300 transition-colors" />
          <button className="w-4 h-4 bg-red-500 rounded-full hover:bg-red-400 transition-colors" />
        </div>
      </div>

      {/* Toolbar */}
      <Toolbar />

      {/* Header form */}
      <HeaderForm header={header} onChange={handleHeaderChange} />

      {/* Item list - takes remaining space */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <ItemList
          items={items}
          columns={COLUMNS}
          selectedId={selectedId}
          onSelect={setSelectedId}
          onUpdate={handleItemUpdate}
        />
      </div>

      {/* Footer summary */}
      <FooterSummary
        footer={footer}
        activeTab={footerTab}
        onTabChange={setFooterTab}
      />

      {/* Action bar */}
      <ActionBar
        onAdd={handleAdd}
        onDelete={handleDelete}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        onEdit={handleEdit}
        hasSelection={selectedId !== null}
        currentRecord={currentIdx >= 0 ? currentIdx + 1 : 0}
        totalRecords={items.length}
      />

      {/* Status bar */}
      <StatusBar
        currentRecord={currentIdx >= 0 ? currentIdx + 1 : 0}
        totalRecords={items.length}
        mode={mode}
        username="B_Baha_Alibeyki"
        currentDate="۱۴۰۴/۱۱/۲۷"
        currentTime={currentTime}
      />
    </div>
  );
};

export default WarehouseReceipt;
