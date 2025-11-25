const mongoose = require("mongoose")

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

mongoose.connect(url, {
        family: 4
    })
    .then(result => {
        console.log('connected to MongoDB')
    }).catch(error => {
        console.log('error connecting to MongoDB:', error.message)
    })

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model("Person", personSchema)


const createPerson = (name, number) => {
    return new Person({
        name: name,
        number: number
    })
}


personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})


module.exports = Person