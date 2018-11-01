import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle
} from "reactstrap";

class MyProperties extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.onLoad();
  }
  render() {
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
              const image = images[item.owner];
              return (
                <Card key={key}>
                  {image ? (
                    <CardImg
                      top
                      width="100%"
                      src={image[key].value}
                      alt="Card image cap"
                    />
                  ) : (
                    <CardImg
                      middle
                      width="60px"
                      src="/images/placeholder.svg"
                      alt="Placeholder"
                    />
                  )}
                  <CardBody>
                    <CardTitle>{item.name}</CardTitle>
                    <CardSubtitle>ID: {item._id}</CardSubtitle>
                    {item.bookedFlag === 1 && (
                      <CardText>
                        This property has an upcoming booking.
                      </CardText>
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
  }
}

export default MyProperties;
