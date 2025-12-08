const info = (...params) => {
    console.log("========================================")
    console.log(...params)
    console.log("========================================")

}

const error = (...params) => {

    if (process.env.NODE_ENV !== "test") {
        console.error(...params)
    }
}

module.exports = {
    info, error
}