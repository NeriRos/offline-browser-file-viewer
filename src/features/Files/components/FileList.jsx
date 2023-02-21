import {useCallback, useEffect, useMemo, useState} from "react";

import {Input, Tree} from 'antd';

const {Search} = Input;

export const FileList = ({files = []}) => {
    const [expandedKeys, setExpandedKeys] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [autoExpandParent, setAutoExpandParent] = useState(true);

    const dataList = useMemo(() => [], [])

    useEffect(() => {
        const generateList = (data) => {
            for (let i = 0; i < data?.length; i++) {
                const node = data[i]
                dataList.push(node)
                if (node.children) {
                    generateList(node.children)
                }
            }
        }

        generateList(files)
    }, [files, dataList])

    const onExpand = (newExpandedKeys) => {
        setExpandedKeys(newExpandedKeys);
        setAutoExpandParent(false);
    };

    const getParentKey = useCallback((key, tree) => {
        let parentKey;
        for (let i = 0; i < tree.length; i++) {
            const node = tree[i];
            if (node.children) {
                if (node.children.some((item) => item.key === key)) {
                    parentKey = node.key;
                } else if (getParentKey(key, node.children)) {
                    parentKey = getParentKey(key, node.children);
                }
            }
        }
        return parentKey;
    }, []);

    const onChange = (e) => {
        const {value} = e.target;
        const newExpandedKeys = dataList
            .map((item) => {
                if (item.title.indexOf(value) > -1) {
                    return getParentKey(item.key, files);
                }
                return null;
            })
            .filter((item, i, self) => item && self.indexOf(item) === i);

        setExpandedKeys(newExpandedKeys);
        setSearchValue(value);
        setAutoExpandParent(true);
    };

    const treeData = useMemo(() => {
        const loop = (data) => data.map((item) => {
            const strTitle = item.title;
            const index = strTitle.indexOf(searchValue);
            const beforeStr = strTitle.substring(0, index);
            const afterStr = strTitle.slice(index + searchValue.length);
            const title = index > -1 ? (<span>
              {beforeStr}
                <span className="site-tree-search-value">{searchValue}</span>
                {afterStr}
            </span>) : (<span>{strTitle}</span>);
            if (item.children) {
                return {
                    title, key: item.key, children: loop(item.children),
                };
            }
            return {
                title, key: item.key,
            };
        });
        return loop(files);
    }, [files, searchValue]);

    return (<div>
        <Search
            style={{
                marginBottom: 8,
            }}
            placeholder="Search"
            onChange={onChange}
        />
        <Tree
            onExpand={onExpand}
            expandedKeys={expandedKeys}
            autoExpandParent={autoExpandParent}
            treeData={treeData}
        />
    </div>);
};