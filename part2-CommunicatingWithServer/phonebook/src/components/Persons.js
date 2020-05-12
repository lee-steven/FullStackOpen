import React from 'react'

const Persons = ({filterResults}) => {
    return (
        <div>
        {filterResults.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
        </div>
    )
}

export default Persons