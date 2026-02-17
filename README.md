# رسید انبار (Warehouse Receipt)

A Persian-language warehouse receipt management UI built with React, TypeScript, and modern tooling.

## Stack

- **React 19** + **TypeScript**
- **Vite** (build tool)
- **Tailwind CSS v4** (via `@tailwindcss/vite` plugin)
- **Ant Design 5** (UI components, RTL support, Persian locale)
- **react-icons** (toolbar & action icons)
- **dayjs** (date utilities)

## Features

- Full RTL layout matching the original Persian warehouse receipt form
- Editable item list — double-click any cell to edit inline (Enter/Tab to confirm, Esc to cancel)
- Sortable columns (click header to cycle asc/desc/none)
- Add/delete rows with confirmation modal
- Live footer totals (quantity, weight, amounts) recalculate on change
- Live clock in the status bar
- Ant Design `ConfigProvider` with `fa_IR` locale and RTL direction
- Responsive layout with horizontal scroll on the item list

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Project Structure

```
src/
├── components/
│   ├── Toolbar.tsx        # Top toolbar with icon buttons
│   ├── HeaderForm.tsx     # Receipt header fields
│   ├── ItemList.tsx       # Editable scrollable item list
│   ├── FooterSummary.tsx  # Totals / summary panel
│   ├── ActionBar.tsx      # Confirm / cancel / delete / add
│   └── StatusBar.tsx      # Bottom status bar
├── data/
│   └── fakeData.ts        # Initial fake data and column definitions
├── pages/
│   └── WarehouseReceipt.tsx  # Main page, state orchestration
├── types/
│   └── index.ts           # TypeScript interfaces
└── index.css              # Global styles + Tailwind import
```
