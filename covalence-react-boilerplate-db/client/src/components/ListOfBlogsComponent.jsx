import React, { Component } from 'react';
import { render } from 'react-dom';
import {Link} from "react-router-dom";


class ListOfBlogsComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            blogs: []
        }
    }

    componentDidMount() {
        fetch(`/api/blogs/blogsusers`)
        .then( (res) => {
            return res.json();
        })
        .then( (obj) => {
            this.setState({
                blogs: obj[0]
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
                        <h6 className="card-subtitle mb-2 text-muted"> {item.authorName} </h6>
                        <p className="card-text"> {item.blogContent} </p>
                        <Link className="card-link" to={`/${item.blogID}`}> View Details </Link>
                    </div>
                </div>
            ); 
        });
        return <div className="mt-5"> {blogs} </div>
    }
}

export default ListOfBlogsComponent;