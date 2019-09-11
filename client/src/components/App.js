import React, { Component } from "react";
import NavBar from "./modules/NavBar.js";
import MapComponent from "./pages/MapComponent.js";
import Review from "./pages/Review.js"
import { Route, Switch, withRouter } from 'react-router-dom';
import styles from "../styles.css";
const API_ENDPOINT_START = 'https://bathmap.herokuapp.com';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userInfo: null
        };
    }

    componentDidMount() {
        this.getUser();
    }

/*PUT THIS IN RENDER WHEN NAVBAR WORKS
            <NavBar
                userInfo={this.state.userInfo}
                logout={this.logout}
            />
*/
	render(){
	    return (
	        <div>
                <NavBar
                    userInfo={this.state.userInfo}
                    logout={this.logout}
                />
                <Switch>
                    <Route exact path='/' component={MapComponent}/>}/>
                    <Route exact path='/reviews/:bathroom' render={(props) => <Review {...props} userInfo={this.state.userInfo}/>}/>

                </Switch>
            </div>
	    );
	}

    logout = () => {
        this.setState({
            userInfo: null
        })
    };

    getUser = () => {
        fetch(API_ENDPOINT_START + '/api/whoami')
        .then(res => res.json())
        .then(
            userObj => {
                if (userObj._id !== undefined) {
                    this.setState({
                        userInfo: userObj
                    });
                } else {
                    this.setState({
                        userInfo: null
                    });
                }
            }
        );
    }

}

export default withRouter(App);
