import React, { Component, createRef } from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";
import Header from "./Header";
import { Link, Route } from "react-router-dom";
import { images } from "./images";
import ImageGallery from "templates/ImageGallery";
import Inbox from "./Inbox";
import axios from "axios";
import moment from "moment";
import "styles/travelerDashboard.scss";

const routes = [
  { value: "inbox", label: "Inbox" },
  { value: "trips", label: "My Trips" },
  { value: "profile", label: "Profile" }
];
const navList = [
  { value: "upcoming", label: "Upcoming Trips", imgUrl: "/arrow.svg" },
  { value: "past", label: "Past Trips", imgUrl: "/arrow.svg" }
];

const MyTrips = ({ trips, activeNav, setActiveNav, userInfo }) => {
  // bathrooms: 3
  // bedrooms: 3
  // bookedflag: 1
  // enddate: "2018-10-09T18:30:00.000Z"
  // location: "san jose"
  // name: "hhsghgfjjh"
  // ownerid: 2
  // price: 123
  // propertyid: 1
  // sleeps: 3
  // startdate: "2018-10-07T18:30:00.000Z"
  // type: "gfghfhgjjhg"
  return (
    <div className="mytrips">
      <ul className="nav-list">
        {navList.map((item, key) => (
          <li
            key={key}
            className={`${item.value}${
              item.value === activeNav ? " active" : ""
            }`}
            onClick={() => setActiveNav(item)}
          >
            <img
              src={`/images/${item.imgUrl}`}
              alt={item.value}
              title={item.value}
            />
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
      {trips.length === 0 ? (
        <div className="no-trips">
          <p>You don't have any past or upcoming trips.</p>
          <button type="button" className="start-search main-btn">
            Start your search
          </button>
        </div>
      ) : (
        <ul className="trip-list">
          {trips.map((item, key) => (
            <div className="list-item" key={key}>
              <ImageGallery
                showThumbnail={false}
                images={images[userInfo.userid]}
              />
              <div className="right-container">
                <div className="top-container">
                  <Link to={`/Property/${item.propertyid}`}>
                    <h4>{item.name}</h4>
                  </Link>
                  <div className="property-info">
                    <div className="location">
                      <img src={`/images/placeholder.svg`} />
                      <span>{item.location}</span>
                    </div>
                    <div className="reservation">
                      <img src={`/images/calendar.svg`} />
                      <span>
                        Your reservation is from{" "}
                        <em>{moment(item.startdate).format("LL")}</em> to{" "}
                        <em>{moment(item.enddate).format("LL")}.</em>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

const Profile = ({
  activeItem,
  onFocus,
  userInfo,
  onClickSave,
  ref1,
  ref2,
  ref3,
  ref4
}) => (
  <div className="profile">
    <h1>{`${userInfo.firstname} ${userInfo.lastname}`}</h1>
    <div className="profile-info">
      <h3>Profile Information</h3>
      <Form>
        <FormGroup
          className={`small${activeItem === "firstname" ? " active" : ""}`}
        >
          <Input
            onFocus={() => onFocus("firstname")}
            type="text"
            name="firstname"
            id="firstname"
            placeholder="First Name"
            innerRef={ref1}
          />
        </FormGroup>
        <FormGroup
          className={`small${activeItem === "lastname" ? " active" : ""}`}
        >
          <Input
            onFocus={() => onFocus("lastname")}
            type="text"
            name="lastname"
            id="lastname"
            placeholder="Last Name"
            innerRef={ref2}
          />
        </FormGroup>
        <FormGroup
          className={`small${activeItem === "city-country" ? " active" : ""}`}
        >
          <Input
            onFocus={() => onFocus("city-country")}
            type="text"
            name="city-country"
            id="city-country"
            placeholder="Location"
            innerRef={ref3}
          />
        </FormGroup>
        <Button className="save-changes" onClick={() => onClickSave()}>
          Save changes
        </Button>
      </Form>
    </div>
  </div>
);

class TravelerDashboard extends Component {
  constructor(props) {
    super(props);
    this.ref1 = createRef();
    this.ref2 = createRef();
    this.ref3 = createRef();
    this.ref4 = createRef();
    this.state = {
      activeFormGroup: undefined,
      trips: [],
      activeNav: "upcoming"
    };
  }
  componentDidMount() {
    axios.get(`http://localhost:3001/Trips`).then(response => {
      this.setState({ trips: response.data });
    });
  }
  onClickSave = () => {
    const data = {
      firstname: this.ref1.current.value,
      lastname: this.ref2.current.value,
      location: this.ref3.current.value
    };

    console.log(data);
    axios.post("http://localhost:3001/UpdateUser", data).then(response => {
      console.log("User profile updated", response.data);
    });
  };
  setActiveNav = item => this.setState({ activeNav: item.value });
  render() {
    const { activeFormGroup, trips, activeNav } = this.state;
    const { userInfo } = this.props;
    const activePath = this.props.location.pathname.split("/Traveler/")[1];
    return (
      <div className="traveler">
        <Header />
        <ul className={`nav ${activePath}`}>
          {routes.map((item, key) => (
            <li key={key} className={activePath === item.value ? "active" : ""}>
              <Link to={`/Traveler/${item.value}`}>{item.label}</Link>
            </li>
          ))}
        </ul>
        <div className="results">
          <Route path="/Traveler/inbox" component={Inbox} />
          <Route
            path="/Traveler/trips"
            render={() => (
              <MyTrips
                userInfo={userInfo}
                trips={trips}
                activeNav={activeNav}
                setActiveNav={this.setActiveNav}
              />
            )}
          />
          <Route
            path="/Traveler/profile"
            render={() => (
              <Profile
                activeItem={activeFormGroup}
                onFocus={activeFormGroup => this.setState({ activeFormGroup })}
                userInfo={userInfo}
                onClickSave={this.onClickSave}
                ref1={this.ref1}
                ref2={this.ref2}
                ref3={this.ref3}
                ref4={this.ref4}
              />
            )}
          />
        </div>
      </div>
    );
  }
}

export default TravelerDashboard;
