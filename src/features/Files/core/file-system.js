import * as path from "path";
import directoryTree from "directory-tree";

export const listFiles = () => {
    const filesDir = path.resolve(process.env.FILES_DIRECTORY)
    const tree = directoryTree(filesDir);
    return tree.children;
    // return new Promise((resolve, reject) => {
    //     fs.readdir(filesDir, (err, files) => {
    //         resolve(files)
    //     });
    // })
}