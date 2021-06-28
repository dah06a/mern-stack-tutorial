import ReviewsDAO from '../dao/reviewsDAO.js';

export default class ReviewsController {

    //Method for posting a restaurant review through the API
    static async apiPostReview(req, res, next) {

        //Get required info through request body
        try {
            const restaurantId = req.body.restaurant_id;
            const review = req.body.text;
            const userInfo = {
                name: req.body.name,
                _id: req.body.user_id,
            }
            const date = new Date();

            //Use Reviews Data Access Object to enter restaurant review in MongoDB
            const ReviewResponse = await ReviewsDAO.addReview(restaurantId, userInfo, review, date);
            res.json({ status: 'success' });

        //Log/Respond with errors if they occur while trying to post
        } catch (e) {
            console.error(`An error occurred while posting a review: ${e}`);
            res.status(500).json({ error: e.message });
        }
    }

    //Method for updating a restaurant review through the API
    static async apiUpdateReview(req, res, next) {

        //Get user review data through request body
        try {
            const reviewId = req.body.review_id;
            const userId = req.body.user_id;
            const text = req.body.text;
            const date = new Date();

            //Use Reviews Data Access Object to update a review in MongoDB
            const reviewResponse = await ReviewsDAO.updateReview(reviewId, userId, text, date);

            //Check for errors sending the updated review POST request to MongoDB
            let { error } = reviewResponse;
            if (error) {
                console.error(`The server encountered a problem receiving the updated review: ${error}`);
                res.status(400).json({ error });
            }

            //Check for errors with user permissions
            if (reviewResponse.modifiedCount === 0) {
                console.error('Possible user permissions error.  Review response has modified count of 0.');
                throw new Error('Unable to update review.  This review may not belong to current user.');
            }

            //Otherwise, show success status
            res.json({ status: 'success' });

        //Catch any errors
        } catch (e) {
            console.error(`Error completing API Review Update: ${e}`);
            res.status(500).json({ error: e.message });
        }
    }

    //Method for deleting a restaurant review through the API
    static async apiDeleteReview(req, res, next) {

        //Get review and user id data from request
        try {
            const reviewId = req.query.id;
            console.log(reviewId);
            const userId = req.body.user_id;

            //Use Reviews Data Access Object to delete a review in MongoDB
            const reviewResponse = await ReviewsDAO.deleteReview(reviewId, userId);
            res.json({ status: "success" });

        //Catch any errors
        } catch (e) {
            console.error(`Error deleting review: ${e}`);
            res.status(500).json({ error: e.message });
        }
    }
}
