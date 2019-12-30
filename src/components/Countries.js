import React from 'react'
import CountryCard from './CountryCard'
import Pagination from './Pagination'

export default function Countries({ countries, countriesPerPage, totalCountries, paginate }) {

    const countryCards = countries.map((country, i) => {
        return <CountryCard key={i} country={country}/>
    })

    return (
        <div className="country">
            <div className="country__list">
                {countryCards}
            </div>
            <Pagination 
                countriesPerPage={countriesPerPage}
                totalCountries={totalCountries}
                paginate={paginate}
            />
        </div>
    )
}
