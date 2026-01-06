const baseUrl = "http://localhost:3001/anecdotes"

export const getAnecdotes = async () => {
    const response = await fetch(baseUrl)

    if (!response.ok) {
        throw new Error("Anecdotes not returned")
    }

    return await response.json()
}

export const createNewAnecdote = async (newAnecdote) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newAnecdote)
    }
    const response = await fetch(baseUrl, options)
    if (!response.ok) {
        const error = (await response.json()).error
        console.log(error)
        throw new Error(error)
    }
    return await response.json()

}

export const updateAnecdote = async (updatedAnecdote) => {
        const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedAnecdote)
    }
    const response = fetch(`${baseUrl}/${updatedAnecdote.id}`, options)
    if (!response.ok) {
        throw new Error("Anecdotes not returned")
    }
    return await response.json()

}