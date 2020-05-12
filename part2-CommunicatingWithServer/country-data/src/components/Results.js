import React from 'react'
import Weather from './Weather'

const Results = ({filterResults, handleClick}) => {

    
    const results = filterResults.map(result => {
        return result   
    })

    if(results.length > 10){
        return <p>Too many matches</p>
    } 
    else if (results.length === 1) {
        const result = results[0]
        return (
            <div>
                <h3>{result.name}</h3>
                <p>Capital: {result.capital}</p>
                <p>Population: {result.population}</p>
                <h4>Languages</h4>
                <ul>
                {result.languages.map(language => <li key={language.iso639_1}>{language.name}</li>)}
                </ul>
                <img src={result.flag} style={{ height: 100}} alt="flag" />
                <Weather capital={result.capital}/>
            </div>
        )
    } 
    else {
        return (
            results.map(result => <div key={result.name}>{result.name} <button id={result.name} onClick={handleClick}>Show</button></div>)
        )
    }
}

export default Results