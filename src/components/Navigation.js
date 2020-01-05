import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class Navigation extends Component{
    state = {
        checked: false
    }

    handleChange = () => {
        this.setState({checked: !this.state.checked})
    }

    toggleLogin = () => {
        if (this.props.loggedInUser) {
          return (
            <div onClick={this.props.logOutUser}>
                <a className="navigation__item" to="/login" onClick={this.handleChange}>
                    Logout
                </a>
            </div>
          )
        } else {
          return (<NavLink className="navigation__item" to="/login" onClick={this.handleChange} >Login</NavLink>)
        }
      }

    render(){
        return (
            <div className="navigation">
            <label htmlFor="navi-toggle" className="navigation__button">
                <span className="navigation__icon">&nbsp;</span>
            </label>

            <input 
                type="checkbox" 
                className="navigation__checkbox" 
                id="navi-toggle" 
                checked={this.state.checked}
                onChange={this.handleChange}
            />
            
            <div className="navigation__background">&nbsp;</div>

            <nav className="navigation__nav">
                <ul className="navigation__list">
                    <NavLink className="navigation__item" to="/home" onClick={this.handleChange}>Home</NavLink>
                    <NavLink className="navigation__item" to="/profile" onClick={this.handleChange}>Profile</NavLink>
                    <NavLink className="navigation__item" to="/countries" onClick={this.handleChange}>Countries</NavLink>
                    {this.toggleLogin()}
                </ul>
            </nav>
            </div>
        )
    }
}
