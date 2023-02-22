import { useMemo, useState} from "react";
import DocViewer, {DocViewerRenderers} from "react-doc-viewer";

export const AllFilesViewer = ({files}) => {
    const docs = useMemo(() => (files.map(file => ({
        uri: `/${file.title}`,
        name: file.title
    }))), [files]);

    const [activeDocument, setActiveDocument] = useState(docs[0]);

    const handleDocumentChange = (document) => {
        setActiveDocument(document);
    };

    return <DocViewer documents={docs}
                      activeDocument={activeDocument}
                      onDocumentChange={handleDocumentChange}
                      pluginRenderers={DocViewerRenderers}
    />;
}