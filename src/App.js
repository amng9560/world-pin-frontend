import React, { Component } from 'react';
import './styles/style.css'
import './App.css';
import Home from './components/Home'
import Navigation from './components/Navigation'
import Countries from './components/Countries'
import Profile from './components/Profile'
import Login from './components/Login'
import { 
  BrowserRouter as Router, 
  Switch, 
  Route,
  Redirect 
} from 'react-router-dom'

const BASE_URL = "http://localhost:3000/"

class App extends Component {
  state = {
    user: false,
    countries: [],
    plans: [],
    currentPage: 1,
    countriesPerPage: 13,
    searchTerm: '',
  }

  componentDidMount(){
    fetch(`${BASE_URL}countries`)
      .then(response => response.json())
      .then(countries => {
        this.setState({ countries })
      })
      // this.validate()
  }

  validate = () => {
    const { id } = this.state.user
    fetch(`${BASE_URL}users/${id}`, {
      method: 'GET',
      headers: {
        "Authorization": "Bearer " + sessionStorage.getItem('authToken')
      }
    })
      .then(response => response.json())
      .then(user => {
        this.setState({
          user: user
        })
      })
      .then(response => {
        this.fetchPlans()
      })
  }

  logInUser = (user) => {
    return (
        sessionStorage.getItem('authToken')
          ? this.setState({user})
          : null
    )
  }

  logOutUser = (event) => {
      event.preventDefault()
      sessionStorage.removeItem('authToken')
      this.setState({
          user: false,
      })
  }

  paginate = (pageNumber) => {
    this.setState({
      currentPage: pageNumber
    })
  }

  updateSearchTerm = (event) => {
    this.setState({
      searchTerm: event.target.value
    })
  }

  filterCountries = () => {
    return this.state.countries.filter(country => {
      return (
        country.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())
      ) || (country.continent.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
    })
  }

  fetchCall = (url, method, body) => {
    const headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem('authToken')
    }
    return fetch(url, {method, headers, body})
  }

  fetchPlans = () => {
    const { id } = this.state.user

    this.fetchCall(`${BASE_URL}/users/${id}/plans`, "GET")
      .then(response => response.json())
      .then(response => {
        this.setState({
          plans: response
        })
      })
  }

  createPlan = (year, country_ids) => {
    const { id } = this.state.user
    const body = JSON.stringify({plan: {year, country_ids: ["", ...country_ids], user_id: id}})
    return this.fetchCall(`${BASE_URL}users/${id}/plans`, "POST", body)
      .then(response => response.json())
      // .then(console.log)
      .then(plan => {
        this.setState({
          plans: [...this.state.plans, plan]
        })
      })
  }

  render(){
    const { user, countriesPerPage, currentPage } = this.state
    const indexOfLastCountry = currentPage * countriesPerPage
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage
    const currentCountries = this.filterCountries().slice(indexOfFirstCountry, indexOfLastCountry)

    return (
      <div className="App">
        <Router>
          {sessionStorage.getItem('authToken') && this.state.user ? <Redirect to='/home' /> : <Redirect to="/login" />}
          <div className="logo-box">
            <a href="/">
              <img 
                src="https://www.freelogodesign.org/file/app/client/thumb/47e25958-0542-4056-becb-7782843f2023_200x200.png?1577569432943" 
                alt="logo" 
                className="logo"
            />
            </a>
          </div>
          <Navigation loggedInUser={user} logOutUser={this.logOutUser}/>
          <Switch>
            <Route exact path="/home" render={() => <Home loggedInUser={user}/>}/>
            <Route path="/profile" render={() => <Profile plans={this.state.plans} validate={this.validate}/>} />
            <Route 
              path="/countries" 
              render={() => <Countries
                countries={currentCountries} 
                countriesPerPage={countriesPerPage}
                totalCountries={this.filterCountries().length}
                paginate={this.paginate}
                updateSearchTerm={this.updateSearchTerm}
                searchTerm={this.state.searchTerm}
                createPlan={this.createPlan}
                />
              } 
            />
            <Route path="/login" render={(props) => <Login {...props} logInUser={this.logInUser} fetchPlans={this.fetchPlans}/>} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
