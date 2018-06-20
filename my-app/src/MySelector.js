
import React, { Component } from 'react';
import './App.css';

class MySelector extends Component {
    constructor(){
        super();
        this.state = {
            data: [],
            filterUrl: ''
        };
        this.select = React.createRef();
    }

    serialize(dictionary) {
        var str = [];
        for(var key in dictionary) {
            str.push(encodeURIComponent(key) + "=" + encodeURIComponent(dictionary[key]));
        }
        return str.join("&");
    }

    resetData(props) {
        console.log("SELECTOR VERSION", props.url)
        console.log("DATA", props.dictionary)
        var completeUrl = this.serialize(props.dictionary)
        console.log(props.url)
        fetch('http://localhost:5001/testdata/' + props.url +"?"+ completeUrl)
        .then(results => {
            return results.json();
        }).then(data => {
            if(data.length > 0 && data[0]['description']) {
                data = data.map((value) => {
                    return [value['name'], value['description']];
                });
            }
            this.setState({
                data: data,
                filterUrl: completeUrl
            })
        })
    }

    componentDidUpdate(prevProps) {
        console.log("CHECKING PROPS CHANGE", this.props, prevProps);
        if(this.state.filterUrl !== this.serialize(this.props.dictionary)) {
            this.select.current.selectedIndex = undefined;
            this.resetData(this.props);
        }
    }

    componentDidMount() {
        console.log("REMOUNTING", this.props);
        this.resetData(this.props);
    }

    render() {
        return <div><select className="Selectors"
            ref={this.select}
            onChange = {this.props.onSelect}
            id = {this.props.url}>
            <option value="" selected>Select One</option>
            {this.state.data.map((param,i) => {
                if(typeof param === "string") {
                    return <option value={param}>{param}</option>
                }
                else {
                    return <option value={param[1]}>{param[0]}</option>
                }
            })}
        </select></div><br>
    }

}


export default MySelector;
