import React from 'react';
import './styles/style.css'
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="navigation">
        <label htmlFor="navi-toggle" className="navigation__button">
          <span className="navigation__icon">&nbsp;</span>
        </label>
        <input type="checkbox" className="navigation__checkbox" id="navi-toggle"/>
        
        <div className="navigation__background">&nbsp;</div>

        <nav className="navigation__nav">
          <ul className="navigation__list">
            <li className="navigation__item"><a href="#" className="navigation__link">Home</a></li>
            <li className="navigation__item"><a href="#" className="navigation__link">Profile</a></li>
            <li className="navigation__item"><a href="#" className="navigation__link">Countries</a></li>
            <li className="navigation__item"><a href="#" className="navigation__link">Login</a></li>
          </ul>
        </nav>
      </div>
      <header className="header">
        <div className="header__logo-box">
          <img src="https://www.freelogodesign.org/file/app/client/thumb/47e25958-0542-4056-becb-7782843f2023_200x200.png?1577569432943" alt="logo" className="header__logo"/>
        </div>
        <div className="header__text-box">
          <h1 className="heading-primary">
            <span className="heading-primary--main">Come plan your</span>
            <span className="heading-primary--second">World Journy Today</span>
          </h1>
        </div>
      </header>
    </div>
  );
}

export default App;
