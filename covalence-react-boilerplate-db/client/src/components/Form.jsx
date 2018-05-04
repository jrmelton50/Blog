import React, {Component} from "react";

const hardCodedAuthorID = 1;

export default class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            content: "",
            authorID: hardCodedAuthorID
        }
    }

    handleTitleChange(value) {
        this.setState({
            title: value,
            content: this.state.content,
            authorID: this.state.authorID
        });
    }

    handleContentChange(value) {
        this.setState({
            title: this.state.title,
            content: value,
            authorID: this.state.authorID
        });
    }

    createBlog() {
        let newBlog = {
            authorid: this.state.authorID,
            title: this.state.title,
            content: this.state.content
        }
        fetch('/api/blogs', {
            method: "POST",
            body: JSON.stringify(newBlog),
            headers: new Headers({'Content-Type': 'application/json'})
        })
        .then( (res) => {
            location.reload();
        })
        .catch( (err) => {
            console.log(err);
        });
    }

    render() {
        return (
            <React.Fragment>
                <form>
                    <div className="form-group row">
                        <div className="col-md-2"></div>
                        <input className="form-control col-md-8 mt-5" placeholder="Blog Title" onChange={(event) => this.handleTitleChange(event.target.value)}/>
                    </div>
                    <div className="form-group row">
                        <div className="col-md-2"></div>
                        <input className="form-control col-md-8 mt-3" placeholder="What would you like to blog about?" onChange={(event) => this.handleContentChange(event.target.value)}/>
                    </div>
                </form>
                <div className="row">
                    <div className="col-md-2"></div>
                    <button className="btn btn-primary col-md-2" onClick={(event) => this.createBlog()}> Post Blog!  </button>
                </div>
            </React.Fragment>
        );
    }
}