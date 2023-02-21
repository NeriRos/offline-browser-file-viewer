import {Col, Row, Spin} from "antd";
import {useCallback, useEffect, useState} from "react";
import {FileList} from "@features/Files/components/FileList";
import {getFilesList} from "@features/Files/lib/files-service";

export const Files = () => {
    const hash = function (text) {
        var hash = 0,
            i, chr;
        if (text.length === 0) return hash;
        for (i = 0; i < text.length; i++) {
            chr = text.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    };

    const formatFilesList = useCallback((files) => {
        const loop = (data, parentKey) => {
            return data.map((item) => {
                const title = item.name;
                const key = hash(`${parentKey}-${item.name}`);

                if (item.children) {
                    return {
                        title, key, children: loop(item.children, key),
                    };
                }

                return {
                    title, key,
                };
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

    const [files, setFiles] = useState()

    return <Row>
        <Col>
            {files ? <FileList files={files}/> : <Spin/>}
        </Col>
    </Row>
}