import React, { useState } from 'react';
import { InboxOutlined  } from '@ant-design/icons';
import { Button, message, Upload, Modal, Row, Col } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import { getFileChunkInfo } from '@/utils/uploadFile';
import type { FileChunk } from '@/utils/uploadFile';

const { Dragger } = Upload;

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

export interface FileProcessInfo {
  md5: string;
  fileName: string;
  fileProcess: number;
  status: "success" | "exception" | "normal" | "active" | undefined;
}

export default (props: any) => {
  const { isModalOpen, setIsModalOpen, activeFolder, updateFileStatus, setActiveFolder } = props;
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const uploadSingleFile = (file: UploadFile<any>) => {
    console.log('single')
    return getFileChunkInfo(file).then((fileInfo: any)=>{
      console.log('fileInfo', fileInfo)
      const { md5, fileName, fileSize, totalChunkNumber, fileChunkList } = fileInfo
      // 根据 md5 获取文件上传状态：已上传 | 未上传 | 部分上传
      const fileStatusReturnData = {
        done: false,
        chunkIndexList: ['0', '1', '2'],
      }
      const { done, chunkIndexList } = fileStatusReturnData

      if (done === true) {
        // 处理已经上传成功逻辑
        updateFileStatus({
          md5,
          fileName,
          fileProcess: 100,
          status: 'success'
        })
      } else {
        // 部分上传或未上传
        const toUploadFileChunkList = fileChunkList.filter((item: FileChunk)=>!chunkIndexList.includes(item.chunkIndex));
        console.log('toUploadFileChunkList', toUploadFileChunkList)
        if (!toUploadFileChunkList.length) {
          // 请求merge接口
          updateFileStatus({
            md5,
            fileName,
            fileProcess: 100,
            status: 'success'
          })
        }
        let uploadChunkNum = chunkIndexList.length
        console.log('uploadChunkNum', uploadChunkNum)
        const reqList = toUploadFileChunkList.map((item: FileChunk) => {
          // 对每个文件片都单独发出请求
          let formData = new FormData();
          formData.append('md5', md5);
          formData.append('fileName', fileName);
          formData.append('fileSize', fileSize);
          formData.append('totalChunkNumber', totalChunkNumber);
          formData.append('chunkIndex', item.chunkIndex);
          formData.append('fileChunk', item.fileChunk);
          // 发送请求
          // return upload(formData, (e) => {
          //   // 当前分片上传完成
          //   if (e.loaded === e.total) {
          //     uploadChunkNum++
          //     updateFileStatus({
          //       md5,
          //       fileName,
          //       fileProcess: uploadChunkNum / totalChunkNumber * 100,
          //       status: 'active'
          //     })
          //   }
          // });
          console.log('data', activeFolder)
          return true
        })
        console.log('reqList', reqList)
        Promise.all(reqList).then(() => {
          console.log('success')
          // 全部上传成功，请求merge接口
          updateFileStatus({
            md5,
            fileName,
            fileProcess: 100,
            status: 'success'
          })
        }).catch(()=>{
          console.log('exception')
          // 有文件片上传失败
          updateFileStatus({
            md5,
            fileName,
            fileProcess: uploadChunkNum / totalChunkNumber * 100,
            status: 'exception'
          })
        })
      }
    }).catch((error) => {
      message.error(error)
    })
  }


  const handleOk = () => {
    console.log('start');
    fileList.forEach((file: UploadFile<any>) => uploadSingleFile(file))
    setIsModalOpen(false);
    setActiveFolder([])
  };

  const handleCancel = () => {
    setFileList([]);
    setIsModalOpen(false);
  };

  const uploadProps: UploadProps = {
    multiple: true,
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      // console.log('file', file)
      setFileList((fileList)=> [...fileList, file]);

      return false;
    },
    fileList,
  };

  return (
    <>
      <Modal
        title="选择上传文件"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelText="取消"
        okText="上传"
        maskClosable={false}
      >
        <Dragger {...uploadProps}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">上传文件</p>
        </Dragger>
      </Modal>
    </>
  );
};