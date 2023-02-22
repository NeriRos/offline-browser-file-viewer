import * as path from "path";
import * as fs from "fs";
import directoryTree from "directory-tree";
import mammoth from "mammoth";
import mime from 'mime-types'

const filesDirectory = process.env.FILES_DIRECTORY;

export const listFiles = () => {
    const filesDir = path.resolve(filesDirectory)
    const tree = directoryTree(filesDir);
    return tree.children;

    // return new Promise((resolve, reject) => {
    //     fs.readdir(filesDir, (err, files) => {
    //         resolve(files)
    //     });
    // })
}

export const isFilesDirectory = (filePath) => {
    const relative = path.relative(filesDirectory, filePath);
    return relative && !relative.startsWith('..') && !path.isAbsolute(relative);
}

export const getFileStream = (filePath) => {
    const stat = fs.statSync(filePath);
    const mimeType = mime.lookup(filePath)

    return {
        stream: fs.createReadStream(filePath), size: stat.size, mimeType
    }
}

export const getDocxAsHtml = async (filePath) => {
    return (await mammoth.convertToHtml({path: filePath})).value
}