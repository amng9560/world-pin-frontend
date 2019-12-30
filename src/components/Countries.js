import React from 'react'
import CountryCard from './CountryCard'
import Pagination from './Pagination'
import FilterCountries from './FilterCountries'

export default function Countries({ countries, countriesPerPage, totalCountries, paginate, updateSearchTerm, searchTerm, createPlan }) {

    const countryCards = countries.map((country, i) => {
        return <CountryCard key={i} country={country} createPlan={createPlan}/>
    })

    return (
        <div className="country">
            <div className="country__container">
                <FilterCountries 
                    searchTerm={searchTerm} 
                    updateSearchTerm={updateSearchTerm}
                />
                <div className="country__container__list">
                    {countryCards}
                </div>
                <Pagination 
                    countriesPerPage={countriesPerPage}
                    totalCountries={totalCountries}
                    paginate={paginate}
                />
            </div>
        </div>
    )
}
