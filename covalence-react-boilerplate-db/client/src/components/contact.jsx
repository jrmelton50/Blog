import React, { Component } from 'react';
import { sendContactEmail } from '../services/contact'; 

export default class contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            message: ""
        }
    }

    handleNameChange(value) {
        this.setState({
            name: value
        });
    }

    handleEmailChange(value) {
        this.setState({
            email: value
        });
    }

    handleMessageChange(value) {
        this.setState({
            message: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        sendContactEmail(this.state.name, this.state.email, this.state.message)
        .then( (res) => {
            // redirect to the homepage
            this.props.history.push('/');
        })
        .catch( (err) => {
            console.log(err);
        });
    }

    render() {
        return(
            <div className="container"> 
                <form onSubmit={ (e) => { this.handleSubmit(e) }}>
                    <div className="form-group">
                        <label htmlFor="name"> Name </label>
                        <input onChange={ (e) => {this.handleNameChange(e.target.value)}} id="name" type="text" className="form-control" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email"> Email Address </label>
                        <input onChange={ (e) => {this.handleEmailChange(e.target.value)}} id="email" type="email" className="form-control" required/>
                    </div>
                    <div className="form-group">
                        <textarea onChange={ (e) => {this.handleMessageChange(e.target.value)}} cols="30" rows="10" className="form-control"></textarea>
                    </div>
                    <input type="submit" className="btn btn-primary"/>
                </form>
            </div>
        );
    }
}