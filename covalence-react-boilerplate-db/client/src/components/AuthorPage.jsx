import React, { Component } from "react";
// import ListOfBlogsComponent from "./ListOfBlogsComponent";
// import EditBlog from "./EditBlog";
import { destroy, allBlogsFromUser, all } from "../services/blogs";
import { one } from "../services/authors";
import { Link } from "react-router-dom";
import Form from "./Form";


export default class AuthorPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            blogs: [],
            userID: this.props.match.params.id
        }
    }

    authorIsAdmin() {
        one(this.state.userID)
        .then( (user) => {
            return user.role === "Admin";
        })
        .catch( (err) =>{
            console.log(err);
        });
    }

    componentDidMount() {
        if (this.authorIsAdmin()) {
            // show all blogs with all capabilities
            all()
            .then( (res) => {
                console.log("res = ", res);
                console.log("res[0] = ", res[0]);
                this.setState({
                    blogs: res[0],
                    userID: this.state.userID
                });
            })
            .catch( (err) =>{
                console.log(err);
            });
        }
        else { // only show the user's blogs with all capabilities
            allBlogsFromUser(this.state.userID)
            .then( (res) => {
                this.setState({
                    blogs: res[0],
                    userID: this.state.userID
                });
            })
            .catch( (err) =>{
                console.log(err);
            });
        }
    }

    deleteBlog(id) {
        destroy(id);
        location.reload();
    }
    
    render() {
        let blogs = this.state.blogs.map( (item) => {
            return(
                <div className="card w-75 mt-3 ml-auto mr-auto mb-auto" key={item.blogID}>
                    <div className="card-body">
                        <h5 className="card-title"> {item.blogTitle} </h5>
                        <p className="card-text"> {item.blogContent} </p>
                        <h6 className="card-subtitle mb-2 text-muted"> By {item.authorName} * {item._created} </h6>
                        <Link className="btn bg-Teal m-1 textColorWhite" to={`/${item.blogID}`}> View Details </Link>
                        <Link className="btn bg-Purple m-1 textColorWhite" to={`/edit/${item.blogID}`}> Edit Blog </Link>
                        <button className="btn bg-lightPurple m-1 textColorWhite" onClick={ () => {this.deleteBlog(item.blogID)}}> Delete Blog </button>
                    </div>
                </div>
            ); 
        });
        return (
            <React.Fragment>
                <Form ref="form" authorid={this.state.userID}/> 
                <div className="mt-5"> {blogs} </div>
            </React.Fragment>
        );
    }
}