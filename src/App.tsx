import './App.css';
import FileManager from '@/components/FileManager';
import zhCN from 'antd/locale/zh_CN';
import { ConfigProvider } from 'antd';


function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <FileManager />
    </ConfigProvider>
  );
}

export default App;
