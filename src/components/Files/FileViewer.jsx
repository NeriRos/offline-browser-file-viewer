import {Spin} from "antd";

import {useCallback, useEffect, useState} from "react";
import dynamic from 'next/dynamic';
import {EmbedViewer} from "@components/Files/file-types/EmbedViewer";
import {getFile} from "@lib/files-service";

const Viewer = dynamic(() => import('react-file-viewer'), {
    ssr: false
});

export const FileViewers = ({file}) => {
    const [fileObject, setFileObject] = useState();

    const getFileUrl = useCallback(async () => {
        const result = await getFile(file)
        const fileURL = URL.createObjectURL(result);
        // const fileObject = `/${file.title}`
        setFileObject({url: fileURL, name: file.title, extension: file.extension})
    }, [file])

    useEffect(() => {
        getFileUrl();
    }, [getFileUrl])

    if (!fileObject)
        return <Spin/>

    switch (fileObject.extension) {
        case "html":
        case "pdf":
            return <EmbedViewer file={fileObject}/>
        default:
            return <FileDisplay file={fileObject}/>
    }
}

const FileDisplay = ({file}) => {
    const onError = () => {

    }

    return <Viewer
        fileType={file.extension}
        filePath={file.url}
        onError={onError}/>
}