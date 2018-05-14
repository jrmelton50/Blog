import React, { Component } from 'react';
import { render } from 'react-dom';
import { oneBlogIncludingUserName } from "../services/blogs";

class IndividualBlogPage extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            blogID: null,
            blogTitle: "",
            authorName: "",
            blogContent: ""
        }
    }

    componentDidMount() {
        oneBlogIncludingUserName(this.props.match.params.id)
        .then( (obj) => {
            console.log("obj = ", obj);
            let blog = obj[0];
            this.setState({
                blogID: blog[0].blogID,
                blogTitle: blog[0].blogTitle,
                authorName: blog[0].authorName,
                blogContent: blog[0].blogContent
            });
        })
        .catch( (err) => {
            console.log(err);
        });
    }

    // componentDidMount() {
    //     fetch(`api/blogs/bloguser/${this.props.match.params.id}`)
    //     .then( (res) => {
    //         return res.json();
    //     })
    //     .then( (obj) => {
    //         let blog = obj[0];
    //         this.setState({
    //             blogID: blog[0].blogID,
    //             blogTitle: blog[0].blogTitle,
    //             authorName: blog[0].authorName,
    //             blogContent: blog[0].blogContent
    //         });
    //     })
    //     .catch( (err) => {
    //         console.log(err);
    //     });
    // }

    render() {
        return ( 
            <div className="card w-75 mt-3 ml-auto mr-auto mb-auto" key={this.state.blogID}>
                <div className="card-body">
                    <h5 className="card-title"> {this.state.blogTitle} </h5>
                    <h6 className="card-subtitle mb-2 text-muted"> {this.state.authorName} </h6>
                    <p className="card-text"> {this.state.blogContent} </p>
                </div>
            </div>
        );
    }
}

export default IndividualBlogPage;