const Note = ({ note, toggleImportance}) => {
  
  return (
    <li key={note.id}>
      <button onClick={()=>toggleImportance(note)}>{note.important? "make unimportant":"make important"}</button>   {note.content}
    </li>
  )
}

export default Note