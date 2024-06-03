import { ConfigProvider, Tree } from 'antd';
import type { GetProps, TreeDataNode } from 'antd';
import { FolderTwoTone, FileTwoTone } from '@ant-design/icons';
import React, { useState } from 'react';


type DirectoryTreeProps = GetProps<typeof Tree.DirectoryTree>;

const { DirectoryTree } = Tree;

// isLeaf 表示是否是最后一级文件夹
const treeData: TreeDataNode[] = [
  {
    title: 'parent 0',
    key: '0-0',
    children: [
      { title: 'leaf 0-0', key: '0-0-0' },
      { title: 'leaf 0-1', key: '0-0-1'},
    ],
  },
  {
    title: 'parent 1',
    key: '0-1',
    children: [
      { title: 'leaf 1-0', key: '0-1-0'},
      { title: 'leaf 1-1', key: '0-1-1', children: [
        { title: 'leaf 0-0', key: '0-0-0-1' },
        { title: 'leaf 0-1', key: '0-0-1-1' },
      ]},
    ],
  },
];

interface PropsType {
  setCurSelectFolder?: any;
  setActiveFolder?: any;
}
export default (props: PropsType) => {
  const { setCurSelectFolder, setActiveFolder } = props
  const onSelect: DirectoryTreeProps['onSelect'] = (keys, info) => {
    console.log('Trigger Select', keys, info);
    setCurSelectFolder(keys[0])
    setActiveFolder([])
  };

  const onExpand: DirectoryTreeProps['onExpand'] = (keys, info) => {
    console.log('Trigger Expand', keys, info);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Tree: {
            titleHeight: 32,
            directoryNodeSelectedBg: '#bae0ff',
            directoryNodeSelectedColor: '#000',
            fontSize: 16,
          },
        },
      }}
    >
      <DirectoryTree
        // multiple
        // defaultExpandAll
        onSelect={onSelect}
        onExpand={onExpand}
        treeData={treeData}
      />
    </ConfigProvider>
  );
};