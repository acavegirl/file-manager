import { UploadFile } from 'antd';
import SparkMD5 from 'spark-md5';

interface FileInfo {
  md5: string,
  fileName: string,
  fileSize: number,
  totalChunkNumber: number,
  fileChunkList: FileChunk[],
}

export interface FileChunk {
  chunkIndex: string,
  fileChunk: any,
}

/**
 * 执行文件切片，获取切片后文件信息
 * @param file 
 * @returns md5，fileName, fileSize, fileChunkList
 */
export const getFileChunkInfo = (file: UploadFile<any>) => {
  return new Promise((resolve, reject) => {
    // chunk 大小5M
    const chunkSize = 1024 * 1024 * 5
    const totalChunkNumber = Math.ceil((file.size || 0) / chunkSize)
    let chunkIndex = 0

    const fileReader = new FileReader()
    const spark = new SparkMD5.ArrayBuffer()
    const blobSlice = File.prototype.slice

    const fileChunkList: any = []; // 切片集合

    fileReader.onload = function (e) {
      // 把当前切片放入spark中
      if (e.target?.result) {
        spark.append(e?.target?.result as ArrayBuffer);
      }
      chunkIndex++;
      if (chunkIndex < totalChunkNumber) {
        loadNext();
      } else {
        resolve({ md5: spark.end(), fileName: file.name, fileSize: file.size, totalChunkNumber, fileChunkList } as FileInfo);
      }
    };
    fileReader.onerror = () => {
      reject("文件读取失败");
    }

    const loadNext = () =>　{
      let start = chunkIndex * chunkSize,
          end = ((start + chunkSize) >= (file.size || 0)) ? file.size : start + chunkSize;
      
      const currentFileChunk = blobSlice.call(file, start, end)
      fileChunkList.push({
        fileChunk: currentFileChunk,
        chunkIndex: `${chunkIndex}`,
      } as FileChunk)
      fileReader.readAsArrayBuffer(currentFileChunk);
    };
    
    // 执行文件切割计算
    loadNext()
  })
}

