import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  isLoggedIn,
  checkLogin,
  getLoggedInUserID,
  getNameOfLoggedInUser
} from "../../services/user";
import { one } from '../../services/authors';

class AuthButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      name: ""
    };
  }
  componentWillMount() {
    let id = getLoggedInUserID();
    this.setState({ id }, () => {
        one(id)
        .then( (user) => {
            // console.log(user);
            this.setState({name: user.name}); ;
        })
        .catch( (err) => {
            console.log(err);
        });

    });
  }
  componentDidMount() {}
  render() {
    if (this.state.id !== null) {
      return (
        <React.Fragment>
          <Link className="btn textColorWhite bg-Purple" to="/logout">
            {" "}
            Logout{" "}
          </Link>
          <Link
            className="btn textColorWhite bg-Purple"
            to={`/authorPage/${this.state.id}`}
          >
            {" "}
            My Page{" "}
          </Link>
          <h1> id: {this.state.id} </h1>
          <h1> name: {this.state.name} </h1>
        </React.Fragment>
      );
    } else {
      return (
        <Link className="btn textColorWhite bg-Purple" to="/login">
          {" "}
          Login{" "}
        </Link>
      );
    }
  }
}
// const AuthButton = (props) => {
//     if (isLoggedIn()) {
//         // let id = getLoggedInUserID();
//         let user = getNameOfLoggedInUser();
//         console.log("user = ", user);
//         // let id = user.id;
//         // let name = user.name;
//         return (
//             <React.Fragment>
//                 <Link className="btn textColorWhite bg-Purple" to="/logout"> Logout </Link>
//                 <Link className="btn textColorWhite bg-Purple" to={`/authorPage/${id}`}> My Page </Link>
//                 <h1> id: {id} </h1>
//                 <h1> name: {name} </h1>
//             </React.Fragment>
//         );
//     }
//     else {
//         return <Link className="btn textColorWhite bg-Purple" to="/login"> Login </Link>;
//     }
// };

export default AuthButton;
