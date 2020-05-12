import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  const handleFilter = (event) => setNewFilter(event.target.value)
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const filterResults = persons.filter(person => {
    const query = newFilter.toUpperCase()
    const personName = person.name.toUpperCase()
    if(personName.indexOf(query) > -1){
      return person.name
    } 
    return ""
  })

  const addPerson = (event) => {
    event.preventDefault();
    const checkPerson = persons.findIndex(person => person.name === newName)

    if(checkPerson === -1){
      const newPerson = { name: newName, number: newNumber}
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    } else {
      alert(`${newName} is already added to the phonebook`)
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>

      <Filter handleFilter={handleFilter}/>

      <h2>Add to Phonebook</h2>
      <PersonForm 
        addPerson={addPerson} 
        handleNameChange={handleNameChange}
        newName={newName}
        handleNumberChange={handleNumberChange}
        newNumber={newNumber}
      />

      <h2>Numbers</h2>
      <Persons filterResults={filterResults} persons={persons}/>

    </div>
  )
}

export default App