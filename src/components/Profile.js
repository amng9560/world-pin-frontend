import React from 'react'

export default class Profile extends React.Component {

    componentDidMount(){
        // this.props.validate()
    }
    
    mapPlanYearsForCountries = (year) => {
        // console.log(this.props.plans)
        if(this.props.plans && this.props.plans.length > 0){
            let plans = this.props.plans.filter(plan => {
                return plan.year === year
            }).map(plan => {
                if(plan.countries){
                    return plan.countries.map(country => <h3>{country.name}</h3>)
                }
            }).flat(2)
            return plans
        }
    }

    render(){ 
        return (
            <div className="profile">
                <div className="profile__plan">
                    <h3>Now: </h3>
                    {this.mapPlanYearsForCountries(0)}
                </div>
                <div className="profile__plan">
                    <h3>Travel in One Year: </h3>
                    {this.mapPlanYearsForCountries(1)}
                </div>
                <div className="profile__plan">
                    <h3>Travel in Five Year: </h3>
                    {this.mapPlanYearsForCountries(5)}
                </div>
                <div className="profile__plan">
                    <h3>Travel in Ten Year: </h3>
                    {this.mapPlanYearsForCountries(10)}
                </div>
            </div>
        )
    }
}
