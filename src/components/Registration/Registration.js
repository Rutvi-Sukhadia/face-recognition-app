import React from 'react';

class Registration extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            confirm_password: '',
            message:''
        }
    }

    onNameChange = (event) => {
        this.setState({name: event.target.value});
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value});
    }

    onConfirmPasswordChange = (event) => {
        this.setState({confirm_password: event.target.value});
    }

    onRegistrationSubmit = (e) => {
        if(!this.state.name || !this.state.email || !this.state.password || !this.state.confirm_password){
            this.setState({message:"Please fill in all the fields"});
            return;
        }
        e.preventDefault();
        if(this.state.password !== this.state.confirm_password){
            this.setState({message:"Set Password and confirm password does not match"});
            return;
        }
        fetch('https://stark-sea-36984.herokuapp.com/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            })
            })
            .then(response => response.json())
            .then(data => {
                if(data.id){
                    this.props.loadUser(data);
                    this.props.onRouteChange('home');
                }
                else{
                    this.setState({message: data});
                }      
            })
            .catch(error => {
                console.error('Error encountered: ', error);
                this.setState({message: 'Something went wrong.. Try again!'});
            });

    }

    render(){
        return (
            <article className="br3 ba bg-white-30 b--black-10 mv4 w-100 w-50-m w-50-l mw6 shadow-5 center mr10">
                <main className="pa4 black-80 w-80">
                <div className="measure">
                    <form>
                    <fieldset className="ba b--transparent ph0 mh0">
                    <legend className="f1 fw6 ph0 mh0">Register</legend>
                    <span className="f4 fw6 db dark-red link">{this.state.message}</span>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                        <input
                        className="pa2 input-reset ba bg-white-60 hover-bg-black hover-white w-100"
                        type="text"
                        name="name"
                        id="name"
                        onChange={this.onNameChange}
                        autoComplete="name"
                        required
                        />
                    </div>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input
                        className="pa2 input-reset ba bg-white-60 hover-bg-black hover-white w-100"
                        type="email"
                        name="email-address"
                        id="email-address"
                        onChange={this.onEmailChange}
                        autoComplete="username"
                        required
                        />
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Set Password</label>
                        <input
                        className="b pa2 input-reset ba bg-white-60 hover-bg-black hover-white w-100"
                        type="password"
                        name="password"
                        id="password"
                        onChange={this.onPasswordChange}
                        autoComplete="new-password"
                        required
                        />
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Confirm Password</label>
                        <input
                        className="b pa2 input-reset ba bg-white-60 hover-bg-black hover-white w-100"
                        type="password"
                        name="confirm_password"
                        id="confirm_password"
                        onChange={this.onConfirmPasswordChange}
                        autoComplete="new-password"
                        required
                        />
                    </div>
                    </fieldset>
                    <div className="">
                    <input
                        onClick={this.onRegistrationSubmit}
                        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f4 dib"
                        type="submit"
                        value="Register"
                    />
                    </div>
                    </form>
                </div>
                </main>
            </article>
            );
    }
} 

export default Registration;