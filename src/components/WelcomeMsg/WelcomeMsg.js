import React from 'react';

const WelcomeMsg = ({name, entries}) => {
    return (
        <div style={{clear: 'left'}}>
            <div className="fa2 white b">
                {`Welcome ${name}, your current entry count based on the number of faces detected is`}
            </div>
            <div className="fa1 white b">
                <h2>{entries}</h2>
            </div>
        </div>
    )
}

export default WelcomeMsg;