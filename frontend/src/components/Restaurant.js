import React from 'react';
import RestaurantDataService from '../services/restaurant';
import { Link } from 'react-router-dom';

const Restaurant = props => {
    const initialRestaurantState = {
        id: null,
        name: "",
        address: {},
        cuisine: "",
        reviews: []
    };
    const [restaurant, setRestaurant] = React.useState(initialRestaurantState);

    const getRestaurant = id => {
        RestaurantDataService.get(id)
            .then(response => {
                setRestaurant(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.error(e);
            });
    }

    React.useEffect(() => {
        getRestaurant(props.match.params.id);
    }, [props.match.params.id]);

    const deleteReview = (reviewId, index) => {
        RestaurantDataService.deleteReview(reviewId, props.user.id)
            .then(response => {
                setRestaurant((prevState) => {
                    prevState.reviews.splice(index, 1);
                    return { ...prevState };
                });
            })
            .catch(e => {
                console.error(e);
            });
    }

    return (
        <React.Fragment>
            {/* Check for restaurant - if so, then display a restaurant card */}
            {restaurant
                ? <div>
                    <h5>{restaurant.name}</h5>
                    <p>
                        <strong>Cuisine: </strong>{restaurant.cuisine}
                        <br />
                        <strong>Address: </strong>{restaurant.address.building} {restaurant.address.street}, {restaurant.address.zipcode}
                    </p>
                    <Link to={"/restaurants/" + props.match.params.id + "/review"} className="btn btn-primary">Add Review</Link>

                    <h4>Reviews</h4>
                    <div className="row">
                        {/* Display reviews if there are any */}
                        {restaurant.reviews.length > 0
                            ? restaurant.reviews.map((review, index) => (
                                <div className="col-lg-4 pb-1" key={index}>
                                    <div className="card">
                                        <div className="card-body">
                                            <p className="card-text">
                                                {review.text}
                                                <br />
                                                <strong>User: </strong>{review.name}
                                                <br />
                                                <strong>Date: </strong>{review.date}
                                            </p>
                                            {/* Add option to edit/delete review ONLY if user is the author of the review */}
                                            {props.user && props.user.id === review.user_id &&
                                                <div className="row">
                                                    <button
                                                        onClick={() => deleteReview(review._id, index)}
                                                        className="btn btn-danger col-lg-5 mx-1 mb-1"
                                                        >delete
                                                    </button>
                                                    <Link
                                                        to={{
                                                            pathname: '/restaurants/' + props.match.params.id + '/review',
                                                            state: { currentReview: review }
                                                        }}
                                                        className="btn btn-primary col-lg-5 mx-1 mb-1"
                                                        >Edit
                                                    </Link>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            ))
                            // If there are no reviews, display the following text
                            : <div className="col-sm-4"><p>No Reviews yet.</p></div>
                        }
                    </div>
                </div>
                // Otherwise, if there is no restuarant, display the following text
                : <div><br /><p>No restaurant selected.</p></div>
            }
        </React.Fragment>
    );
}

export default Restaurant;
