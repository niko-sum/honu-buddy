# Snorkeling & Marine Weather Resource: <a href="https://honubuddy.up.railway.app/" target="_blank">Visit Here</a>
<a href="https://honubuddy.up.railway.app/" target="_blank">
<img src="https://github.com/niko-sum/Portfolio-Website/blob/main/images/honubuddy.gif" width="100%" alt="honubuddy"/>
</a>

Snorkeling guide featuring local hidden gems and live marine weather data for Maui, Hawai'i!

**Link to project:** https://honubuddy.up.railway.app/

## How It's Made:

**Tech used:** JavaScript, Tailwind, MongoDB, Express.js, Node.js, Passport.js, EJS, Cloudinary, Multer, HTML, CSS, RESTful API (NWS)

Started with the 100devs binary-upload-boom as a template and stripped it down to leave the Passport.js configuration, MongoDB, Cloudinary, Multer, and the base MVC structure. I mapped out the website layout focusing on easy navigation while providing best ocean explporation practices through an educational lens for users. I explored numerous Tailwind component libraries including DaisyUI and MerakiUI and ended up combining elements from both. Bootstrap was creating conflicts with certain Tailwind classes so I ended up removing them.

One of the larger challenges was figuring out how to display each snorkeling spot. After some trial and error, I remembered how to dynamically create containers through EJS by looking at the Comments section of the original template. By keeping the core information of each spot in one object array exported from another file, I was able to iterate through them and generate a card for each object/spot. This also saved me from having to create a separate page for each spot after the user clicks on one. Now each spots page is dynamically created from the local database.

Integerating the correct API was the biggest and most rewarding hurdle to overcome. After narrowing down API that can take specific coordinates and provide the necessary marine weather, Stormglass was the initial winner. However its daily 10 request limit proved to be a problem in development. I learned that caching makes it possible to keep the API requests strictly come from the server and have the server deliver the information to the front end as opposed to having each visitor automatically create a request. This worked at first though I quickly learned that it makes the request everytime the server is restarted. Since I had 5 locations to start, it didn't take much to hit the Stormglass limit and render it unusable.

I then found myself using the US National Weather Service API. They had an hourly forecast API that updated automatically but it didn't contain much marine weather information like wave height so I needed dig further and use their gridpoint data. This one had information in an object array but hourly data was separated in odd intervals. It also had no object that updated automatically based on current time. Eventually I found a formula on how to use the current time, convert it into Hawaiian Standard Time, then find the closest data value matching that time. I also had to create a file containing conversion functions because NWS data are all in imperial measurements. I exported the conversions and used them in the rendered data via EJS. This part took the most amount of time but it made me feel like I leveled up.

The idea for this website to for it to grow organically through a community so I repurposed the comments functionality of the original template for snorkelers to leave tips and photos from their experiences. I ran into a speedbump with getting Multer to work but eventually fixed the bug.

Last but certainly not the least, I built the safety and guidelines page using the knowledge I gained snorkeling in Hawai'i and referencing key sources. I particularly want newer snorkelers to remember to respect and preserve the ocean so I wrote the core tenets in the guide page. I used a FAQ Tailwind component from MerakiUI. I also put time into tweaking the front end to make everything more legible and easier on the eyes.

## Optimizations

The main optimizations for this project were:

Server Side Rendering - iterating through the local database and having it generate the snorkeling spots dynamically increases efficiency and can handle larger data sets without having to update the HTML everytime. Especially useful if I decide to fill the spots out and eventually add another island's spots.

Modularity - creating a local database and separating the JS logic/functions in another file enables easier scalability and neater code

RESTful API and variables - having multiple data points contained in a variable and iterating through them not only reduced the lines of code needed but made for a more elegant data delivery process.

Visual design - made multiple small tweaks on the front like having images and cards zoom over hover, adding shadows to make certain sections float from the background, and using gradient coloring allows for a sleeker and professional look

## Lessons Learned:

All of the above summarized. Server Side Rendering and keeping the API fetch and conversion logic modular saved me hours of manual editing. Finding out that most weather APIs come in the metric system with only a select few of them providing integrated imperial conversions. Building this project allowed me to get a deeper understanding of implementing RESTful apis and I look forward to utilizing such powerful public resources in the future. 

Free Tailwind components are a godsend and I'm thankful for them!

# Install

`npm install`

---

# Things to add

- Create a `.env` file in config folder and add the following as `key = value`
  - PORT = 2121 (can be any port example: 3000)
  - DB_STRING = `your database URI`
  - CLOUD_NAME = `your cloudinary cloud name`
  - API_KEY = `your cloudinary api key`
  - API_SECRET = `your cloudinary api secret`

---

# Run

`npm start`

## More Projects:
Take a look at these couple examples that I have in my own portfolio:

<table bordercolor="#66b2b2">
  
  <tr>
    <td width="33.3%"  style="align:center;" valign="top">
<a target="_blank" href="https://github.com/niko-sum/Gamer-Tales">Gamer Tales</a>
        <br />
      <a target="_blank" href="https://github.com/niko-sum/Gamer-Tales">
            <img src="https://github.com/niko-sum/Portfolio-Website/blob/main/images/gamer-tales.gif" width="100%"  alt="Gamer Tales"/>
        </a>
    </td>
    <td width="33.3%" valign="top">
<a target="_blank" href="https://github.com/niko-sum/Farmers-Market">East Valley Farmer's Market</a>
      <br />
        <a target="_blank" href="https://github.com/niko-sum/Farmers-Market">
          <img src="https://github.com/niko-sum/Portfolio-Website/blob/main/images/farmersmarket.gif" width="100%" alt="Farmer's Market"/>
        </a>
    </td>
    <td width="33.3%" valign="top">
<a target="_blank" href="https://github.com/niko-sum/Portfolio-Website">Portfolio</a>
        <br />
        <a target="_blank" href="https://github.com/niko-sum/Portfolio-Website/">
          <img src="https://github.com/niko-sum/Portfolio-Website/blob/main/images/portfolio-gif.gif" width="100%" alt="Portfolio"/>
        </a>
    </td>
  </tr>
</table>