require("dotenv").config()
const express = require("express")
var morgan = require('morgan')
const Person = require("./models/person")


const app = express()
app.use(express.json())
app.use(express.static("dist"))

morgan.token('body', function (req, res) {
    return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] :body - :response-time ms'))



app.get("/api/persons", (request, response, next) => {
    Person.find({}).then(person => response.json(person)).catch(error => next(error))
})

app.post("/api/persons", (request, response, next) => {
    const body = request.body

    const newPerson = new Person({
        number: body.number,
        name: body.name,
    })

    newPerson.save().then(person => {
        response.json(person)
        console.log(`successfully added new person`)

    }).catch(error => next(error))

})


app.get("/api/persons/:id", (request, response, next) => {
    const id = request.params.id

    Person.findById(id).then(person => {
        response.json(person)
    }).catch(error => next(error))
})

app.put("/api/persons/:id", (request, response , next) => {
    const id = request.params.id
    const body = request.body

    Person.findById(id).then(person => {
        person.name = body.name
        person.number = body.number
        person.save()
        response.json(person)
    }).catch(error => next(error))
})


app.delete("/api/persons/:id", (request, response, next) => {
    const id = request.params.id
    Person.findByIdAndDelete(id).then(person => {
        response.status(204).end()
        console.log(`${person.name} was deleted`)
    }).catch(error => next(error))
})

app.get("/info", (request, response, next) => {
    Person.find({}).then(people =>{
        response.send(
        `<p>Phonebook has info for ${people.length} people</p>
        ${Date()}`
    )
    }).catch(error => next(error))
    
})


const unknownEndpoint = (request, response) => {
    response.status(404).send({
        error: 'unknown endpoint'
    })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.name,error.message)

    if(error.name === "ValidationError"){
        response.status(400).send(error.message)
    }

    response.status(400).send({
        error: "bad request"
    })

    next(error)
}

app.use(errorHandler)


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})