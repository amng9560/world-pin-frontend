import React from 'react'

export default function Home() {
    return (
        <header className="header">
            <div className="header__logo-box">
            <img 
                src="https://www.freelogodesign.org/file/app/client/thumb/47e25958-0542-4056-becb-7782843f2023_200x200.png?1577569432943" 
                alt="logo" 
                className="header__logo"
            />
            </div>
            <div className="header__text-box">
            <h1 className="heading-primary">
                <span className="heading-primary--main">Every Journey</span>
                <span className="heading-primary--second">Begins with a single step</span>
            </h1>
            </div>
        </header>
    )
}
