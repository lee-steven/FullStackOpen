import React from 'react'

const Filter = ({handleSearch}) => {
 return (
    <div>Search countries: <input onChange={handleSearch}/></div>
 )
}

export default Filter