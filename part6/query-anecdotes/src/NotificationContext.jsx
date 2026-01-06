import { createContext } from "react"
import { useReducer } from "react"

const NotificationContext = createContext()

const NotificationReducer = (state, action) => {
  switch (action.type) {
    case 'VOTE':
      return `you voted for "${action.payload.content}`
    case 'ADD':
      return `you created the anecdote "${action.payload.content}"`
    case 'RESET':
      return ""
    case 'SET':
      return String(action.payload)
    default:
      return state
  }
}

export const NotificationContextProvider = (props) => {

  const [notification, notificationDispatch] = useReducer(NotificationReducer, "")
  return (
    <NotificationContext.Provider value={{ notification, notificationDispatch }}>
      {props.children}
    </NotificationContext.Provider>
  )

}

export default NotificationContext