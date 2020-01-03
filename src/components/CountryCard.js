import React, { Component } from 'react'
// import AddPlan from './AddPlan'
import { Draggable } from 'react-beautiful-dnd'

export default class CountryCard extends Component {
    state = {
        countryInfo: false,
        addCountryPlan: false,
    }

    toggleCountryInfo = () => {
        this.setState({
            countryInfo: !this.state.countryInfo
        })
    }

    // toggleAddPlan = () => {
    //     this.setState({
    //         addCountryPlan: !this.state.addCountryPlan
    //     })
    // }

    render(){
        const { country, index } = this.props
        return (
            <Draggable draggableId={country.name} index={index}>
                {(provided, snapshot) => (
                    <div 
                        className="country__container__card"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <h3>Name: {country.name}</h3>
                        <img src={country.image} alt="country map" className="country__container__card__img"/>
                        <p onClick={this.toggleCountryInfo}>More Info</p>
                        {this.state.countryInfo
                            ? <div className="country__container__card__info" >
                                <img src={country.flag} alt="flag" className="country__container__card__img"/>
                                <p>Sub Region: {country.sub_region}</p>
                                <p>Population: {country.population}</p>
                                <p>Currency:{country.currency}</p>
                                <p>Languages:{country.languages_spoken}</p>
                            </div>
                            : null
                        }
                    </div>
                )}
            </Draggable>
        )
    }
}
     {/* <img 
                    onClick={this.toggleAddPlan} 
                    src="https://image.flaticon.com/icons/svg/149/149688.svg" 
                    alt="add button" 
                    className="country__container__card__button"
                />
                {this.state.addCountryPlan
                    ? <AddPlan createPlan={this.props.createPlan} id={country.id}/>
                    : null
                } */}