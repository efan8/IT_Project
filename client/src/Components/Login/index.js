/* Login page for users to access their items */

import React from 'react';
import '../../style.css';
import LoginComponent from './LoginComponent.js';

let users = {"jibby98@hotmail.com" : "1234", "abcd@what.com" : "123"};

class Login extends React.Component {
    
    constructor() {
        super();
        this.state ={
            email: "",
            password: "",
            output: [<p></p>]
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    
    handleChange(event) {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({[name]: value});
    }
    // Updates state as soon as anything is typed into the input boxes
    handleSubmit(event) {
        if (users[this.state.email] == this.state.password) {
            window.location = "/Welcome";
        } else {
            this.setState ({output : [<p>Your login is incorrect</p>]});
        }
        event.preventDefault();
        
        
    }

    render() {
        return(
            <LoginComponent 
                state={this.state} 
                handleSubmit={this.handleSubmit}
                handleChange={this.handleChange}
            />
        );
    };
};

export default Login;