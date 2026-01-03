const baseUrl = "http://localhost:3001/anecdotes"

const getAll = async () => {
    const response = await fetch(baseUrl)

    if (!response.ok) {
        throw new Error("response not ok")
    }

    return await response.json()
}


export default { getAll }