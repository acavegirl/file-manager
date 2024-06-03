import { useState } from 'react';
import { Col, Row } from 'antd';
import FileList from './FileList';
import FileTree from './FileTree';
import ToolBar from './ToolBar';
import TaskList from './TaskList';
import UploadModal from './UploadModal';
import type { FileProcessInfo } from './UploadModal'

export default () => {
  // 在 Tree 中选择的文件夹
  const [curSelectFolder, setCurSelectFolder] = useState<React.Key>()

  // 操作目标文件夹
  const [activeFolder, setActiveFolder] = useState<string[]>([])

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [fileStatusList, setFileStatusList] = useState<FileProcessInfo[]>([]);

  const updateFileStatus = (processInfo: FileProcessInfo) => {
    const { md5 } = processInfo;
    setFileStatusList((oldValue: FileProcessInfo[]) => {
      let includeFlag = false
      const newVal = oldValue.map((item: FileProcessInfo) => {
        if (item.md5 === md5) {
          includeFlag = true
          return processInfo
        } else {
          return item
        }
      })
      if (!includeFlag) {
        newVal.push(processInfo)
      }
      return newVal
    })
  }

  return (
    <div>
      <Row>
        <ToolBar
          activeFolder={activeFolder}
          setIsModalOpen={setIsModalOpen}
        />
      </Row>
      <Row>
        <Col flex="300px">
          <FileTree
            setCurSelectFolder={setCurSelectFolder}
            setActiveFolder={setActiveFolder}
          />
        </Col>
        <div style={{borderLeft: '1px solid #d9d9d9', height: 'inherit'}} />
        <Col flex={3}>
          <FileList
            curSelectFolder={curSelectFolder}
            setCurSelectFolder={setCurSelectFolder}
            activeFolder={activeFolder}
            setActiveFolder={setActiveFolder}
          />
        </Col>
        <div style={{borderLeft: '1px solid #d9d9d9', height: 'inherit'}} />
        <Col flex={1}>
          <TaskList
            fileStatusList={fileStatusList}
          />
        </Col>
      </Row>

      <UploadModal
        activeFolder={activeFolder}
        setActiveFolder={setActiveFolder}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        updateFileStatus={updateFileStatus}
      />
    </div>
  )
};