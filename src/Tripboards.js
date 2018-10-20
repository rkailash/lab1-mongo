import React, {Component} from 'react';
import '../../App.css';
import '../../bootstrap-social.css';
import '../../profile.css';
import '../../underline-tabs.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Navbar} from "react-bootstrap";
import Tabs from 'react-web-tabs/lib/Tabs';
import Tab from 'react-web-tabs/lib/Tab';
import TabPanel from 'react-web-tabs/lib/TabPanel';
import TabList from 'react-web-tabs/lib/TabList';
import Helmet from 'react-helmet';

class Tripboards extends Component {
    constructor(props){
        super(props);
        this.state = {
            tripdetails : []
        };
    }

    componentDidMount() {
        var username = cookie.load('travelername')

        var data = {username : username}

        axios.post('http://localhost:3001/mytrips', data)
        .then(response => {
            console.log("Status Code : ",response.status);
            if(response.status === 200){
                console.log(response.data)
                this.setState({
                    tripdetails : response.data
                    }
                )
            }
        })
        .catch(err => {
            console.log(err);
            alert("Cannot fetch details");
        });
      }

    render() {
        const {tripdetails} = this.state;

        {/* redirect based on successful login */}
        let redirectVar = null;
        if(!cookie.load('travelercookie')){
        redirectVar = <Redirect to= "/login"/> }
        return(
        <div>
        {redirectVar}
        <Helmet>
            <style>{'body { background-color: white; }'}</style>
        </Helmet>
            <Navbar>
            <Navbar.Header>
            <Navbar.Brand>
                <a href="/home" title = "HomeAway" className = "logo"><img src="HomeAway_Logo.png"/></a>
            </Navbar.Brand>
            </Navbar.Header>
            <img src="P3O5JjfH_400x400.png"/>
            </Navbar>
            <div className = "container" id = "row">
                    <section className="wrapper">
                          <div className="container-big" >
                              <div style ={{ marginBottom : "50px"}}>
                                  <img src="" className="big-logo"/>
                                  <h3 className="heading">
                                      Properties you've booked
                                  </h3>
                              </div>
                              <div className="content">
                                  <div className="container">
                                      <div className="row">{
                                        Object.keys(tripdetails).map(function(i) {
                                          return <div className="col-xs-12 col-sm-4" key= {i}>
                                                <div className="carbox">
                                                <div className="card-img">
                                                    <img src={`http://localhost:3001/uploads/${tripdetails[i].FileName1}`} style = {{height : "300px", width : "300px"}} />
                                                    <span><h4>${tripdetails[i].AmountPaid}.00</h4></span></div>
                                                    <div className="carbox-content">
                                                        <h4 className="carbox-title">
                                                        {tripdetails[i].Header}
                                                        </h4>
                                                        <ul className="list-inline">
                                                            <li className = "list-inline-item"><img src ="map.jpg"/></li>
                                                            <li className = "list-inline-item">   {tripdetails[i].Location}</li>
                                                        </ul>
                                                        <ul className="list-inline">
                                                            <li className = "list-inline-item">{tripdetails[i].PropertyType}</li>
                                                            <li className = "list-inline-item dot"> </li>
                                                            <li className = "list-inline-item"> {tripdetails[i].Bedroom} BR</li>
                                                            <li className = "list-inline-item dot"> </li>
                                                            <li className = "list-inline-item"> {tripdetails[i].Bathroom} BA</li>
                                                            <li className = "list-inline-item dot"></li>
                                                            <li className = "list-inline-item"> Sleeps      {tripdetails[i].Accomodates}</li>
                                                        </ul>
                                                        <ul className="list-inline">
                                                          <li className = "list-inline-item">Booked From : 
                                                          <input
                                                                type = "text"
                                                                style ={{height: "40px", width : "150px", fontFamily: "Lato,Roboto,Arial,Helvetica Neue,Helvetica,sans-serif"}}                        
                                                                className="form-control"
                                                                value={new Date(tripdetails[i].BookedFrom).toString()}
                                                                readOnly/> </li>
                                                        </ul>
                                                        <ul className="list-inline">
                                                          <li className = "list-inline-item">Booked Till : 
                                                          <input
                                                                type = "text"
                                                                style ={{height: "40px", width : "150px", fontFamily: "Lato,Roboto,Arial,Helvetica Neue,Helvetica,sans-serif"}}                        
                                                                className="form-control"
                                                                value={new Date(tripdetails[i].BookedTo).toString()}
                                                                readOnly/> </li>
                                                        </ul>

                                                        <ul className="list-inline">
                                                          <li className = "list-inline-item">Price :  ${tripdetails[i].NightlyRate} per night</li> 
                                                        </ul>
                                                    </div>
                                                    {/*
                                                    <div className="carbox-read-more">
                                                        <a href="http://www.big.com/2016/03/bootstrap-3-carousel-fade-effect.html" className="btn btn-link btn-block">
                                                            Read More
                                                        </a>
                                                    </div> */}
                                                </div>
                                           </div>
                                            })
                                            }
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </section>
                    </div>
                </div>
        )
    }
}

export default Tripboards;


