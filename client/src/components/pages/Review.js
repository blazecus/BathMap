import React, { Component } from 'react';
import io from 'socket.io-client';
import NewReview from '../modules/NewReview.js';
import ReviewCard from '../modules/ReviewCard';
const API_ENDPOINT_START = 'https://bathmap.herokuapp.com';

//import StarList from '../modules/StarList.js';
// import Star from '../modules/Star.js';

import StarRatings from 'react-star-ratings';
import a1 from '../../public/3-101-W.jpg';
import a2 from '../../public/4-101-M.jpg';
import a3 from '../../public/7-107-M.jpg';
import a4 from '../../public/8-113-W.jpg';
import a5 from '../../public/26-112.jpg';
import a6 from '../../public/26-114.jpg';
import a7 from '../../public/26-134-M.jpg';
import a8 from '../../public/26-136-W.jpg';
import a9 from '../../public/32-190-W.jpg';
import b1 from '../../public/32-192-M.jpg';
import b2 from '../../public/76-155-M.jpg';
import b3 from '../../public/76-157-W.jpg';
import b4 from '../../public/E25-123-M.jpg';
import b5 from '../../public/E25-125-W.jpg';
import b6 from '../../public/E51-022-M.jpg';
import b7 from '../../public/E51-024-W.jpg';
import b8 from '../../public/E51-064-M.jpg';
import b9 from '../../public/E51-068-W.jpg';
import c1 from '../../public/E51-166-W.jpg';
import c2 from '../../public/E51-168-M.jpg';
import c3 from '../../public/E52-169-M.jpg';
import c4 from '../../public/E52-171-W.jpg';
import c5 from '../../public/E53-328-M.jpg';
import c6 from '../../public/E53-332-W.jpg';
import c7 from '../../public/Sloan Second Floor Women\'s.jpg';
import c8 from '../../public/W20-007-W.jpg';
import c9 from '../../public/W20-008.jpg';
import d1 from '../../public/W20-026-M.jpg';
import d2 from '../../public/W20-204-W.jpg';
import d3 from '../../public/W20-205-M.jpg';
import d4 from '../../public/W20-314-W.jpg';
import d5 from '../../public/W20-315-M.jpg';

const importdict = {
    "3-101-W" : a1,
    "4-101-M": a2,
    "7-107-M": a3,
    "8-113-W": a4,
    "26-112": a5,
    "26-114": a6,
    "26-134-M": a7,
    "26-136-W": a8,
    "32-190-W": a9,
    "32-192-M": b1,
    "76-155-M": b2,
    "76-157-W": b3,
    "E25-123-M": b4,
    "E25-125-W": b5,
    "E51-022-M": b6,
    "E51-024-W": b7,
    "E51-064-M": b8,
    "E51-068-W": b9,
    "E51-166-W": c1,
    "E51-168-M": c2,
    "E52-169-M": c3,
    "E52-171-W": c4,
    "E53-328-M": c5,
    "E53-332-W": c6,
    "Sloan Second Floor Women's": c7,
    "W20-007-W": c8,
    "W20-008": c9,
    "W20-026-M": d1,
    "W20-204-W": d2,
    "W20-205-M": d3,
    "W20-314-W": d4,
    "W20-315-M": d5,
};


class Review extends Component {
	constructor(props) {
        super(props);

        this.socket = io();

        this.state = {
            name: null,
            reviews: [],
            stars: 0,
            rating: 0,
        };
    }
    componentDidMount(){
        this.getReviews(this.props.match.params.bathroom).then(
            this.getStars
        );
        console.log(this.state.stars);
        this.setState({
            name: this.props.match.params.bathroom,
        });
    }
    changeRating = (newRating, name) => {
        this.setState({
            rating: newRating
        });
    }
    render() {

        const isLoggedIn = this.props.userInfo !== null;
        console.log(this.state.stars);
        return (
            <div className="container feed-container">
                <div className="reviewTitle">
                    {this.state.name}
                </div>
                <StarRatings
                    rating={this.state.stars}
                    starRatedColor="blue"
                    numberOfStars={5}
                    name='bathroomstars'
                />
                ({Math.round(this.state.stars*10)/10})
                <div>
                    <img className = "bathpic" src={importdict[this.props.match.params.bathroom]} />
                </div>

                {this.hasNotPosted(isLoggedIn)}
                {this.state.reviews ? (
                    this.state.reviews.map(reviewObj => (
                        <ReviewCard
                            key={`ReviewCard_${reviewObj._id}`}
                            creator_name={reviewObj.creator_name}
                            content = {reviewObj.content}
                            stars = {reviewObj.stars}
                        />
                        )
                    )
                ) : (
                    <div>
                        No reviews yet!
                    </div>
                    )
                }
                {/* <Star
                    num={1}
                    show={true}
                /> */}
            </div>
        );
    }  

    addReview = (parent, content) => {
        const body = {'creator_name':this.props.userInfo.name, 'content': content, 'parent': parent, 'stars': this.state.rating};
        fetch(API_ENDPOINT_START + '/api/review', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
        });
    }

    getReviews = (id) => {
        return fetch(API_ENDPOINT_START + `/api/review?parent=${id}`)
            .then(res => res.json())
            .then(
                reviewObj => {
                    this.setState({
                        name: id,
                        reviews: reviewObj.reverse(),
                    });
                }
            );
        // var lt = [];
        // for(var i = 0; i < this.state.reviews.length; i++){
        //     lt.push(<ReviewCard creator_name = {this.state.reviews[i].creator_name} content = {this.state.reviews[i].content}/>);
        // }
        // return lt;
    }
    getStars = () => {
        var tot = 0;
        if(this.state.reviews.length === 0){
            this.setState({
                stars: 0
            });
        }
        else{
            for(var i = 0; i <  this.state.reviews.length; i++){
                tot += this.state.reviews[i].stars;
            }
            this.setState({
                stars: tot/this.state.reviews.length
            });
        }
    }
    hasNotPosted(logged){
        if(logged && this.state.reviews.length > 0){
            for(var i = 0; i < this.state.reviews.length; i++){
                if(this.state.reviews[i].creator_name === this.props.userInfo.name){
                    return <div>You already posted!!</div>;
                }
            }
        }
        else if(!logged){
            return <div>You must be logged in to post.</div>
        }
        return(
            <div>
                <StarRatings
                    rating={this.state.rating}
                    starRatedColor="blue"
                    changeRating={this.changeRating}
                    numberOfStars={5}
                    name='rating'
                />
                <NewReview 
                    addReview={this.addReview}
                    brn = {this.state.name}
                    parent = {this.state.name}
                />
            </div>
        );
    }
}

export default Review;