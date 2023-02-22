export const getFilesList = async () => {
    const response = await fetch('/api/files', {
        method: "GET"
    })

    return response.json();
}

export const getFile = async (file) => {
    const response = await fetch('/api/file', {
        method: "POST",
        body: JSON.stringify({
            path: file.path,
            extension: file.extension
        }),
        headers: {
            'Content-Type': "application/json"
        }
    })

    return response.blob();
}