import { useContext } from "react"
import NotificationContext from "../NotificationContext"
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query"
import { updateAnecdote, getAnecdotes } from "../requests"

const Anecdotes = () => {
    const { notificationDispatch } = useContext(NotificationContext)


    const queryClient = useQueryClient()
    const result = useQuery({
        queryKey: ['anecdotes'],
        queryFn: getAnecdotes,
        refetchOnWindowFocus: false,
        retry: 3
    })

    const onVote = async (anecdote) => {
        notificationDispatch({ type: "VOTE", payload: anecdote })
        updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
        setTimeout(() => notificationDispatch({ type: "RESET" }), 3000)
    }

    const updateAnecdoteMutation = useMutation({
        mutationFn: updateAnecdote,
        onSuccess: queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    })


    if (result.isLoading) {
        return <div>Loading anecdotes...</div>
    }

    if (result.isError) {
        return <div>Error</div>
    }

    const anecdotes = result.data

    return (
        <ul>
            {anecdotes.map(anecdote =>
                <li key={anecdote.id}>
                    {anecdote.content} - {anecdote.votes} votes
                    <button onClick={() => onVote(anecdote)}>vote</button>
                </li>)}
        </ul>
    )

}

export default Anecdotes