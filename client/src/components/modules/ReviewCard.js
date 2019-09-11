import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';

class ReviewCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="reviewcard">
                <div className="reviewcreator">
                    {this.props.creator_name}
                </div>
                <StarRatings
                    rating={this.props.stars}
                    starRatedColor="red"
                    numberOfStars={5}
                    name='bathroomstars'
                    starDimension='15px'
                    starSpacing='3px'
                />
                <span className="comment-content">
                    {' | ' + this.props.content}
                </span>
            </div>
        );
    }
}

export default ReviewCard;