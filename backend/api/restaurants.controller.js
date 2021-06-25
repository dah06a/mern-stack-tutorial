import RestaurantsDAO from '../dao/restaurantsDAO.js';

export default class RestaurantsController {

    //Method to retrieve restaurants from the API
    static async apiGetRestaurants(req, res, next) {

        //Set page and filter variables based on query string parameters
        const restaurantsPerPage = req.query.restaurantsPerPage ?  parseInt(req.query.restaurantsPerPage, 10) : 20;
        const page = req.query.page ? parseInt(req.query.page, 10) : 0;

        let filters = {};
        if (req.query.cuisine) {
            filters.cuisine = req.query.cuisine;
        } else if (req.query.zipcode) {
            filters.zipcode = req.query.zipcode;
        } else if ( req.query.name) {
            filters.name = req.query.name;
        }

        //Use Restaurants Data Access Object to retreive restaurants from MongoDB
        const { restaurantsList, totalNumRestaurants } = await RestaurantsDAO.getRestaurants({ filters, page, restaurantsPerPage });

        //Set and send JSON response back to the user
        let response = {
            restaurants: restaurantsList,
            page: page,
            filters: filters,
            entries_per_page: restaurantsPerPage,
            total_results: totalNumRestaurants,
        };
        res.json(response);
    }
}
