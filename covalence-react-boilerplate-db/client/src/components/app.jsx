import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import IndividualBlogPage from './IndividualBlogPage';
import Home from './Home';

class Navigation extends Component {

    render() {
        return (
            <Router>
                <Fragment>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/:id" component={IndividualBlogPage} />
                    </Switch>
                </Fragment>
            </Router>
        )
    }
}

export default Navigation;