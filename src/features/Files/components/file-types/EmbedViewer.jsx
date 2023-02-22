
export const EmbedViewer = ({file}) => {
    return <>
        <embed src={file?.url} width="1000px" height="1000px"/>
    </>
}