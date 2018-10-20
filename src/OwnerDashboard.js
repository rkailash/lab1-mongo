import React, { Component } from "react";
import Header from "./Header";
import Inbox from "./Inbox";
import Owner from "./Owner";
import { Link, Redirect, Route } from "react-router-dom";
import { Button, Form, FormGroup, Input } from "reactstrap";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle
} from "reactstrap";
import { images } from "./images";
import axios from "axios";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import "styles/ownerDashboard.scss";

const routes = [
  { value: "inbox", label: "Inbox" },
  { value: "properties", label: "Properties" },
  { value: "profile", label: "Profile" },
  { value: "add-new", label: "Add Property" }
];

const MyProperties = ({ properties }) => {
  // bathrooms: 3
  // bedrooms: 3
  // bookedflag: 0
  // location: "san jose"
  // name: "A nice place to live"
  // ownerid: 3
  // price: 175
  // propertyid: 2
  // sleeps: 2
  // type: "apartment"
  return (
    <div className="properties">
      {properties.length === 0 ? (
        <div className="no-properties">
          <p>You don't have any properties listed.</p>
          <button type="button" className="start-search main-btn">
            List your property
          </button>
        </div>
      ) : (
        <div className="property-list">
          {properties.map((item, key) => {
            const image = images[item.ownerid];
            return (
              <Card key={key}>
                <CardImg
                  top
                  width="100%"
                  src={image[key].value}
                  alt="Card image cap"
                />
                <CardBody>
                  <CardTitle>{item.name}</CardTitle>
                  <CardSubtitle>ID: {item.propertyid}</CardSubtitle>
                  {item.bookedFlag === 1 && (
                    <CardText>This property has an upcoming booking.</CardText>
                  )}
                  <Button>View Details</Button>
                </CardBody>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

const OwnerDropdown = ({ toggle, isOpen }) => {
  return (
    <Dropdown className="header-menu" toggle={() => toggle()} isOpen={isOpen}>
      <DropdownToggle caret>My Account</DropdownToggle>
      <DropdownMenu>
        <DropdownItem>
          <img src="/images/admin.svg" />
          <Link to="/Traveler/profile">Personal Details</Link>
        </DropdownItem>
        <DropdownItem>
          <img src="/images/sketch.svg" />
          <Link to="/Property/">Property Details</Link>
        </DropdownItem>
        <DropdownItem>
          <img src="/images/logout.svg" />
          <Link to="/OwnerLogin">Sign Out</Link>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
const Profile = ({ activeItem, onFocus, userInfo }) => (
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
          />
        </FormGroup>
        <FormGroup className={`${activeItem === "about-me" ? " active" : ""}`}>
          <Input
            onFocus={() => onFocus("about-me")}
            type="textarea"
            name="about-me"
            id="about-me"
            placeholder="About me"
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
            placeholder="My city, country"
          />
        </FormGroup>
        <FormGroup
          className={`small${activeItem === "company" ? " active" : ""}`}
        >
          <Input
            onFocus={() => onFocus("company")}
            type="text"
            name="company"
            id="company"
            placeholder="Company"
          />
        </FormGroup>
        <FormGroup
          className={`small${activeItem === "school" ? " active" : ""}`}
        >
          <Input
            onFocus={() => onFocus("school")}
            type="text"
            name="school"
            id="school"
            placeholder="School"
          />
        </FormGroup>
        <FormGroup
          className={`small${activeItem === "hometown" ? " active" : ""}`}
        >
          <Input
            onFocus={() => onFocus("hometown")}
            type="text"
            name="hometown"
            id="hometown"
            placeholder="Howetown"
          />
        </FormGroup>
        <FormGroup
          className={`small${activeItem === "languages" ? " active" : ""}`}
        >
          <Input
            onFocus={() => onFocus("languages")}
            type="text"
            name="languages"
            id="languages"
            placeholder="Languages"
          />
        </FormGroup>
        <FormGroup
          className={`gender${activeItem === "gender" ? " active" : ""}`}
        >
          <Input
            onFocus={() => onFocus("gender")}
            type="select"
            name="gender"
            id="gender"
            defaultValue={null}
          >
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </Input>
        </FormGroup>
        <FormGroup
          className={`small${activeItem === "phone" ? " active" : ""}`}
        >
          <Input
            onFocus={() => onFocus("phone")}
            type="phone"
            name="phone"
            id="phone"
            placeholder="Phone"
          />
        </FormGroup>
        <Button className="save-changes">Save changes</Button>
      </Form>
    </div>
  </div>
);

class OwnerDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeFormGroup: undefined,
      activeNav: "add-new",
      properties: []
    };
  }
  componentDidMount() {
    axios.get(`http://localhost:3001/OwnerDash`).then(response => {
      this.setState({ properties: response.data });
    });
  }
  setActiveNav = item => this.setState({ activeNav: item.value });
  render() {
    if (!this.props.userInfo) {
      return <Redirect to="/OwnerLogin" />;
    }
    const { activeFormGroup, properties } = this.state;
    const activePath = this.props.location.pathname.split("od/")[1];
    return (
      <div className="od">
        <Header
          hideLyp
          renderDropdown={(toggle, isOpen) => (
            <OwnerDropdown toggle={() => toggle()} isOpen={isOpen} />
          )}
        />
        <ul className={`${activePath} nav`}>
          {routes.map((item, key) => (
            <li key={key} className={activePath === item.value ? "active" : ""}>
              <Link to={`/od/${item.value}`}>{item.label}</Link>
            </li>
          ))}
        </ul>
        <div className="top-container">
          <Route
            path="/od/properties"
            render={() => <MyProperties properties={properties} />}
          />
          <Route path="/od/add-new" render={() => <Owner />} />
          <Route
            path="/od/profile"
            render={() => (
              <Profile
                activeItem={activeFormGroup}
                onFocus={activeFormGroup => this.setState({ activeFormGroup })}
                userInfo={this.props.userInfo}
              />
            )}
          />
          <Route path="/od/inbox" render={() => <Inbox />} />
        </div>
      </div>
    );
  }
}

export default OwnerDashboard;
