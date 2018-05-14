import React, {Component} from "react";
import * as userService from '../services/user';
import { Redirect } from 'react-router-dom';
import IndeterminateProgress from './utilities/indeterminateProgress';

export default class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectToReferrer: false,
            email: '',
            password: '',
            feedbackMessage: '',
            checkingLogin: true
        };
    }

    componentDidMount() {
        userService.checkLogin()
        .then((loggedIn) => {
            if (loggedIn) {
                this.setState({ redirectToReferrer: true, checkingLogin: false });
            } else {
                this.setState({ checkingLogin: false });
            }
        });
    }

    login(e) {
        e.preventDefault();
        userService.login(this.state.email, this.state.password)
        .then(() => {
            this.setState({ redirectToReferrer: true });
        }).catch((err) => {
            if (err.message) {
                this.setState({ feedbackMessage: err.message });
            }
        });
    }

    handleEmailChange(value) {
        this.setState({ email: value });
    }

    handlePasswordChange(value) {
        this.setState({ password: value });
    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: '/' } };
        const { redirectToReferrer, checkingLogin } = this.state;

        if (checkingLogin) {
            return <IndeterminateProgress message="Checking Login Status..." />;
        }
        if (redirectToReferrer) {
            return (
                <Redirect to={from} />
            );
        }
        return(
            <React.Fragment>
                <h1> You must login first </h1>
                <form onSubmit={ (e) => {this.login(e)} }>
                    <div className="form-group">
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={ (event) => {this.handleEmailChange(event.target.value)} }/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={ (event) => {this.handlePasswordChange(event.target.value)} }/>
                    </div>
                    {/* <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                        <label class="form-check-label" for="exampleCheck1"> Remember Me </label>
                    </div> */}
                    <input type="submit" className="btn btn-primary" value="Sign In"/>
                </form>
                
            </React.Fragment>
        );
    }
}