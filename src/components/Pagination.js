import React from 'react'

export default function Pagination({ countriesPerPage, totalCountries, paginate }) {
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(totalCountries / countriesPerPage); i++){
        pageNumbers.push(i);
    }

    return (
        <ul className="country__pagination">
            {pageNumbers.map(number => (
                <li key={number} className="country__pagination__item" onClick={() => paginate(number) }>
                    {number}
                </li>
            ))}
        </ul>
    )
}
