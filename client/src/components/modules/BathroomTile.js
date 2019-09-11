import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class BathroomTile extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if(this.props.name != null){
            return (
              <div id="location">
                <Link to={"/reviews/" + this.props.name} className="bathtile">
                    {this.props.name}
                </Link>
              </div>
            );
        }
        else{
            return (
                <div className="bathtile"></div>
            );
        }
    }
}

export default BathroomTile;
