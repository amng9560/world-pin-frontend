import React, { Component } from 'react'

export default class CountryCard extends Component {
    state = {
        country_info: false,
    }

    toggleCountryInfo = () => {
        this.setState({
            country_info: !this.state.country_info
        })
    }

    render(){
        const { country } = this.props
        return (
            <div className="country__card">
                <h3>Name: {country.name}</h3>
                <img src={country.image} alt="country map"/>
                <p onClick={this.toggleCountryInfo}>More Info</p>
                {this.state.country_info
                    ? <div className="country__info" >
                        <img src={country.flag} alt="flag"/>
                        <p>Sub Region: {country.sub_region}</p>
                        <p>Population: {country.population}</p>
                        <p>Currency:{country.currency}</p>
                        <p>Languages:{country.languages_spoken}</p>
                    </div>
                    : null
                }
                
            </div>
        )
    }
}
