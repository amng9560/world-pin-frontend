import React, { Component } from 'react'

export default class Login extends Component {
    state = {
        first_name: "",
        last_name: "",
        username: "",
        password: "",
        existingUser: false
      }

      loggingIn = () => {
        if (!this.state.existingUser === false){
          return this.signUpForm()
        }
      }

      toggleExistingUser = () => {
        this.setState({existingUser: !this.state.existingUser})
    }

      handleChange = (event) => {
        const { name, value } = event.target
        this.setState({
          [name]: value
        })
      }

      handleSubmit = (event) => {
        event.preventDefault()
        const request = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(this.state)
        }
        this.state.existingUser
          ? this.logIn(request) 
          : this.createUser(request)
        this.setState({
          first_name: "",
          last_name: "",
          username: "",
          password: ""
        })
      }

      createUser = (request) => {
        fetch("http://localhost:3000/users", request)
          .then(response => response.json())
          .then(response => {
            if (!response.error) {
              this.logIn(request)
            } 
          })
          .catch(error => console.log(error))
      }
      
      logIn = (request) => {
        fetch("http://localhost:3000/authenticate", request)
          .then(response => response.json())
          .then(response => {
            sessionStorage.setItem('authToken', response.auth_token)
            this.props.logInUser(response.user)
          })
          .then(response => this.props.fetchPlans())
          .catch(error => console.log(error))
      }

      signUpForm = () => {
        return (
          <span className="createUser">
            <input 
              className="form__input"
              onChange={this.handleChange} 
              type="text" name="firs_tname" 
              placeholder="First Name" 
            />
            <input 
              className="form__input"
              onChange={this.handleChange} 
              type="text" 
              name="last_name" 
              placeholder="Last Name" 
            />
          </span>
        )
      }

      render() {
        return (
          <div className="signInContainer">
            <div className="signIn">
              <h3>{this.state.existingUser ? "Sign Up" : "Log In"}</h3>
              <form className="form" onSubmit={this.handleSubmit}>
                {this.loggingIn()}
                <input className="form__input" onChange={this.handleChange} type="text" name="username" placeholder="Username"/>
                <input className="form__input" onChange={this.handleChange} type="password" name="password" placeholder="Password"/>
                <input className="submitButton" id="submit" type="submit"/>
              </form>
              <h4 onClick={this.toggleExistingUser}>{this.state.existingUser ? "Already a User" : "Need to create an account?"}</h4>
            </div>
          </div>
        )
      }
}