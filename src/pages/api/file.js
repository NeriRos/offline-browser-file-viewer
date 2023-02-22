import {getFileStream, isFilesDirectory} from "@core/file-system";

export default async function fileApiHandler(req, res) {
    if (req.method === "POST") {
        const filePath = req.body.path;
        const extension = req.body.extension?.toLowerCase();

        if (isFilesDirectory(filePath)) {
            switch (extension) {
                case 'docx':
                    return handleGeneralFile(filePath, res);
                default:
                    return handleGeneralFile(filePath, res)
            }
        } else
            return res.status(403).send("No file")
    }

    res.status(405).send()
};

const handleGeneralFile = (filePath, res) => {
    const fileStream = getFileStream(filePath)

    if (!fileStream) {
        return res.status(500).send("Failed")
    }

    res.writeHead(200, {
        'Content-Type': fileStream.mimeType,
        'Content-Length': fileStream.size
    });

    fileStream.stream.pipe(res);
}