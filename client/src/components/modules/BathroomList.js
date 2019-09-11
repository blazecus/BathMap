import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BathroomTile from '../modules/BathroomTile.js';
const API_ENDPOINT_START = 'https://bathmap.herokuapp.com';
class BathroomList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            brs : [],
            first : true,
            current : null
        };
        console.log("helloooooo");
        console.log("hellaaaaa");
    }
    componentDidMount(){
        //this.createTiles();
        console.log("fuck you");
        this.createTiles();
        this.setState({
            brs: this.state.brs,
            first: true,
            current: this.props.n
        });
    }

    render() {
        if(this.state.current != this.props.n){
            this.createTiles();
        }
        if(this.state.first){
            this.createTiles();
        }
        console.log(this.props.name);
        return(
            <div id="building">
                {this.props.n}
                {this.state.brs ? (
                    this.state.brs.map(bathroomObj => (
                        <BathroomTile
                            key={`BathroomTile_${bathroomObj._id}`}
                            name={bathroomObj.name}
                        />
                        )
                    )
                ) : (
                    <div>
                        No bathrooms!
                    </div>
                    )
                }
            </div>
        )
    }
    createTiles(){
        if(this.props.n === null){
            console.log("oops");
        }
        else{
            console.log(this.props.n);
            fetch(API_ENDPOINT_START+`/api/bathrooms?building=${this.props.n}`)
            .then(res => res.json())
            .then(
                brsObj => {
                    this.setState({
                        brs: brsObj.reverse(),
                        first: false,
                        current: this.props.n
                    });
                    //brs = brsObj.reverse();
                    //console.log(this.state.brs);
                }
            );
        }
        //console.log(brs);
        // var lt = [];
        // for(var i = 0; i < this.state.brs.length; i++){
        //     lt.push(<BathroomTile key = {this.state.brs[i]._id} name={this.state.brs[i].name}/>);
        // }
        // for(var i = 0; i < 12 - this.state.brs.length; i++){
        //     lt.push(<BathroomTile key = {i} />);
        // }
        return this.state.brs;
    }
}

export default BathroomList;
