import { useDispatch, useSelector } from "react-redux"
import { updateFilter}  from "../reducers/filterReducer"

const AnecdoteFilter = () => {
    const filter = useSelector(state => state.filter)
    const dispatch = useDispatch()

    return (
        <div>
            filter: <input value={filter} onChange={(e) => {
                dispatch(updateFilter(e.target.value))
            }}></input>
        </div>
    )
}
export default AnecdoteFilter