import {Spin} from "antd";
import {EmbedViewer} from "@features/Files/components/file-types/EmbedViewer";
import {useCallback, useEffect, useState} from "react";
import {getFile} from "@features/Files/lib/files-service";
import dynamic from 'next/dynamic';

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
        case "pdf":
            return <EmbedViewer file={fileObject}/>
        default:
            return <FileDisplay file={fileObject}/>
        // return <Typography.Text>File type not supported</Typography.Text>
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