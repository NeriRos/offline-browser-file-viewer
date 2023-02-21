import {listFiles} from "@features/Files/core/file-system";

export async function filesApiHandler(req, res) {
    if (req.method === "GET") {
        const files = listFiles()

        return res.json({files})
    }
}
