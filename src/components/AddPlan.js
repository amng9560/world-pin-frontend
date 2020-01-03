import React,{ Component } from 'react'
import Select from 'react-select'

const options = [
    { value: 0, label: "Now" }, 
    { value: 1, label: "1 year" }, 
    { value: 5, label: "5 year" }, 
    { value: 10, label: "10 year" }
]

export default class AddPlan extends Component {
    state = {
        selectedOption: null,
    }

    getCountryIds = () => {
        const { makePlans } = this.props 
        return makePlans.map(country => country.id)
    }

    handleChange = (selectedOption) => {
        this.setState({selectedOption})
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const { createPlan, submitState } = this.props
        const { value } = this.state.selectedOption
        submitState()
        createPlan(value, this.getCountryIds())
        this.setState({
            selectedOption: null,
        })
    }

    render(){
        const { selectedOption } = this.state;
        return (
            <form onSubmit={this.handleSubmit} className="plans__form">
                <Select
                    value={selectedOption}
                    onChange={this.handleChange}
                    options={options}
                    className="plans__form__select"
                />
                <input type="submit" value="submit" className="plans__form__submit"/>
            </form>
        )
    }
}
