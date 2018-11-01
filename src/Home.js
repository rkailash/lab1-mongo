import React, { Component } from "react";
import axios from "axios";
import { saveSearch } from "actions";
import { connect } from "react-redux";
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
      goToListing: false
    };
  }
  onClickSearch = query => {
    const startDate = moment(query.startDate).format("YYYY-MM-DD");
    const endDate = moment(query.startDate).format("YYYY-MM-DD");
    this.props.saveSearch(query);
    this.setState({ goToListing: true });
  };
  render() {
    const { location } = this.props;
    if (this.state.goToListing) {
      const query = { location };
      return <Redirect to={`/Listing?location=${location}`} />;
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

const mapStateToProps = state => ({
  location: state.home.location,
  userInfo: state.login.userInfo
});

const mapDispatchToProps = dispatch => ({
  saveSearch: query => dispatch(saveSearch(query))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
