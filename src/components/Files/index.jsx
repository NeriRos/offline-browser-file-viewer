import {Col, Row, Spin} from "antd";
import {useCallback, useEffect, useState} from "react";
import {hash} from "@core/helpers";
import {getFilesList} from "@lib/files-service";
import {FileList} from "@components/Files/FileList";
import {FileViewers} from "@components/Files/FileViewer";

export const Files = () => {
    const [files, setFiles] = useState()

    const formatFilesList = useCallback((files) => {
        const loop = (data, parentKey) => {
            return data.map((item) => {
                const fileData = {
                    title: item.name,
                    path: item.path,
                    key: hash(`${parentKey}-${item.name}`),
                    extension: item.name.substring(item.name.lastIndexOf('.') + 1).toLowerCase(),
                }

                if (item.children) {
                    return {
                        ...fileData, children: loop(item.children, fileData.key),
                    };
                }

                return fileData
            })
        }

        return loop(files);
    }, [])

    const getFiles = useCallback(async () => {
        const filesList = await getFilesList();
        const formattedList = formatFilesList(filesList.files)

        setFiles(formattedList)
    }, [formatFilesList])

    useEffect(() => {
        getFiles()
    }, [getFiles])

    const [selected, setSelected] = useState()

    const onSelect = async (selected) => {
        setSelected(selected[0])
    }

    return <Row gutter={20}>
        <Col span={6}>
            {files ? <FileList files={files} onSelect={onSelect}/> : <Spin/>}
        </Col>
        <Col span={18}>
            {selected ? <FileViewers file={selected} files={files}/> : null}
        </Col>
    </Row>
}