const baseUrl = "http://localhost:3001/anecdotes"

const getAll = async () => {
    const response = await fetch(baseUrl)

    if (!response.ok) {
        throw new Error("response not ok")
    }

    return await response.json()
}

const createNew = async (content) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ content, votes: 0 })
    }
    const response = await fetch(baseUrl, options)

    if (!response.ok) {
        throw new Error("Error: Anecdote not created")
    }

    return await response.json()
}



export default { getAll, createNew }