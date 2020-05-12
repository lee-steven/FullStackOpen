import React, { useState, useEffect } from 'react';
import axios from 'axios'

import Filter from './components/Filter'
import Results from  './components/Results'

const App = () => {
  const [newSearchValue, setSearchValue] = useState('')
  const [results, setResults] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setResults(response.data)
      })
  }, [])

  const handleSearch = (event) => setSearchValue(event.target.value)
  const handleClick = (event) => setSearchValue(event.target.id)

  const filterResults = results.filter(result => {
    if(result.name.toUpperCase().indexOf(newSearchValue.toUpperCase()) > -1){
      return result
    } 
    return ""
  })
  

  return (
    <div>
      <Filter handleSearch={handleSearch} />
      <h2>Search Results</h2>
      <Results filterResults={filterResults} handleClick={handleClick} />
    </div>
  )
}

export default App;
