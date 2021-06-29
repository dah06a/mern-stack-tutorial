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

    return (
        <div>
            Hello
        </div>
    );
}

export default RestaurantsList;
