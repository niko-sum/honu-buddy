const fetchWeatherData = async(lat, lon) => {
    try {
        //Get url containing metadata for location
        const locationResponse = await fetch(`https://api.weather.gov/points/${lat},${lon}`);
        const locationData = await locationResponse.json()

        //Fetch data from url
        const gridDataResponse = await fetch(locationData.properties.forecastGridData);
        const gridData = await gridDataResponse.json();

        // Find the most recent data point
        const findCurrentValue = (values) => {
            // Get current time in HST
            const now = new Date();
            const hstOffset = -10 * 60 * 60 * 1000; // Convert -10 hours to milliseconds to convert to HST
            const nowHST = new Date(now.getTime() + (now.getTimezoneOffset() * 60 * 1000) + hstOffset);

            // Sort values by validTime to get the most recent valid data
            const sortedValues = values.sort((a, b) => {
                return new Date(b.validTime.split('/')[0]) - new Date(a.validTime.split('/')[0]);
            });
            
            // Find the first value that's not in the future (in HST)
            return sortedValues.find(item => {
                const itemDate = new Date(item.validTime.split('/')[0]);
                const itemDateHST = new Date(itemDate.getTime() + (itemDate.getTimezoneOffset() * 60 * 1000) + hstOffset);
                return itemDateHST <= nowHST;
            })?.value || null;
        };

        const weather = {
            waveHeight: findCurrentValue(gridData.properties.waveHeight.values),
            windSpeed: findCurrentValue(gridData.properties.windSpeed.values),
            windDirection: findCurrentValue(gridData.properties.windDirection.values),
            temperature: findCurrentValue(gridData.properties.temperature.values),
            precipitation: findCurrentValue(gridData.properties.probabilityOfPrecipitation.values)
        };

        return weather
    } catch (error){
        console.error("Error fetching weather data:", error);
        return {
            waveHeight: "Unavailable",
            windSpeed: "Unavailable",
            windDirection: "Unavailable",
            temperature: "Unavailable",
            precipitation: "Unavailable"
        }
    }
}

module.exports = fetchWeatherData;

// Open-meteo api
// let cachedMarineData = null;
// let lastFetchTime = 0;
// const CACHE_DURATION_MS = 12 * 60 * 60 * 1000; // 12 hours

// const fetchMarineData = async (lat, lng) => {
//     try {
//         const currentTime = Date.now();

//         // Return cached data if valid
//         if (cachedMarineData && currentTime - lastFetchTime < CACHE_DURATION_MS) {
//             console.log('Returning cached marine data');
//             return cachedMarineData;
//         }

//         // Fetch marine data in imperial units
//         const marineResponse = await fetch(
//             `https://marine-api.open-meteo.com/v1/marine?` +
//             `latitude=${lat}&longitude=${lng}` +
//             `&hourly=wave_height,wave_direction` +
//             `&wave_height_unit=ft`
//         );

//         // Fetch weather data in imperial units
//         const weatherResponse = await fetch(
//             `https://api.open-meteo.com/v1/forecast?` +
//             `latitude=${lat}&longitude=${lng}` +
//             `&hourly=temperature_2m,windspeed_10m,winddirection_10m` +
//             `&temperature_unit=fahrenheit` +
//             `&windspeed_unit=mph`
//         );

//         if (!marineResponse.ok || !weatherResponse.ok) {
//             throw new Error(`Failed to fetch data`);
//         }

//         const marineData = await marineResponse.json();
//         const weatherData = await weatherResponse.json();
        
//         // Combine data (no conversion needed)
//         const weather = {
//             waveHeight: marineData.hourly.wave_height[0].toFixed(1), // already in feet
//             waveDirection: marineData.hourly.wave_direction[0], // degrees
//             temperature: Math.round(weatherData.hourly.temperature_2m[0]), // fahrenheit
//             windSpeed: Math.round(weatherData.hourly.windspeed_10m[0]), // mph
//             windDirection: weatherData.hourly.winddirection_10m[0] // degrees
//         };
        
//         // Cache the data
//         cachedMarineData = combinedData;
//         lastFetchTime = currentTime;

//         console.log('Fetched new marine data:', combinedData);
//         return combinedData;

//     } catch (error) {
//         console.error('Error fetching marine data:', error.message);
//         return {
//             waveHeight: "Unavailable",
//             waveDirection: "Unavailable",
//             temperature: "Unavailable",
//             windSpeed: "Unavailable",
//             windDirection: "Unavailable"
//         };
//     }
// };

// module.exports = fetchMarineData;
