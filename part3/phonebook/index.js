const express = require("express")
var morgan = require('morgan')


const app = express()
app.use(express.json())
app.use(express.static("dist"))

morgan.token('body', function (req, res) { return JSON.stringify(req.body) })

app.use(morgan(':method :url :status :res[content-length] :body - :response-time ms'))

let persons = [{
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get("/api/persons", (request, response) => {
    response.json(persons)
})

app.post("/api/persons", (request, response) => {
    const body = request.body

    if (!body.number) {
        return response.status(400).json({
            error: 'number missing'
        })
    }
    if (!body.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    }
    if(persons.find(p=>p.name==body.name)){
        return response.status(400).json({
            error: 'name already in database'
        })
    }

    const newPerson = {
        "number": body.number,
        "name": body.name,
        "id": String(parseInt(Math.random() * 100000))
    }

    persons = persons.concat(newPerson)
    
    console.log(`successfully added ${newPerson}`)
    response.json(newPerson)

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