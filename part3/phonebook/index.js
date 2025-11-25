require("dotenv").config()
const express = require("express")
var morgan = require('morgan')
const Person = require("./models/person")


const app = express()
app.use(express.json())
app.use(express.static("dist"))

morgan.token('body', function (req, res) { return JSON.stringify(req.body) })

app.use(morgan(':method :url :status :res[content-length] :body - :response-time ms'))



app.get("/api/persons", (request, response) => {
    Person.find({}).then(person => response.json(person))
    
})

app.post("/api/persons", (request, response) => {
    const body = request.body

    const newPerson = new Person({
        number: body.number,
        name: body.name,
    })

    newPerson.save().then(person => {
        response.json(person)
    })
    
    console.log(`successfully added new person`)
})


app.get("/api/persons/:id", (request, response) => {
    const id = request.params.id
    const person = persons.find(p => p.id == id)
    if (person == null) {
        console.log(`person with ID:${id} not found`)
        response.status(404).end()
    } else {
        response.json(person)
    }
})


app.delete("/api/persons/:id", (request, response) => {
    const id = request.params.id
    const person = persons.find(p => p.id == id)
    if (person == null) {
        console.log(`person with ID:${id} does not exist, or was already deleted`)
        response.status(404).end()
    } else {
        persons = persons.filter(p => p.id !== id)
        response.status(204).end()
    }
})

app.get("/info", (request, response) => {
    response.send(
        `<p>Phonebook has info for ${persons.length} people</p>
        ${Date()}`
    )
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})