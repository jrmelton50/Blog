import React, {Component} from "react";
import ListOfBlogsComponent from "./ListOfBlogsComponent";
import Form from "./Form";

export default class Home extends Component {

    render() {
        return (
            <React.Fragment>
                <Form ref="form"/> 
                <ListOfBlogsComponent/>
            </React.Fragment>
        );
    }
}

