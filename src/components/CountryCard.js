import React from 'react'

export default function CountryCard({country}) {
    return (
        <div className="dogCard">
            <h3>Name: {country.name}</h3>
            <img src={country.image}/>
            <img src={country.flag}/>
            <p>Sub Region: {country.sub_region}</p>
            <p>Population: {country.population}</p>
            <p>Currency:{country.currency}</p>
            <p>Languages:{country.languages_spoken}</p>
        </div>
    )
}
