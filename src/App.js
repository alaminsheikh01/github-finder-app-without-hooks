import React, { Fragment } from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import axios from "axios";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import About from "./components/pages/About";
import User from "./components/users/User";

let githubClietId;
let githubClientSecret;

if (process.env.NODE_ENV !== "production") {
  githubClietId = process.env.REACT_APP_GITHUB_ID;
  githubClientSecret = process.env.REACT_APP_GITHUB_SECRET;
} else {
  githubClietId = process.env.GITHUB_ID;
  githubClientSecret = process.env.GITHUB_SECRET;
}

class App extends React.Component {
  state = {
    users: [],
    loading: false, //for loading browser
    alert: null,
    user: {},
    repos: [],
  };
  async componentDidMount() {
    this.setState({ loading: true }); // loading before fach data

    const res = await axios.get(
      `https://api.github.com/users?client_id=${githubClietId}&client_secret=${githubClientSecret}`
    );

    this.setState({ users: res.data, loading: false }); //after fach data loading false
  }

  //search github users
  searchUsers = async (text) => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${githubClietId}&client_secret=${githubClientSecret}`
    );

    this.setState({ users: res.data.items, loading: false }); //after fach data loading false
  };

  getUser = async (username) => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${githubClietId}&client_secret=${githubClientSecret}`
    );

    this.setState({ user: res.data, loading: false }); //after fach data loading false
  };

  //get users repos
  getUserRepos = async (userrepos) => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/users/${userrepos}/repos?per_page=5&sort=created:asc&client_id=${githubClietId}&client_secret=${githubClientSecret}`
    );

    this.setState({ repos: res.data, loading: false }); //after fach data loading false
  };

  clearUsers = () => this.setState({ users: [], loading: false });

  setAlert = (msg, type) => {
    this.setState({ alert: { msg: msg, type: type } });
    setTimeout(() => this.setState({ alert: null }), 3000);
  };

  render() {
    return (
      <Router>
        <div>
          <Navbar />

          <div className="container">
            <Alert alert={this.state.alert} />
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => (
                  <Fragment>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClear={this.state.users.length > 0 ? true : false}
                      setAlert={this.setAlert}
                    />
                    <Users
                      loading={this.state.loading}
                      users={this.state.users}
                    />
                  </Fragment>
                )}
              />
              <Route exact path="/about" component={About} />
              <Route
                exact
                path="/user/:login"
                render={(props) => (
                  <User
                    {...props}
                    getUser={this.getUser}
                    getUserRepos={this.getUserRepos}
                    repos={this.state.repos}
                    user={this.state.user}
                    loading={this.state.loading}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
        <div
          style={{
            textAlign: "center",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        >
          <p>
            Made by{" "}
            <a href="https://web.facebook.com/muhammadalamin01/">
              Alamin Sheikh
            </a>
          </p>
        </div>
      </Router>
    );
  }
}

export default App;
