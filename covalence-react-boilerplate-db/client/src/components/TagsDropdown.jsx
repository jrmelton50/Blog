import React, {Component} from "react";

export default class TagsDropdown extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tags: []
        }
    }

    componentDidMount() {
        fetch('/api/tags/')
        .then( (res) => {
            return res.json();
        })
        .then( (obj) => {
            this.setState({
                tags: obj
            });
        })
        .catch( (err) => {
            console.log(err);
        });
    }

    render() {
        let tags = this.state.tags.map( (tag) => {
            return(
                <a className="dropdown-item" href="#" key={tag.id}> {tag.name} </a>
            );
        }); 
        return (
            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Tags
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton"> {tags} </div>
            </div>
        );
    }
}


