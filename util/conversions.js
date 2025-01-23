module.exports = {
    metersToFeet: (meters) => Math.round(meters * 3.28084).toFixed(1),
    celsiusToFar: (celsius) => Math.round((celsius * 9/5) + 32),
    kmToMiles: (km) => Math.round(km * 0.621371),
    getWindDirection: (degrees) => {
      const directions = [
        "N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"
      ];
      const index = Math.floor((degrees + 11.25) / 22.5) % 16;
      return directions[index];
    }
  };
  