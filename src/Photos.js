import React, { Component } from "react";
import Dropzone from 'react-dropzone';
import axios from "axios";

class Photos extends Component {
  handleOnDrop = (files, rejectedFiles) => {
    let file = new FormData();
    axios.post("http://localhost:3001/ImageUpload", file).then(result => {
      console.log("Result is", result);
    });
    file.append("selectedFile", files[0]);
    console.log(files);
  };
  render() {
    return (
      <div className="layout">
        <div className="panel panel-default">
        {this.props.nextButton()}
          <h2>Add up to 50 photos of your property</h2>
          <hr />
          <div>
            <Dropzone onDrop={this.handleOnDrop}>
              Drop your images here
            </Dropzone>
            Showcase your property’s best features (no pets or people, please).
            Requirements: JPEG, at least 1920 x 1080 pixels, less than 20MB file
            size, 6 photos minimum.
          </div>
        </div>
      </div>
    );
  }
}

export default Photos;
