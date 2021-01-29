const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
// const seedHelpers = require('./seedHelpers');
// console.log(seedHelpers);
const Campground = require("../models/campground");
const Review = require("../models/review");

// const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
// const mapBoxToken =
//   "pk.eyJ1IjoiY2xvdWRlZC1leWVzIiwiYSI6ImNra2U0aGY3ZTA0eHQycW85Y2VlbGE2bm4ifQ.K-sTimArS0kDKkCfFIKJkg";
// const geocoder = mbxGeocoding({ accessToken: mapBoxToken });

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("MONGO DB CONNECTED");
});

const seedNumber = 300;
const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Review.deleteMany({});
  await Campground.deleteMany({}).then(
    console.log("yelp-camp > campgrounds collection > items deleted")
  );

  for (let i = 0; i < seedNumber; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 30) + 10;
    const location = `${cities[random1000].city}, ${cities[random1000].state}`;

    // const geoData = await geocoder
    //   .forwardGeocode({
    //     query: location,
    //     limit: 1,
    //   })
    //   .send();

    const camp = new Campground({
      location: location,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.Ad inventore distinctio, hic veritatis eaque soluta animi aperiam natus rerum ratione maxime corporis maiores consectetur, sint mollitia dolor expedita non repellendus.",
      price: price,
      author: "600d0b9c17978a2c2cc6a336",
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          _id: "600fff5a685335c4cc8b08d2",
          url:
            "https://res.cloudinary.com/dnmu32aa3/image/upload/v1611661146/YelpCamp/qnsvfa14w7zvquabkiqw.jpg",
          filename: "YelpCamp/qnsvfa14w7zvquabkiqw",
        },
        {
          _id: "600fff5a685335c4cc8b08d2",
          url:
            "https://res.cloudinary.com/dnmu32aa3/image/upload/v1611661146/YelpCamp/qnsvfa14w7zvquabkiqw.jpg",
          filename: "YelpCamp/qnsvfa14w7zvquabkiqw",
        },
      ],
    });
    await camp.save();
  }
};

// async function seedDB() {
//     await Campground.deleteMany({});
//     const c = new Campground({ title: 'Purple Field' });
//     await c.save();
// }

seedDB().then(() => {
  console.log(`${seedNumber} Seeds Implemented`);
  mongoose.connection.close();
});
