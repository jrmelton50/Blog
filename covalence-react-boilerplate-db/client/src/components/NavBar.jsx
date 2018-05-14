import React, {Component} from "react";
import {Link} from "react-router-dom";


export default class NavBar extends Component {

    render() {
        return(
            <React.Fragment>
                <nav className="navbar navbar-expand-lg navbar-light bg-lightPurple">
                    <div className="logo textColorWhite">
                        <Link className="navbar-brand" href="#" to="/"> Kitty Korner </Link>    
                    </div>
                    
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse row" id="navbarNav">
                        <div className="col-md-8"></div>
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <Link className="nav-link" href="#" to="/"> Home <span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" href="#" to="/Pics"> Kitty Pictures </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" href="#" to="/Educational"> EduCATional </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </React.Fragment>
        );
    }
}