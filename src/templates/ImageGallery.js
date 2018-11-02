import React, { Component } from "react";
import "styles/imageGallery.scss";

class ImageGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPos: props.openAt,
      count: null,
      isToggleShown: false
    };
  }
  handleMouseEnter = () => {
    this.setState({
      isToggleShown: true
    });
  };
  handleMouseLeave = () => {
    this.setState({
      isToggleShown: false
    });
  };
  goToImage = e => {
    this.setState({
      currentPos: e
    });
  };
  toggleGallery(dir) {
    const { images } = this.props;
    let currentPos;
    switch (dir) {
      case "left":
        currentPos =
          this.state.currentPos === 0
            ? images.length - 1
            : (this.state.currentPos - 1) % this.state.count;
        this.setState({ currentPos });
        break;
      case "right":
        currentPos = (this.state.currentPos + 1) % this.state.count;
        this.setState({ currentPos });
        break;
      default:
        return;
    }
    this.props.onToggle(currentPos);
  }
  componentDidMount() {
    this.setState({
      count: this.props.images.length
    });
  }
  static getDerivedStateFromProps(props, state) {
    if (props.images.length !== state.count) {
      return {
        count: props.images.length
      };
    } else {
      return null;
    }
  }
  render() {
    const { showThumbnail, images, isExpandable, onExpand } = this.props;
    return images.length === 0 ? (
      <div className="gallery-placeholder">
        <img src="/images/photo.svg" alt="placeholder" />
        <p>Owner hasn't uploaded any images.</p>
      </div>
    ) : (
      <div
        className={`image-gallery`}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <div className="gallery-container">
          <ul
            className="gallery"
            style={{
              width: `${this.state.count * 100}%`,
              left: `-${this.state.currentPos * 100}%`
            }}
          >
            {images.map((item, key) => (
              <li
                key={key}
                style={{ width: `${100 / images.length}%` }}
                onClick={this.props.onClickBanner}
              >
                <div
                  id={`image-${key}`}
                  className="image"
                  style={{
                    backgroundImage: `url(${item})`
                  }}
                />
              </li>
            ))}
          </ul>
          <button
            style={{ opacity: this.state.isToggleShown ? 1 : 0 }}
            className="toggle left rounded-box"
            onClick={() => this.toggleGallery("left")}
          >
            <i className="flex-row">
              <svg
                version="1.1"
                viewBox="0 0 129 129"
                enableBackground="new 0 0 129 129"
                width="512px"
                height="512px"
              >
                <g>
                  <path
                    d="m40.4,121.3c-0.8,0.8-1.8,1.2-2.9,1.2s-2.1-0.4-2.9-1.2c-1.6-1.6-1.6-4.2 0-5.8l51-51-51-51c-1.6-1.6-1.6-4.2 0-5.8 1.6-1.6 4.2-1.6 5.8,0l53.9,53.9c1.6,1.6 1.6,4.2 0,5.8l-53.9,53.9z"
                    fill="#ccc"
                  />
                </g>
              </svg>
            </i>
          </button>
          <button
            style={{ opacity: this.state.isToggleShown ? 1 : 0 }}
            className="toggle right rounded-box"
            onClick={() => this.toggleGallery("right")}
          >
            <i>
              <svg
                version="1.1"
                viewBox="0 0 129 129"
                enableBackground="new 0 0 129 129"
                width="512px"
                height="512px"
              >
                <g>
                  <path
                    d="m40.4,121.3c-0.8,0.8-1.8,1.2-2.9,1.2s-2.1-0.4-2.9-1.2c-1.6-1.6-1.6-4.2 0-5.8l51-51-51-51c-1.6-1.6-1.6-4.2 0-5.8 1.6-1.6 4.2-1.6 5.8,0l53.9,53.9c1.6,1.6 1.6,4.2 0,5.8l-53.9,53.9z"
                    fill="#ccc"
                  />
                </g>
              </svg>
            </i>
          </button>
        </div>
        {showThumbnail &&
          images.length > 0 && (
            <button
              className="count"
              onClick={() => isExpandable && onExpand()}
            >
              {`${this.state.currentPos + 1} / ${images.length}`}
              {isExpandable && (
                <svg x="0px" y="0px" viewBox="0 0 60 60" className="expand">
                  <g>
                    <path
                      fill="#fff"
                      d="M59,22c-0.553,0-1-0.448-1-1V1c0-0.552,0.447-1,1-1s1,0.448,1,1v20C60,21.552,59.553,22,59,22z"
                    />
                    <path
                      fill="#fff"
                      d="M59,2H39c-0.553,0-1-0.448-1-1s0.447-1,1-1h20c0.553,0,1,0.448,1,1S59.553,2,59,2z"
                    />
                    <path
                      fill="#fff"
                      d="M35,26c-0.256,0-0.512-0.098-0.707-0.293c-0.391-0.391-0.391-1.023,0-1.414l24-24
                    c0.391-0.391,1.023-0.391,1.414,0s0.391,1.023,0,1.414l-24,24C35.512,25.902,35.256,26,35,26z"
                    />
                    <path
                      fill="#fff"
                      d="M1,60c-0.553,0-1-0.448-1-1V39c0-0.552,0.447-1,1-1s1,0.448,1,1v20C2,59.552,1.553,60,1,60z"
                    />
                    <path
                      fill="#fff"
                      d="M21,60H1c-0.553,0-1-0.448-1-1s0.447-1,1-1h20c0.553,0,1,0.448,1,1S21.553,60,21,60z"
                    />
                    <path
                      fill="#fff"
                      d="M1,60c-0.256,0-0.512-0.098-0.707-0.293c-0.391-0.391-0.391-1.023,0-1.414l24-24
                    c0.391-0.391,1.023-0.391,1.414,0s0.391,1.023,0,1.414l-24,24C1.512,59.902,1.256,60,1,60z"
                    />
                  </g>
                </svg>
              )}
            </button>
          )}
      </div>
    );
  }
}

ImageGallery.defaultProps = {
  showThumbnail: true,
  onExpand: () => {},
  isExpandable: false,
  onToggle: () => {},
  openAt: 0
};

export default ImageGallery;
