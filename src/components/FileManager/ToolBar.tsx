import { UploadOutlined, DownloadOutlined, PlusOutlined, ReloadOutlined, MoreOutlined } from '@ant-design/icons';
import { Flex, Input } from 'antd';
import ToolBtn from './ToolBtn';
import React from 'react';
import { SearchProps } from 'antd/es/input';
import styled from 'styled-components';

const Container = styled.div`
  // background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
  // background: linear-gradient(90deg, rgba(226,203,247,0.8435749299719888) 0%, rgba(142,197,252,1) 100%, rgba(0,212,255,1) 100%);
  background: #f0f0f0;
  width: 100%;
  padding: 5px 0;
  border-radius: 5px;
`

const { Search } = Input;

interface PropsType {
  activeFolder?: React.Key[];
  setIsModalOpen: any
}
export default (props: PropsType) => {
  const { setIsModalOpen } = props;

  const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);
  return (

    <Container>
      <Flex justify='space-between'>
        <Flex wrap align="center">
          <ToolBtn
            icon={<UploadOutlined/>}
            text="上传"
            onClick={() => setIsModalOpen(true)}
          />
          <ToolBtn
            icon={<DownloadOutlined/>}
            text="下载"
          />
          <ToolBtn
            icon={<PlusOutlined />}
            text="新建文件夹"
          />
          <ToolBtn
            icon={<ReloadOutlined />}
            text="刷新"
          />
          
        </Flex>
        <Flex justify='flex-end'>
          <Search placeholder="搜索文件" onSearch={onSearch} style={{ width: 200 }} />
          <div style={{ float: 'right'}}>
            <ToolBtn
              icon={<MoreOutlined />}
              text="更多"
            />
          </div>
        </Flex>
      </Flex>
      
    </Container>
  )
}