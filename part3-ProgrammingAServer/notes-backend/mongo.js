const mongoose = require('mongoose')

if(process.argv.length < 3){
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@cluster0-b40k7.mongodb.net/notes-app?retryWrites=true&w=majority`

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

// const note1 = new Note({
//     content: 'HTML is easy',
//     date: new Date(),
//     important: true,
// })

// const note2 = new Note({
//     content: 'Backend is confusing',
//     date: new Date(),
//     important: false,
// })

// note1.save().then(result =>{
//     console.log('note saved!')
//     mongoose.connection.close()
// })

// note2.save().then(result => {
//     console.log('note saved!')
//     mongoose.connection.close()
// })

Note.find({}).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})