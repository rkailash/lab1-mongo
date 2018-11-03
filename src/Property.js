import React, { Component } from "react";
import ImageGallery from "templates/ImageGallery";
import { fetchPropertyDetails } from "actions";
import axios from "axios";
import PropertyDetails from "./PropertyDetails";
import { connect } from "react-redux";
import Header from "./Header";
import Search from "./Search";
import { images } from "./images";
import moment from "moment";
import { Redirect } from "react-router-dom";
import "styles/productPage.scss";

const item = {
  price: 75,
  rating: 4,
  type: "apartment",
  area: 1200,
  bedrooms: 3,
  sleeps: 3,
  bathrooms: 3,
  halfBaths: 0
};

class Property extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFullScreen: false,
      currentImagePos: 0,
      details: undefined,
      goToLogin: false,
      isBookingSuccessful: undefined
    };
  }
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.fetchPropertyDetails(id);
  }
  openFullScreen = () => {
    this.setState({ isFullScreen: true });
  };
  closeFullScreen = () => {
    this.setState({ isFullScreen: false });
  };
  onBook = () => {
    if (!this.props.userInfo) {
      this.setState({ goToLogin: true });
    } else {
      const data = {
        propertyid: this.props.location.pathname.split("Property/")[1],
        startdate: moment(this.props.query.startDate).format("YYYY-MM-DD"),
        enddate: moment(this.props.query.endDate).format("YYYY-MM-DD")
      };
      axios.post("http://localhost:3001/Booking", data).then(response => {
        console.log("Axios POST response:", response.status);

        if (response.status === 200) {
          console.log("booking success");
          this.setState({ isBookingSuccessful: true });
          this.props.setUserInfo(response.data);
        } else {
          console.log("Booking unsuccessful!");
          this.setState({ isBookingSuccessful: false });
        }
      });
    }
  };

  render() {
    const {
      goToLogin,
      isFullScreen,
      isBookingSuccessful,
      currentImagePos
    } = this.state;
    const { userInfo, details } = this.props;
    if (goToLogin) {
      return <Redirect to="/TravellerLogin" />;
    }
    if (isBookingSuccessful) {
      return <Redirect to="/Traveler/trips" />;
    }
    console.log(details);
    return (
      <div className="product-page">
        <div className="headers">
          <Header showLogin userInfo={this.props.userInfo} />
          <Search query={this.props.query} />
        </div>
        <div className="top-container">
          {details.photos ? (
            <ImageGallery
              onExpand={() => this.openFullScreen()}
              onToggle={i => this.setState({ currentImagePos: i })}
              images={details.photos}
              isExpandable
            />
          ) : (
            <div className="gallery-placeholder">
              <img src="/images/loading.gif" alt="loading" />
            </div>
          )}
          {details === null ? (
            <div className="loading">Loading...</div>
          ) : (
            <PropertyDetails item={details} onClickBook={() => this.onBook()} />
          )}
        </div>
        {isFullScreen && (
          <div className="fullscreen-gallery">
            <ImageGallery images={details.photos} openAt={currentImagePos} />
            <button
              type="button"
              className="close-gallery"
              onClick={() => this.closeFullScreen()}
            >
              <svg
                id="Capa_1"
                viewBox="0 0 212.982 212.982"
                width="16px"
                height="16px"
              >
                <g id="Close">
                  <path
                    style={{ fillRule: "evenodd", clipRule: "evenodd" }}
                    d="M131.804,106.491l75.936-75.936c6.99-6.99,6.99-18.323,0-25.312   c-6.99-6.99-18.322-6.99-25.312,0l-75.937,75.937L30.554,5.242c-6.99-6.99-18.322-6.99-25.312,0c-6.989,6.99-6.989,18.323,0,25.312   l75.937,75.936L5.242,182.427c-6.989,6.99-6.989,18.323,0,25.312c6.99,6.99,18.322,6.99,25.312,0l75.937-75.937l75.937,75.937   c6.989,6.99,18.322,6.99,25.312,0c6.99-6.99,6.99-18.322,0-25.312L131.804,106.491z"
                    fill="#ccc"
                  />
                </g>
              </svg>
            </button>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  details: { ...state.property } || null
});

const mapDispatchToProps = dispatch => ({
  fetchPropertyDetails: id => dispatch(fetchPropertyDetails(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Property);
