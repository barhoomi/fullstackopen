import { useDispatch, useSelector } from "react-redux"
import { setNotification } from "../reducers/notificationReducer"

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()

  setTimeout(()=>dispatch(setNotification("")),5000)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
