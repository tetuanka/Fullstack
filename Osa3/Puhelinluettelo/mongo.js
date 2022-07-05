const mongoose = require('mongoose')

if (process.argv.length<3 || process.argv.length>5 || process.argv.length===4) {
  console.log('check arguments')
  process.exit(1)
}

const password = process.argv[2]
const url =
  `mongodb+srv://terhik:${password}@cluster0.cp7cp9a.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)


if (process.argv.length===5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })

  person.save().then( () => {
    console.log('added', process.argv[3], 'number', process.argv[4], 'to phonebook')
    mongoose.connection.close()
  })
}

if (process.argv.length===3) {
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
}