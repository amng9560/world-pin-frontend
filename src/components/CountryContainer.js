import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import CountryCard from './CountryCard'
import Pagination from './Pagination'
import FilterCountries from './FilterCountries'

export default function CountryContainer({ countries, countriesPerPage, totalCountries, paginate, updateSearchTerm, searchTerm }) {
    const countryCards = countries.map((country, i) => {
        return <CountryCard key={i} country={country} index={i}/>
    })

    return (
        <div className="country">
            <div className="country__container">
                <FilterCountries 
                    searchTerm={searchTerm} 
                    updateSearchTerm={updateSearchTerm}
                />
                <Droppable droppableId="countries">
                    {(provided, snapshot) => (
                        <div
                            className="country__container__list" 
                            ref={provided.innerRef} 
                            onDragOver={snapshot.onDragOver}
                        >
                            {countryCards}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                <Pagination 
                    countriesPerPage={countriesPerPage}
                    totalCountries={totalCountries}
                    paginate={paginate}
                />
            </div>
        </div>
    )
}
