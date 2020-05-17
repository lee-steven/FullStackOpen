require('dotenv').config()
const Person = require('./models/person')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(express.static('build'))

morgan.token('object', function getObject(req, res){
    if(req.method === 'POST') return JSON.stringify(req.body)
    return ''
})
app.use(morgan(':method :url :status :res[content-length] :response-time ms :object'))
app.use(cors())

// Gets information regarding Phonebook
app.get('/info', (request, response) => {
    response.send(
        `<p>Phonebook has information on ${persons.length} people</p>
        <p>${new Date()}</p>`
    )

})

// Gets all persons information that are a part of phonebook
app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

// Gets person with specific id in phonebook
app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    Person.findById(id).then(person => {
        response.json(person)
    })
    .catch(error => {
        console.log(error)
        response.status(404).end()
    })
})

// Deletes specific person from phonebook
app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

// Adds person to phonebook
app.post('/api/persons', (request,response) => {
    const body = request.body

    if(!body.name){
        return response.status(400).json({ error: 'name or number missing'})
    } else if(!body.number){
        return response.status(400).json({ error: 'number missing'})
    } 

    Person.find({name: body.name})
        .then(result => {
            console.log("FOUNDDDDDDDDDDDD")
        })

    const newPerson = new Person ({
        name: body.name,
        number: body.number,
    })

    newPerson.save().then(savedPerson => {
        response.json(savedPerson)
    })
})

app.put('/api/notes/:id', (request, response, next) => {
    const body = request.body

    const person = {
        number: body.number
    }
    
    Person.findByIdAndUpdate(request.params.id, person, { new: true })
        .then(updatedPerson => {
        response.json(updatedPerson)
        })
        .catch(error => next(error))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})