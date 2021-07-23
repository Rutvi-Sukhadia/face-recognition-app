import React from 'react';

class ErrorBoundary extends React.Component{
    render(){
        if(this.props.hasError){
            return (
                <div style={{clear: 'left'}}>
                    <span className="f3 fw6 db dark-red link">{this.props.errorMsg}</span> 
                </div>
            );
        }
        else{
            return this.props.children;
        }
    }
}

export default ErrorBoundary;