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
        country_id: this.props.id,
        selectedOption: null,
    }

    handleChange = (selectedOption) => {
        this.setState({selectedOption})
        console.log('selected option', selectedOption)
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const { createPlan } = this.props
        createPlan(this.state)
        this.setState({
            selectedOption: null,
        })
    }

    render(){
        const { selectedOption } = this.state;
        return (
            <div>
                <form onSubmit={this.handleSubmit} className="plan__form__items">
                    <Select
                        value={selectedOption}
                        onChange={this.handleChange}
                        options={options} 
                    />
                    <input type="submit" value="submit" className="plan__form__items__submit"/>
                </form>
            </div>
        )
    }
}
