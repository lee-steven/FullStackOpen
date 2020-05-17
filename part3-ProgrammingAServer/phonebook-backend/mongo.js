const mongoose = require('mongoose')

if(process.argv.length < 5 && process.argv.length > 3){
    console.log('Please provide the information you want to add to the phonebook: node mongo.js <password> <personName> <personNumber>')
    process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]
const url = `mongodb+srv://fullstack:${password}@cluster0-b40k7.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

// If only password is given input, then print out people in phonebook
if(process.argv.length === 3){
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
} else{ 
    const newPerson = new Person({
        name: name,
        number: number,
    })

    newPerson.save().then(result => {
        console.log(`${name} has been saved to Phonebook`)
        mongoose.connection.close()
    }).catch(error => {
        console.log(error)
    })
}