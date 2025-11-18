const Note = ({note}) => {
    console.log(note)
    
    let prefix = ""
    let postfix = ""

    function bold(txt){
        return(
            <b>
                {txt}
            </b>
        )
    }

    let boldedNote = note.content

    if(note.important){
        boldedNote = bold(note.content)
    }

    return (
        <li>
            {prefix}
            {boldedNote}
            {postfix}
        </li>
    )
}

export default Note