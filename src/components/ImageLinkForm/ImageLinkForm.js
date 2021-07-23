import React from 'react';

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
    return (
            <div className="ph6-l cf">
                <fieldset className="cf bn ma0 pa10">
                <legend className="pa0 f5 f4-ns mb3 black-90">
                    This App will detect faces from your pictures and returns a probability score based on the likelihood that the detected face is the face of a recognized celebrity.
                </legend>
                <div className="cf">
                    <input 
                        className="f6 f5-l bn fl black-80 bg-white pa3 lh-solid w-100 w-75-m w-80-l br2-ns br--left-ns" 
                        placeholder="Enter Image URL" 
                        type="text"
                        onChange={onInputChange}
                    />
                    <button 
                        className="f6 f5-l fl pv3 tc bn bg-animate bg-black-70 hover-bg-black white pointer w-100 w-25-m w-20-l br2-ns br--right-ns"
                        onClick={onButtonSubmit}>
                            Detect
                    </button>
                </div>
                </fieldset>
            </div>
    )
}

export default ImageLinkForm;