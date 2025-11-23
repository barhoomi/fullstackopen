const Note = ({ note, toggleImportance}) => {
  
  return (
    <li key={note.id} className="note">
      <button onClick={()=>toggleImportance(note)}>{note.important? "make unimportant":"make important"}</button>   {note.content}
    </li>
  )
}

export default Note