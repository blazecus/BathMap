import React, { Component } from 'react';

class NewReview extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: ''
        };
    }

    handleChange = (event) => {
        this.setState({
            value: event.target.value
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.addReview(this.props.parent, this.state.value);
        this.setState({
            value: ''
        });
    };

    render() {
        return (
            <div className="comment input-group">
                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="New Review" value={this.state.value} onChange={this.handleChange} className="form-control"/>
                </form>
                <div className="input-group-append">
                    <button type="submit" className="btn btn-outline-primary" value="Submit" onClick={this.handleSubmit}>Submit</button>
                </div>
            </div>
        );
    }
}

export default NewReview;
