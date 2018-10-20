import React, { Component, Fragment } from 'react';
import Header from './Header'
import { Link } from 'react-router-dom'

const Error = () => (
    <Fragment>
        <Header hideLyp />
        <h2 style={{ color: "#434343", margin: "30vh 0 0 30vw"}}>Oops, something went wrong! <Link to="/">Go Home.</Link></h2>
    </Fragment>
);

export default Error;