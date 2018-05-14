import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import IndividualBlogPage from './IndividualBlogPage';
import Home from './Home';
// import LoginPage from './LoginPage';
import LoginPage from './auth/login';
import Logout from './auth/logout';
import PrivateRoute from './auth/privateRoute';
import AuthorPage from './AuthorPage';
import EditBlog from './EditBlog';
import AuthButton from "./auth/authButton";
import Donate from './donate';
import Contact from './contact';

class Navigation extends Component {

    render() {
        return (
            <Router>
                <Fragment>
                    <AuthButton/>
                    <Switch>
                        {/* <Route exact path="/login" component={LoginPage} /> */}
                        <Route exact path="/" component={Home} />
                        <Route exact path="/login" component={LoginPage} />
                        <Route exact path="/logout" component={Logout} />
                        <Route path="/donate" component={Donate} />
                        <Route path="/contact" component={Contact} />
                        <PrivateRoute exact path="/authorPage/:id" component={AuthorPage} />
                        <Route exact path="/blog/:id" component={IndividualBlogPage} /> 
                        <PrivateRoute exact path="/edit/:id" component={EditBlog} />
                    </Switch>
                </Fragment>
            </Router>
        )
    }
}

export default Navigation;