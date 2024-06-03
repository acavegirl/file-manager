import { Row, Progress, Col } from 'antd';
import styled from 'styled-components';
import type { FileProcessInfo } from './UploadModal'
import { useEffect } from 'react';

const Title = styled.div`
  background: #fafafa;
  height: 22px;
  padding: 9px 16px;
  font-weight: bold;
`
const TaskListCon = styled.div`
  padding: 10px 15px;
`
const ListItem = styled(Row)`
  margin-bottom: 5px;
`
const ProgressCon = styled(Progress)`
  margin-left: 8px;
`

export default (props: any) => {
  const { fileStatusList } = props

  useEffect(()=>{
    console.log('fileStatusList', fileStatusList)
  }, [fileStatusList])
  return (<>
    <Title>上传进度</Title>
    <TaskListCon>
      {
        fileStatusList.map((item: FileProcessInfo) => (
          <ListItem>
            <Col flex="100px">
              <span>{item.fileName}</span>
            </Col>
            <Col flex="auto">
              <ProgressCon percent={item.fileProcess} status={item.status} />
            </Col>
          </ListItem>
        ))
      }
    </TaskListCon>
  </>)
}