import React, { Component } from "react";
import Dropzone from "react-dropzone";
import request from "superagent";
import axios from "axios";

class Photos extends React.Component {
  handleOnDrop = (files, rejectedFiles) => {
    let file = new FormData();
    file.append("selectedFile", files[0]);

    axios.post("http://localhost:3001/Photos", file).then(result => {
      console.log("File uploaded successfuly");
    });

    console.log(files);
  };
  render() {
    return (
      <div className="layout">
        <div className="panel panel-default">
        {this.props.onClickNextButton()}
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
