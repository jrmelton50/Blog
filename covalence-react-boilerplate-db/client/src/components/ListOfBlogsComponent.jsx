import React, { Component } from 'react';
import { render } from 'react-dom';
import {Link} from "react-router-dom";
import { allBlogsIncludingUserNames } from '../services/blogs';


export default class ListOfBlogsComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            blogs: []
        }
    }

    componentDidMount() {
        allBlogsIncludingUserNames()
        .then( (blogs) => {
            this.setState({
                blogs: blogs[0]
            });
        })
        .catch( (err) => {
            console.log(err);
        });
    }
    
    render() {
        let blogs = this.state.blogs.map( (item) => {
            return(
                <div className="card w-75 mt-3 ml-auto mr-auto mb-auto" key={item.blogID}>
                    <div className="card-body">
                        <h5 className="card-title"> {item.blogTitle} </h5>
                        <p className="card-text"> {item.blogContent} </p>
                        <h6 className="card-subtitle mb-2 text-muted"> By {item.authorName} * {item._created} </h6>
                        <Link className="card-link textColorTeal" to={`/blog/${item.blogID}`}> View Details </Link>
                    </div>
                </div>
            ); 
        });
        return <div className="mt-5"> {blogs} </div>
    }
}