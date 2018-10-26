import React, { Component } from "react";
import axios from "axios";
import Search from "./Search";
import RecentActivity from "./RecentActivity";
import Header from "./Header";
import "styles/home.scss";
import { Redirect } from "react-router-dom";
import { userInfo } from "os";
import moment from "moment";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goToListing: false,
      items: []
    };
  }

  // componentDidMount() {
  //   const data = { location: "San Jose" };
  //   axios.post("http://localhost:3001/Home", data).then(response => {
  //     console.log("Axios POST response:", response.status);
  //     if (response.status === 200) {
  //       console.log(response);
  //     } else {
  //       console.log(response);
  //     }
  //   });
  // }

  onClickSearch = query => {
    this.props.saveSearchQuery(query);
    const startDate = moment(query.startDate).format("YYYY-MM-DD");
    const endDate = moment(query.startDate).format("YYYY-MM-DD");
    axios.defaults.withCredentials = true;
    axios
      .get(`http://localhost:3001/PropertyList`, {
        params: {
          location: "san jose",
          startDate,
          endDate
        }
      })
      .then(response => {
        console.log("Axios POST response:", response.status);
        if (response.status === 200) {
          this.setState({ goToListing: true, items: response.data });
        } else {
          console.log(response);
        }
      });
  };
  render() {
    console.log(this.props.userInfo);
    const { items, query } = this.state;
    if (this.state.goToListing) {
      return (
        <Redirect
          to={{
            pathname: "/Listing",
            state: {
              referrer: {
                items
              }
            }
          }}
        />
      );
    }
    return (
      <div className="home">
        <div className="hero-container">
          <Header design="gradient" showLogin userInfo={this.props.userInfo} />
          <h1>
            Book beach houses, cabins,
            <br />
            condos and more, worldwide.
          </h1>
          <Search onClick={i => this.onClickSearch(i)} />
          <ul className="message-container">
            <li>
              <h4>Your whole vacation starts here</h4>
              <small>Choose a rental from the world's best selection.</small>
            </li>
            <li>
              <h4>Book and stay with confidence</h4>
              <small>Secure payments, peace of mind</small>
            </li>
            <li>
              <h4>Your vacation your way</h4>
              <small>More space, more privacy, no compromises</small>
            </li>
          </ul>
        </div>
        <RecentActivity />
      </div>
    );
  }
}

export default Home;
