import React from 'react';

const Navigation = ({isLoggedIn,onRouteChange}) => {
    return (
        <nav className='fr ph3'> 
        {
            isLoggedIn === true ?
                <p className='f3 dim black underline pa3 pointer' onClick={() => onRouteChange('login')}>Log Out</p>
            :
                <div>
                    <p className='f3 dim black underline pa3 pointer' onClick={() => onRouteChange('login')}>Log In</p>
                    <p className='f3 dim black underline pa3 pointer' onClick={() => onRouteChange('register')}>Register</p>
                </div>
        }
        </nav>
    )
}

export default Navigation;