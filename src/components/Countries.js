import React, { Component } from 'react'
import CountryCard from './CountryCard'

export default class Countries extends Component {
    CountryCards = this.props.countries.map((country, i) => {
        console.log(country)
        return <CountryCard key={i} country={country}/>
    })
    render(){
        return (
            <div className="country__container">
                {this.CountryCards}
            </div>
        )
    }
}
