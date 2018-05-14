import React, {Component} from "react";

export default class EditBlog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            blogTitle: "",
            blogContent: ""
        }
    }

    componentDidMount() {
        fetch(`/api/blogs/bloguser/${this.state.id}`)
        .then( (res) => {
            return res.json();
        })
        .then( (obj) => {
            this.setState({
                blogTitle: obj[0][0].blogTitle,
                blogContent: obj[0][0].blogContent,
                id: this.state.id
            });
        })
        .catch( (err) => {
            console.log(err);
        });  
    }

    updateBlogAndReturnHome() {
        let obj = {
            content: this.state.blogContent,
            title: this.state.title,
            id: this.state.id
        }
        fetch(`/api/blogs/${this.state.id}`, {
            method: "PUT",
            body: JSON.stringify(obj),
            headers: new Headers({'Content-Type': 'application/json'})
        })
        .then( (res) => {
            this.props.history.replace(`/admin`);
        })
        .catch( (err) => {
            console.log(err);
        });
    }

    handleContentChange(value) {
        this.setState({
            blogContent: value,
            blogTitle: this.state.title,
            id: this.state.id
        });
    }

    handleTitleChange(value) {
        this.setState({
            blogContent: this.state.blogContent,
            blogTitle: value,
            id: this.state.id
        });
    }

    render() {
        return(
            <React.Fragment>
                <input className="form-control" value={this.state.blogTitle} onChange={(event) => this.handleTitleChange(event.target.value)}/>
                <input className="form-control" value={this.state.blogContent} onChange={(event) => this.handleContentChange(event.target.value)}/>
                <button type="button" className="btn btn-primary" onClick={ (event) => { this.updateBlogAndReturnHome()} }>Save changes</button>
                <button type="button" className="btn btn-secondary" onClick={ (event) => { this.props.history.replace(`/admin`)} }>Close</button>
            </React.Fragment>
        );
    }

}