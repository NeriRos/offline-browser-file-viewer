import {listFiles} from "@core/file-system";

function filesApiHandler(req, res) {
    if (req.method === "GET") {
        const files = listFiles()

        return res.json({files})
    }
}

export default filesApiHandler