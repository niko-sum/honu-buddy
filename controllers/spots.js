const snorkelingSpots = require("../data/spots");
const fetchWeatherData = require("../util/fetchWeather");
const utils = require("../util/conversions");
const Comment = require("../models/Comment");

module.exports = {
  getSpot: async (req, res) => {
    const spotId = req.params.spotId; // Get the spotId from the URL
    const spot = snorkelingSpots.find(s => s.id === spotId); // Find the spot by its ID

    if (spot) {
      try {
        // Fetch weather data for the selected spot
        const weather = await fetchWeatherData(spot.lat, spot.lng);

        // Fetch comments for the spot
        const comments = await Comment.find({ post: spotId }).populate('user');

        // Render the spots page with spot, weather, and comments data
        console.log("Spot data:", {
          id: spot.id,
          name: spot.name
        });

        res.render("spots", {
          spot: spot,
          user: req.user,
          comments: comments,
          weather: weather,
          metersToFeet: utils.metersToFeet,
          celsiusToFar: utils.celsiusToFar,
          kmToMiles: utils.kmToMiles,
          getWindDirection: utils.getWindDirection
        });
      } catch (error) {
        console.error("Error fetching weather data:", error);
        res.status(500).send("Error fetching weather data");
      }
    } else {
      res.status(404).send("Spot not found");
    }
  },
};
