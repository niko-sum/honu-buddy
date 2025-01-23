const snorkelingSpots = require("../data/spots");
const fetchWeatherData = require("../util/fetchWeather");
const utils = require("../util/conversions");

module.exports = {
  getIndex: (req, res) => {
    res.render("index.ejs");
  },

  getProfile: (req, res) => {
    res.render("profile", { user: req.user });
  },

  getHome: async (req, res) => {
    try {
      // Fetch weather data for all snorkeling spots and map them to include weather data
      const spotsWithWeather = await Promise.all(
        snorkelingSpots.map(async (spot) => {
          const weather = await fetchWeatherData(spot.lat, spot.lng); // Fetch weather data for each spot
          return { ...spot, weather }; // Return the spot with weather data
        })
      );
      console.log(spotsWithWeather)
      // Render the home page with spots and weather data
      res.render("index", { 
        spots: spotsWithWeather, 
        user: req.user,
        metersToFeet: utils.metersToFeet,
        celsiusToFar: utils.celsiusToFar,
        kmToMiles: utils.kmToMiles,
        getWindDirection: utils.getWindDirection
      });
    } catch (error) {
      console.error("Error in getHome:", error.message);
      res.status(500).send("Internal Server Error");
    }
  },
};
