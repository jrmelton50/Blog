import React, {Component} from "react";
import ListOfBlogsComponent from "./ListOfBlogsComponent";
import Form from "./Form";
import NavBar from "./NavBar";
// import AuthButton from "./auth/authButton";

export default class Home extends Component {

    render() {
        return (
            <React.Fragment>
                {/* <NavBar/> */}
                {/* <Form ref="form"/>  */}
                {/* <AuthButton/> */}
                <ListOfBlogsComponent/>
            </React.Fragment>
        );
    }
}

