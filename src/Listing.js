import React, { Component } from "react";
import ImageGallery from "templates/ImageGallery";
import RatingDisplay from "templates/RatingDisplay";
import { fetchSearchResults } from "actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Header from "./Header";
import queryString from "query-string";
import Search from "./Search";
import "styles/listing.scss";
import { images } from "./images";

class Listing extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { location } = queryString.parse(this.props.location.search);
    this.props.fetchSearchResults({
      location
    });
  }
  render() {
    const { properties, isLoading } = this.props;
    return (
      <div className="listing">
        <div className="top-container">
          <Header showLogin userInfo={this.props.userInfo} />
          <Search query={this.props.query} />
        </div>
        {isLoading ? (
          <div className="loader">
            <img src="/images/loading.gif" alt="loading-icon" />
          </div>
        ) : (
          <div className="list-container">
            <h4>{`We found ${properties.length} result${
              properties.length === 1 ? "" : "s"
            } for you.`}</h4>
            {properties.map((item, key) => (
              <div className="list-item" key={key}>
                {item.photos && (
                  <ImageGallery showThumbnail={false} images={item.photos} />
                )}
                <div className="right-container">
                  <div className="top-container">
                    <Link to={`/Property/${item._id}`}>
                      <h4>{item.name}</h4>
                    </Link>
                    <div className="property-info">
                      <span>{`${
                        item.bedrooms === 0
                          ? "Studio"
                          : `${item.bedrooms} BR Apartment`
                      }`}</span>
                      <span>{`${item.bathrooms} Bath`}</span>
                      <span>{`${item.area} sq ft`}</span>
                      <span>{`Sleeps ${item.sleeps}`}</span>
                    </div>
                  </div>
                  <div className="bottom-strip">
                    <p>{`$${item.price} per night`}</p>
                    <RatingDisplay rating={item.rating} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  properties: state.listing.properties,
  isLoading: state.listing.isLoading
});

const mapDispatchToProps = dispatch => ({
  fetchSearchResults: query => dispatch(fetchSearchResults(query))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Listing);
