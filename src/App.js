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
  Route 
} from 'react-router-dom'

class App extends Component {
  state = {
    user: false,
    countries: []
  }

  componentDidMount(){
    fetch('http://localhost:3000/countries', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem('authToken')
      }
    })
      .then(response => response.json())
      .then(countries => {
        this.setState({ countries })
      })
  }

  logInUser = (user) => {
    return (
        localStorage.getItem('authToken')
          ? this.setState({user})
          : null
    )
  }

  logOutUser = (event) => {
      event.preventDefault()
      localStorage.removeItem("authToken")
      this.setState({
          user: false,
      })
  }

  render(){
    const { user, countries } = this.state
    return (
      <div className="App">
        <Router>
          <div className="logo-box">
            <img 
                src="https://www.freelogodesign.org/file/app/client/thumb/47e25958-0542-4056-becb-7782843f2023_200x200.png?1577569432943" 
                alt="logo" 
                className="logo"
            />
          </div>
          <Navigation loggedInUser={user} logOutUser={this.logOutUser}/>
          <Switch>
            <Route exact path="/" render={() => <Home />}/>
            <Route path="/profile" render={() => <Profile />} />
            <Route path="/countries" render={() => <Countries countries={countries}/>} />
            <Route path="/login" render={() => <Login logInUser={this.logInUser}/>} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
