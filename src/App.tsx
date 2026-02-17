import './App.css';
import { ConfigProvider } from 'antd';
import faIR from 'antd/locale/fa_IR';
import WarehouseReceipt from './pages/WarehouseReceipt';

const App = () => {
  return (
    <ConfigProvider
      locale={faIR}
      direction="rtl"
      theme={{
        token: {
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          fontSize: 12,
          colorPrimary: '#1677ff',
          borderRadius: 4,
        },
        components: {
          Button: {
            controlHeight: 26,
            fontSize: 11,
          },
          Input: {
            controlHeight: 24,
            fontSize: 11,
          },
          Select: {
            controlHeight: 24,
            fontSize: 11,
          },
        },
      }}
    >
      <WarehouseReceipt />
    </ConfigProvider>
  );
};

export default App;
