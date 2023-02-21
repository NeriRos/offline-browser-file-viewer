export const getFilesList = async () => {
    const response = await fetch('/api/files', {
        method: "GET"
    })

    return response.json();
}