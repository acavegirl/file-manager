import { UploadOutlined, DownloadOutlined,   } from '@ant-design/icons';
import { Flex, Upload  } from 'antd';
import ToolBtn from './ToolBtn';
import React, { useState } from 'react';
import UploadModal from './UploadModal';

interface PropsType {
  activeFolder?: React.Key[];
  setIsModalOpen: any
}
export default (props: PropsType) => {
  const { setIsModalOpen } = props;
  return (

    <div style={{background: '#d9d9d9', width: '100%', padding: '3px 0'}}>
      <Flex wrap gap="large">
        <ToolBtn
          icon={<UploadOutlined/>}
          text="上传"
          onClick={() => setIsModalOpen(true)}
        />
        <ToolBtn
          icon={<DownloadOutlined/>}
          text="下载"
        />
        
      </Flex>
    </div>
  )
}