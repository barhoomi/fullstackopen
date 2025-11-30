
const Notification = ({ message, type }) => {
    if (message == "") {
        return null
    }

    let style

    console.log("notification type",type)

    if (type == "error") {
        style = {
            backgroundColor: "lightgrey",
            borderStyle: "solid",
            borderColor: "red",
            borderRadius: 10,
            fontSize: 20,
            color: "red",
        }
    }
    else {
        style = {
            backgroundColor: "lightgrey",
            borderStyle: "solid",
            borderColor: "green",
            borderRadius: 10,
            fontSize: 20,
            color: "green",
        }
    }


    const messageStyle = {
        marginLeft: 10,
        padding: 10
    }


    return (
        <div className="notification" style={style}>
            <div className="message" style={messageStyle}>{message}</div>
        </div>
    )
}

export default Notification