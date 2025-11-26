const mongoose = require('mongoose')

const argLen = process.argv.length
console.log(argLen)
if (argLen < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]


const url = `mongodb+srv://fullstack:${password}@cluster0.xn07e5l.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url, {
    family: 4
})

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)


// Note.find({}).then(result => {
//   result.forEach(note => {
//     console.log(note)
//   })
//   mongoose.connection.close()
// })

const note = new Note({
    content: 'Mongodb is interesting',
    important: true,
})

note.save().then(result => {
    console.log('note saved!')
    mongoose.connection.close()
})