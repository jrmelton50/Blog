import React, {Component} from "react";
import TagsDropdown from "./TagsDropdown";
import {insert as blogsInsert} from "../services/blogs";
import {insert as blogtagsInsert} from "../services/blogtags";

export default class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            content: "",
            authorID: this.props.authorid,
            tags: [],
            selectedTagName: "No selected tag",
            selectedTagID: null
        }
    }

    componentDidMount() {
        fetch('/api/tags/')
        .then( (res) => {
            return res.json();
        })
        .then( (obj) => {
            this.setState({
                title: this.state.title,
                content: this.state.content,
                authorID: this.state.authorID,
                tags: obj,
                selectedTagName: this.state.selectedTagName,
                selectedTagID: this.state.selectedTagID
            });
        })
        .catch( (err) => {
            console.log(err);
        });
    }

    handleTitleChange(value) {
        this.setState({
            title: value,
            content: this.state.content,
            authorID: this.state.authorID,
            tags: this.state.tags,
            selectedTagName: this.state.selectedTagName,
            selectedTagID: this.state.selectedTagID
        });
    }

    handleContentChange(value) {
        this.setState({
            title: this.state.title,
            content: value,
            authorID: this.state.authorID,
            tags: this.state.tags,
            selectedTagName: this.state.selectedTagName,
            selectedTagID: this.state.selectedTagID
        });
    }

    handleTagSelection(value, id) {
        this.setState({
            title: this.state.title,
            content: this.state.content,
            authorID: this.state.authorID,
            tags: this.state.tags,
            selectedTagName: value,
            selectedTagID: id
        });
    }

    createBlogTag(blogID) {
        // let blogTag = {
        //     blogid: blogID,
        //     tagid: this.state.selectedTagID
        // }
        // blogtagsInsert(blogTag);
    }

    createBlog(e) {
        e.preventDefault();
        let newBlog = {
            authorid: this.state.authorID,
            title: this.state.title,
            content: this.state.content
        }
        let blogID;
        // console.log("Got here!");
        blogsInsert(newBlog)
        .then( (res) => {
            blogID = res.id
            location.reload();
        });
        this.createBlogTag(blogID);
    }

    render() {
        let tags = this.state.tags.map( (tag) => {
            return(
                <a className="dropdown-item" key={tag.id} onClick={ () => {this.handleTagSelection(tag.name, tag.id)}}> {tag.name} </a>
            );
        }); 
        return (
            <React.Fragment>
                <form onSubmit={(event) => {this.createBlog(event)} }>
                    <div className="form-group row">
                        {/* <div className="col-md-2"></div> */}
                        <input className="form-control col-md-8 mt-5 ml-auto mr-auto mb-auto" placeholder="Blog Title" onChange={(event) => this.handleTitleChange(event.target.value)}/>
                    </div>
                    <div className="form-group row">
                        <div className="col-md-2"></div>
                        <input className="form-control col-md-8" placeholder="What would you like to blog about?" onChange={(event) => this.handleContentChange(event.target.value)}/>
                    </div>
                    <div className="form-group row">
                        <div className="col-md-2"></div>
                        <input className="form-control col-md-8" value={this.state.selectedTagName}/>
                    </div>
                    <div className="form-group row">
                        <div className="col-md-2"></div>
                        <div id="dropdown" className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Tags
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton"> {tags} </div>
                        </div>
                        {/* <TagsDropdown className="col-md-8"/> */}
                    </div>
                    <div className="row">
                        <div className="col-md-2"></div>
                        <input type="submit" className="btn textColorWhite bg-Purple col-md-2" value="Post"/>
                    </div>
                </form>
            </React.Fragment>
        );
    }
}