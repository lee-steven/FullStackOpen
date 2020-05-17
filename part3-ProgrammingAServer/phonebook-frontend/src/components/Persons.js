import React from 'react'

const Persons = ({filterResults, deletePerson}) => {
    return (
        <div>
        {filterResults.map(person => {
            return ( 
                <p key={person.name}>
                    {person.name} {person.number} 
                    <button onClick={()=>{deletePerson(person)}} id={person.id} >delete</button>
                </p>
            )
        }
        )}
        </div>
    )
}

export default Persons