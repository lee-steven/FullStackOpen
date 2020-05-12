import React from 'react'

const Filter = ({handleFilter}) => {

    return (
        <div>
            <h2>Search Phonebook</h2>
            <div>Filter: <input onChange={handleFilter}/></div>
        </div>
    )
}

export default Filter