import React from 'react'


export default function FilterCountries({searchTerm, updateSearchTerm}) {
    return(
        <section className="country__container__search">
            <form className="form">
              <input 
                type="text" 
                placeholder="Search by Country Name or Continent" 
                value={searchTerm}
                onChange={updateSearchTerm}
                className="form__input"
              />
            </form>
        </section>
    )
}