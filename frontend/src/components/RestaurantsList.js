import React from 'react';
import RestaurantDataService from '../services/restaurant';
import { Link } from 'react-router-dom';

const RestaurantsList = props => {

    const [restaurants, setRestaurants] = React.useState([]);
    const [searchName, setSearchName] = React.useState("");
    const [searchZip, setSearchZip] = React.useState("");
    const [searchCuisine, setSearchCuisine] = React.useState("");
    const [cuisines, setCuisines] = React.useState(["All Cuisines"]);

    React.useEffect(() => {
        retreiveRestaurants();
        retreiveCuisines();
    }, []);

    const onChangeSearchName = e => {
        const searchName = e.target.value;
        setSearchName(searchName);
    };

    const onChangeSearchZip = e => {
        const searchZip = e.target.value;
        setSearchZip(searchZip);
    };

    const onChangeSearchCuisine = e => {
        const searchCuisine = e.target.value;
        setSearchCuisine(searchCuisine);
    };

    const retreiveRestaurants = () => {
        RestaurantDataService.getAll()
            .then(response => {
                console.log(response.data);
                setRestaurants(response.data.restaurants);
            })
            .catch(e => {
                console.log(e);
            });
    }

    const retreiveCuisines = () => {
        RestaurantDataService.getCuisisnes()
            .then(response => {
                console.log(response.data);
                setCuisines(["All Cuisines"].concat(response.data));
            })
            .catch(e => {
                console.log(e);
            });
    };

    const refreshList = () => {
        retreiveRestaurants();
    };

    const find = (query, by) => {
        RestaurantDataService.find(query, by)
            .then(response => {
                console.log(response.dat);
                setRestaurants(response.data.restaurants);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const findByName = () => {
        find(searchName, "name")
    };

    const findByZip = () => {
        find(searchZip, "zipcode")
    };

    const findByCuisine = () => {
        if (searchCuisine === 'All Cuisines') refreshList();
        else find(searchCuisine, "cuisine");
    };

    return (
        <React.Fragment>

            <div className="row pb-1">
                <div className="col-lg-4">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            style={{width: '70%'}}
                            placeholder="Search By Name"
                            value={searchName}
                            onChange={onChangeSearchName}
                        />
                        <button
                            className="btn btn-outline-secondary"
                            style={{width: '30%'}}
                            type="button"
                            onClick={findByName}
                            >Search
                        </button>
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            style={{width: '70%'}}
                            placeholder="Search By Zip"
                            value={searchZip}
                            onChange={onChangeSearchZip}
                        />
                        <button
                            className="btn btn-outline-secondary"
                            style={{width: '30%'}}
                            type="button"
                            onClick={findByZip}
                            >Search
                        </button>
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="input-group">
                        <select onChange={onChangeSearchCuisine} style={{width: '70%'}}>
                            { cuisines.map(cuisine => <option value={cuisine}> {cuisine.substr(0, 20)} </option>) }
                        </select>
                        <button
                            className="btn btn-outline-secondary"
                            style={{width: '30%'}}
                            type="button"
                            onClick={findByCuisine}
                            >Search
                        </button>
                    </div>
                </div>
            </div>

            <div className="row">
                {restaurants.map(restaurant => {
                    const address = `${restaurant.address.building} ${restaurant.address.street}, ${restaurant.address.zipcode}`;
                    return (
                        <div className="col-lg-4 pb-1">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{restaurant.name}</h5>
                                    <p className="card-text">
                                        <strong>Cuisine: </strong>{restaurant.cuisine}
                                        <br />
                                        <strong>Address: </strong>{address}
                                    </p>
                                    <div className="row">
                                        <Link
                                            to={"/restaurants/" + restaurant._id}
                                            className="btn btn-primary col-lg-5 mx-1 mb-1"
                                            >See Reviews
                                        </Link>
                                        <a
                                            target="blank"
                                            href={"https://www.google.com/maps/place/" + address}
                                            className="btn btn-primary col-lg-5 mx-1 mb-1"
                                            >See Map
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

        </React.Fragment>
    );
}

export default RestaurantsList;
