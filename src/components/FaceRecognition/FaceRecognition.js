import React from 'react';
import './FaceRecognition.css';

class FaceRecognition extends React.Component{
    render(){
        const {imageURL,faceBoxes,isFaceDetected} = this.props;
        let faceDetection;
        if(isFaceDetected === false) {
            faceDetection = <span className="f4 fw6 db dark-red link pa3">No face detected.. Try another image</span>;
        } 
        else if(isFaceDetected === true && faceBoxes.length>0){
            faceDetection = faceBoxes.map((box,k) => 
                <div className="bounding-box" style={{top: box.topRow,left: box.leftCol, bottom: box.bottomRow, right: box.rightCol}} key={k}>
                    <div className="bounding-box-concepts">
                        <div className="concept bounding-box__concept" role="button">
                            <span className="concept__name">{box.celebName}</span>
                            <span className="concept__prediction-val">{box.celebPrecision}</span>
                        </div>
                    </div>
                </div>  
                 
            );
        }
        return (
            <div className='center ma'>
                <div className="absolute mt2">
                {faceDetection}  
                <img src={imageURL} alt='' width="700px" height="auto" id="inputImage"/>
                </div>
            </div>
        )

    }
}
export default FaceRecognition;