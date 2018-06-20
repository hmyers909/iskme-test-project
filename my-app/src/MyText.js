import React, { Component } from 'react';
import './App.css';


class MyText extends Component {

    render() {
        return <div className = "Textbox">
        {this.props.theDescription}</div>;
    }

}

export default MyText;