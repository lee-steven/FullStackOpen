import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

import peopleService from './services/people'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ newMessage, setNewMessage ] = useState(null)
  const [ error, setError ] = useState(false)

  // Retrieves all People from server
  useEffect(() => {
    peopleService.getAll()
      .then(people => setPersons(people))
  }, [])


  const handleFilter = (event) => setNewFilter(event.target.value)
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  // Returns filtered results
  const filterResults = persons.filter(person => {
    const query = newFilter.toUpperCase()
    const personName = person.name.toUpperCase()
    if(personName.indexOf(query) > -1){
      return person.name
    } 
    return ""
  })

  // Add a person to the phonebook
  const addPerson = (event) => {
    event.preventDefault();
    const checkPerson = persons.findIndex(person => person.name === newName)

    if(checkPerson === -1){
      const newPerson = { name: newName, number: newNumber}

      peopleService.addPerson(newPerson)
        .then(responsePerson => {
          setPersons(persons.concat(responsePerson)) // IMPORTANT to set to responsePerson and not newPerson
          setNewName('')
          setNewNumber('')
          setError(false)
          setNewMessage(`${responsePerson.name} has been successfully added!`)
          setTimeout(() => {
            setNewMessage(null)
          }, 5000)
        })
      
    } else {
      const confirmation = window.confirm(`${newName} is already added to the phonebook, replace old phone number with the updated one?`)
      // Updates person's number in phonebook
      if(confirmation){
        const person = persons[checkPerson]

        const updatedPerson = {
          ...person, number: newNumber
        }

        peopleService.updatePersonNumber(person.id, updatedPerson)
          .then(responsePerson => { 
            // updates front end
            setPersons(persons.map(p => p.id === responsePerson.id ? responsePerson : p))
            setError(false)
            setNewMessage(`${responsePerson.name}'s number has been updated!`)
            setTimeout(() => {
              setNewMessage(null)
            }, 5000)
          })
          .catch(error => {
            setNewName('')
            setNewNumber('')
            setError(true)
            setNewMessage(`${person.name} has already been deleted from the server`)
            setTimeout(() => {
              setNewMessage(null)
            }, 5000)
            setPersons(persons.filter(p => p.name === person.name ? "" : p))
          })
      }
    }
  }

  // Delete a person from the phonebook
  const deletePerson = (person) => {
    const confirmation = window.confirm(`Delete ${person.name} from your Phonebook?`)
    if(confirmation){
      peopleService.deletePerson(person.id)
        .then(response => {
          setPersons(persons.filter(p => p.id !== person.id)) // gets rid of name in front end
        })
        .catch(error => {
          setError(true)
          setNewMessage(`${person.name} has already been deleted from the server`)
          setTimeout(() => {
            setNewMessage(null)
          }, 5000)
        })
    }
    
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={newMessage} error={error}/>

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
      <Persons 
        filterResults={filterResults} 
        persons={persons} 
        deletePerson={deletePerson}
      />

    </div>
  )
}

export default App