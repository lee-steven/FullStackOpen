import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      console.log(response)
      setPersons(response.data)
    })
  }, [])


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