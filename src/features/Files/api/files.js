import {
    getDocxAsHtml,
    getFileStream,
    isFilesDirectory,
    listFiles
} from "@features/Files/core/file-system";

export async function filesApiHandler(req, res) {
    if (req.method === "GET") {
        const files = listFiles()

        return res.json({files})
    }
}

export async function fileApiHandler(req, res) {
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
}

// const handleDOCX = async (filePath, res) => {
//     const html = await getDocxAsHtml(filePath)
//
//     res.writeHead(200, {
//         'Content-Type': 'text/html',
//         'Content-Length': Buffer.byteLength(html)
//     }).end(html);
// }

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
