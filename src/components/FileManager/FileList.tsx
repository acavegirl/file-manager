import React, { useEffect, useState } from 'react';
import { ConfigProvider, Button, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { FolderTwoTone, FileTwoTone, FolderOutlined, FileOutlined } from '@ant-design/icons';

interface DataType {
  id: string;
  name: string;
  size: string;
  isFolder: boolean;
  modifiedTime: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: '名称',
    dataIndex: 'name',
    render: (text, record) => (
      <div>
        {/* { record.isFolder ?
          <FolderTwoTone style={{marginRight: '10px'}} twoToneColor="#fa8c16"/> :
          <FileTwoTone style={{marginRight: '10px'}} twoToneColor="#434343" />
        } */}
        { record.isFolder ?
          <FolderOutlined style={{marginRight: '10px'}} /> :
          <FileOutlined style={{marginRight: '10px'}} />
        }
        { text }
      </div>
    ),
  },
  {
    title: '大小',
    dataIndex: 'size',
  },
  {
    title: '修改时间',
    dataIndex: 'modifiedTime',
  },
];



interface PropsType {
  curSelectFolder?: React.Key;
  activeFolder: string[];
  setActiveFolder?: any;
  setCurSelectFolder: any;
}
export default (props: PropsType) => {
  const { curSelectFolder, activeFolder, setActiveFolder, setCurSelectFolder } = props;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataType[]>([]);

  useEffect(()=> {
    if (!curSelectFolder) return
    const dataList: DataType[] = [];
    for (let i = 0; i < 46; i++) {
      dataList.push({
        id: `id${i}`,
        name: `${curSelectFolder} ${i}`,
        size: '1024k',
        modifiedTime: `${new Date()}`,
        isFolder: i%2==0 ? true : false
      });
    }
    setData(dataList)
  }, [curSelectFolder])

  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setActiveFolder([])
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setActiveFolder(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys: activeFolder,
    onChange: onSelectChange,
  };
  const hasSelected = activeFolder.length > 0;

  return (
    <div>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              borderColor: '#fff',
              cellPaddingBlock: 9,
              headerBorderRadius: 0,
            },
          },
        }}
      >
        <Table
          rowKey="id"
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
          pagination={false}
          onRow={(record, index)=>{
            return {
              onClick: ()=> {
                // 选择 & 取消选择
                if (activeFolder.includes(record.id)) {
                  const newIds = activeFolder.filter((item)=> item !== record.id);
                  setActiveFolder(newIds)
                } else {
                  setActiveFolder((oldVal: string[])=> [...oldVal, record.id])
                }
              },
              onDoubleClick: ()=>{
                setCurSelectFolder(record.id);
                setActiveFolder([]);
                console.log(record)
              }
            }
          }}
        />
      </ConfigProvider>
    </div>
  );
};