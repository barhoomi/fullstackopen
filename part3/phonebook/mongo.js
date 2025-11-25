
const password = process.argv[2]



mongoose.set('strictQuery', false)

mongoose.connect(url, {
    family: 4
})

// create person schema

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})



// create person model

const Person = mongoose.model("Person", personSchema)

const createPerson = (name, number) => {
    return new Person({
        name: name,
        number: number
    })
}






if (argLen == 3) {
    console.log("Phonebook:")
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person.name,person.number)
        })
        mongoose.connection.close()
    })

} else {
    const name = process.argv[3]
    const number = String(process.argv[4])
    const newPerson = createPerson(name, number)

    // add person to database
    newPerson.save().then(result => {
        console.log(`added ${name} number ${number} to phonebook!`)
        mongoose.connection.close()
    })



}